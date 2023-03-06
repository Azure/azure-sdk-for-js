// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  ApplicationListResultOutput,
  ErrorResponseOutput,
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
} from "./outputModels.js";

export interface ApplicationsListApplications200Headers {
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
export interface ApplicationsListApplications200Response extends HttpResponse {
  status: "200";
  body: ApplicationListResultOutput;
  headers: RawHttpHeaders & ApplicationsListApplications200Headers;
}

export interface ApplicationsListApplicationsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface ApplicationsGetApplication200Response extends HttpResponse {
  status: "200";
  body: ApplicationOutput;
}

export interface ApplicationsGetApplicationDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The request has succeeded. */
export interface PoolListUsageMetrics200Response extends HttpResponse {
  status: "200";
  body: PoolUsageMetricsListOutput;
}

export interface PoolListUsageMetricsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface PoolGetAllPoolLifetimeStatistics200Headers {
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
export interface PoolGetAllPoolLifetimeStatistics200Response
  extends HttpResponse {
  status: "200";
  body: PoolStatisticsOutput;
  headers: RawHttpHeaders & PoolGetAllPoolLifetimeStatistics200Headers;
}

export interface PoolGetAllPoolLifetimeStatisticsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface PoolAddPool201Headers {
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
export interface PoolAddPool201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & PoolAddPool201Headers;
}

export interface PoolAddPoolDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface PoolListPools200Headers {
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
export interface PoolListPools200Response extends HttpResponse {
  status: "200";
  body: BatchPoolListResultOutput;
  headers: RawHttpHeaders & PoolListPools200Headers;
}

export interface PoolListPoolsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface PoolDeletePool202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The parameters for a widget status request */
export interface PoolDeletePool202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & PoolDeletePool202Headers;
}

export interface PoolDeletePoolDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface PoolPoolExists200Headers {
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
export interface PoolPoolExists200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & PoolPoolExists200Headers;
}

/** The Pool does not exist. */
export interface PoolPoolExists404Response extends HttpResponse {
  status: "404";
}

export interface PoolPoolExistsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface PoolGetPool200Headers {
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
export interface PoolGetPool200Response extends HttpResponse {
  status: "200";
  body: BatchPoolOutput;
  headers: RawHttpHeaders & PoolGetPool200Headers;
}

export interface PoolGetPoolDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface PoolUpdatePool200Headers {
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
export interface PoolUpdatePool200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & PoolUpdatePool200Headers;
}

export interface PoolUpdatePoolDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface PoolDisableAutoScaleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface PoolEnableAutoScaleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface PoolEvaluateAutoScaleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface PoolResizePool202Headers {
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
export interface PoolResizePool202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & PoolResizePool202Headers;
}

export interface PoolResizePoolDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface PoolStopResizePool202Headers {
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
export interface PoolStopResizePool202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & PoolStopResizePool202Headers;
}

export interface PoolStopResizePoolDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface PoolUpdatePoolProperties204Headers {
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
export interface PoolUpdatePoolProperties204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & PoolUpdatePoolProperties204Headers;
}

export interface PoolUpdatePoolPropertiesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface PoolRemovePoolNodes202Headers {
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
export interface PoolRemovePoolNodes202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & PoolRemovePoolNodes202Headers;
}

export interface PoolRemovePoolNodesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface AccountListSupportedImagesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface AccountListPoolNodeCountsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface JobGetAllLifetimeStatisticsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobDeleteJob202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The parameters for a widget status request */
export interface JobDeleteJob202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & JobDeleteJob202Headers;
}

export interface JobDeleteJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobGetJob200Headers {
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
export interface JobGetJob200Response extends HttpResponse {
  status: "200";
  body: BatchJobOutput;
  headers: RawHttpHeaders & JobGetJob200Headers;
}

export interface JobGetJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobUpdateJob200Headers {
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
export interface JobUpdateJob200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & JobUpdateJob200Headers;
}

export interface JobUpdateJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobReplaceJob200Headers {
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
export interface JobReplaceJob200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & JobReplaceJob200Headers;
}

export interface JobReplaceJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobDisableJob202Headers {
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
export interface JobDisableJob202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & JobDisableJob202Headers;
}

export interface JobDisableJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobEnableJob202Headers {
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
export interface JobEnableJob202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & JobEnableJob202Headers;
}

export interface JobEnableJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobTerminateJob202Headers {
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
export interface JobTerminateJob202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & JobTerminateJob202Headers;
}

export interface JobTerminateJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobAddJob201Headers {
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
export interface JobAddJob201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & JobAddJob201Headers;
}

export interface JobAddJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobListJobs200Headers {
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
export interface JobListJobs200Response extends HttpResponse {
  status: "200";
  body: BatchJobListResultOutput;
  headers: RawHttpHeaders & JobListJobs200Headers;
}

export interface JobListJobsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface JobListFromJobScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface JobListPreparationAndReleaseTaskStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface JobGetTaskCountsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface CertificatesAddCertificate201Headers {
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
export interface CertificatesAddCertificate201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & CertificatesAddCertificate201Headers;
}

export interface CertificatesAddCertificateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface CertificatesListCertificates200Headers {
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
export interface CertificatesListCertificates200Response extends HttpResponse {
  status: "200";
  body: CertificateListResultOutput;
  headers: RawHttpHeaders & CertificatesListCertificates200Headers;
}

export interface CertificatesListCertificatesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface CertificatesCancelCertificateDeletion204Headers {
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
export interface CertificatesCancelCertificateDeletion204Response
  extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & CertificatesCancelCertificateDeletion204Headers;
}

export interface CertificatesCancelCertificateDeletionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface CertificatesDeleteCertificate202Headers {
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
export interface CertificatesDeleteCertificate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & CertificatesDeleteCertificate202Headers;
}

export interface CertificatesDeleteCertificateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface CertificatesGetCertificate200Headers {
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
export interface CertificatesGetCertificate200Response extends HttpResponse {
  status: "200";
  body: CertificateOutput;
  headers: RawHttpHeaders & CertificatesGetCertificate200Headers;
}

export interface CertificatesGetCertificateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface FileDeleteFileFromTask200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface FileDeleteFileFromTask200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & FileDeleteFileFromTask200Headers;
}

export interface FileDeleteFileFromTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface FileGetFileFromTask200Headers {
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
export interface FileGetFileFromTask200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & FileGetFileFromTask200Headers;
}

export interface FileGetFileFromTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface FileGetFilePropertiesFromTask200Headers {
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
export interface FileGetFilePropertiesFromTask200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & FileGetFilePropertiesFromTask200Headers;
}

export interface FileGetFilePropertiesFromTaskDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface FileDeleteFromComputeNodeDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface FileGetFileFromComputeNode200Headers {
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
export interface FileGetFileFromComputeNode200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & FileGetFileFromComputeNode200Headers;
}

export interface FileGetFileFromComputeNodeDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface FileGetFilePropertiesFromComputeNode200Headers {
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
export interface FileGetFilePropertiesFromComputeNode200Response
  extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & FileGetFilePropertiesFromComputeNode200Headers;
}

export interface FileGetFilePropertiesFromComputeNodeDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface FileListFilesFromTask200Headers {
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
export interface FileListFilesFromTask200Response extends HttpResponse {
  status: "200";
  body: NodeFileListResultOutput;
  headers: RawHttpHeaders & FileListFilesFromTask200Headers;
}

export interface FileListFilesFromTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface FileListFilesFromComputeNode200Headers {
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
export interface FileListFilesFromComputeNode200Response extends HttpResponse {
  status: "200";
  body: NodeFileListResultOutput;
  headers: RawHttpHeaders & FileListFilesFromComputeNode200Headers;
}

export interface FileListFilesFromComputeNodeDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobScheduleJobScheduleExists200Headers {
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
export interface JobScheduleJobScheduleExists200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & JobScheduleJobScheduleExists200Headers;
}

/** The server cannot find the requested resource. */
export interface JobScheduleJobScheduleExists404Response extends HttpResponse {
  status: "404";
}

export interface JobScheduleJobScheduleExistsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobScheduleDeleteJobSchedule202Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The parameters for a widget status request */
export interface JobScheduleDeleteJobSchedule202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & JobScheduleDeleteJobSchedule202Headers;
}

export interface JobScheduleDeleteJobScheduleDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobScheduleGetJobSchedule200Headers {
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
export interface JobScheduleGetJobSchedule200Response extends HttpResponse {
  status: "200";
  body: BatchJobScheduleOutput;
  headers: RawHttpHeaders & JobScheduleGetJobSchedule200Headers;
}

export interface JobScheduleGetJobScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobScheduleUpdateJobSchedule200Headers {
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
export interface JobScheduleUpdateJobSchedule200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & JobScheduleUpdateJobSchedule200Headers;
}

export interface JobScheduleUpdateJobScheduleDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobScheduleReplaceJobSchedule200Headers {
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
export interface JobScheduleReplaceJobSchedule200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & JobScheduleReplaceJobSchedule200Headers;
}

export interface JobScheduleReplaceJobScheduleDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobScheduleDisableJobSchedule204Headers {
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
export interface JobScheduleDisableJobSchedule204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & JobScheduleDisableJobSchedule204Headers;
}

export interface JobScheduleDisableJobScheduleDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobScheduleEnableJobSchedule204Headers {
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
export interface JobScheduleEnableJobSchedule204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & JobScheduleEnableJobSchedule204Headers;
}

export interface JobScheduleEnableJobScheduleDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobScheduleTerminateJobSchedule202Headers {
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
export interface JobScheduleTerminateJobSchedule202Response
  extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & JobScheduleTerminateJobSchedule202Headers;
}

export interface JobScheduleTerminateJobScheduleDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobScheduleAddJobSchedule201Headers {
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
export interface JobScheduleAddJobSchedule201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & JobScheduleAddJobSchedule201Headers;
}

export interface JobScheduleAddJobScheduleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface JobScheduleListJobSchedules200Headers {
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
export interface JobScheduleListJobSchedules200Response extends HttpResponse {
  status: "200";
  body: BatchJobScheduleListResultOutput;
  headers: RawHttpHeaders & JobScheduleListJobSchedules200Headers;
}

export interface JobScheduleListJobSchedulesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TaskAddTask201Headers {
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
export interface TaskAddTask201Response extends HttpResponse {
  status: "201";
  headers: RawHttpHeaders & TaskAddTask201Headers;
}

export interface TaskAddTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TaskListTasks200Headers {
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
export interface TaskListTasks200Response extends HttpResponse {
  status: "200";
  body: BatchTaskListResultOutput;
  headers: RawHttpHeaders & TaskListTasks200Headers;
}

export interface TaskListTasksDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface TaskAddCollectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TaskDeleteTask200Headers {
  /** The client-request-id provided by the client during the request. This will be returned only if the return-client-request-id parameter was set to true. */
  "client-request-id"?: string;
  /** A unique identifier for the request that was made to the Batch service. If a request is consistently failing and you have verified that the request is properly formulated, you may use this value to report the error to Microsoft. In your report, include the value of this request ID, the approximate time that the request was made, the Batch Account against which the request was made, and the region that Account resides in. */
  "request-id"?: string;
}

/** The request has succeeded. */
export interface TaskDeleteTask200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & TaskDeleteTask200Headers;
}

export interface TaskDeleteTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TaskGetTask200Headers {
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
export interface TaskGetTask200Response extends HttpResponse {
  status: "200";
  body: BatchTaskOutput;
  headers: RawHttpHeaders & TaskGetTask200Headers;
}

export interface TaskGetTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TaskUpdateTask200Headers {
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
export interface TaskUpdateTask200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & TaskUpdateTask200Headers;
}

export interface TaskUpdateTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface TaskListSubtasksDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TaskTerminateTask204Headers {
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
export interface TaskTerminateTask204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & TaskTerminateTask204Headers;
}

export interface TaskTerminateTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TaskReactivateTask204Headers {
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
export interface TaskReactivateTask204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & TaskReactivateTask204Headers;
}

export interface TaskReactivateTaskDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface ComputeNodesAddUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface ComputeNodesDeleteUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface ComputeNodesUpdateUserDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface ComputeNodesGetNode200Headers {
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
export interface ComputeNodesGetNode200Response extends HttpResponse {
  status: "200";
  body: ComputeNodeOutput;
  headers: RawHttpHeaders & ComputeNodesGetNode200Headers;
}

export interface ComputeNodesGetNodeDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface ComputeNodesRebootNode202Headers {
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
export interface ComputeNodesRebootNode202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ComputeNodesRebootNode202Headers;
}

export interface ComputeNodesRebootNodeDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface ComputeNodesReimageNode202Headers {
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
export interface ComputeNodesReimageNode202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ComputeNodesReimageNode202Headers;
}

export interface ComputeNodesReimageNodeDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface ComputeNodesDisableSchedulingDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface ComputeNodesEnableSchedulingDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface ComputeNodesGetRemoteLoginSettingsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface ComputeNodesGetRemoteDesktopDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
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

export interface ComputeNodesUploadBatchServiceLogsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface ComputeNodesListNodes200Headers {
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
export interface ComputeNodesListNodes200Response extends HttpResponse {
  status: "200";
  body: ComputeNodeListResultOutput;
  headers: RawHttpHeaders & ComputeNodesListNodes200Headers;
}

export interface ComputeNodesListNodesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface ComputeNodeExtensionsGetExtension200Headers {
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
export interface ComputeNodeExtensionsGetExtension200Response
  extends HttpResponse {
  status: "200";
  body: NodeVMExtensionOutput;
  headers: RawHttpHeaders & ComputeNodeExtensionsGetExtension200Headers;
}

export interface ComputeNodeExtensionsGetExtensionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface ComputeNodeExtensionsListExtensions200Headers {
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
export interface ComputeNodeExtensionsListExtensions200Response
  extends HttpResponse {
  status: "200";
  body: NodeVMExtensionListOutput;
  headers: RawHttpHeaders & ComputeNodeExtensionsListExtensions200Headers;
}

export interface ComputeNodeExtensionsListExtensionsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
