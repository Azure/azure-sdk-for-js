import type { EncryptionKeyStoreProvider } from "./EncryptionKeyStoreProvider.js";
/**
 * A wrapper class containing the info about the key-protecting key stored in an external key provider
 * and provides interface to wrap and unwrap the key.
 */
export declare class KeyEncryptionKey {
    private encryptionAlgorithm;
    name: string;
    path: string;
    keyStoreProvider: EncryptionKeyStoreProvider;
    constructor(name: string, path: string, keyStoreProvider: EncryptionKeyStoreProvider);
    wrapEncryptionKey(plainTextEncryptionKey: Buffer): Promise<Buffer>;
    unwrapEncryptionKey(wrappedEncryptionKey: Buffer): Promise<Buffer>;
}
//# sourceMappingURL=KeyEncryptionKey.d.ts.map