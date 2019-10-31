import { HttpResponse } from "@azure/core-http";
import {
  PageBlobGetPageRangesHeaders,
  PageBlobGetPageRangesDiffHeaders,
  PageBlobGetPageRangesResponse as PageBlobGetPageRangesResponseModel,
  PageBlobGetPageRangesDiffResponse as PageBlobGetPageRangesDiffResponseModel
} from "./generatedModels";
import { Range } from "./Range";

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
export interface PageBlobGetPageRangesResponse extends PageList, PageBlobGetPageRangesHeaders {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: PageBlobGetPageRangesHeaders;

    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: PageList;
  };
}

/**
 * Contains response data for the {@link BlobClient.getPageRangesDiff} operation.
 */
export interface PageBlobGetPageRangesDiffResponse
  extends PageList,
    PageBlobGetPageRangesDiffHeaders {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: PageBlobGetPageRangesDiffHeaders;

    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: PageList;
  };
}

/**
 * Function that converts PageRange and ClearRange to a common Range object.
 * PageRange and ClearRange have start and end while Range offset and count
 * this function normalizes to Range.
 * @param response Model PageBlob Range response
 */
export function rangeResponseFromModel(
  response: PageBlobGetPageRangesResponseModel | PageBlobGetPageRangesDiffResponseModel
): PageBlobGetPageRangesResponse | PageBlobGetPageRangesDiffResponse {
  const pageRange = (response._response.parsedBody.pageRange || []).map((x) => ({
    offset: x.start,
    count: x.end - x.start
  }));

  const clearRange = (response._response.parsedBody.clearRange || []).map((x) => ({
    offset: x.start,
    count: x.end - x.start
  }));

  return {
    ...response,
    pageRange,
    clearRange,
    _response: {
      ...response._response,
      parsedBody: {
        pageRange,
        clearRange
      }
    }
  };
}
