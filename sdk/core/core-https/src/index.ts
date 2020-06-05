// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  HttpsClient,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  FormDataMap,
  FormDataValue,
  HttpHeaders,
  HttpMethods,
  ProxySettings,
  RawHttpHeaders,
  TransferProgressEvent,
  RequestBodyType
} from "./interfaces";
export {
  AddPolicyOptions as AddPipelineOptions,
  PipelinePhase,
  PipelinePolicy,
  Pipeline,
  createEmptyPipeline
} from "./pipeline";
export { DefaultHttpsClient } from "./defaultHttpsClient";
export { createHttpHeaders } from "./httpHeaders";
export { createPipelineRequest, PipelineRequestOptions } from "./pipelineRequest";
export { RestError, RestErrorOptions } from "./restError";
export {
  disableResponseDecompressionPolicy,
  disableResponseDecompressionPolicyName
} from "./policies/disableResponseDecompressionPolicy";
export {
  exponentialRetryPolicy,
  ExponentialRetryPolicyOptions,
  expontentialRetryPolicyName
} from "./policies/exponentialRetryPolicy";
export {
  setClientRequestIdPolicy,
  setClientRequestIdPolicyName
} from "./policies/setClientRequestIdPolicy";
export {
  keepAlivePolicy,
  keepAlivePolicyName,
  KeepAlivePolicyOptions
} from "./policies/keepAlivePolicy";
