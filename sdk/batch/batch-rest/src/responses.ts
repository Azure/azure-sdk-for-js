// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  ApplicationListResultOutput,
  ApplicationOutput,
  PoolUsageMetricsListOutput,
  PoolStatisticsOutput,
  BatchPoolListResultOutput,
  BatchPoolOutput,
  AutoScaleRunOutput,
  AccountListSupportedImagesResultOutput,
  PoolNodeCountsListResultOutput,
  JobStatisticsOutput,
  BatchJobOutput,
  BatchJobListResultOutput,
  BatchJobListPreparationAndReleaseTaskStatusResultOutput,
  TaskCountsResultOutput,
  CertificateListResultOutput,
  CertificateOutput,
  NodeFileListResultOutput,
  BatchJobScheduleOutput,
  BatchJobScheduleListResultOutput,
  BatchTaskListResultOutput,
  TaskAddCollectionResultOutput,
  BatchTaskOutput,
  BatchTaskListSubtasksResultOutput,
  ComputeNodeOutput,
  ComputeNodeGetRemoteLoginSettingsResultOutput,
  UploadBatchServiceLogsResultOutput,
  ComputeNodeListResultOutput,
  NodeVMExtensionOutput,
  NodeVMExtensionListOutput,
} from "./outputModels";

export interface ApplicationsList200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface ApplicationsList200Response extends HttpResponse {
  status: "200";
  body: ApplicationListResultOutput;
  headers: RawHttpHeaders & ApplicationsList200Headers;
}

export interface ApplicationsListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ApplicationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ApplicationsListDefaultHeaders;
}

/** The request has succeeded. */
export interface ApplicationsGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationOutput;
}

export interface ApplicationsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ApplicationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ApplicationsGetDefaultHeaders;
}

/** The request has succeeded. */
export interface PoolListUsageMetrics200Response extends HttpResponse {
  status: "200";
  body: PoolUsageMetricsListOutput;
}

export interface PoolListUsageMetricsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolListUsageMetricsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolListUsageMetricsDefaultHeaders;
}

export interface PoolGetAllLifetimeStatistics200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface PoolGetAllLifetimeStatistics200Response extends HttpResponse {
  status: "200";
  body: PoolStatisticsOutput;
  headers: RawHttpHeaders & PoolGetAllLifetimeStatistics200Headers;
}

export interface PoolGetAllLifetimeStatisticsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolGetAllLifetimeStatisticsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolGetAllLifetimeStatisticsDefaultHeaders;
}

export interface PoolAdd201Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface PoolAdd201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & PoolAdd201Headers;
}

export interface PoolAddDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolAddDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolAddDefaultHeaders;
}

export interface PoolList200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface PoolList200Response extends HttpResponse {
  status: "200";
  body: BatchPoolListResultOutput;
  headers: RawHttpHeaders & PoolList200Headers;
}

export interface PoolListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolListDefaultHeaders;
}

export interface PoolDelete202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The parameters for a widget status request */
export interface PoolDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & PoolDelete202Headers;
}

export interface PoolDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolDeleteDefaultHeaders;
}

export interface PoolExists200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** A response containing headers related to the Pool, if it exists. */
export interface PoolExists200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & PoolExists200Headers;
}

/** The Pool does not exist. */
export interface PoolExists404Response extends HttpResponse {
  status: "404";
}

export interface PoolExistsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolExistsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolExistsDefaultHeaders;
}

export interface PoolGet200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface PoolGet200Response extends HttpResponse {
  status: "200";
  body: BatchPoolOutput;
  headers: RawHttpHeaders & PoolGet200Headers;
}

export interface PoolGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolGetDefaultHeaders;
}

export interface PoolPatch200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied */
  dataserviceid: string;
}

/** The request has succeeded. */
export interface PoolPatch200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & PoolPatch200Headers;
}

export interface PoolPatchDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolPatchDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolPatchDefaultHeaders;
}

export interface PoolDisableAutoScale200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied */
  dataserviceid: string;
}

/** The request has succeeded. */
export interface PoolDisableAutoScale200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & PoolDisableAutoScale200Headers;
}

export interface PoolDisableAutoScaleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolDisableAutoScaleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolDisableAutoScaleDefaultHeaders;
}

export interface PoolEnableAutoScale200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied */
  dataserviceid: string;
}

/** The request has succeeded. */
export interface PoolEnableAutoScale200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & PoolEnableAutoScale200Headers;
}

export interface PoolEnableAutoScaleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolEnableAutoScaleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolEnableAutoScaleDefaultHeaders;
}

export interface PoolEvaluateAutoScale200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied */
  dataserviceid: string;
}

/** The request has succeeded. */
export interface PoolEvaluateAutoScale200Response extends HttpResponse {
  status: "200";
  body: AutoScaleRunOutput;
  headers: RawHttpHeaders & PoolEvaluateAutoScale200Headers;
}

export interface PoolEvaluateAutoScaleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolEvaluateAutoScaleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolEvaluateAutoScaleDefaultHeaders;
}

export interface PoolResize202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied */
  dataserviceid: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface PoolResize202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & PoolResize202Headers;
}

export interface PoolResizeDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolResizeDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolResizeDefaultHeaders;
}

export interface PoolStopResize202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied */
  dataserviceid: string;
}

/** The request to the Batch service was successful. */
export interface PoolStopResize202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & PoolStopResize202Headers;
}

export interface PoolStopResizeDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolStopResizeDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolStopResizeDefaultHeaders;
}

export interface PoolUpdateProperties204Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied */
  dataserviceid: string;
}

/** The request to the Batch service was successful. */
export interface PoolUpdateProperties204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & PoolUpdateProperties204Headers;
}

export interface PoolUpdatePropertiesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolUpdatePropertiesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolUpdatePropertiesDefaultHeaders;
}

export interface PoolRemoveNodes202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied */
  dataserviceid: string;
}

/** The request to the Batch service was successful. */
export interface PoolRemoveNodes202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & PoolRemoveNodes202Headers;
}

export interface PoolRemoveNodesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PoolRemoveNodesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PoolRemoveNodesDefaultHeaders;
}

export interface AccountListSupportedImages200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface AccountListSupportedImages200Response extends HttpResponse {
  status: "200";
  body: AccountListSupportedImagesResultOutput;
  headers: RawHttpHeaders & AccountListSupportedImages200Headers;
}

export interface AccountListSupportedImagesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AccountListSupportedImagesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AccountListSupportedImagesDefaultHeaders;
}

export interface AccountListPoolNodeCounts200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface AccountListPoolNodeCounts200Response extends HttpResponse {
  status: "200";
  body: PoolNodeCountsListResultOutput;
  headers: RawHttpHeaders & AccountListPoolNodeCounts200Headers;
}

export interface AccountListPoolNodeCountsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AccountListPoolNodeCountsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AccountListPoolNodeCountsDefaultHeaders;
}

export interface JobGetAllLifetimeStatistics200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface JobGetAllLifetimeStatistics200Response extends HttpResponse {
  status: "200";
  body: JobStatisticsOutput;
  headers: RawHttpHeaders & JobGetAllLifetimeStatistics200Headers;
}

export interface JobGetAllLifetimeStatisticsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobGetAllLifetimeStatisticsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobGetAllLifetimeStatisticsDefaultHeaders;
}

export interface JobDelete202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The parameters for a widget status request */
export interface JobDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & JobDelete202Headers;
}

export interface JobDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobDeleteDefaultHeaders;
}

export interface JobGet200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface JobGet200Response extends HttpResponse {
  status: "200";
  body: BatchJobOutput;
  headers: RawHttpHeaders & JobGet200Headers;
}

export interface JobGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobGetDefaultHeaders;
}

export interface JobPatch200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied */
  dataserviceid: string;
}

/** The request has succeeded. */
export interface JobPatch200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & JobPatch200Headers;
}

export interface JobPatchDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobPatchDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobPatchDefaultHeaders;
}

export interface JobUpdate200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied */
  dataserviceid: string;
}

/** The request has succeeded. */
export interface JobUpdate200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & JobUpdate200Headers;
}

export interface JobUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobUpdateDefaultHeaders;
}

export interface JobDisable202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied */
  dataserviceid: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface JobDisable202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & JobDisable202Headers;
}

export interface JobDisableDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobDisableDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobDisableDefaultHeaders;
}

export interface JobEnable202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied */
  dataserviceid: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface JobEnable202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & JobEnable202Headers;
}

export interface JobEnableDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobEnableDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobEnableDefaultHeaders;
}

export interface JobTerminate202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied */
  dataserviceid: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface JobTerminate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & JobTerminate202Headers;
}

export interface JobTerminateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobTerminateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobTerminateDefaultHeaders;
}

export interface JobAdd201Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied */
  dataserviceid: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface JobAdd201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & JobAdd201Headers;
}

export interface JobAddDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobAddDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobAddDefaultHeaders;
}

export interface JobList200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface JobList200Response extends HttpResponse {
  status: "200";
  body: BatchJobListResultOutput;
  headers: RawHttpHeaders & JobList200Headers;
}

export interface JobListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobListDefaultHeaders;
}

export interface JobListFromJobSchedule200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface JobListFromJobSchedule200Response extends HttpResponse {
  status: "200";
  body: BatchJobListResultOutput;
  headers: RawHttpHeaders & JobListFromJobSchedule200Headers;
}

export interface JobListFromJobScheduleDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobListFromJobScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobListFromJobScheduleDefaultHeaders;
}

export interface JobListPreparationAndReleaseTaskStatus200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface JobListPreparationAndReleaseTaskStatus200Response
  extends HttpResponse {
  status: "200";
  body: BatchJobListPreparationAndReleaseTaskStatusResultOutput;
  headers: RawHttpHeaders & JobListPreparationAndReleaseTaskStatus200Headers;
}

export interface JobListPreparationAndReleaseTaskStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobListPreparationAndReleaseTaskStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    JobListPreparationAndReleaseTaskStatusDefaultHeaders;
}

export interface JobGetTaskCounts200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface JobGetTaskCounts200Response extends HttpResponse {
  status: "200";
  body: TaskCountsResultOutput;
  headers: RawHttpHeaders & JobGetTaskCounts200Headers;
}

export interface JobGetTaskCountsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobGetTaskCountsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobGetTaskCountsDefaultHeaders;
}

export interface CertificatesAdd201Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CertificatesAdd201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & CertificatesAdd201Headers;
}

export interface CertificatesAddDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CertificatesAddDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CertificatesAddDefaultHeaders;
}

export interface CertificatesList200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface CertificatesList200Response extends HttpResponse {
  status: "200";
  body: CertificateListResultOutput;
  headers: RawHttpHeaders & CertificatesList200Headers;
}

export interface CertificatesListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CertificatesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CertificatesListDefaultHeaders;
}

export interface CertificatesCancelDeletion204Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface CertificatesCancelDeletion204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & CertificatesCancelDeletion204Headers;
}

export interface CertificatesCancelDeletionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CertificatesCancelDeletionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CertificatesCancelDeletionDefaultHeaders;
}

export interface CertificatesDelete202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface CertificatesDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & CertificatesDelete202Headers;
}

export interface CertificatesDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CertificatesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CertificatesDeleteDefaultHeaders;
}

export interface CertificatesGet200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface CertificatesGet200Response extends HttpResponse {
  status: "200";
  body: CertificateOutput;
  headers: RawHttpHeaders & CertificatesGet200Headers;
}

export interface CertificatesGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CertificatesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CertificatesGetDefaultHeaders;
}

export interface FileDeleteFromTask200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface FileDeleteFromTask200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & FileDeleteFromTask200Headers;
}

export interface FileDeleteFromTaskDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface FileDeleteFromTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & FileDeleteFromTaskDefaultHeaders;
}

export interface FileGetFromTask200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The file creation time. */
  "ocp-creation-time"?: string;
  /** Whether the object represents a directory. */
  "ocp-batch-file-isdirectory": boolean;
  /** The URL of the file. */
  "ocp-batch-file-url": string;
  /** The file mode attribute in octal format. */
  "ocp-batch-file-mode": string;
  /** The length of the file. */
  "content-length": number;
}

/** The request has succeeded. */
export interface FileGetFromTask200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & FileGetFromTask200Headers;
}

export interface FileGetFromTaskDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface FileGetFromTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & FileGetFromTaskDefaultHeaders;
}

export interface FileGetPropertiesFromTask200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The file creation time. */
  "ocp-creation-time"?: string;
  /** Whether the object represents a directory. */
  "ocp-batch-file-isdirectory": boolean;
  /** The URL of the file. */
  "ocp-batch-file-url": string;
  /** The file mode attribute in octal format. */
  "ocp-batch-file-mode": string;
  /** The length of the file. */
  "content-length": number;
}

/** The request has succeeded. */
export interface FileGetPropertiesFromTask200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & FileGetPropertiesFromTask200Headers;
}

export interface FileGetPropertiesFromTaskDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface FileGetPropertiesFromTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & FileGetPropertiesFromTaskDefaultHeaders;
}

export interface FileDeleteFromComputeNode200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface FileDeleteFromComputeNode200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & FileDeleteFromComputeNode200Headers;
}

export interface FileDeleteFromComputeNodeDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface FileDeleteFromComputeNodeDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & FileDeleteFromComputeNodeDefaultHeaders;
}

export interface FileGetFromComputeNode200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The file creation time. */
  "ocp-creation-time"?: string;
  /** Whether the object represents a directory. */
  "ocp-batch-file-isdirectory": boolean;
  /** The URL of the file. */
  "ocp-batch-file-url": string;
  /** The file mode attribute in octal format. */
  "ocp-batch-file-mode": string;
  /** The length of the file. */
  "content-length": number;
}

/** The request has succeeded. */
export interface FileGetFromComputeNode200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & FileGetFromComputeNode200Headers;
}

export interface FileGetFromComputeNodeDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface FileGetFromComputeNodeDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & FileGetFromComputeNodeDefaultHeaders;
}

export interface FileGetPropertiesFromComputeNode200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The file creation time. */
  "ocp-creation-time"?: string;
  /** Whether the object represents a directory. */
  "ocp-batch-file-isdirectory": boolean;
  /** The URL of the file. */
  "ocp-batch-file-url": string;
  /** The file mode attribute in octal format. */
  "ocp-batch-file-mode": string;
  /** The length of the file. */
  "content-length": number;
}

/** The request has succeeded. */
export interface FileGetPropertiesFromComputeNode200Response
  extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & FileGetPropertiesFromComputeNode200Headers;
}

export interface FileGetPropertiesFromComputeNodeDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface FileGetPropertiesFromComputeNodeDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & FileGetPropertiesFromComputeNodeDefaultHeaders;
}

export interface FileListFromTask200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface FileListFromTask200Response extends HttpResponse {
  status: "200";
  body: NodeFileListResultOutput;
  headers: RawHttpHeaders & FileListFromTask200Headers;
}

export interface FileListFromTaskDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface FileListFromTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & FileListFromTaskDefaultHeaders;
}

export interface FileListFromComputeNode200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface FileListFromComputeNode200Response extends HttpResponse {
  status: "200";
  body: NodeFileListResultOutput;
  headers: RawHttpHeaders & FileListFromComputeNode200Headers;
}

export interface FileListFromComputeNodeDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface FileListFromComputeNodeDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & FileListFromComputeNodeDefaultHeaders;
}

export interface JobScheduleExists200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface JobScheduleExists200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & JobScheduleExists200Headers;
}

/** The server cannot find the requested resource. */
export interface JobScheduleExists404Response extends HttpResponse {
  status: "404";
}

export interface JobScheduleExistsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobScheduleExistsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobScheduleExistsDefaultHeaders;
}

export interface JobScheduleDelete202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The parameters for a widget status request */
export interface JobScheduleDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & JobScheduleDelete202Headers;
}

export interface JobScheduleDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobScheduleDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobScheduleDeleteDefaultHeaders;
}

export interface JobScheduleGet200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface JobScheduleGet200Response extends HttpResponse {
  status: "200";
  body: BatchJobScheduleOutput;
  headers: RawHttpHeaders & JobScheduleGet200Headers;
}

export interface JobScheduleGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobScheduleGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobScheduleGetDefaultHeaders;
}

export interface JobSchedulePatch200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** The request has succeeded. */
export interface JobSchedulePatch200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & JobSchedulePatch200Headers;
}

export interface JobSchedulePatchDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobSchedulePatchDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobSchedulePatchDefaultHeaders;
}

export interface JobScheduleUpdate200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** The request has succeeded. */
export interface JobScheduleUpdate200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & JobScheduleUpdate200Headers;
}

export interface JobScheduleUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobScheduleUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobScheduleUpdateDefaultHeaders;
}

export interface JobScheduleDisable204Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface JobScheduleDisable204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & JobScheduleDisable204Headers;
}

export interface JobScheduleDisableDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobScheduleDisableDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobScheduleDisableDefaultHeaders;
}

export interface JobScheduleEnable204Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface JobScheduleEnable204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & JobScheduleEnable204Headers;
}

export interface JobScheduleEnableDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobScheduleEnableDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobScheduleEnableDefaultHeaders;
}

export interface JobScheduleTerminate202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface JobScheduleTerminate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & JobScheduleTerminate202Headers;
}

export interface JobScheduleTerminateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobScheduleTerminateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobScheduleTerminateDefaultHeaders;
}

export interface JobScheduleAdd201Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface JobScheduleAdd201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & JobScheduleAdd201Headers;
}

export interface JobScheduleAddDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobScheduleAddDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobScheduleAddDefaultHeaders;
}

export interface JobScheduleList200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface JobScheduleList200Response extends HttpResponse {
  status: "200";
  body: BatchJobScheduleListResultOutput;
  headers: RawHttpHeaders & JobScheduleList200Headers;
}

export interface JobScheduleListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface JobScheduleListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & JobScheduleListDefaultHeaders;
}

export interface TaskAdd201Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface TaskAdd201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & TaskAdd201Headers;
}

export interface TaskAddDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TaskAddDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TaskAddDefaultHeaders;
}

export interface TaskList200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface TaskList200Response extends HttpResponse {
  status: "200";
  body: BatchTaskListResultOutput;
  headers: RawHttpHeaders & TaskList200Headers;
}

export interface TaskListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TaskListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TaskListDefaultHeaders;
}

export interface TaskAddCollection200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface TaskAddCollection200Response extends HttpResponse {
  status: "200";
  body: TaskAddCollectionResultOutput;
  headers: RawHttpHeaders & TaskAddCollection200Headers;
}

export interface TaskAddCollectionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TaskAddCollectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TaskAddCollectionDefaultHeaders;
}

export interface TaskDelete200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface TaskDelete200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & TaskDelete200Headers;
}

export interface TaskDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TaskDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TaskDeleteDefaultHeaders;
}

export interface TaskGet200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** The request has succeeded. */
export interface TaskGet200Response extends HttpResponse {
  status: "200";
  body: BatchTaskOutput;
  headers: RawHttpHeaders & TaskGet200Headers;
}

export interface TaskGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TaskGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TaskGetDefaultHeaders;
}

export interface TaskUpdate200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** The request has succeeded. */
export interface TaskUpdate200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & TaskUpdate200Headers;
}

export interface TaskUpdateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TaskUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TaskUpdateDefaultHeaders;
}

export interface TaskListSubtasks200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface TaskListSubtasks200Response extends HttpResponse {
  status: "200";
  body: BatchTaskListSubtasksResultOutput;
  headers: RawHttpHeaders & TaskListSubtasks200Headers;
}

export interface TaskListSubtasksDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TaskListSubtasksDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TaskListSubtasksDefaultHeaders;
}

export interface TaskTerminate204Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface TaskTerminate204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & TaskTerminate204Headers;
}

export interface TaskTerminateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TaskTerminateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TaskTerminateDefaultHeaders;
}

export interface TaskReactivate204Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface TaskReactivate204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & TaskReactivate204Headers;
}

export interface TaskReactivateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TaskReactivateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TaskReactivateDefaultHeaders;
}

export interface ComputeNodesAddUser201Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface ComputeNodesAddUser201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & ComputeNodesAddUser201Headers;
}

export interface ComputeNodesAddUserDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ComputeNodesAddUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ComputeNodesAddUserDefaultHeaders;
}

export interface ComputeNodesDeleteUser200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ComputeNodesDeleteUser200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & ComputeNodesDeleteUser200Headers;
}

export interface ComputeNodesDeleteUserDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ComputeNodesDeleteUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ComputeNodesDeleteUserDefaultHeaders;
}

export interface ComputeNodesUpdateUser200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** The request has succeeded. */
export interface ComputeNodesUpdateUser200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & ComputeNodesUpdateUser200Headers;
}

export interface ComputeNodesUpdateUserDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ComputeNodesUpdateUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ComputeNodesUpdateUserDefaultHeaders;
}

export interface ComputeNodesGet200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface ComputeNodesGet200Response extends HttpResponse {
  status: "200";
  body: ComputeNodeOutput;
  headers: RawHttpHeaders & ComputeNodesGet200Headers;
}

export interface ComputeNodesGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ComputeNodesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ComputeNodesGetDefaultHeaders;
}

export interface ComputeNodesReboot202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ComputeNodesReboot202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ComputeNodesReboot202Headers;
}

export interface ComputeNodesRebootDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ComputeNodesRebootDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ComputeNodesRebootDefaultHeaders;
}

export interface ComputeNodesReimage202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ComputeNodesReimage202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ComputeNodesReimage202Headers;
}

export interface ComputeNodesReimageDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ComputeNodesReimageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ComputeNodesReimageDefaultHeaders;
}

export interface ComputeNodesDisableScheduling200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** The request has succeeded. */
export interface ComputeNodesDisableScheduling200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & ComputeNodesDisableScheduling200Headers;
}

export interface ComputeNodesDisableSchedulingDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ComputeNodesDisableSchedulingDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ComputeNodesDisableSchedulingDefaultHeaders;
}

export interface ComputeNodesEnableScheduling200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
}

/** The request has succeeded. */
export interface ComputeNodesEnableScheduling200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & ComputeNodesEnableScheduling200Headers;
}

export interface ComputeNodesEnableSchedulingDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ComputeNodesEnableSchedulingDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ComputeNodesEnableSchedulingDefaultHeaders;
}

export interface ComputeNodesGetRemoteLoginSettings200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface ComputeNodesGetRemoteLoginSettings200Response
  extends HttpResponse {
  status: "200";
  body: ComputeNodeGetRemoteLoginSettingsResultOutput;
  headers: RawHttpHeaders & ComputeNodesGetRemoteLoginSettings200Headers;
}

export interface ComputeNodesGetRemoteLoginSettingsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ComputeNodesGetRemoteLoginSettingsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ComputeNodesGetRemoteLoginSettingsDefaultHeaders;
}

export interface ComputeNodesGetRemoteDesktop200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface ComputeNodesGetRemoteDesktop200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & ComputeNodesGetRemoteDesktop200Headers;
}

export interface ComputeNodesGetRemoteDesktopDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ComputeNodesGetRemoteDesktopDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ComputeNodesGetRemoteDesktopDefaultHeaders;
}

export interface ComputeNodesUploadBatchServiceLogs200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ComputeNodesUploadBatchServiceLogs200Response
  extends HttpResponse {
  status: "200";
  body: UploadBatchServiceLogsResultOutput;
  headers: RawHttpHeaders & ComputeNodesUploadBatchServiceLogs200Headers;
}

export interface ComputeNodesUploadBatchServiceLogsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ComputeNodesUploadBatchServiceLogsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ComputeNodesUploadBatchServiceLogsDefaultHeaders;
}

export interface ComputeNodesList200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface ComputeNodesList200Response extends HttpResponse {
  status: "200";
  body: ComputeNodeListResultOutput;
  headers: RawHttpHeaders & ComputeNodesList200Headers;
}

export interface ComputeNodesListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ComputeNodesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ComputeNodesListDefaultHeaders;
}

export interface ComputeNodeExtensionsGet200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface ComputeNodeExtensionsGet200Response extends HttpResponse {
  status: "200";
  body: NodeVMExtensionOutput;
  headers: RawHttpHeaders & ComputeNodeExtensionsGet200Headers;
}

export interface ComputeNodeExtensionsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ComputeNodeExtensionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ComputeNodeExtensionsGetDefaultHeaders;
}

export interface ComputeNodeExtensionsList200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
}

/** The request has succeeded. */
export interface ComputeNodeExtensionsList200Response extends HttpResponse {
  status: "200";
  body: NodeVMExtensionListOutput;
  headers: RawHttpHeaders & ComputeNodeExtensionsList200Headers;
}

export interface ComputeNodeExtensionsListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ComputeNodeExtensionsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ComputeNodeExtensionsListDefaultHeaders;
}
