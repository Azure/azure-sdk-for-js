import { OperationOptions } from "@azure/core-client";
import { RequestParameters } from "@azure-rest/core-client";

export function deserializeOperationOptions(options: OperationOptions): RequestParameters {
  return {
    allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
    skipUrlEncoding: options.requestOptions?.skipEncoding,
    timeout: options.requestOptions?.timeout,
    abortSignal: options.abortSignal,
    onUploadProgress: options.requestOptions?.onUploadProgress,
    onDownloadProgress: options.requestOptions?.onDownloadProgress,
    tracingOptions: options.tracingOptions,
    accept: options.requestOptions?.accept ?? "application/json",
    contentType: options.requestOptions?.contentType ?? "application/json",
    headers: { ...options.requestOptions?.customHeaders },
  };
}
