// import { Store } from '../dist/rx-store';
import { Store } from '../lib/index';

(function () {
    const STATE_COUNTER = 'counter';

    const ACTION_INCREMENT = 'increment';
    const ACTION_DECREMENT = 'decrement';
    const ACTION_RESET = 'reset';

    console.log(Store);
    const store: Store = new Store({
        [STATE_COUNTER]: {
            value: 0,
            allowSet: false,
            actions: {
                increment: value => value+1,
                decrement: value => value-1,
                reset: _ => 0
            }
        }
    });

    function increment() {
        store.dispatch(STATE_COUNTER, ACTION_INCREMENT);
    }

    function decrement() {
        store.dispatch(STATE_COUNTER, ACTION_DECREMENT);
    }

    function reset() {
        store.dispatch(STATE_COUNTER, ACTION_RESET);
    }

    let sub;
    window.addEventListener('DOMContentLoaded', () => {
        document.getElementById('minus').addEventListener('click', decrement);
        document.getElementById('plus').addEventListener('click', increment);
        document.getElementById('reset').addEventListener('click', reset);

        sub = store.select<number>(STATE_COUNTER).subscribe(value => {
            document.getElementById('counter').innerHTML = `${value}`;
        });
    });

    window.addEventListener('unload', () => {
        if (sub) sub.unsubscribe();
    });
})();
