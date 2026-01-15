// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { logger } from "../logger.js";
/**
 * Creates a timer loop with the given timeout and task.
 * @internal
 */
export function createTimerLoop(timeoutInMs, createTask) {
    let token;
    const loop = {
        start: () => {
            clearTimeout(token);
            token = setTimeout(() => {
                // Fire-and-forget background task with error handling
                createTask()
                    .catch((err) => {
                    logger.verbose("Error in timer loop task: %O", err);
                })
                    .finally(loop.start)
                    .catch((err) => {
                    logger.verbose("Error in timer loop finally block: %O", err);
                });
            }, timeoutInMs);
            loop.isRunning = true;
        },
        stop: () => {
            clearTimeout(token);
            loop.isRunning = false;
        },
        isRunning: false,
    };
    return loop;
}
//# sourceMappingURL=timerLoop.js.map