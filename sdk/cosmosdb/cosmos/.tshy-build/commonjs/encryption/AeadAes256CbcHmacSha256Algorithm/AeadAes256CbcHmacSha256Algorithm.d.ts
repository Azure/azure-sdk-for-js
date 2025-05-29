import { EncryptionType } from "../enums/index.js";
import { DataEncryptionKey } from "../EncryptionKey/index.js";
export declare class AeadAes256CbcHmacSha256Algorithm {
    private algoVersion;
    private blockSizeInBytes;
    private encryptionType;
    private dataEncryptionKey;
    private version;
    private versionSize;
    private keySizeInBytes;
    private minimumCipherTextLength;
    constructor(dataEncryptionKey: DataEncryptionKey, encryptionType: EncryptionType);
    encrypt(plainTextBuffer: Buffer): Buffer;
    decrypt(cipherTextBuffer: Buffer): Buffer;
    private generateAuthenticationTag;
    private validateAuthenticationTag;
}
//# sourceMappingURL=AeadAes256CbcHmacSha256Algorithm.d.ts.map