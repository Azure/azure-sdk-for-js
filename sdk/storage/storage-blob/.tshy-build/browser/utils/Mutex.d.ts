/**
 * An async mutex lock.
 */
export declare class Mutex {
    /**
     * Lock for a specific key. If the lock has been acquired by another customer, then
     * will wait until getting the lock.
     *
     * @param key - lock key
     */
    static lock(key: string): Promise<void>;
    /**
     * Unlock a key.
     *
     * @param key -
     */
    static unlock(key: string): Promise<void>;
    private static keys;
    private static listeners;
    private static onUnlockEvent;
    private static emitUnlockEvent;
}
//# sourceMappingURL=Mutex.d.ts.map