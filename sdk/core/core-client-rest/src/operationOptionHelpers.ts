import { OperationOptions, RequestParameters } from "./common";

export function operationOptionsToRequestParameters(options: OperationOptions): RequestParameters {
  return {
    allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
    timeout: options.requestOptions?.timeout,
    skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
    abortSignal: options.abortSignal,
    onUploadProgress: options.requestOptions?.onUploadProgress,
    onDownloadProgress: options.requestOptions?.onDownloadProgress,
    tracingOptions: options.tracingOptions,
    headers: { ...options.requestOptions?.customHeaders },
    onResponse: options.onResponse,
  };
}
