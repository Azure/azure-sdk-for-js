import { DataEncryptionKey } from "./DataEncryptionKey.js";
import type { KeyEncryptionKey } from "../KeyEncryptionKey.js";
/**
 * A wrapper class around `DataEncryptionKey` that stores it in a protected form.
 * The `ProtectedDataEncryptionKey` class extends `DataEncryptionKey` and holds both the raw key and its encrypted form.
 * It also includes information about the `KeyEncryptionKey` used to encrypt the data encryption key.
 * @hidden
 */
export declare class ProtectedDataEncryptionKey extends DataEncryptionKey {
    keyEncryptionKey: KeyEncryptionKey;
    encryptedValue: Buffer;
    name: string;
    constructor(name: string, keyEncryptionKey: KeyEncryptionKey, rawKey: Buffer, encryptedKey: Buffer);
}
//# sourceMappingURL=ProtectedDataEncryptionKey.d.ts.map