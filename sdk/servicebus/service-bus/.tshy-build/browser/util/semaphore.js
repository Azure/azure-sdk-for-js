// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @internal
 * A simple Semaphore
 */
export class Semaphore {
    constructor(limit) {
        this._queue = [];
        this._used = 0;
        if (typeof limit !== "number") {
            throw new TypeError(`Expected limit to be a number, got ${typeof limit}`);
        }
        if (limit < 1) {
            throw new Error("limit cannot be less than 1");
        }
        this.limit = limit;
    }
    /**
     * Acquires a lock from the semaphore, returns a Promise that resolves when the caller holds
     * a lock.
     */
    acquire() {
        if (this._used < this.limit) {
            this._used += 1;
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            this._queue.push(resolve);
        });
    }
    /**
     * Releases a lock back to the semaphore.
     */
    release() {
        if (this._queue.length) {
            const item = this._queue.shift();
            if (item) {
                item();
            }
        }
        else {
            this._used -= 1;
        }
    }
    /**
     * Aquires a lock from the semaphore and then execute the fn. If the fn returns a Promise,
     * wait for that promise to settle and then release the lock back to the semaphore.
     * @param fn - The function that needs to be executed in the ciritical region.
     * @returns A Promise that will settle with the return value of fn.
     */
    use(fn) {
        return this.acquire()
            .then(fn)
            .then((val) => {
            this.release();
            return val;
        })
            .catch((err) => {
            this.release();
            throw err;
        });
    }
    /**
     * Provides the number of locks currently held.
     */
    currentLockCount() {
        return this._used;
    }
    /**
     * Provides the number of tasks waiting to acquire a lock.
     */
    awaitedTaskCount() {
        return this._queue.length;
    }
}
//# sourceMappingURL=semaphore.js.map