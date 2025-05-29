/**
 * A timer loop is a loop over multiple instances of a promise every specific
 * time interval. It is different from `setInterval` in that it waits until the
 * promise is settled before it goes to the next iteration.
 * */
export interface TimerLoop {
    /**
     * Starts the timer loop. If the loop is already running, the loop will be
     * restarted.
     */
    start: () => void;
    /**
     * Stops the timer loop. If the loop is not running, it is a no-op.
     */
    stop: () => void;
    /**
     * Whether the loop is running.
     */
    isRunning: boolean;
}
/**
 * Creates a timer loop with the given timeout and task.
 * @internal
 */
export declare function createTimerLoop(timeoutInMs: number, createTask: () => Promise<unknown>): TimerLoop;
//# sourceMappingURL=timerLoop.d.ts.map