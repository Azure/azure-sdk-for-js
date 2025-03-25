// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type { RequestParameters } from "@azure-rest/core-client";
import type {
  BatchPoolCreateContent,
  BatchPoolUpdateContent,
  BatchPoolEnableAutoScaleContent,
  BatchPoolEvaluateAutoScaleContent,
  BatchPoolResizeContent,
  BatchPoolReplaceContent,
  BatchNodeRemoveContent,
  BatchJobUpdateContent,
  BatchJob,
  BatchJobDisableContent,
  BatchJobTerminateContent,
  BatchJobCreateContent,
  BatchCertificate,
  BatchJobScheduleUpdateContent,
  BatchJobSchedule,
  BatchJobScheduleCreateContent,
  BatchTaskCreateContent,
  BatchTaskGroup,
  BatchTask,
  BatchNodeUserCreateContent,
  BatchNodeUserUpdateContent,
  BatchNodeRebootContent,
  BatchNodeDeallocateContent,
  BatchNodeReimageContent,
  BatchNodeDisableSchedulingContent,
  UploadBatchServiceLogsContent,
} from "./models.js";

export interface ListApplicationsHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface ListApplicationsQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
}

export interface ListApplicationsQueryParam {
  queryParameters?: ListApplicationsQueryParamProperties;
}

export interface ListApplicationsHeaderParam {
  headers?: RawHttpHeadersInput & ListApplicationsHeaders;
}

export type ListApplicationsParameters = ListApplicationsQueryParam &
  ListApplicationsHeaderParam &
  RequestParameters;

export interface GetApplicationHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface GetApplicationQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface GetApplicationQueryParam {
  queryParameters?: GetApplicationQueryParamProperties;
}

export interface GetApplicationHeaderParam {
  headers?: RawHttpHeadersInput & GetApplicationHeaders;
}

export type GetApplicationParameters = GetApplicationQueryParam &
  GetApplicationHeaderParam &
  RequestParameters;

export interface ListPoolUsageMetricsHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface ListPoolUsageMetricsQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The earliest time from which to include metrics. This must be at least two and
   * a half hours before the current time. If not specified this defaults to the
   * start time of the last aggregation interval currently available.
   */
  startTime?: Date | string;
  /**
   * The latest time from which to include metrics. This must be at least two hours
   * before the current time. If not specified this defaults to the end time of the
   * last aggregation interval currently available.
   */
  endtime?: Date | string;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://learn.microsoft.com/rest/api/batchservice/odata-filters-in-batch#list-account-usage-metrics.
   */
  $filter?: string;
}

export interface ListPoolUsageMetricsQueryParam {
  queryParameters?: ListPoolUsageMetricsQueryParamProperties;
}

export interface ListPoolUsageMetricsHeaderParam {
  headers?: RawHttpHeadersInput & ListPoolUsageMetricsHeaders;
}

export type ListPoolUsageMetricsParameters = ListPoolUsageMetricsQueryParam &
  ListPoolUsageMetricsHeaderParam &
  RequestParameters;

export interface CreatePoolHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface CreatePoolBodyParam {
  /** The Pool to be created. */
  body: BatchPoolCreateContent;
}

export interface CreatePoolQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface CreatePoolQueryParam {
  queryParameters?: CreatePoolQueryParamProperties;
}

export interface CreatePoolHeaderParam {
  headers?: RawHttpHeadersInput & CreatePoolHeaders;
}

export interface CreatePoolMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type CreatePoolParameters = CreatePoolQueryParam &
  CreatePoolHeaderParam &
  CreatePoolMediaTypesParam &
  CreatePoolBodyParam &
  RequestParameters;

export interface ListPoolsHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface ListPoolsSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `$expand` with explode set to false and style set to form. */
export interface ListPoolsExpandQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface ListPoolsQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://learn.microsoft.com/rest/api/batchservice/odata-filters-in-batch#list-pools.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string[] | ListPoolsSelectQueryParam;
  /** An OData $expand clause. */
  $expand?: string[] | ListPoolsExpandQueryParam;
}

export interface ListPoolsQueryParam {
  queryParameters?: ListPoolsQueryParamProperties;
}

export interface ListPoolsHeaderParam {
  headers?: RawHttpHeadersInput & ListPoolsHeaders;
}

export type ListPoolsParameters = ListPoolsQueryParam & ListPoolsHeaderParam & RequestParameters;

export interface DeletePoolHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface DeletePoolQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface DeletePoolQueryParam {
  queryParameters?: DeletePoolQueryParamProperties;
}

export interface DeletePoolHeaderParam {
  headers?: RawHttpHeadersInput & DeletePoolHeaders;
}

export type DeletePoolParameters = DeletePoolQueryParam & DeletePoolHeaderParam & RequestParameters;

export interface PoolExistsHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface PoolExistsQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface PoolExistsQueryParam {
  queryParameters?: PoolExistsQueryParamProperties;
}

export interface PoolExistsHeaderParam {
  headers?: RawHttpHeadersInput & PoolExistsHeaders;
}

export type PoolExistsParameters = PoolExistsQueryParam & PoolExistsHeaderParam & RequestParameters;

export interface GetPoolHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface GetPoolSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `$expand` with explode set to false and style set to form. */
export interface GetPoolExpandQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface GetPoolQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string[] | GetPoolSelectQueryParam;
  /** An OData $expand clause. */
  $expand?: string[] | GetPoolExpandQueryParam;
}

export interface GetPoolQueryParam {
  queryParameters?: GetPoolQueryParamProperties;
}

export interface GetPoolHeaderParam {
  headers?: RawHttpHeadersInput & GetPoolHeaders;
}

export type GetPoolParameters = GetPoolQueryParam & GetPoolHeaderParam & RequestParameters;

export interface UpdatePoolHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface UpdatePoolBodyParam {
  /** The pool properties to update. */
  body: BatchPoolUpdateContent;
}

export interface UpdatePoolQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface UpdatePoolQueryParam {
  queryParameters?: UpdatePoolQueryParamProperties;
}

export interface UpdatePoolHeaderParam {
  headers?: RawHttpHeadersInput & UpdatePoolHeaders;
}

export interface UpdatePoolMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type UpdatePoolParameters = UpdatePoolQueryParam &
  UpdatePoolHeaderParam &
  UpdatePoolMediaTypesParam &
  UpdatePoolBodyParam &
  RequestParameters;

export interface DisablePoolAutoScaleHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface DisablePoolAutoScaleQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface DisablePoolAutoScaleQueryParam {
  queryParameters?: DisablePoolAutoScaleQueryParamProperties;
}

export interface DisablePoolAutoScaleHeaderParam {
  headers?: RawHttpHeadersInput & DisablePoolAutoScaleHeaders;
}

export type DisablePoolAutoScaleParameters = DisablePoolAutoScaleQueryParam &
  DisablePoolAutoScaleHeaderParam &
  RequestParameters;

export interface EnablePoolAutoScaleHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface EnablePoolAutoScaleBodyParam {
  /** The options to use for enabling automatic scaling. */
  body: BatchPoolEnableAutoScaleContent;
}

export interface EnablePoolAutoScaleQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface EnablePoolAutoScaleQueryParam {
  queryParameters?: EnablePoolAutoScaleQueryParamProperties;
}

export interface EnablePoolAutoScaleHeaderParam {
  headers?: RawHttpHeadersInput & EnablePoolAutoScaleHeaders;
}

export interface EnablePoolAutoScaleMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type EnablePoolAutoScaleParameters = EnablePoolAutoScaleQueryParam &
  EnablePoolAutoScaleHeaderParam &
  EnablePoolAutoScaleMediaTypesParam &
  EnablePoolAutoScaleBodyParam &
  RequestParameters;

export interface EvaluatePoolAutoScaleHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface EvaluatePoolAutoScaleBodyParam {
  /** The options to use for evaluating the automatic scaling formula. */
  body: BatchPoolEvaluateAutoScaleContent;
}

export interface EvaluatePoolAutoScaleQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface EvaluatePoolAutoScaleQueryParam {
  queryParameters?: EvaluatePoolAutoScaleQueryParamProperties;
}

export interface EvaluatePoolAutoScaleHeaderParam {
  headers?: RawHttpHeadersInput & EvaluatePoolAutoScaleHeaders;
}

export interface EvaluatePoolAutoScaleMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type EvaluatePoolAutoScaleParameters = EvaluatePoolAutoScaleQueryParam &
  EvaluatePoolAutoScaleHeaderParam &
  EvaluatePoolAutoScaleMediaTypesParam &
  EvaluatePoolAutoScaleBodyParam &
  RequestParameters;

export interface ResizePoolHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface ResizePoolBodyParam {
  /** The options to use for resizing the pool. */
  body: BatchPoolResizeContent;
}

export interface ResizePoolQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface ResizePoolQueryParam {
  queryParameters?: ResizePoolQueryParamProperties;
}

export interface ResizePoolHeaderParam {
  headers?: RawHttpHeadersInput & ResizePoolHeaders;
}

export interface ResizePoolMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type ResizePoolParameters = ResizePoolQueryParam &
  ResizePoolHeaderParam &
  ResizePoolMediaTypesParam &
  ResizePoolBodyParam &
  RequestParameters;

export interface StopPoolResizeHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface StopPoolResizeQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface StopPoolResizeQueryParam {
  queryParameters?: StopPoolResizeQueryParamProperties;
}

export interface StopPoolResizeHeaderParam {
  headers?: RawHttpHeadersInput & StopPoolResizeHeaders;
}

export type StopPoolResizeParameters = StopPoolResizeQueryParam &
  StopPoolResizeHeaderParam &
  RequestParameters;

export interface ReplacePoolPropertiesHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface ReplacePoolPropertiesBodyParam {
  /** The options to use for replacing properties on the pool. */
  body: BatchPoolReplaceContent;
}

export interface ReplacePoolPropertiesQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface ReplacePoolPropertiesQueryParam {
  queryParameters?: ReplacePoolPropertiesQueryParamProperties;
}

export interface ReplacePoolPropertiesHeaderParam {
  headers?: RawHttpHeadersInput & ReplacePoolPropertiesHeaders;
}

export interface ReplacePoolPropertiesMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type ReplacePoolPropertiesParameters = ReplacePoolPropertiesQueryParam &
  ReplacePoolPropertiesHeaderParam &
  ReplacePoolPropertiesMediaTypesParam &
  ReplacePoolPropertiesBodyParam &
  RequestParameters;

export interface RemoveNodesHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface RemoveNodesBodyParam {
  /** The options to use for removing the node. */
  body: BatchNodeRemoveContent;
}

export interface RemoveNodesQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface RemoveNodesQueryParam {
  queryParameters?: RemoveNodesQueryParamProperties;
}

export interface RemoveNodesHeaderParam {
  headers?: RawHttpHeadersInput & RemoveNodesHeaders;
}

export interface RemoveNodesMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type RemoveNodesParameters = RemoveNodesQueryParam &
  RemoveNodesHeaderParam &
  RemoveNodesMediaTypesParam &
  RemoveNodesBodyParam &
  RequestParameters;

export interface ListSupportedImagesHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface ListSupportedImagesQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://learn.microsoft.com/rest/api/batchservice/odata-filters-in-batch#list-support-images.
   */
  $filter?: string;
}

export interface ListSupportedImagesQueryParam {
  queryParameters?: ListSupportedImagesQueryParamProperties;
}

export interface ListSupportedImagesHeaderParam {
  headers?: RawHttpHeadersInput & ListSupportedImagesHeaders;
}

export type ListSupportedImagesParameters = ListSupportedImagesQueryParam &
  ListSupportedImagesHeaderParam &
  RequestParameters;

export interface ListPoolNodeCountsHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface ListPoolNodeCountsQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://learn.microsoft.com/rest/api/batchservice/odata-filters-in-batch#list-support-images.
   */
  $filter?: string;
}

export interface ListPoolNodeCountsQueryParam {
  queryParameters?: ListPoolNodeCountsQueryParamProperties;
}

export interface ListPoolNodeCountsHeaderParam {
  headers?: RawHttpHeadersInput & ListPoolNodeCountsHeaders;
}

export type ListPoolNodeCountsParameters = ListPoolNodeCountsQueryParam &
  ListPoolNodeCountsHeaderParam &
  RequestParameters;

export interface DeleteJobHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface DeleteJobQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /** If true, the server will delete the Job even if the corresponding nodes have not fully processed the deletion. The default value is false. */
  force?: boolean;
}

export interface DeleteJobQueryParam {
  queryParameters?: DeleteJobQueryParamProperties;
}

export interface DeleteJobHeaderParam {
  headers?: RawHttpHeadersInput & DeleteJobHeaders;
}

export type DeleteJobParameters = DeleteJobQueryParam & DeleteJobHeaderParam & RequestParameters;

export interface GetJobHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface GetJobSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `$expand` with explode set to false and style set to form. */
export interface GetJobExpandQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface GetJobQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string[] | GetJobSelectQueryParam;
  /** An OData $expand clause. */
  $expand?: string[] | GetJobExpandQueryParam;
}

export interface GetJobQueryParam {
  queryParameters?: GetJobQueryParamProperties;
}

export interface GetJobHeaderParam {
  headers?: RawHttpHeadersInput & GetJobHeaders;
}

export type GetJobParameters = GetJobQueryParam & GetJobHeaderParam & RequestParameters;

export interface UpdateJobHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface UpdateJobBodyParam {
  /** The options to use for updating the Job. */
  body: BatchJobUpdateContent;
}

export interface UpdateJobQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface UpdateJobQueryParam {
  queryParameters?: UpdateJobQueryParamProperties;
}

export interface UpdateJobHeaderParam {
  headers?: RawHttpHeadersInput & UpdateJobHeaders;
}

export interface UpdateJobMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type UpdateJobParameters = UpdateJobQueryParam &
  UpdateJobHeaderParam &
  UpdateJobMediaTypesParam &
  UpdateJobBodyParam &
  RequestParameters;

export interface ReplaceJobHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface ReplaceJobBodyParam {
  /** A job with updated properties */
  body: BatchJob;
}

export interface ReplaceJobQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface ReplaceJobQueryParam {
  queryParameters?: ReplaceJobQueryParamProperties;
}

export interface ReplaceJobHeaderParam {
  headers?: RawHttpHeadersInput & ReplaceJobHeaders;
}

export interface ReplaceJobMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type ReplaceJobParameters = ReplaceJobQueryParam &
  ReplaceJobHeaderParam &
  ReplaceJobMediaTypesParam &
  ReplaceJobBodyParam &
  RequestParameters;

export interface DisableJobHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface DisableJobBodyParam {
  /** The options to use for disabling the Job. */
  body: BatchJobDisableContent;
}

export interface DisableJobQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface DisableJobQueryParam {
  queryParameters?: DisableJobQueryParamProperties;
}

export interface DisableJobHeaderParam {
  headers?: RawHttpHeadersInput & DisableJobHeaders;
}

export interface DisableJobMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type DisableJobParameters = DisableJobQueryParam &
  DisableJobHeaderParam &
  DisableJobMediaTypesParam &
  DisableJobBodyParam &
  RequestParameters;

export interface EnableJobHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface EnableJobQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface EnableJobQueryParam {
  queryParameters?: EnableJobQueryParamProperties;
}

export interface EnableJobHeaderParam {
  headers?: RawHttpHeadersInput & EnableJobHeaders;
}

export type EnableJobParameters = EnableJobQueryParam & EnableJobHeaderParam & RequestParameters;

export interface TerminateJobHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface TerminateJobBodyParam {
  /** The options to use for terminating the Job. */
  body?: BatchJobTerminateContent;
}

export interface TerminateJobQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /** If true, the server will terminate the Job even if the corresponding nodes have not fully processed the termination. The default value is false. */
  force?: boolean;
}

export interface TerminateJobQueryParam {
  queryParameters?: TerminateJobQueryParamProperties;
}

export interface TerminateJobHeaderParam {
  headers?: RawHttpHeadersInput & TerminateJobHeaders;
}

export interface TerminateJobMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type TerminateJobParameters = TerminateJobQueryParam &
  TerminateJobHeaderParam &
  TerminateJobMediaTypesParam &
  TerminateJobBodyParam &
  RequestParameters;

export interface CreateJobHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface CreateJobBodyParam {
  /** The Job to be created. */
  body: BatchJobCreateContent;
}

export interface CreateJobQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface CreateJobQueryParam {
  queryParameters?: CreateJobQueryParamProperties;
}

export interface CreateJobHeaderParam {
  headers?: RawHttpHeadersInput & CreateJobHeaders;
}

export interface CreateJobMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type CreateJobParameters = CreateJobQueryParam &
  CreateJobHeaderParam &
  CreateJobMediaTypesParam &
  CreateJobBodyParam &
  RequestParameters;

export interface ListJobsHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface ListJobsSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `$expand` with explode set to false and style set to form. */
export interface ListJobsExpandQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface ListJobsQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://learn.microsoft.com/rest/api/batchservice/odata-filters-in-batch#list-jobs.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string[] | ListJobsSelectQueryParam;
  /** An OData $expand clause. */
  $expand?: string[] | ListJobsExpandQueryParam;
}

export interface ListJobsQueryParam {
  queryParameters?: ListJobsQueryParamProperties;
}

export interface ListJobsHeaderParam {
  headers?: RawHttpHeadersInput & ListJobsHeaders;
}

export type ListJobsParameters = ListJobsQueryParam & ListJobsHeaderParam & RequestParameters;

export interface ListJobsFromScheduleHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface ListJobsFromScheduleSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `$expand` with explode set to false and style set to form. */
export interface ListJobsFromScheduleExpandQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface ListJobsFromScheduleQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://learn.microsoft.com/rest/api/batchservice/odata-filters-in-batch#list-jobs-in-a-job-schedule.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string[] | ListJobsFromScheduleSelectQueryParam;
  /** An OData $expand clause. */
  $expand?: string[] | ListJobsFromScheduleExpandQueryParam;
}

export interface ListJobsFromScheduleQueryParam {
  queryParameters?: ListJobsFromScheduleQueryParamProperties;
}

export interface ListJobsFromScheduleHeaderParam {
  headers?: RawHttpHeadersInput & ListJobsFromScheduleHeaders;
}

export type ListJobsFromScheduleParameters = ListJobsFromScheduleQueryParam &
  ListJobsFromScheduleHeaderParam &
  RequestParameters;

export interface ListJobPreparationAndReleaseTaskStatusHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface ListJobPreparationAndReleaseTaskStatusSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface ListJobPreparationAndReleaseTaskStatusQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://learn.microsoft.com/rest/api/batchservice/odata-filters-in-batch#list-job-preparation-and-release-status.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string[] | ListJobPreparationAndReleaseTaskStatusSelectQueryParam;
}

export interface ListJobPreparationAndReleaseTaskStatusQueryParam {
  queryParameters?: ListJobPreparationAndReleaseTaskStatusQueryParamProperties;
}

export interface ListJobPreparationAndReleaseTaskStatusHeaderParam {
  headers?: RawHttpHeadersInput & ListJobPreparationAndReleaseTaskStatusHeaders;
}

export type ListJobPreparationAndReleaseTaskStatusParameters =
  ListJobPreparationAndReleaseTaskStatusQueryParam &
    ListJobPreparationAndReleaseTaskStatusHeaderParam &
    RequestParameters;

export interface GetJobTaskCountsHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface GetJobTaskCountsQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface GetJobTaskCountsQueryParam {
  queryParameters?: GetJobTaskCountsQueryParamProperties;
}

export interface GetJobTaskCountsHeaderParam {
  headers?: RawHttpHeadersInput & GetJobTaskCountsHeaders;
}

export type GetJobTaskCountsParameters = GetJobTaskCountsQueryParam &
  GetJobTaskCountsHeaderParam &
  RequestParameters;

export interface CreateCertificateHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface CreateCertificateBodyParam {
  /** The Certificate to be created. */
  body: BatchCertificate;
}

export interface CreateCertificateQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface CreateCertificateQueryParam {
  queryParameters?: CreateCertificateQueryParamProperties;
}

export interface CreateCertificateHeaderParam {
  headers?: RawHttpHeadersInput & CreateCertificateHeaders;
}

export interface CreateCertificateMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type CreateCertificateParameters = CreateCertificateQueryParam &
  CreateCertificateHeaderParam &
  CreateCertificateMediaTypesParam &
  CreateCertificateBodyParam &
  RequestParameters;

export interface ListCertificatesHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface ListCertificatesSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface ListCertificatesQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-certificates.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string[] | ListCertificatesSelectQueryParam;
}

export interface ListCertificatesQueryParam {
  queryParameters?: ListCertificatesQueryParamProperties;
}

export interface ListCertificatesHeaderParam {
  headers?: RawHttpHeadersInput & ListCertificatesHeaders;
}

export type ListCertificatesParameters = ListCertificatesQueryParam &
  ListCertificatesHeaderParam &
  RequestParameters;

export interface CancelCertificateDeletionHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface CancelCertificateDeletionQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface CancelCertificateDeletionQueryParam {
  queryParameters?: CancelCertificateDeletionQueryParamProperties;
}

export interface CancelCertificateDeletionHeaderParam {
  headers?: RawHttpHeadersInput & CancelCertificateDeletionHeaders;
}

export type CancelCertificateDeletionParameters = CancelCertificateDeletionQueryParam &
  CancelCertificateDeletionHeaderParam &
  RequestParameters;

export interface DeleteCertificateHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface DeleteCertificateQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface DeleteCertificateQueryParam {
  queryParameters?: DeleteCertificateQueryParamProperties;
}

export interface DeleteCertificateHeaderParam {
  headers?: RawHttpHeadersInput & DeleteCertificateHeaders;
}

export type DeleteCertificateParameters = DeleteCertificateQueryParam &
  DeleteCertificateHeaderParam &
  RequestParameters;

export interface GetCertificateHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface GetCertificateSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface GetCertificateQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string[] | GetCertificateSelectQueryParam;
}

export interface GetCertificateQueryParam {
  queryParameters?: GetCertificateQueryParamProperties;
}

export interface GetCertificateHeaderParam {
  headers?: RawHttpHeadersInput & GetCertificateHeaders;
}

export type GetCertificateParameters = GetCertificateQueryParam &
  GetCertificateHeaderParam &
  RequestParameters;

export interface JobScheduleExistsHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface JobScheduleExistsQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface JobScheduleExistsQueryParam {
  queryParameters?: JobScheduleExistsQueryParamProperties;
}

export interface JobScheduleExistsHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleExistsHeaders;
}

export type JobScheduleExistsParameters = JobScheduleExistsQueryParam &
  JobScheduleExistsHeaderParam &
  RequestParameters;

export interface DeleteJobScheduleHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface DeleteJobScheduleQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /** If true, the server will delete the JobSchedule even if the corresponding nodes have not fully processed the deletion. The default value is false. */
  force?: boolean;
}

export interface DeleteJobScheduleQueryParam {
  queryParameters?: DeleteJobScheduleQueryParamProperties;
}

export interface DeleteJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & DeleteJobScheduleHeaders;
}

export type DeleteJobScheduleParameters = DeleteJobScheduleQueryParam &
  DeleteJobScheduleHeaderParam &
  RequestParameters;

export interface GetJobScheduleHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface GetJobScheduleSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `$expand` with explode set to false and style set to form. */
export interface GetJobScheduleExpandQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface GetJobScheduleQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string[] | GetJobScheduleSelectQueryParam;
  /** An OData $expand clause. */
  $expand?: string[] | GetJobScheduleExpandQueryParam;
}

export interface GetJobScheduleQueryParam {
  queryParameters?: GetJobScheduleQueryParamProperties;
}

export interface GetJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & GetJobScheduleHeaders;
}

export type GetJobScheduleParameters = GetJobScheduleQueryParam &
  GetJobScheduleHeaderParam &
  RequestParameters;

export interface UpdateJobScheduleHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface UpdateJobScheduleBodyParam {
  /** The options to use for updating the Job Schedule. */
  body: BatchJobScheduleUpdateContent;
}

export interface UpdateJobScheduleQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface UpdateJobScheduleQueryParam {
  queryParameters?: UpdateJobScheduleQueryParamProperties;
}

export interface UpdateJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & UpdateJobScheduleHeaders;
}

export interface UpdateJobScheduleMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type UpdateJobScheduleParameters = UpdateJobScheduleQueryParam &
  UpdateJobScheduleHeaderParam &
  UpdateJobScheduleMediaTypesParam &
  UpdateJobScheduleBodyParam &
  RequestParameters;

export interface ReplaceJobScheduleHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface ReplaceJobScheduleBodyParam {
  /** A Job Schedule with updated properties */
  body: BatchJobSchedule;
}

export interface ReplaceJobScheduleQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface ReplaceJobScheduleQueryParam {
  queryParameters?: ReplaceJobScheduleQueryParamProperties;
}

export interface ReplaceJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & ReplaceJobScheduleHeaders;
}

export interface ReplaceJobScheduleMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type ReplaceJobScheduleParameters = ReplaceJobScheduleQueryParam &
  ReplaceJobScheduleHeaderParam &
  ReplaceJobScheduleMediaTypesParam &
  ReplaceJobScheduleBodyParam &
  RequestParameters;

export interface DisableJobScheduleHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface DisableJobScheduleQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface DisableJobScheduleQueryParam {
  queryParameters?: DisableJobScheduleQueryParamProperties;
}

export interface DisableJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & DisableJobScheduleHeaders;
}

export type DisableJobScheduleParameters = DisableJobScheduleQueryParam &
  DisableJobScheduleHeaderParam &
  RequestParameters;

export interface EnableJobScheduleHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface EnableJobScheduleQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface EnableJobScheduleQueryParam {
  queryParameters?: EnableJobScheduleQueryParamProperties;
}

export interface EnableJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & EnableJobScheduleHeaders;
}

export type EnableJobScheduleParameters = EnableJobScheduleQueryParam &
  EnableJobScheduleHeaderParam &
  RequestParameters;

export interface TerminateJobScheduleHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface TerminateJobScheduleQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /** If true, the server will terminate the JobSchedule even if the corresponding nodes have not fully processed the termination. The default value is false. */
  force?: boolean;
}

export interface TerminateJobScheduleQueryParam {
  queryParameters?: TerminateJobScheduleQueryParamProperties;
}

export interface TerminateJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & TerminateJobScheduleHeaders;
}

export type TerminateJobScheduleParameters = TerminateJobScheduleQueryParam &
  TerminateJobScheduleHeaderParam &
  RequestParameters;

export interface CreateJobScheduleHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface CreateJobScheduleBodyParam {
  /** The Job Schedule to be created. */
  body: BatchJobScheduleCreateContent;
}

export interface CreateJobScheduleQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface CreateJobScheduleQueryParam {
  queryParameters?: CreateJobScheduleQueryParamProperties;
}

export interface CreateJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & CreateJobScheduleHeaders;
}

export interface CreateJobScheduleMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type CreateJobScheduleParameters = CreateJobScheduleQueryParam &
  CreateJobScheduleHeaderParam &
  CreateJobScheduleMediaTypesParam &
  CreateJobScheduleBodyParam &
  RequestParameters;

export interface ListJobSchedulesHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface ListJobSchedulesSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `$expand` with explode set to false and style set to form. */
export interface ListJobSchedulesExpandQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface ListJobSchedulesQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://learn.microsoft.com/rest/api/batchservice/odata-filters-in-batch#list-job-schedules.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string[] | ListJobSchedulesSelectQueryParam;
  /** An OData $expand clause. */
  $expand?: string[] | ListJobSchedulesExpandQueryParam;
}

export interface ListJobSchedulesQueryParam {
  queryParameters?: ListJobSchedulesQueryParamProperties;
}

export interface ListJobSchedulesHeaderParam {
  headers?: RawHttpHeadersInput & ListJobSchedulesHeaders;
}

export type ListJobSchedulesParameters = ListJobSchedulesQueryParam &
  ListJobSchedulesHeaderParam &
  RequestParameters;

export interface CreateTaskHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface CreateTaskBodyParam {
  /** The Task to be created. */
  body: BatchTaskCreateContent;
}

export interface CreateTaskQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface CreateTaskQueryParam {
  queryParameters?: CreateTaskQueryParamProperties;
}

export interface CreateTaskHeaderParam {
  headers?: RawHttpHeadersInput & CreateTaskHeaders;
}

export interface CreateTaskMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type CreateTaskParameters = CreateTaskQueryParam &
  CreateTaskHeaderParam &
  CreateTaskMediaTypesParam &
  CreateTaskBodyParam &
  RequestParameters;

export interface ListTasksHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface ListTasksSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `$expand` with explode set to false and style set to form. */
export interface ListTasksExpandQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface ListTasksQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://learn.microsoft.com/rest/api/batchservice/odata-filters-in-batch#list-tasks.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string[] | ListTasksSelectQueryParam;
  /** An OData $expand clause. */
  $expand?: string[] | ListTasksExpandQueryParam;
}

export interface ListTasksQueryParam {
  queryParameters?: ListTasksQueryParamProperties;
}

export interface ListTasksHeaderParam {
  headers?: RawHttpHeadersInput & ListTasksHeaders;
}

export type ListTasksParameters = ListTasksQueryParam & ListTasksHeaderParam & RequestParameters;

export interface CreateTaskCollectionHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface CreateTaskCollectionBodyParam {
  /** The Tasks to be added. */
  body: BatchTaskGroup;
}

export interface CreateTaskCollectionQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface CreateTaskCollectionQueryParam {
  queryParameters?: CreateTaskCollectionQueryParamProperties;
}

export interface CreateTaskCollectionHeaderParam {
  headers?: RawHttpHeadersInput & CreateTaskCollectionHeaders;
}

export interface CreateTaskCollectionMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type CreateTaskCollectionParameters = CreateTaskCollectionQueryParam &
  CreateTaskCollectionHeaderParam &
  CreateTaskCollectionMediaTypesParam &
  CreateTaskCollectionBodyParam &
  RequestParameters;

export interface DeleteTaskHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface DeleteTaskQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface DeleteTaskQueryParam {
  queryParameters?: DeleteTaskQueryParamProperties;
}

export interface DeleteTaskHeaderParam {
  headers?: RawHttpHeadersInput & DeleteTaskHeaders;
}

export type DeleteTaskParameters = DeleteTaskQueryParam & DeleteTaskHeaderParam & RequestParameters;

export interface GetTaskHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface GetTaskSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `$expand` with explode set to false and style set to form. */
export interface GetTaskExpandQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface GetTaskQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string[] | GetTaskSelectQueryParam;
  /** An OData $expand clause. */
  $expand?: string[] | GetTaskExpandQueryParam;
}

export interface GetTaskQueryParam {
  queryParameters?: GetTaskQueryParamProperties;
}

export interface GetTaskHeaderParam {
  headers?: RawHttpHeadersInput & GetTaskHeaders;
}

export type GetTaskParameters = GetTaskQueryParam & GetTaskHeaderParam & RequestParameters;

export interface ReplaceTaskHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface ReplaceTaskBodyParam {
  /** The Task to update. */
  body: BatchTask;
}

export interface ReplaceTaskQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface ReplaceTaskQueryParam {
  queryParameters?: ReplaceTaskQueryParamProperties;
}

export interface ReplaceTaskHeaderParam {
  headers?: RawHttpHeadersInput & ReplaceTaskHeaders;
}

export interface ReplaceTaskMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type ReplaceTaskParameters = ReplaceTaskQueryParam &
  ReplaceTaskHeaderParam &
  ReplaceTaskMediaTypesParam &
  ReplaceTaskBodyParam &
  RequestParameters;

export interface ListSubTasksHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface ListSubTasksSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface ListSubTasksQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string[] | ListSubTasksSelectQueryParam;
}

export interface ListSubTasksQueryParam {
  queryParameters?: ListSubTasksQueryParamProperties;
}

export interface ListSubTasksHeaderParam {
  headers?: RawHttpHeadersInput & ListSubTasksHeaders;
}

export type ListSubTasksParameters = ListSubTasksQueryParam &
  ListSubTasksHeaderParam &
  RequestParameters;

export interface TerminateTaskHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface TerminateTaskQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface TerminateTaskQueryParam {
  queryParameters?: TerminateTaskQueryParamProperties;
}

export interface TerminateTaskHeaderParam {
  headers?: RawHttpHeadersInput & TerminateTaskHeaders;
}

export type TerminateTaskParameters = TerminateTaskQueryParam &
  TerminateTaskHeaderParam &
  RequestParameters;

export interface ReactivateTaskHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "If-Match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "If-None-Match"?: string;
}

export interface ReactivateTaskQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface ReactivateTaskQueryParam {
  queryParameters?: ReactivateTaskQueryParamProperties;
}

export interface ReactivateTaskHeaderParam {
  headers?: RawHttpHeadersInput & ReactivateTaskHeaders;
}

export type ReactivateTaskParameters = ReactivateTaskQueryParam &
  ReactivateTaskHeaderParam &
  RequestParameters;

export interface DeleteTaskFileHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface DeleteTaskFileQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * Whether to delete children of a directory. If the filePath parameter represents
   * a directory instead of a file, you can set recursive to true to delete the
   * directory and all of the files and subdirectories in it. If recursive is false
   * then the directory must be empty or deletion will fail.
   */
  recursive?: boolean;
}

export interface DeleteTaskFileQueryParam {
  queryParameters?: DeleteTaskFileQueryParamProperties;
}

export interface DeleteTaskFileHeaderParam {
  headers?: RawHttpHeadersInput & DeleteTaskFileHeaders;
}

export type DeleteTaskFileParameters = DeleteTaskFileQueryParam &
  DeleteTaskFileHeaderParam &
  RequestParameters;

export interface GetTaskFileHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * The byte range to be retrieved. The default is to retrieve the entire file. The
   * format is bytes=startRange-endRange.
   */
  "ocp-range"?: string;
}

export interface GetTaskFileQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface GetTaskFileQueryParam {
  queryParameters?: GetTaskFileQueryParamProperties;
}

export interface GetTaskFileHeaderParam {
  headers?: RawHttpHeadersInput & GetTaskFileHeaders;
}

export type GetTaskFileParameters = GetTaskFileQueryParam &
  GetTaskFileHeaderParam &
  RequestParameters;

export interface GetTaskFilePropertiesHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
}

export interface GetTaskFilePropertiesQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface GetTaskFilePropertiesQueryParam {
  queryParameters?: GetTaskFilePropertiesQueryParamProperties;
}

export interface GetTaskFilePropertiesHeaderParam {
  headers?: RawHttpHeadersInput & GetTaskFilePropertiesHeaders;
}

export type GetTaskFilePropertiesParameters = GetTaskFilePropertiesQueryParam &
  GetTaskFilePropertiesHeaderParam &
  RequestParameters;

export interface ListTaskFilesHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface ListTaskFilesQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://learn.microsoft.com/rest/api/batchservice/odata-filters-in-batch#list-task-files.
   */
  $filter?: string;
  /**
   * Whether to list children of the Task directory. This parameter can be used in
   * combination with the filter parameter to list specific type of files.
   */
  recursive?: boolean;
}

export interface ListTaskFilesQueryParam {
  queryParameters?: ListTaskFilesQueryParamProperties;
}

export interface ListTaskFilesHeaderParam {
  headers?: RawHttpHeadersInput & ListTaskFilesHeaders;
}

export type ListTaskFilesParameters = ListTaskFilesQueryParam &
  ListTaskFilesHeaderParam &
  RequestParameters;

export interface CreateNodeUserHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface CreateNodeUserBodyParam {
  /** The options to use for creating the user. */
  body: BatchNodeUserCreateContent;
}

export interface CreateNodeUserQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface CreateNodeUserQueryParam {
  queryParameters?: CreateNodeUserQueryParamProperties;
}

export interface CreateNodeUserHeaderParam {
  headers?: RawHttpHeadersInput & CreateNodeUserHeaders;
}

export interface CreateNodeUserMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type CreateNodeUserParameters = CreateNodeUserQueryParam &
  CreateNodeUserHeaderParam &
  CreateNodeUserMediaTypesParam &
  CreateNodeUserBodyParam &
  RequestParameters;

export interface DeleteNodeUserHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface DeleteNodeUserQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface DeleteNodeUserQueryParam {
  queryParameters?: DeleteNodeUserQueryParamProperties;
}

export interface DeleteNodeUserHeaderParam {
  headers?: RawHttpHeadersInput & DeleteNodeUserHeaders;
}

export type DeleteNodeUserParameters = DeleteNodeUserQueryParam &
  DeleteNodeUserHeaderParam &
  RequestParameters;

export interface ReplaceNodeUserHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface ReplaceNodeUserBodyParam {
  /** The options to use for updating the user. */
  body: BatchNodeUserUpdateContent;
}

export interface ReplaceNodeUserQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface ReplaceNodeUserQueryParam {
  queryParameters?: ReplaceNodeUserQueryParamProperties;
}

export interface ReplaceNodeUserHeaderParam {
  headers?: RawHttpHeadersInput & ReplaceNodeUserHeaders;
}

export interface ReplaceNodeUserMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type ReplaceNodeUserParameters = ReplaceNodeUserQueryParam &
  ReplaceNodeUserHeaderParam &
  ReplaceNodeUserMediaTypesParam &
  ReplaceNodeUserBodyParam &
  RequestParameters;

export interface GetNodeHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface GetNodeSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface GetNodeQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string[] | GetNodeSelectQueryParam;
}

export interface GetNodeQueryParam {
  queryParameters?: GetNodeQueryParamProperties;
}

export interface GetNodeHeaderParam {
  headers?: RawHttpHeadersInput & GetNodeHeaders;
}

export type GetNodeParameters = GetNodeQueryParam & GetNodeHeaderParam & RequestParameters;

export interface RebootNodeHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface RebootNodeBodyParam {
  /** The options to use for rebooting the Compute Node. */
  body?: BatchNodeRebootContent;
}

export interface RebootNodeQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface RebootNodeQueryParam {
  queryParameters?: RebootNodeQueryParamProperties;
}

export interface RebootNodeHeaderParam {
  headers?: RawHttpHeadersInput & RebootNodeHeaders;
}

export interface RebootNodeMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type RebootNodeParameters = RebootNodeQueryParam &
  RebootNodeHeaderParam &
  RebootNodeMediaTypesParam &
  RebootNodeBodyParam &
  RequestParameters;

export interface StartNodeHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface StartNodeQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface StartNodeQueryParam {
  queryParameters?: StartNodeQueryParamProperties;
}

export interface StartNodeHeaderParam {
  headers?: RawHttpHeadersInput & StartNodeHeaders;
}

export type StartNodeParameters = StartNodeQueryParam & StartNodeHeaderParam & RequestParameters;

export interface DeallocateNodeHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface DeallocateNodeBodyParam {
  /** The options to use for deallocating the Compute Node. */
  body?: BatchNodeDeallocateContent;
}

export interface DeallocateNodeQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface DeallocateNodeQueryParam {
  queryParameters?: DeallocateNodeQueryParamProperties;
}

export interface DeallocateNodeHeaderParam {
  headers?: RawHttpHeadersInput & DeallocateNodeHeaders;
}

export interface DeallocateNodeMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type DeallocateNodeParameters = DeallocateNodeQueryParam &
  DeallocateNodeHeaderParam &
  DeallocateNodeMediaTypesParam &
  DeallocateNodeBodyParam &
  RequestParameters;

export interface ReimageNodeHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface ReimageNodeBodyParam {
  /** The options to use for reimaging the Compute Node. */
  body?: BatchNodeReimageContent;
}

export interface ReimageNodeQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface ReimageNodeQueryParam {
  queryParameters?: ReimageNodeQueryParamProperties;
}

export interface ReimageNodeHeaderParam {
  headers?: RawHttpHeadersInput & ReimageNodeHeaders;
}

export interface ReimageNodeMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type ReimageNodeParameters = ReimageNodeQueryParam &
  ReimageNodeHeaderParam &
  ReimageNodeMediaTypesParam &
  ReimageNodeBodyParam &
  RequestParameters;

export interface DisableNodeSchedulingHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface DisableNodeSchedulingBodyParam {
  /** The options to use for disabling scheduling on the Compute Node. */
  body?: BatchNodeDisableSchedulingContent;
}

export interface DisableNodeSchedulingQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface DisableNodeSchedulingQueryParam {
  queryParameters?: DisableNodeSchedulingQueryParamProperties;
}

export interface DisableNodeSchedulingHeaderParam {
  headers?: RawHttpHeadersInput & DisableNodeSchedulingHeaders;
}

export interface DisableNodeSchedulingMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type DisableNodeSchedulingParameters = DisableNodeSchedulingQueryParam &
  DisableNodeSchedulingHeaderParam &
  DisableNodeSchedulingMediaTypesParam &
  DisableNodeSchedulingBodyParam &
  RequestParameters;

export interface EnableNodeSchedulingHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface EnableNodeSchedulingQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface EnableNodeSchedulingQueryParam {
  queryParameters?: EnableNodeSchedulingQueryParamProperties;
}

export interface EnableNodeSchedulingHeaderParam {
  headers?: RawHttpHeadersInput & EnableNodeSchedulingHeaders;
}

export type EnableNodeSchedulingParameters = EnableNodeSchedulingQueryParam &
  EnableNodeSchedulingHeaderParam &
  RequestParameters;

export interface GetNodeRemoteLoginSettingsHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface GetNodeRemoteLoginSettingsQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface GetNodeRemoteLoginSettingsQueryParam {
  queryParameters?: GetNodeRemoteLoginSettingsQueryParamProperties;
}

export interface GetNodeRemoteLoginSettingsHeaderParam {
  headers?: RawHttpHeadersInput & GetNodeRemoteLoginSettingsHeaders;
}

export type GetNodeRemoteLoginSettingsParameters = GetNodeRemoteLoginSettingsQueryParam &
  GetNodeRemoteLoginSettingsHeaderParam &
  RequestParameters;

export interface UploadNodeLogsHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface UploadNodeLogsBodyParam {
  /** The Azure Batch service log files upload options. */
  body: UploadBatchServiceLogsContent;
}

export interface UploadNodeLogsQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface UploadNodeLogsQueryParam {
  queryParameters?: UploadNodeLogsQueryParamProperties;
}

export interface UploadNodeLogsHeaderParam {
  headers?: RawHttpHeadersInput & UploadNodeLogsHeaders;
}

export interface UploadNodeLogsMediaTypesParam {
  /** Type of content */
  contentType: "application/json; odata=minimalmetadata";
}

export type UploadNodeLogsParameters = UploadNodeLogsQueryParam &
  UploadNodeLogsHeaderParam &
  UploadNodeLogsMediaTypesParam &
  UploadNodeLogsBodyParam &
  RequestParameters;

export interface ListNodesHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface ListNodesSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface ListNodesQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://learn.microsoft.com/rest/api/batchservice/odata-filters-in-batch#list-nodes-in-a-pool.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string[] | ListNodesSelectQueryParam;
}

export interface ListNodesQueryParam {
  queryParameters?: ListNodesQueryParamProperties;
}

export interface ListNodesHeaderParam {
  headers?: RawHttpHeadersInput & ListNodesHeaders;
}

export type ListNodesParameters = ListNodesQueryParam & ListNodesHeaderParam & RequestParameters;

export interface GetNodeExtensionHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface GetNodeExtensionSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface GetNodeExtensionQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string[] | GetNodeExtensionSelectQueryParam;
}

export interface GetNodeExtensionQueryParam {
  queryParameters?: GetNodeExtensionQueryParamProperties;
}

export interface GetNodeExtensionHeaderParam {
  headers?: RawHttpHeadersInput & GetNodeExtensionHeaders;
}

export type GetNodeExtensionParameters = GetNodeExtensionQueryParam &
  GetNodeExtensionHeaderParam &
  RequestParameters;

export interface ListNodeExtensionsHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

/** This is the wrapper object for the parameter `$select` with explode set to false and style set to form. */
export interface ListNodeExtensionsSelectQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface ListNodeExtensionsQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /** An OData $select clause. */
  $select?: string[] | ListNodeExtensionsSelectQueryParam;
}

export interface ListNodeExtensionsQueryParam {
  queryParameters?: ListNodeExtensionsQueryParamProperties;
}

export interface ListNodeExtensionsHeaderParam {
  headers?: RawHttpHeadersInput & ListNodeExtensionsHeaders;
}

export type ListNodeExtensionsParameters = ListNodeExtensionsQueryParam &
  ListNodeExtensionsHeaderParam &
  RequestParameters;

export interface DeleteNodeFileHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface DeleteNodeFileQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * Whether to delete children of a directory. If the filePath parameter represents
   * a directory instead of a file, you can set recursive to true to delete the
   * directory and all of the files and subdirectories in it. If recursive is false
   * then the directory must be empty or deletion will fail.
   */
  recursive?: boolean;
}

export interface DeleteNodeFileQueryParam {
  queryParameters?: DeleteNodeFileQueryParamProperties;
}

export interface DeleteNodeFileHeaderParam {
  headers?: RawHttpHeadersInput & DeleteNodeFileHeaders;
}

export type DeleteNodeFileParameters = DeleteNodeFileQueryParam &
  DeleteNodeFileHeaderParam &
  RequestParameters;

export interface GetNodeFileHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
  /**
   * The byte range to be retrieved. The default is to retrieve the entire file. The
   * format is bytes=startRange-endRange.
   */
  "ocp-range"?: string;
}

export interface GetNodeFileQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface GetNodeFileQueryParam {
  queryParameters?: GetNodeFileQueryParamProperties;
}

export interface GetNodeFileHeaderParam {
  headers?: RawHttpHeadersInput & GetNodeFileHeaders;
}

export type GetNodeFileParameters = GetNodeFileQueryParam &
  GetNodeFileHeaderParam &
  RequestParameters;

export interface GetNodeFilePropertiesHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "If-Modified-Since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "If-Unmodified-Since"?: string;
}

export interface GetNodeFilePropertiesQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
}

export interface GetNodeFilePropertiesQueryParam {
  queryParameters?: GetNodeFilePropertiesQueryParamProperties;
}

export interface GetNodeFilePropertiesHeaderParam {
  headers?: RawHttpHeadersInput & GetNodeFilePropertiesHeaders;
}

export type GetNodeFilePropertiesParameters = GetNodeFilePropertiesQueryParam &
  GetNodeFilePropertiesHeaderParam &
  RequestParameters;

export interface ListNodeFilesHeaders {
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
}

export interface ListNodeFilesQueryParamProperties {
  /** The maximum time that the server can spend processing the request, in seconds. The default is 30 seconds. If the value is larger than 30, the default will be used instead.". */
  timeOut?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://learn.microsoft.com/rest/api/batchservice/odata-filters-in-batch#list-compute-node-files.
   */
  $filter?: string;
  /** Whether to list children of a directory. */
  recursive?: boolean;
}

export interface ListNodeFilesQueryParam {
  queryParameters?: ListNodeFilesQueryParamProperties;
}

export interface ListNodeFilesHeaderParam {
  headers?: RawHttpHeadersInput & ListNodeFilesHeaders;
}

export type ListNodeFilesParameters = ListNodeFilesQueryParam &
  ListNodeFilesHeaderParam &
  RequestParameters;
