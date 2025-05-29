export declare class StorageUri {
    uri: string;
    createdAt: string;
    expiresAt: string;
    accessLevel: AccessLevel;
    constructor(uri: string, createdAt: string, expiresAt: string, accessLevel: AccessLevel);
}
export declare enum AccessLevel {
    Read = 0,
    Write = 1,
    ReadWrite = 2,
    ReadAddCreateWrite = 3
}
//# sourceMappingURL=storageUri.d.ts.map