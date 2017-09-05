import { Store } from '../../lib/rx-store';

(function () {
    const STATE_COUNTER = 'counter';

    const ACTION_INCREMENT = 'increment';
    const ACTION_DECREMENT = 'decrement';
    const ACTION_RESET = 'reset';

    const store = new Store({
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
    const counter = store.select(STATE_COUNTER);

    function increment() {
        counter.dispatch(ACTION_INCREMENT);
    }

    function decrement() {
        counter.dispatch(ACTION_DECREMENT);
    }

    function reset() {
        counter.dispatch(ACTION_RESET);
    }

    let sub;
    window.addEventListener('DOMContentLoaded', () => {
        document.getElementById('minus').addEventListener('click', decrement);
        document.getElementById('plus').addEventListener('click', increment);
        document.getElementById('reset').addEventListener('click', reset);

        sub = counter.observable$
            .subscribe(value => {
                document.getElementById('counter').innerHTML = `${value}`;
            });
    });

    window.addEventListener('unload', () => {
        if (sub) sub.unsubscribe();
    });
})();
