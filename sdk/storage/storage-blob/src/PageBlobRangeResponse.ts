import { HttpResponse } from "@azure/core-http";
import * as Models from "./generated/src/models";
import { Range } from "./Range";

export interface PageList {
  pageRange?: Range[];
  clearRange?: Range[];
}

export interface PageBlobGetPageRangesResponse
  extends PageList,
    Models.PageBlobGetPageRangesHeaders {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: Models.PageBlobGetPageRangesHeaders;

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
 * Contains response data for the getPageRangesDiff operation.
 */
export interface PageBlobGetPageRangesDiffResponse
  extends PageList,
    Models.PageBlobGetPageRangesDiffHeaders {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: Models.PageBlobGetPageRangesDiffHeaders;

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
  response: Models.PageBlobGetPageRangesResponse | Models.PageBlobGetPageRangesDiffResponse
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
