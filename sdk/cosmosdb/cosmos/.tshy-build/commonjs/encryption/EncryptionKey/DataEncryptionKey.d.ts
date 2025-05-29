export declare abstract class DataEncryptionKey {
    private rootKeyBuffer;
    private keySizeInBits;
    private keySizeInBytes;
    encryptionKeyBuffer: Buffer;
    macKeyBuffer: Buffer;
    ivKeyBuffer: Buffer;
    name: string;
    constructor(rootKey: Buffer, name: string);
    private getHmacWithSha256;
}
//# sourceMappingURL=DataEncryptionKey.d.ts.map