import { AbortSignalLike } from "@azure/abort-controller";
import { SpanOptions } from "@azure/core-tracing";
import { TransferProgressEvent, RequestOptionsBase } from "./webResource";

/**
 * The base options type for all operations.
 */
export interface OperationOptions {
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Options used when creating and sending HTTP requests for this operation.
   */
  requestOptions?: OperationRequestOptions;
  /**
   * Options used to create a span when tracing is enabled.
   */
  spanOptions?: SpanOptions;
}

export interface OperationRequestOptions {
  /**
   * @property {object} [customHeaders] User defined custom request headers that
   * will be applied before the request is sent.
   */
  customHeaders?: { [key: string]: string };

  /**
   * The number of milliseconds a request can take before automatically being terminated.
   */
  timeout?: number;

  /**
   * Callback which fires upon upload progress.
   */
  onUploadProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Callback which fires upon download progress.
   */
  onDownloadProgress?: (progress: TransferProgressEvent) => void;
}

/**
 * Converts an OperationOptions to a RequestOptionsBase
 *
 * @param opts OperationOptions object to convert to RequestOptionsBase
 */
export function operationOptionsToRequestOptionsBase(opts: OperationOptions): RequestOptionsBase {
  if (opts.requestOptions) {
    const newOpts = { ...opts, ...opts.requestOptions };
    delete newOpts.requestOptions;

    return newOpts;
  }

  return opts;
}
