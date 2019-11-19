import { BatchSubRequest } from "./BlobBatch";
import { HttpHeaders } from "@azure/core-http";

/**
 * The response data associated with a single request within a batch operation.
 */
export interface BatchSubResponse {
  /**
   * The status code of the sub operation.
   */
  status: number;

  /**
   * The status message of the sub opeartion.
   */
  statusMessage: string;

  /**
   * The error code of the sub opeartion, if the sub operation failed.
   */
  errorCode?: string;

  /**
   * The HTTP response headers.
   */
  headers: HttpHeaders;

  /**
   * The body as text.
   */
  bodyAsText?: string;

  /**
   * The batch sub request corresponding to the sub response.
   */
  _request: BatchSubRequest;
}

/**
 * The multipart/mixed response which contains the response for each subrequest.
 */
export interface ParsedBatchResponse {
  /**
   * The parsed sub responses.
   */
  subResponses: BatchSubResponse[];

  /**
   * The succeeded executed sub responses' count;
   */
  subResponsesSucceededCount: number;

  /**
   * The failed executed sub responses' count;
   */
  subResponsesFailedCount: number;
}
