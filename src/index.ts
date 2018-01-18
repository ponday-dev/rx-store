import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, distinctUntilChanged } from 'rxjs/operators';

export interface State {
    [key: string]: any;
}
export interface Reduce<T> {
    (state: T, opt?: any): T;
}
export interface Reducer<T> {
    [key: string]: Reduce<T>;
}

export class Store<T extends State> extends BehaviorSubject<T> {

    private reducer: Reducer<T>;

    constructor(init: { state: T, reducer?: Reducer<T> }) {
        super(init.state);
        this.reducer = init.reducer || {};
    }

    dispatch(key: string, opt?: any): void;
    dispatch(reduce: Reduce<T>, opt?: any): void;

    dispatch(keyOrReduce: string | Reduce<T>, opt?: any): void {
        this.next(this.getReduce(keyOrReduce)(this.getValue(), opt));
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
        return this.pipe(map(filterFn), distinctUntilChanged());
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
