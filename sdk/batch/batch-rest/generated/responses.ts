// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  BatchApplicationListResultOutput,
  BatchErrorOutput,
  BatchApplicationOutput,
  BatchPoolListUsageMetricsResultOutput,
  BatchPoolListResultOutput,
  BatchPoolOutput,
  AutoScaleRunOutput,
  BatchAccountListSupportedImagesResultOutput,
  BatchPoolNodeCountsListResultOutput,
  BatchJobOutput,
  BatchJobListResultOutput,
  BatchJobPreparationAndReleaseTaskStatusListResultOutput,
  BatchTaskCountsResultOutput,
  BatchJobScheduleOutput,
  BatchJobScheduleListResultOutput,
  BatchTaskListResultOutput,
  BatchTaskAddCollectionResultOutput,
  BatchTaskOutput,
  BatchTaskListSubtasksResultOutput,
  BatchNodeFileListResultOutput,
  BatchNodeOutput,
  BatchNodeRemoteLoginSettingsOutput,
  UploadBatchServiceLogsResultOutput,
  BatchNodeListResultOutput,
  BatchNodeVMExtensionOutput,
  BatchNodeVMExtensionListResultOutput,
} from "./outputModels.js";

export interface ListApplications200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListApplications200Response extends HttpResponse {
  status: "200";
  body: BatchApplicationListResultOutput;
  headers: RawHttpHeaders & ListApplications200Headers;
}

export interface ListApplicationsDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface GetApplication200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface GetApplication200Response extends HttpResponse {
  status: "200";
  body: BatchApplicationOutput;
  headers: RawHttpHeaders & GetApplication200Headers;
}

export interface GetApplicationDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ListPoolUsageMetrics200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListPoolUsageMetrics200Response extends HttpResponse {
  status: "200";
  body: BatchPoolListUsageMetricsResultOutput;
  headers: RawHttpHeaders & ListPoolUsageMetrics200Headers;
}

export interface ListPoolUsageMetricsDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface CreatePool201Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreatePool201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & CreatePool201Headers;
}

export interface CreatePoolDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ListPools200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListPools200Response extends HttpResponse {
  status: "200";
  body: BatchPoolListResultOutput;
  headers: RawHttpHeaders & ListPools200Headers;
}

export interface ListPoolsDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface DeletePool202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DeletePool202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeletePool202Headers;
}

export interface DeletePoolDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface PoolExists200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface PoolExists200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & PoolExists200Headers;
}

/** The server cannot find the requested resource. */
export interface PoolExists404Response extends HttpResponse {
  status: "404";
}

export interface PoolExistsDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface GetPool200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface GetPool200Response extends HttpResponse {
  status: "200";
  body: BatchPoolOutput;
  headers: RawHttpHeaders & GetPool200Headers;
}

export interface GetPoolDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface UpdatePool200Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface UpdatePool200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & UpdatePool200Headers;
}

export interface UpdatePoolDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface DisablePoolAutoScale200Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface DisablePoolAutoScale200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & DisablePoolAutoScale200Headers;
}

export interface DisablePoolAutoScaleDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface EnablePoolAutoScale200Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface EnablePoolAutoScale200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & EnablePoolAutoScale200Headers;
}

export interface EnablePoolAutoScaleDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface EvaluatePoolAutoScale200Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface EvaluatePoolAutoScale200Response extends HttpResponse {
  status: "200";
  body: AutoScaleRunOutput;
  headers: RawHttpHeaders & EvaluatePoolAutoScale200Headers;
}

export interface EvaluatePoolAutoScaleDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ResizePool202Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ResizePool202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ResizePool202Headers;
}

export interface ResizePoolDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface StopPoolResize202Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface StopPoolResize202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & StopPoolResize202Headers;
}

export interface StopPoolResizeDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ReplacePoolProperties204Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface ReplacePoolProperties204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & ReplacePoolProperties204Headers;
}

export interface ReplacePoolPropertiesDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface RemoveNodes202Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface RemoveNodes202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & RemoveNodes202Headers;
}

export interface RemoveNodesDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ListSupportedImages200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListSupportedImages200Response extends HttpResponse {
  status: "200";
  body: BatchAccountListSupportedImagesResultOutput;
  headers: RawHttpHeaders & ListSupportedImages200Headers;
}

export interface ListSupportedImagesDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ListPoolNodeCounts200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListPoolNodeCounts200Response extends HttpResponse {
  status: "200";
  body: BatchPoolNodeCountsListResultOutput;
  headers: RawHttpHeaders & ListPoolNodeCounts200Headers;
}

export interface ListPoolNodeCountsDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface DeleteJob202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DeleteJob202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeleteJob202Headers;
}

export interface DeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface GetJob200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface GetJob200Response extends HttpResponse {
  status: "200";
  body: BatchJobOutput;
  headers: RawHttpHeaders & GetJob200Headers;
}

export interface GetJobDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface UpdateJob200Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface UpdateJob200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & UpdateJob200Headers;
}

export interface UpdateJobDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ReplaceJob200Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ReplaceJob200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & ReplaceJob200Headers;
}

export interface ReplaceJobDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface DisableJob202Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DisableJob202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DisableJob202Headers;
}

export interface DisableJobDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface EnableJob202Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface EnableJob202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & EnableJob202Headers;
}

export interface EnableJobDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface TerminateJob202Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface TerminateJob202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & TerminateJob202Headers;
}

export interface TerminateJobDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface CreateJob201Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateJob201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & CreateJob201Headers;
}

export interface CreateJobDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ListJobs200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListJobs200Response extends HttpResponse {
  status: "200";
  body: BatchJobListResultOutput;
  headers: RawHttpHeaders & ListJobs200Headers;
}

export interface ListJobsDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ListJobsFromSchedule200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListJobsFromSchedule200Response extends HttpResponse {
  status: "200";
  body: BatchJobListResultOutput;
  headers: RawHttpHeaders & ListJobsFromSchedule200Headers;
}

export interface ListJobsFromScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ListJobPreparationAndReleaseTaskStatus200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListJobPreparationAndReleaseTaskStatus200Response
  extends HttpResponse {
  status: "200";
  body: BatchJobPreparationAndReleaseTaskStatusListResultOutput;
  headers: RawHttpHeaders & ListJobPreparationAndReleaseTaskStatus200Headers;
}

export interface ListJobPreparationAndReleaseTaskStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface GetJobTaskCounts200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface GetJobTaskCounts200Response extends HttpResponse {
  status: "200";
  body: BatchTaskCountsResultOutput;
  headers: RawHttpHeaders & GetJobTaskCounts200Headers;
}

export interface GetJobTaskCountsDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface JobScheduleExists200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
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

export interface JobScheduleExistsDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface DeleteJobSchedule202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DeleteJobSchedule202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeleteJobSchedule202Headers;
}

export interface DeleteJobScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface GetJobSchedule200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface GetJobSchedule200Response extends HttpResponse {
  status: "200";
  body: BatchJobScheduleOutput;
  headers: RawHttpHeaders & GetJobSchedule200Headers;
}

export interface GetJobScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface UpdateJobSchedule200Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface UpdateJobSchedule200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & UpdateJobSchedule200Headers;
}

export interface UpdateJobScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ReplaceJobSchedule200Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ReplaceJobSchedule200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & ReplaceJobSchedule200Headers;
}

export interface ReplaceJobScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface DisableJobSchedule204Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DisableJobSchedule204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & DisableJobSchedule204Headers;
}

export interface DisableJobScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface EnableJobSchedule204Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface EnableJobSchedule204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & EnableJobSchedule204Headers;
}

export interface EnableJobScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface TerminateJobSchedule202Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface TerminateJobSchedule202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & TerminateJobSchedule202Headers;
}

export interface TerminateJobScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface CreateJobSchedule201Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateJobSchedule201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & CreateJobSchedule201Headers;
}

export interface CreateJobScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ListJobSchedules200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListJobSchedules200Response extends HttpResponse {
  status: "200";
  body: BatchJobScheduleListResultOutput;
  headers: RawHttpHeaders & ListJobSchedules200Headers;
}

export interface ListJobSchedulesDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface CreateTask201Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateTask201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & CreateTask201Headers;
}

export interface CreateTaskDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ListTasks200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListTasks200Response extends HttpResponse {
  status: "200";
  body: BatchTaskListResultOutput;
  headers: RawHttpHeaders & ListTasks200Headers;
}

export interface ListTasksDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface CreateTaskCollection200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface CreateTaskCollection200Response extends HttpResponse {
  status: "200";
  body: BatchTaskAddCollectionResultOutput;
  headers: RawHttpHeaders & CreateTaskCollection200Headers;
}

export interface CreateTaskCollectionDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface DeleteTask200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface DeleteTask200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & DeleteTask200Headers;
}

export interface DeleteTaskDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface GetTask200Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface GetTask200Response extends HttpResponse {
  status: "200";
  body: BatchTaskOutput;
  headers: RawHttpHeaders & GetTask200Headers;
}

export interface GetTaskDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ReplaceTask200Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ReplaceTask200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & ReplaceTask200Headers;
}

export interface ReplaceTaskDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ListSubTasks200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListSubTasks200Response extends HttpResponse {
  status: "200";
  body: BatchTaskListSubtasksResultOutput;
  headers: RawHttpHeaders & ListSubTasks200Headers;
}

export interface ListSubTasksDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface TerminateTask204Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface TerminateTask204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & TerminateTask204Headers;
}

export interface TerminateTaskDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ReactivateTask204Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface ReactivateTask204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & ReactivateTask204Headers;
}

export interface ReactivateTaskDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface DeleteTaskFile200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface DeleteTaskFile200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & DeleteTaskFile200Headers;
}

export interface DeleteTaskFileDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface GetTaskFile200Headers {
  /** The length of the file. */
  "content-length": string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** Whether the object represents a directory. */
  "ocp-batch-file-isdirectory": boolean;
  /** The file mode attribute in octal format. */
  "ocp-batch-file-mode": string;
  /** The URL of the file. */
  "ocp-batch-file-url": string;
  /** The file creation time. */
  "ocp-creation-time"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** Type of content */
  "content-type": "application/octet-stream";
}

/** The request has succeeded. */
export interface GetTaskFile200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetTaskFile200Headers;
}

export interface GetTaskFileDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface GetTaskFileProperties200Headers {
  /** The length of the file. */
  "content-length": string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** Whether the object represents a directory. */
  "ocp-batch-file-isdirectory": boolean;
  /** The file mode attribute in octal format. */
  "ocp-batch-file-mode": string;
  /** The URL of the file. */
  "ocp-batch-file-url": string;
  /** The file creation time. */
  "ocp-creation-time"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface GetTaskFileProperties200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & GetTaskFileProperties200Headers;
}

export interface GetTaskFilePropertiesDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ListTaskFiles200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListTaskFiles200Response extends HttpResponse {
  status: "200";
  body: BatchNodeFileListResultOutput;
  headers: RawHttpHeaders & ListTaskFiles200Headers;
}

export interface ListTaskFilesDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface CreateNodeUser201Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateNodeUser201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & CreateNodeUser201Headers;
}

export interface CreateNodeUserDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface DeleteNodeUser200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface DeleteNodeUser200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & DeleteNodeUser200Headers;
}

export interface DeleteNodeUserDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ReplaceNodeUser200Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ReplaceNodeUser200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & ReplaceNodeUser200Headers;
}

export interface ReplaceNodeUserDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface GetNode200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface GetNode200Response extends HttpResponse {
  status: "200";
  body: BatchNodeOutput;
  headers: RawHttpHeaders & GetNode200Headers;
}

export interface GetNodeDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface RebootNode202Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface RebootNode202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & RebootNode202Headers;
}

export interface RebootNodeDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface StartNode202Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface StartNode202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & StartNode202Headers;
}

export interface StartNodeDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface DeallocateNode202Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface DeallocateNode202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeallocateNode202Headers;
}

export interface DeallocateNodeDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ReimageNode202Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ReimageNode202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ReimageNode202Headers;
}

export interface ReimageNodeDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface DisableNodeScheduling200Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface DisableNodeScheduling200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & DisableNodeScheduling200Headers;
}

export interface DisableNodeSchedulingDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface EnableNodeScheduling200Headers {
  /** The OData ID of the resource to which the request applied. */
  dataserviceid: string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface EnableNodeScheduling200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & EnableNodeScheduling200Headers;
}

export interface EnableNodeSchedulingDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface GetNodeRemoteLoginSettings200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface GetNodeRemoteLoginSettings200Response extends HttpResponse {
  status: "200";
  body: BatchNodeRemoteLoginSettingsOutput;
  headers: RawHttpHeaders & GetNodeRemoteLoginSettings200Headers;
}

export interface GetNodeRemoteLoginSettingsDefaultResponse
  extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface UploadNodeLogs200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface UploadNodeLogs200Response extends HttpResponse {
  status: "200";
  body: UploadBatchServiceLogsResultOutput;
  headers: RawHttpHeaders & UploadNodeLogs200Headers;
}

export interface UploadNodeLogsDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ListNodes200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListNodes200Response extends HttpResponse {
  status: "200";
  body: BatchNodeListResultOutput;
  headers: RawHttpHeaders & ListNodes200Headers;
}

export interface ListNodesDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface GetNodeExtension200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface GetNodeExtension200Response extends HttpResponse {
  status: "200";
  body: BatchNodeVMExtensionOutput;
  headers: RawHttpHeaders & GetNodeExtension200Headers;
}

export interface GetNodeExtensionDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ListNodeExtensions200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListNodeExtensions200Response extends HttpResponse {
  status: "200";
  body: BatchNodeVMExtensionListResultOutput;
  headers: RawHttpHeaders & ListNodeExtensions200Headers;
}

export interface ListNodeExtensionsDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface DeleteNodeFile200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface DeleteNodeFile200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & DeleteNodeFile200Headers;
}

export interface DeleteNodeFileDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface GetNodeFile200Headers {
  /** The length of the file. */
  "content-length": string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** Whether the object represents a directory. */
  "ocp-batch-file-isdirectory": boolean;
  /** The file mode attribute in octal format. */
  "ocp-batch-file-mode": string;
  /** The URL of the file. */
  "ocp-batch-file-url": string;
  /** The file creation time. */
  "ocp-creation-time"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
  /** Type of content */
  "content-type": "application/octet-stream";
}

/** The request has succeeded. */
export interface GetNodeFile200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetNodeFile200Headers;
}

export interface GetNodeFileDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface GetNodeFileProperties200Headers {
  /** The length of the file. */
  "content-length": string;
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** Whether the object represents a directory. */
  "ocp-batch-file-isdirectory": boolean;
  /** The file mode attribute in octal format. */
  "ocp-batch-file-mode": string;
  /** The URL of the file. */
  "ocp-batch-file-url": string;
  /** The file creation time. */
  "ocp-creation-time"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface GetNodeFileProperties200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & GetNodeFileProperties200Headers;
}

export interface GetNodeFilePropertiesDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}

export interface ListNodeFiles200Headers {
  /** The ETag HTTP response header. This is an opaque string. You can use it to detect whether the resource has changed between requests. In particular, you can pass the ETag to one of the If-Modified-Since, If-Unmodified-Since, If-Match or If-None-Match headers. */
  etag?: string;
  /** The time at which the resource was last modified. */
  "last-modified"?: string;
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface ListNodeFiles200Response extends HttpResponse {
  status: "200";
  body: BatchNodeFileListResultOutput;
  headers: RawHttpHeaders & ListNodeFiles200Headers;
}

export interface ListNodeFilesDefaultResponse extends HttpResponse {
  status: string;
  body: BatchErrorOutput;
}
