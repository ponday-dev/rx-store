import { Observable, ReplaySubject } from 'rxjs';

export type ActionFn<T> = (value: T, paams?: any) => T;

export type Action<T> = { [type: string]: ActionFn<T> };

export interface StateDef<T> {
    value?: T;
    allowSet?: boolean;
    actions?: Action<any>;
}

export class State<T> {
    protected subject: ReplaySubject<T>;
    protected value: T;
    readonly allowSet: boolean;
    readonly actions: Action<any>;

    constructor(stateDef: StateDef<T>) {
        this.subject = new ReplaySubject<T>(1);
        this.allowSet = !stateDef.allowSet;
        this.actions = stateDef.actions || {};
        this.value = stateDef.value;
        if (this.value !== undefined) { this.next(stateDef.value); }
    }

    private next(value: T) { 
        this.value = value;
        this.subject.next(value);
    }

    set(value: T) {
        if (!this.allowSet) {
            throw new Error(`Error: This state is not allowed set value direct.`)
        }
        this.next(value);
    }

    dispatch(type: string, params?: any) {
        this.assertAction(type);
        this.next(this.actions[type](this.value, params));
    }

    get observable$(): Observable<T> { return this.subject.asObservable(); }

    private assertAction(type: string) {
        if (this.actions[type] === undefined) {
            throw new Error(`Error: Cannot specified type: ${type} is not found.`);
        }
    }
}

export class Store {

    protected store: { [key: string]: State<any> } = {};

    constructor(states: { [key: string]: StateDef<any> } = {}) {
        for(let [key, stateDef] of Object.entries(states)) {
            this.use<any>(key, stateDef);
        }
    }
    
    use<T>(key: string, stateDef: StateDef<T> = {}) {
        this.assertKey(key);
        this.store[key] =  new State<T>(stateDef);
    }

    select<T>(key: string): Observable<T> {
        this.assertKey(key, false);
        return this.store[key].observable$;
    }

    set(key: string, value: any) {
        this.assertKey(key, false);
        this.store[key].set(value);
    }

    dispatch(key: string, type: string, params?: any) {
        this.assertKey(key, false);
        this.store[key].dispatch(type, params);
    }

    /**
     * Check this store has key (or has not key)
     * @param key target key
     * @param check if this is true, throw error when the key is exists. if this is false, throw error when the key is not exists.
     */
    protected assertKey(key: string, check: boolean = true) {
        if (!xor(this.existsKey(key), check)) {
            const msg = check ?
                `Error: Cannot specified key: ${key} is already exists.`
                : `Error: Specified key: ${key} is not found.`;
            throw new Error(msg);
        }
    }

    protected existsKey(key: string): boolean {
        return !!this.store[key];
    }
}

function xor(x: boolean, y: boolean): boolean {
    return (!x && y) || (x && !y);
}
