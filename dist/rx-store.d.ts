import { Observable, ReplaySubject } from 'rxjs';

export type ActionFn<T> = (value: T, paams?: any) => T;

export type Action<T> = { [type: string]: ActionFn<T> };

export interface StateDef<T> {
    value?: T;
    allowSet?: boolean;
    actions?: Action<any>;
}

declare class State<T> {
    protected subject: ReplaySubject<T>;
    protected value: T;
    readonly allowSet: boolean;
    readonly actions: Action<any>;

    constructor(stateDef: StateDef<T>);

    private next(value: T);

    set(value: T);

    dispatch(type: string, params?: any);

    observable$(): Observable<T>;

    private assertAction(type: string);
}

export class Store {

    protected store: { [key: string]: State<any> };

    constructor(states: { [key: string]: StateDef<any> });
    
    use<T>(key: string, stateDef: StateDef<T>);

    select<T>(key: string): Observable<T>;

    set(key: string, value: any);

    dispatch(key: string, type: string, params?: any);

    protected assertKey(key: string, check: boolean);

    protected existsKey(key: string): boolean;
}
