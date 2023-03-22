// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
}

/**
 * Creates a timer loop with the given timeout and task.
 * @internal
 */
export function createTimerLoop(
  timeoutInMs: number,
  createTask: () => Promise<unknown>
): TimerLoop {
  let token: ReturnType<typeof setTimeout>;
  const loop = {
    start: () => {
      clearTimeout(token);
      token = setTimeout(() => createTask().then(loop.start), timeoutInMs);
    },
    stop: () => clearTimeout(token),
  };
  return loop;
}
