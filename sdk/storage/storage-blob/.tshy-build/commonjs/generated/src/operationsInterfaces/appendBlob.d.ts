import * as coreRestPipeline from "@azure/core-rest-pipeline";
import { AppendBlobCreateOptionalParams, AppendBlobCreateResponse, AppendBlobAppendBlockOptionalParams, AppendBlobAppendBlockResponse, AppendBlobAppendBlockFromUrlOptionalParams, AppendBlobAppendBlockFromUrlResponse, AppendBlobSealOptionalParams, AppendBlobSealResponse } from "../models/index.js";
/** Interface representing a AppendBlob. */
export interface AppendBlob {
    /**
     * The Create Append Blob operation creates a new append blob.
     * @param contentLength The length of the request.
     * @param options The options parameters.
     */
    create(contentLength: number, options?: AppendBlobCreateOptionalParams): Promise<AppendBlobCreateResponse>;
    /**
     * The Append Block operation commits a new block of data to the end of an existing append blob. The
     * Append Block operation is permitted only if the blob was created with x-ms-blob-type set to
     * AppendBlob. Append Block is supported only on version 2015-02-21 version or later.
     * @param contentLength The length of the request.
     * @param body Initial data
     * @param options The options parameters.
     */
    appendBlock(contentLength: number, body: coreRestPipeline.RequestBodyType, options?: AppendBlobAppendBlockOptionalParams): Promise<AppendBlobAppendBlockResponse>;
    /**
     * The Append Block operation commits a new block of data to the end of an existing append blob where
     * the contents are read from a source url. The Append Block operation is permitted only if the blob
     * was created with x-ms-blob-type set to AppendBlob. Append Block is supported only on version
     * 2015-02-21 version or later.
     * @param sourceUrl Specify a URL to the copy source.
     * @param contentLength The length of the request.
     * @param options The options parameters.
     */
    appendBlockFromUrl(sourceUrl: string, contentLength: number, options?: AppendBlobAppendBlockFromUrlOptionalParams): Promise<AppendBlobAppendBlockFromUrlResponse>;
    /**
     * The Seal operation seals the Append Blob to make it read-only. Seal is supported only on version
     * 2019-12-12 version or later.
     * @param options The options parameters.
     */
    seal(options?: AppendBlobSealOptionalParams): Promise<AppendBlobSealResponse>;
}
//# sourceMappingURL=appendBlob.d.ts.map