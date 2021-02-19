// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
export interface PageBlobGetPageRangesResponse extends PageList, PageBlobGetPageRangesHeaders {}

/**
 * Contains response data for the {@link BlobClient.getPageRangesDiff} operation.
 */
export interface PageBlobGetPageRangesDiffResponse
  extends PageList,
    PageBlobGetPageRangesDiffHeaders {}

/**
 * Function that converts PageRange and ClearRange to a common Range object.
 * PageRange and ClearRange have start and end while Range offset and count
 * this function normalizes to Range.
 * @param response - Model PageBlob Range response
 */
export function rangeResponseFromModel(
  response: PageBlobGetPageRangesResponseModel | PageBlobGetPageRangesDiffResponseModel
): PageBlobGetPageRangesResponse | PageBlobGetPageRangesDiffResponse {
  const pageRange = (response.pageRange || []).map((x) => ({
    offset: x.start,
    count: x.end - x.start
  }));

  const clearRange = (response.clearRange || []).map((x) => ({
    offset: x.start,
    count: x.end - x.start
  }));

  return {
    ...response,
    pageRange,
    clearRange
  };
}
