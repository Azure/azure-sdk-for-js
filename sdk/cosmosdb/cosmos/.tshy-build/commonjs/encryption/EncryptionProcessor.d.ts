import type { EncryptionSettings } from "./EncryptionSettings.js";
import type { Database, ItemDefinition } from "../client/index.js";
import type { PartitionKeyInternal } from "../documents/index.js";
import type { TypeMarker } from "./enums/TypeMarker.js";
import type { ClientContext } from "../ClientContext.js";
import type { EncryptionManager } from "./EncryptionManager.js";
import type { JSONValue } from "../queryExecutionContext/index.js";
export declare class EncryptionProcessor {
    private readonly containerId;
    containerRid: string;
    private readonly database;
    private readonly clientContext;
    private encryptionManager;
    constructor(containerId: string, containerRid: string, database: Database, clientContext: ClientContext, encryptionManager: EncryptionManager);
    encrypt<T extends ItemDefinition>(body: T): Promise<{
        body: T;
        propertiesEncryptedCount: number;
    }>;
    isPathEncrypted(path: string): Promise<boolean>;
    encryptProperty(path: string, value: JSONValue): Promise<any>;
    getEncryptedPartitionKeyValue(partitionKeyList: PartitionKeyInternal): Promise<{
        partitionKeyList: PartitionKeyInternal;
        encryptedCount: number;
    }>;
    getEncryptedUrl(id: string): Promise<string>;
    getEncryptedId(id: string): Promise<string>;
    encryptQueryParameter(path: string, value: JSONValue, isValueId: boolean, type?: TypeMarker): Promise<JSONValue>;
    private encryptToken;
    private serializeAndEncryptValue;
    decrypt<T extends ItemDefinition>(body: T): Promise<{
        body: T;
        propertiesDecryptedCount: number;
    }>;
    private decryptToken;
    private deserializeAndDecryptValue;
    getEncryptionSetting(forceRefresh?: boolean): Promise<EncryptionSettings>;
    private buildEncryptionAlgorithm;
    private fetchClientEncryptionKey;
}
//# sourceMappingURL=EncryptionProcessor.d.ts.map