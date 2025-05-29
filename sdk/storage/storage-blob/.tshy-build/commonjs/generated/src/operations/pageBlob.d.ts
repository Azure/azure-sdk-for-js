import { PageBlob } from "../operationsInterfaces/index.js";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import { StorageClient } from "../storageClient.js";
import { PageBlobCreateOptionalParams, PageBlobCreateResponse, PageBlobUploadPagesOptionalParams, PageBlobUploadPagesResponse, PageBlobClearPagesOptionalParams, PageBlobClearPagesResponse, PageBlobUploadPagesFromURLOptionalParams, PageBlobUploadPagesFromURLResponse, PageBlobGetPageRangesOptionalParams, PageBlobGetPageRangesResponse, PageBlobGetPageRangesDiffOptionalParams, PageBlobGetPageRangesDiffResponse, PageBlobResizeOptionalParams, PageBlobResizeResponse, SequenceNumberActionType, PageBlobUpdateSequenceNumberOptionalParams, PageBlobUpdateSequenceNumberResponse, PageBlobCopyIncrementalOptionalParams, PageBlobCopyIncrementalResponse } from "../models/index.js";
/** Class containing PageBlob operations. */
export declare class PageBlobImpl implements PageBlob {
    private readonly client;
    /**
     * Initialize a new instance of the class PageBlob class.
     * @param client Reference to the service client
     */
    constructor(client: StorageClient);
    /**
     * The Create operation creates a new page blob.
     * @param contentLength The length of the request.
     * @param blobContentLength This header specifies the maximum size for the page blob, up to 1 TB. The
     *                          page blob size must be aligned to a 512-byte boundary.
     * @param options The options parameters.
     */
    create(contentLength: number, blobContentLength: number, options?: PageBlobCreateOptionalParams): Promise<PageBlobCreateResponse>;
    /**
     * The Upload Pages operation writes a range of pages to a page blob
     * @param contentLength The length of the request.
     * @param body Initial data
     * @param options The options parameters.
     */
    uploadPages(contentLength: number, body: coreRestPipeline.RequestBodyType, options?: PageBlobUploadPagesOptionalParams): Promise<PageBlobUploadPagesResponse>;
    /**
     * The Clear Pages operation clears a set of pages from a page blob
     * @param contentLength The length of the request.
     * @param options The options parameters.
     */
    clearPages(contentLength: number, options?: PageBlobClearPagesOptionalParams): Promise<PageBlobClearPagesResponse>;
    /**
     * The Upload Pages operation writes a range of pages to a page blob where the contents are read from a
     * URL
     * @param sourceUrl Specify a URL to the copy source.
     * @param sourceRange Bytes of source data in the specified range. The length of this range should
     *                    match the ContentLength header and x-ms-range/Range destination range header.
     * @param contentLength The length of the request.
     * @param range The range of bytes to which the source range would be written. The range should be 512
     *              aligned and range-end is required.
     * @param options The options parameters.
     */
    uploadPagesFromURL(sourceUrl: string, sourceRange: string, contentLength: number, range: string, options?: PageBlobUploadPagesFromURLOptionalParams): Promise<PageBlobUploadPagesFromURLResponse>;
    /**
     * The Get Page Ranges operation returns the list of valid page ranges for a page blob or snapshot of a
     * page blob
     * @param options The options parameters.
     */
    getPageRanges(options?: PageBlobGetPageRangesOptionalParams): Promise<PageBlobGetPageRangesResponse>;
    /**
     * The Get Page Ranges Diff operation returns the list of valid page ranges for a page blob that were
     * changed between target blob and previous snapshot.
     * @param options The options parameters.
     */
    getPageRangesDiff(options?: PageBlobGetPageRangesDiffOptionalParams): Promise<PageBlobGetPageRangesDiffResponse>;
    /**
     * Resize the Blob
     * @param blobContentLength This header specifies the maximum size for the page blob, up to 1 TB. The
     *                          page blob size must be aligned to a 512-byte boundary.
     * @param options The options parameters.
     */
    resize(blobContentLength: number, options?: PageBlobResizeOptionalParams): Promise<PageBlobResizeResponse>;
    /**
     * Update the sequence number of the blob
     * @param sequenceNumberAction Required if the x-ms-blob-sequence-number header is set for the request.
     *                             This property applies to page blobs only. This property indicates how the service should modify the
     *                             blob's sequence number
     * @param options The options parameters.
     */
    updateSequenceNumber(sequenceNumberAction: SequenceNumberActionType, options?: PageBlobUpdateSequenceNumberOptionalParams): Promise<PageBlobUpdateSequenceNumberResponse>;
    /**
     * The Copy Incremental operation copies a snapshot of the source page blob to a destination page blob.
     * The snapshot is copied such that only the differential changes between the previously copied
     * snapshot are transferred to the destination. The copied snapshots are complete copies of the
     * original snapshot and can be read or copied from as usual. This API is supported since REST version
     * 2016-05-31.
     * @param copySource Specifies the name of the source page blob snapshot. This value is a URL of up to
     *                   2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it would
     *                   appear in a request URI. The source blob must either be public or must be authenticated via a shared
     *                   access signature.
     * @param options The options parameters.
     */
    copyIncremental(copySource: string, options?: PageBlobCopyIncrementalOptionalParams): Promise<PageBlobCopyIncrementalResponse>;
}
//# sourceMappingURL=pageBlob.d.ts.map