import type { BlobDetails, StorageSasUriOptionalParams, StorageSasUriResponse } from "../models/index.js";
/** Interface representing a Storage. */
export interface Storage {
    /**
     * Gets a URL with SAS token for a container/blob in the storage account associated with the workspace.
     * The SAS URL can be used to upload job input and/or download job output.
     * @param blobDetails The details (name and container) of the blob to store or download data.
     * @param options The options parameters.
     */
    sasUri(blobDetails: BlobDetails, options?: StorageSasUriOptionalParams): Promise<StorageSasUriResponse>;
}
//# sourceMappingURL=storage.d.ts.map