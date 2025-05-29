import type { Storage } from "../operationsInterfaces/index.js";
import type { QuantumJobClient } from "../quantumJobClient.js";
import type { BlobDetails, StorageSasUriOptionalParams, StorageSasUriResponse } from "../models/index.js";
/** Class containing Storage operations. */
export declare class StorageImpl implements Storage {
    private readonly client;
    /**
     * Initialize a new instance of the class Storage class.
     * @param client Reference to the service client
     */
    constructor(client: QuantumJobClient);
    /**
     * Gets a URL with SAS token for a container/blob in the storage account associated with the workspace.
     * The SAS URL can be used to upload job input and/or download job output.
     * @param blobDetails The details (name and container) of the blob to store or download data.
     * @param options The options parameters.
     */
    sasUri(blobDetails: BlobDetails, options?: StorageSasUriOptionalParams): Promise<StorageSasUriResponse>;
}
//# sourceMappingURL=storage.d.ts.map