import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, distinctUntilChanged } from 'rxjs/operators';

type Reduce<T> = (state: T, opt?: any) => T;
export interface State {
    [key: string]: any;
}
export interface Reducer<T> {
    [key: string]: Reduce<T>;
}

type Handler = (state: any) => any;
type Middleware = (next: Handler) => Handler;

export class Store<T extends State> extends Observable<T> {

    private store: BehaviorSubject<T>;
    private reducer: Reducer<T>;
    private handler: Handler;

    constructor(init: { state: T, reducer?: Reducer<T>, middlewares?: Middleware[] }) {
        super();
        this.store = new BehaviorSubject<T>(init.state);
        this.reducer = init.reducer || {};
        this.handler = init.middlewares.reduceRight(
            (next: Handler, middleware: Middleware) => middleware(next),
            state => {
                this.store.next(state);
                return state;
            }
        );
        this.source = this.store;
    }

    dispatch(key: string, opt?: any): void;
    dispatch(reduce: Reduce<T>, opt?: any): void;

    dispatch(keyOrReduce: string | Reduce<T>, opt?: any): void {
        this.handler(this.getReduce(keyOrReduce)(this.store.getValue(), opt));
    }

    private getReduce(keyOrReduce: string | Reduce<T>): Reduce<T> {
        return isFunction(keyOrReduce)
            ? keyOrReduce as Reduce<T>
            : this.reducer[keyOrReduce as string];
    }

    select<R>(key: string): Observable<R>;
    select<R>(filterFn: (state: T) => R): Observable<R>;

    select<R>(keyOrFilter: ((state: T) => R) | string): Observable<R> {
        const filterFn = this.getFilter(keyOrFilter);
        return this.store.pipe(map(filterFn), distinctUntilChanged());
    }

    private getFilter<R>(keyOrFilter: ((state: T) => R) | string): (state: T) => R {
        return isFunction(keyOrFilter)
            ? keyOrFilter as (state: T) => R
            : (state: T) => state[keyOrFilter as string];
    }

}

function isFunction(obj: any): boolean {
    return typeof obj === 'function';
}
