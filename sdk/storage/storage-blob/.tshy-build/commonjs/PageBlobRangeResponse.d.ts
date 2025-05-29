import type { PageBlobGetPageRangesHeaders, PageBlobGetPageRangesDiffHeaders, PageBlobGetPageRangesResponseModel, PageBlobGetPageRangesDiffResponseModel } from "./generatedModels.js";
import type { Range } from "./Range.js";
import type { ResponseWithBody } from "./utils/utils.common.js";
/**
 * List of page ranges for a blob.
 */
export interface PageList {
    /**
     * Valid non-overlapping page ranges.
     */
    pageRange?: Range[];
    /**
     * Present if the prevSnapshot parameter was specified and there were cleared
     * pages between the previous snapshot and the target snapshot.
     */
    clearRange?: Range[];
}
/**
 * Contains response data for the {@link BlobClient.getPageRanges} operation.
 */
export interface PageBlobGetPageRangesResponse extends PageList, PageBlobGetPageRangesHeaders, ResponseWithBody<PageBlobGetPageRangesHeaders, PageList> {
}
/**
 * Contains response data for the {@link BlobClient.getPageRangesDiff} operation.
 */
export interface PageBlobGetPageRangesDiffResponse extends PageList, PageBlobGetPageRangesDiffHeaders, ResponseWithBody<PageBlobGetPageRangesDiffHeaders, PageList> {
}
/**
 * Function that converts PageRange and ClearRange to a common Range object.
 * PageRange and ClearRange have start and end while Range offset and count
 * this function normalizes to Range.
 * @param response - Model PageBlob Range response
 */
export declare function rangeResponseFromModel(response: PageBlobGetPageRangesResponseModel | PageBlobGetPageRangesDiffResponseModel): PageBlobGetPageRangesResponse | PageBlobGetPageRangesDiffResponse;
//# sourceMappingURL=PageBlobRangeResponse.d.ts.map