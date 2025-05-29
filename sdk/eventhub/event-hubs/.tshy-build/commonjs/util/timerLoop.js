"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTimerLoop = createTimerLoop;
/**
 * Creates a timer loop with the given timeout and task.
 * @internal
 */
function createTimerLoop(timeoutInMs, createTask) {
    let token;
    const loop = {
        start: () => {
            clearTimeout(token);
            token = setTimeout(() => createTask()
                .catch(() => {
                /** eats up any unhandled error */
            })
                .finally(loop.start), timeoutInMs);
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