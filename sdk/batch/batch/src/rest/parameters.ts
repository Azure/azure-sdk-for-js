// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import {
  BatchPool,
  BatchPoolEnableAutoScaleParameters,
  BatchPoolEvaluateAutoScaleParameters,
  BatchPoolResizeParameters,
  NodeRemoveParameters,
  BatchJob,
  BatchJobDisableParameters,
  BatchJobTerminateParameters,
  Certificate,
  BatchJobSchedule,
  BatchTask,
  BatchTaskCollection,
  ComputeNodeUser,
  NodeUpdateUserParameters,
  NodeRebootParameters,
  NodeReimageParameters,
  NodeDisableSchedulingParameters,
  UploadBatchServiceLogsConfiguration,
} from "./models.js";

export interface ApplicationsListApplicationsHeaders {
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
}

export interface ApplicationsListApplicationsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ApplicationsListApplicationsQueryParam {
  queryParameters?: ApplicationsListApplicationsQueryParamProperties;
}

export interface ApplicationsListApplicationsHeaderParam {
  headers?: RawHttpHeadersInput & ApplicationsListApplicationsHeaders;
}

export type ApplicationsListApplicationsParameters =
  ApplicationsListApplicationsQueryParam &
    ApplicationsListApplicationsHeaderParam &
    RequestParameters;
export type ApplicationsGetApplicationParameters = RequestParameters;
export type PoolListUsageMetricsParameters = RequestParameters;

export interface PoolGetAllPoolLifetimeStatisticsHeaders {
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

export interface PoolGetAllPoolLifetimeStatisticsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolGetAllPoolLifetimeStatisticsQueryParam {
  queryParameters?: PoolGetAllPoolLifetimeStatisticsQueryParamProperties;
}

export interface PoolGetAllPoolLifetimeStatisticsHeaderParam {
  headers?: RawHttpHeadersInput & PoolGetAllPoolLifetimeStatisticsHeaders;
}

export type PoolGetAllPoolLifetimeStatisticsParameters =
  PoolGetAllPoolLifetimeStatisticsQueryParam &
    PoolGetAllPoolLifetimeStatisticsHeaderParam &
    RequestParameters;

export interface PoolAddPoolHeaders {
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

export interface PoolAddPoolBodyParam {
  /** The Pool to be added. */
  body: BatchPool;
}

export interface PoolAddPoolQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolAddPoolQueryParam {
  queryParameters?: PoolAddPoolQueryParamProperties;
}

export interface PoolAddPoolHeaderParam {
  headers?: RawHttpHeadersInput & PoolAddPoolHeaders;
}

export type PoolAddPoolParameters = PoolAddPoolQueryParam &
  PoolAddPoolHeaderParam &
  PoolAddPoolBodyParam &
  RequestParameters;

export interface PoolListPoolsHeaders {
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
}

export interface PoolListPoolsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-pools.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

export interface PoolListPoolsQueryParam {
  queryParameters?: PoolListPoolsQueryParamProperties;
}

export interface PoolListPoolsHeaderParam {
  headers?: RawHttpHeadersInput & PoolListPoolsHeaders;
}

export type PoolListPoolsParameters = PoolListPoolsQueryParam &
  PoolListPoolsHeaderParam &
  RequestParameters;

export interface PoolDeletePoolHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface PoolDeletePoolQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolDeletePoolQueryParam {
  queryParameters?: PoolDeletePoolQueryParamProperties;
}

export interface PoolDeletePoolHeaderParam {
  headers?: RawHttpHeadersInput & PoolDeletePoolHeaders;
}

export type PoolDeletePoolParameters = PoolDeletePoolQueryParam &
  PoolDeletePoolHeaderParam &
  RequestParameters;

export interface PoolPoolExistsHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface PoolPoolExistsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolPoolExistsQueryParam {
  queryParameters?: PoolPoolExistsQueryParamProperties;
}

export interface PoolPoolExistsHeaderParam {
  headers?: RawHttpHeadersInput & PoolPoolExistsHeaders;
}

export type PoolPoolExistsParameters = PoolPoolExistsQueryParam &
  PoolPoolExistsHeaderParam &
  RequestParameters;

export interface PoolGetPoolHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface PoolGetPoolQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

export interface PoolGetPoolQueryParam {
  queryParameters?: PoolGetPoolQueryParamProperties;
}

export interface PoolGetPoolHeaderParam {
  headers?: RawHttpHeadersInput & PoolGetPoolHeaders;
}

export type PoolGetPoolParameters = PoolGetPoolQueryParam &
  PoolGetPoolHeaderParam &
  RequestParameters;

export interface PoolUpdatePoolHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface PoolUpdatePoolBodyParam {
  /** The parameters for the request. */
  body: BatchPool;
}

export interface PoolUpdatePoolQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolUpdatePoolQueryParam {
  queryParameters?: PoolUpdatePoolQueryParamProperties;
}

export interface PoolUpdatePoolHeaderParam {
  headers?: RawHttpHeadersInput & PoolUpdatePoolHeaders;
}

export type PoolUpdatePoolParameters = PoolUpdatePoolQueryParam &
  PoolUpdatePoolHeaderParam &
  PoolUpdatePoolBodyParam &
  RequestParameters;

export interface PoolDisableAutoScaleHeaders {
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

export interface PoolDisableAutoScaleQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolDisableAutoScaleQueryParam {
  queryParameters?: PoolDisableAutoScaleQueryParamProperties;
}

export interface PoolDisableAutoScaleHeaderParam {
  headers?: RawHttpHeadersInput & PoolDisableAutoScaleHeaders;
}

export type PoolDisableAutoScaleParameters = PoolDisableAutoScaleQueryParam &
  PoolDisableAutoScaleHeaderParam &
  RequestParameters;

export interface PoolEnableAutoScaleHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface PoolEnableAutoScaleBodyParam {
  /** The parameters for the request. */
  body: BatchPoolEnableAutoScaleParameters;
}

export interface PoolEnableAutoScaleQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolEnableAutoScaleQueryParam {
  queryParameters?: PoolEnableAutoScaleQueryParamProperties;
}

export interface PoolEnableAutoScaleHeaderParam {
  headers?: RawHttpHeadersInput & PoolEnableAutoScaleHeaders;
}

export type PoolEnableAutoScaleParameters = PoolEnableAutoScaleQueryParam &
  PoolEnableAutoScaleHeaderParam &
  PoolEnableAutoScaleBodyParam &
  RequestParameters;

export interface PoolEvaluateAutoScaleHeaders {
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

export interface PoolEvaluateAutoScaleBodyParam {
  /** The parameters for the request. */
  body: BatchPoolEvaluateAutoScaleParameters;
}

export interface PoolEvaluateAutoScaleQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolEvaluateAutoScaleQueryParam {
  queryParameters?: PoolEvaluateAutoScaleQueryParamProperties;
}

export interface PoolEvaluateAutoScaleHeaderParam {
  headers?: RawHttpHeadersInput & PoolEvaluateAutoScaleHeaders;
}

export type PoolEvaluateAutoScaleParameters = PoolEvaluateAutoScaleQueryParam &
  PoolEvaluateAutoScaleHeaderParam &
  PoolEvaluateAutoScaleBodyParam &
  RequestParameters;

export interface PoolResizePoolHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface PoolResizePoolBodyParam {
  /** The parameters for the request. */
  body: BatchPoolResizeParameters;
}

export interface PoolResizePoolQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolResizePoolQueryParam {
  queryParameters?: PoolResizePoolQueryParamProperties;
}

export interface PoolResizePoolHeaderParam {
  headers?: RawHttpHeadersInput & PoolResizePoolHeaders;
}

export type PoolResizePoolParameters = PoolResizePoolQueryParam &
  PoolResizePoolHeaderParam &
  PoolResizePoolBodyParam &
  RequestParameters;

export interface PoolStopResizePoolHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface PoolStopResizePoolQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolStopResizePoolQueryParam {
  queryParameters?: PoolStopResizePoolQueryParamProperties;
}

export interface PoolStopResizePoolHeaderParam {
  headers?: RawHttpHeadersInput & PoolStopResizePoolHeaders;
}

export type PoolStopResizePoolParameters = PoolStopResizePoolQueryParam &
  PoolStopResizePoolHeaderParam &
  RequestParameters;

export interface PoolUpdatePoolPropertiesHeaders {
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

export interface PoolUpdatePoolPropertiesBodyParam {
  /** The parameters for the request. */
  body: BatchPool;
}

export interface PoolUpdatePoolPropertiesQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolUpdatePoolPropertiesQueryParam {
  queryParameters?: PoolUpdatePoolPropertiesQueryParamProperties;
}

export interface PoolUpdatePoolPropertiesHeaderParam {
  headers?: RawHttpHeadersInput & PoolUpdatePoolPropertiesHeaders;
}

export type PoolUpdatePoolPropertiesParameters =
  PoolUpdatePoolPropertiesQueryParam &
    PoolUpdatePoolPropertiesHeaderParam &
    PoolUpdatePoolPropertiesBodyParam &
    RequestParameters;

export interface PoolRemovePoolNodesHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface PoolRemovePoolNodesBodyParam {
  /** The parameters for the request. */
  body: NodeRemoveParameters;
}

export interface PoolRemovePoolNodesQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolRemovePoolNodesQueryParam {
  queryParameters?: PoolRemovePoolNodesQueryParamProperties;
}

export interface PoolRemovePoolNodesHeaderParam {
  headers?: RawHttpHeadersInput & PoolRemovePoolNodesHeaders;
}

export type PoolRemovePoolNodesParameters = PoolRemovePoolNodesQueryParam &
  PoolRemovePoolNodesHeaderParam &
  PoolRemovePoolNodesBodyParam &
  RequestParameters;

export interface AccountListSupportedImagesHeaders {
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
}

export interface AccountListSupportedImagesQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-support-images.
   */
  $filter?: string;
}

export interface AccountListSupportedImagesQueryParam {
  queryParameters?: AccountListSupportedImagesQueryParamProperties;
}

export interface AccountListSupportedImagesHeaderParam {
  headers?: RawHttpHeadersInput & AccountListSupportedImagesHeaders;
}

export type AccountListSupportedImagesParameters =
  AccountListSupportedImagesQueryParam &
    AccountListSupportedImagesHeaderParam &
    RequestParameters;

export interface AccountListPoolNodeCountsHeaders {
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
}

export interface AccountListPoolNodeCountsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-support-images.
   */
  $filter?: string;
}

export interface AccountListPoolNodeCountsQueryParam {
  queryParameters?: AccountListPoolNodeCountsQueryParamProperties;
}

export interface AccountListPoolNodeCountsHeaderParam {
  headers?: RawHttpHeadersInput & AccountListPoolNodeCountsHeaders;
}

export type AccountListPoolNodeCountsParameters =
  AccountListPoolNodeCountsQueryParam &
    AccountListPoolNodeCountsHeaderParam &
    RequestParameters;

export interface JobGetAllLifetimeStatisticsHeaders {
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

export interface JobGetAllLifetimeStatisticsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobGetAllLifetimeStatisticsQueryParam {
  queryParameters?: JobGetAllLifetimeStatisticsQueryParamProperties;
}

export interface JobGetAllLifetimeStatisticsHeaderParam {
  headers?: RawHttpHeadersInput & JobGetAllLifetimeStatisticsHeaders;
}

export type JobGetAllLifetimeStatisticsParameters =
  JobGetAllLifetimeStatisticsQueryParam &
    JobGetAllLifetimeStatisticsHeaderParam &
    RequestParameters;

export interface JobDeleteJobHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobDeleteJobQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobDeleteJobQueryParam {
  queryParameters?: JobDeleteJobQueryParamProperties;
}

export interface JobDeleteJobHeaderParam {
  headers?: RawHttpHeadersInput & JobDeleteJobHeaders;
}

export type JobDeleteJobParameters = JobDeleteJobQueryParam &
  JobDeleteJobHeaderParam &
  RequestParameters;

export interface JobGetJobHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobGetJobQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

export interface JobGetJobQueryParam {
  queryParameters?: JobGetJobQueryParamProperties;
}

export interface JobGetJobHeaderParam {
  headers?: RawHttpHeadersInput & JobGetJobHeaders;
}

export type JobGetJobParameters = JobGetJobQueryParam &
  JobGetJobHeaderParam &
  RequestParameters;

export interface JobUpdateJobHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobUpdateJobBodyParam {
  /** The parameters for the request. */
  body: BatchJob;
}

export interface JobUpdateJobQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobUpdateJobQueryParam {
  queryParameters?: JobUpdateJobQueryParamProperties;
}

export interface JobUpdateJobHeaderParam {
  headers?: RawHttpHeadersInput & JobUpdateJobHeaders;
}

export type JobUpdateJobParameters = JobUpdateJobQueryParam &
  JobUpdateJobHeaderParam &
  JobUpdateJobBodyParam &
  RequestParameters;

export interface JobReplaceJobHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobReplaceJobBodyParam {
  /** The parameters for the request. */
  body: BatchJob;
}

export interface JobReplaceJobQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobReplaceJobQueryParam {
  queryParameters?: JobReplaceJobQueryParamProperties;
}

export interface JobReplaceJobHeaderParam {
  headers?: RawHttpHeadersInput & JobReplaceJobHeaders;
}

export type JobReplaceJobParameters = JobReplaceJobQueryParam &
  JobReplaceJobHeaderParam &
  JobReplaceJobBodyParam &
  RequestParameters;

export interface JobDisableJobHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobDisableJobBodyParam {
  /** The parameters for the request. */
  body: BatchJobDisableParameters;
}

export interface JobDisableJobQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobDisableJobQueryParam {
  queryParameters?: JobDisableJobQueryParamProperties;
}

export interface JobDisableJobHeaderParam {
  headers?: RawHttpHeadersInput & JobDisableJobHeaders;
}

export type JobDisableJobParameters = JobDisableJobQueryParam &
  JobDisableJobHeaderParam &
  JobDisableJobBodyParam &
  RequestParameters;

export interface JobEnableJobHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobEnableJobQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobEnableJobQueryParam {
  queryParameters?: JobEnableJobQueryParamProperties;
}

export interface JobEnableJobHeaderParam {
  headers?: RawHttpHeadersInput & JobEnableJobHeaders;
}

export type JobEnableJobParameters = JobEnableJobQueryParam &
  JobEnableJobHeaderParam &
  RequestParameters;

export interface JobTerminateJobHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobTerminateJobBodyParam {
  /** The parameters for the request. */
  body?: BatchJobTerminateParameters;
}

export interface JobTerminateJobQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobTerminateJobQueryParam {
  queryParameters?: JobTerminateJobQueryParamProperties;
}

export interface JobTerminateJobHeaderParam {
  headers?: RawHttpHeadersInput & JobTerminateJobHeaders;
}

export type JobTerminateJobParameters = JobTerminateJobQueryParam &
  JobTerminateJobHeaderParam &
  JobTerminateJobBodyParam &
  RequestParameters;

export interface JobAddJobHeaders {
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

export interface JobAddJobBodyParam {
  /** The Job to be added. */
  body: BatchJob;
}

export interface JobAddJobQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobAddJobQueryParam {
  queryParameters?: JobAddJobQueryParamProperties;
}

export interface JobAddJobHeaderParam {
  headers?: RawHttpHeadersInput & JobAddJobHeaders;
}

export type JobAddJobParameters = JobAddJobQueryParam &
  JobAddJobHeaderParam &
  JobAddJobBodyParam &
  RequestParameters;

export interface JobListJobsHeaders {
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
}

export interface JobListJobsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-jobs.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

export interface JobListJobsQueryParam {
  queryParameters?: JobListJobsQueryParamProperties;
}

export interface JobListJobsHeaderParam {
  headers?: RawHttpHeadersInput & JobListJobsHeaders;
}

export type JobListJobsParameters = JobListJobsQueryParam &
  JobListJobsHeaderParam &
  RequestParameters;

export interface JobListFromJobScheduleHeaders {
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
}

export interface JobListFromJobScheduleQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-jobs-in-a-job-schedule.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

export interface JobListFromJobScheduleQueryParam {
  queryParameters?: JobListFromJobScheduleQueryParamProperties;
}

export interface JobListFromJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & JobListFromJobScheduleHeaders;
}

export type JobListFromJobScheduleParameters =
  JobListFromJobScheduleQueryParam &
    JobListFromJobScheduleHeaderParam &
    RequestParameters;

export interface JobListPreparationAndReleaseTaskStatusHeaders {
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
}

export interface JobListPreparationAndReleaseTaskStatusQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-job-preparation-and-release-status.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
}

export interface JobListPreparationAndReleaseTaskStatusQueryParam {
  queryParameters?: JobListPreparationAndReleaseTaskStatusQueryParamProperties;
}

export interface JobListPreparationAndReleaseTaskStatusHeaderParam {
  headers?: RawHttpHeadersInput & JobListPreparationAndReleaseTaskStatusHeaders;
}

export type JobListPreparationAndReleaseTaskStatusParameters =
  JobListPreparationAndReleaseTaskStatusQueryParam &
    JobListPreparationAndReleaseTaskStatusHeaderParam &
    RequestParameters;

export interface JobGetTaskCountsHeaders {
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

export interface JobGetTaskCountsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobGetTaskCountsQueryParam {
  queryParameters?: JobGetTaskCountsQueryParamProperties;
}

export interface JobGetTaskCountsHeaderParam {
  headers?: RawHttpHeadersInput & JobGetTaskCountsHeaders;
}

export type JobGetTaskCountsParameters = JobGetTaskCountsQueryParam &
  JobGetTaskCountsHeaderParam &
  RequestParameters;

export interface CertificatesAddCertificateHeaders {
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

export interface CertificatesAddCertificateBodyParam {
  /** The Certificate to be added. */
  body: Certificate;
}

export interface CertificatesAddCertificateQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface CertificatesAddCertificateQueryParam {
  queryParameters?: CertificatesAddCertificateQueryParamProperties;
}

export interface CertificatesAddCertificateHeaderParam {
  headers?: RawHttpHeadersInput & CertificatesAddCertificateHeaders;
}

export type CertificatesAddCertificateParameters =
  CertificatesAddCertificateQueryParam &
    CertificatesAddCertificateHeaderParam &
    CertificatesAddCertificateBodyParam &
    RequestParameters;

export interface CertificatesListCertificatesHeaders {
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
}

export interface CertificatesListCertificatesQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-certificates.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
}

export interface CertificatesListCertificatesQueryParam {
  queryParameters?: CertificatesListCertificatesQueryParamProperties;
}

export interface CertificatesListCertificatesHeaderParam {
  headers?: RawHttpHeadersInput & CertificatesListCertificatesHeaders;
}

export type CertificatesListCertificatesParameters =
  CertificatesListCertificatesQueryParam &
    CertificatesListCertificatesHeaderParam &
    RequestParameters;

export interface CertificatesCancelCertificateDeletionHeaders {
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

export interface CertificatesCancelCertificateDeletionQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface CertificatesCancelCertificateDeletionQueryParam {
  queryParameters?: CertificatesCancelCertificateDeletionQueryParamProperties;
}

export interface CertificatesCancelCertificateDeletionHeaderParam {
  headers?: RawHttpHeadersInput & CertificatesCancelCertificateDeletionHeaders;
}

export type CertificatesCancelCertificateDeletionParameters =
  CertificatesCancelCertificateDeletionQueryParam &
    CertificatesCancelCertificateDeletionHeaderParam &
    RequestParameters;

export interface CertificatesDeleteCertificateHeaders {
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

export interface CertificatesDeleteCertificateQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface CertificatesDeleteCertificateQueryParam {
  queryParameters?: CertificatesDeleteCertificateQueryParamProperties;
}

export interface CertificatesDeleteCertificateHeaderParam {
  headers?: RawHttpHeadersInput & CertificatesDeleteCertificateHeaders;
}

export type CertificatesDeleteCertificateParameters =
  CertificatesDeleteCertificateQueryParam &
    CertificatesDeleteCertificateHeaderParam &
    RequestParameters;

export interface CertificatesGetCertificateHeaders {
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

export interface CertificatesGetCertificateQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string;
}

export interface CertificatesGetCertificateQueryParam {
  queryParameters?: CertificatesGetCertificateQueryParamProperties;
}

export interface CertificatesGetCertificateHeaderParam {
  headers?: RawHttpHeadersInput & CertificatesGetCertificateHeaders;
}

export type CertificatesGetCertificateParameters =
  CertificatesGetCertificateQueryParam &
    CertificatesGetCertificateHeaderParam &
    RequestParameters;

export interface FileDeleteFileFromTaskHeaders {
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

export interface FileDeleteFileFromTaskQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * Whether to delete children of a directory. If the filePath parameter represents
   * a directory instead of a file, you can set recursive to true to delete the
   * directory and all of the files and subdirectories in it. If recursive is false
   * then the directory must be empty or deletion will fail.
   */
  recursive?: boolean;
}

export interface FileDeleteFileFromTaskQueryParam {
  queryParameters?: FileDeleteFileFromTaskQueryParamProperties;
}

export interface FileDeleteFileFromTaskHeaderParam {
  headers?: RawHttpHeadersInput & FileDeleteFileFromTaskHeaders;
}

export type FileDeleteFileFromTaskParameters =
  FileDeleteFileFromTaskQueryParam &
    FileDeleteFileFromTaskHeaderParam &
    RequestParameters;

export interface FileGetFileFromTaskHeaders {
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
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
  /**
   * The byte range to be retrieved. The default is to retrieve the entire file. The
   * format is bytes=startRange-endRange.
   */
  "ocp-range"?: string;
}

export interface FileGetFileFromTaskQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface FileGetFileFromTaskQueryParam {
  queryParameters?: FileGetFileFromTaskQueryParamProperties;
}

export interface FileGetFileFromTaskHeaderParam {
  headers?: RawHttpHeadersInput & FileGetFileFromTaskHeaders;
}

export type FileGetFileFromTaskParameters = FileGetFileFromTaskQueryParam &
  FileGetFileFromTaskHeaderParam &
  RequestParameters;

export interface FileGetFilePropertiesFromTaskHeaders {
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
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface FileGetFilePropertiesFromTaskQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface FileGetFilePropertiesFromTaskQueryParam {
  queryParameters?: FileGetFilePropertiesFromTaskQueryParamProperties;
}

export interface FileGetFilePropertiesFromTaskHeaderParam {
  headers?: RawHttpHeadersInput & FileGetFilePropertiesFromTaskHeaders;
}

export type FileGetFilePropertiesFromTaskParameters =
  FileGetFilePropertiesFromTaskQueryParam &
    FileGetFilePropertiesFromTaskHeaderParam &
    RequestParameters;

export interface FileDeleteFromComputeNodeHeaders {
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

export interface FileDeleteFromComputeNodeQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * Whether to delete children of a directory. If the filePath parameter represents
   * a directory instead of a file, you can set recursive to true to delete the
   * directory and all of the files and subdirectories in it. If recursive is false
   * then the directory must be empty or deletion will fail.
   */
  recursive?: boolean;
}

export interface FileDeleteFromComputeNodeQueryParam {
  queryParameters?: FileDeleteFromComputeNodeQueryParamProperties;
}

export interface FileDeleteFromComputeNodeHeaderParam {
  headers?: RawHttpHeadersInput & FileDeleteFromComputeNodeHeaders;
}

export type FileDeleteFromComputeNodeParameters =
  FileDeleteFromComputeNodeQueryParam &
    FileDeleteFromComputeNodeHeaderParam &
    RequestParameters;

export interface FileGetFileFromComputeNodeHeaders {
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
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
  /**
   * The byte range to be retrieved. The default is to retrieve the entire file. The
   * format is bytes=startRange-endRange.
   */
  "ocp-range"?: string;
}

export interface FileGetFileFromComputeNodeQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface FileGetFileFromComputeNodeQueryParam {
  queryParameters?: FileGetFileFromComputeNodeQueryParamProperties;
}

export interface FileGetFileFromComputeNodeHeaderParam {
  headers?: RawHttpHeadersInput & FileGetFileFromComputeNodeHeaders;
}

export type FileGetFileFromComputeNodeParameters =
  FileGetFileFromComputeNodeQueryParam &
    FileGetFileFromComputeNodeHeaderParam &
    RequestParameters;

export interface FileGetFilePropertiesFromComputeNodeHeaders {
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
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface FileGetFilePropertiesFromComputeNodeQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface FileGetFilePropertiesFromComputeNodeQueryParam {
  queryParameters?: FileGetFilePropertiesFromComputeNodeQueryParamProperties;
}

export interface FileGetFilePropertiesFromComputeNodeHeaderParam {
  headers?: RawHttpHeadersInput & FileGetFilePropertiesFromComputeNodeHeaders;
}

export type FileGetFilePropertiesFromComputeNodeParameters =
  FileGetFilePropertiesFromComputeNodeQueryParam &
    FileGetFilePropertiesFromComputeNodeHeaderParam &
    RequestParameters;

export interface FileListFilesFromTaskHeaders {
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
}

export interface FileListFilesFromTaskQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-task-files.
   */
  $filter?: string;
  /**
   * Whether to list children of the Task directory. This parameter can be used in
   * combination with the filter parameter to list specific type of files.
   */
  recursive?: boolean;
}

export interface FileListFilesFromTaskQueryParam {
  queryParameters?: FileListFilesFromTaskQueryParamProperties;
}

export interface FileListFilesFromTaskHeaderParam {
  headers?: RawHttpHeadersInput & FileListFilesFromTaskHeaders;
}

export type FileListFilesFromTaskParameters = FileListFilesFromTaskQueryParam &
  FileListFilesFromTaskHeaderParam &
  RequestParameters;

export interface FileListFilesFromComputeNodeHeaders {
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
}

export interface FileListFilesFromComputeNodeQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-compute-node-files.
   */
  $filter?: string;
  /** Whether to list children of a directory. */
  recursive?: boolean;
}

export interface FileListFilesFromComputeNodeQueryParam {
  queryParameters?: FileListFilesFromComputeNodeQueryParamProperties;
}

export interface FileListFilesFromComputeNodeHeaderParam {
  headers?: RawHttpHeadersInput & FileListFilesFromComputeNodeHeaders;
}

export type FileListFilesFromComputeNodeParameters =
  FileListFilesFromComputeNodeQueryParam &
    FileListFilesFromComputeNodeHeaderParam &
    RequestParameters;

export interface JobScheduleJobScheduleExistsHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobScheduleJobScheduleExistsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobScheduleJobScheduleExistsQueryParam {
  queryParameters?: JobScheduleJobScheduleExistsQueryParamProperties;
}

export interface JobScheduleJobScheduleExistsHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleJobScheduleExistsHeaders;
}

export type JobScheduleJobScheduleExistsParameters =
  JobScheduleJobScheduleExistsQueryParam &
    JobScheduleJobScheduleExistsHeaderParam &
    RequestParameters;

export interface JobScheduleDeleteJobScheduleHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobScheduleDeleteJobScheduleQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobScheduleDeleteJobScheduleQueryParam {
  queryParameters?: JobScheduleDeleteJobScheduleQueryParamProperties;
}

export interface JobScheduleDeleteJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleDeleteJobScheduleHeaders;
}

export type JobScheduleDeleteJobScheduleParameters =
  JobScheduleDeleteJobScheduleQueryParam &
    JobScheduleDeleteJobScheduleHeaderParam &
    RequestParameters;

export interface JobScheduleGetJobScheduleHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobScheduleGetJobScheduleQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

export interface JobScheduleGetJobScheduleQueryParam {
  queryParameters?: JobScheduleGetJobScheduleQueryParamProperties;
}

export interface JobScheduleGetJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleGetJobScheduleHeaders;
}

export type JobScheduleGetJobScheduleParameters =
  JobScheduleGetJobScheduleQueryParam &
    JobScheduleGetJobScheduleHeaderParam &
    RequestParameters;

export interface JobScheduleUpdateJobScheduleHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobScheduleUpdateJobScheduleBodyParam {
  /** The parameters for the request. */
  body: BatchJobSchedule;
}

export interface JobScheduleUpdateJobScheduleQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobScheduleUpdateJobScheduleQueryParam {
  queryParameters?: JobScheduleUpdateJobScheduleQueryParamProperties;
}

export interface JobScheduleUpdateJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleUpdateJobScheduleHeaders;
}

export type JobScheduleUpdateJobScheduleParameters =
  JobScheduleUpdateJobScheduleQueryParam &
    JobScheduleUpdateJobScheduleHeaderParam &
    JobScheduleUpdateJobScheduleBodyParam &
    RequestParameters;

export interface JobScheduleReplaceJobScheduleHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobScheduleReplaceJobScheduleBodyParam {
  /** The parameters for the request. */
  body: BatchJobSchedule;
}

export interface JobScheduleReplaceJobScheduleQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobScheduleReplaceJobScheduleQueryParam {
  queryParameters?: JobScheduleReplaceJobScheduleQueryParamProperties;
}

export interface JobScheduleReplaceJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleReplaceJobScheduleHeaders;
}

export type JobScheduleReplaceJobScheduleParameters =
  JobScheduleReplaceJobScheduleQueryParam &
    JobScheduleReplaceJobScheduleHeaderParam &
    JobScheduleReplaceJobScheduleBodyParam &
    RequestParameters;

export interface JobScheduleDisableJobScheduleHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobScheduleDisableJobScheduleQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobScheduleDisableJobScheduleQueryParam {
  queryParameters?: JobScheduleDisableJobScheduleQueryParamProperties;
}

export interface JobScheduleDisableJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleDisableJobScheduleHeaders;
}

export type JobScheduleDisableJobScheduleParameters =
  JobScheduleDisableJobScheduleQueryParam &
    JobScheduleDisableJobScheduleHeaderParam &
    RequestParameters;

export interface JobScheduleEnableJobScheduleHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobScheduleEnableJobScheduleQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobScheduleEnableJobScheduleQueryParam {
  queryParameters?: JobScheduleEnableJobScheduleQueryParamProperties;
}

export interface JobScheduleEnableJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleEnableJobScheduleHeaders;
}

export type JobScheduleEnableJobScheduleParameters =
  JobScheduleEnableJobScheduleQueryParam &
    JobScheduleEnableJobScheduleHeaderParam &
    RequestParameters;

export interface JobScheduleTerminateJobScheduleHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface JobScheduleTerminateJobScheduleQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobScheduleTerminateJobScheduleQueryParam {
  queryParameters?: JobScheduleTerminateJobScheduleQueryParamProperties;
}

export interface JobScheduleTerminateJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleTerminateJobScheduleHeaders;
}

export type JobScheduleTerminateJobScheduleParameters =
  JobScheduleTerminateJobScheduleQueryParam &
    JobScheduleTerminateJobScheduleHeaderParam &
    RequestParameters;

export interface JobScheduleAddJobScheduleHeaders {
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

export interface JobScheduleAddJobScheduleBodyParam {
  /** The Job Schedule to be added. */
  body: BatchJobSchedule;
}

export interface JobScheduleAddJobScheduleQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobScheduleAddJobScheduleQueryParam {
  queryParameters?: JobScheduleAddJobScheduleQueryParamProperties;
}

export interface JobScheduleAddJobScheduleHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleAddJobScheduleHeaders;
}

export type JobScheduleAddJobScheduleParameters =
  JobScheduleAddJobScheduleQueryParam &
    JobScheduleAddJobScheduleHeaderParam &
    JobScheduleAddJobScheduleBodyParam &
    RequestParameters;

export interface JobScheduleListJobSchedulesHeaders {
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
}

export interface JobScheduleListJobSchedulesQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-job-schedules.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

export interface JobScheduleListJobSchedulesQueryParam {
  queryParameters?: JobScheduleListJobSchedulesQueryParamProperties;
}

export interface JobScheduleListJobSchedulesHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleListJobSchedulesHeaders;
}

export type JobScheduleListJobSchedulesParameters =
  JobScheduleListJobSchedulesQueryParam &
    JobScheduleListJobSchedulesHeaderParam &
    RequestParameters;

export interface TaskAddTaskHeaders {
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

export interface TaskAddTaskBodyParam {
  /** The Task to be added. */
  body: BatchTask;
}

export interface TaskAddTaskQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface TaskAddTaskQueryParam {
  queryParameters?: TaskAddTaskQueryParamProperties;
}

export interface TaskAddTaskHeaderParam {
  headers?: RawHttpHeadersInput & TaskAddTaskHeaders;
}

export type TaskAddTaskParameters = TaskAddTaskQueryParam &
  TaskAddTaskHeaderParam &
  TaskAddTaskBodyParam &
  RequestParameters;

export interface TaskListTasksHeaders {
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
}

export interface TaskListTasksQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-tasks.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

export interface TaskListTasksQueryParam {
  queryParameters?: TaskListTasksQueryParamProperties;
}

export interface TaskListTasksHeaderParam {
  headers?: RawHttpHeadersInput & TaskListTasksHeaders;
}

export type TaskListTasksParameters = TaskListTasksQueryParam &
  TaskListTasksHeaderParam &
  RequestParameters;

export interface TaskAddCollectionHeaders {
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

export interface TaskAddCollectionBodyParam {
  /** The Tasks to be added. */
  body: BatchTaskCollection;
}

export interface TaskAddCollectionQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface TaskAddCollectionQueryParam {
  queryParameters?: TaskAddCollectionQueryParamProperties;
}

export interface TaskAddCollectionHeaderParam {
  headers?: RawHttpHeadersInput & TaskAddCollectionHeaders;
}

export type TaskAddCollectionParameters = TaskAddCollectionQueryParam &
  TaskAddCollectionHeaderParam &
  TaskAddCollectionBodyParam &
  RequestParameters;

export interface TaskDeleteTaskHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface TaskDeleteTaskQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface TaskDeleteTaskQueryParam {
  queryParameters?: TaskDeleteTaskQueryParamProperties;
}

export interface TaskDeleteTaskHeaderParam {
  headers?: RawHttpHeadersInput & TaskDeleteTaskHeaders;
}

export type TaskDeleteTaskParameters = TaskDeleteTaskQueryParam &
  TaskDeleteTaskHeaderParam &
  RequestParameters;

export interface TaskGetTaskHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface TaskGetTaskQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string;
  /** An OData $expand clause. */
  $expand?: string;
}

export interface TaskGetTaskQueryParam {
  queryParameters?: TaskGetTaskQueryParamProperties;
}

export interface TaskGetTaskHeaderParam {
  headers?: RawHttpHeadersInput & TaskGetTaskHeaders;
}

export type TaskGetTaskParameters = TaskGetTaskQueryParam &
  TaskGetTaskHeaderParam &
  RequestParameters;

export interface TaskUpdateTaskHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface TaskUpdateTaskBodyParam {
  /** The parameters for the request. */
  body: BatchTask;
}

export interface TaskUpdateTaskQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface TaskUpdateTaskQueryParam {
  queryParameters?: TaskUpdateTaskQueryParamProperties;
}

export interface TaskUpdateTaskHeaderParam {
  headers?: RawHttpHeadersInput & TaskUpdateTaskHeaders;
}

export type TaskUpdateTaskParameters = TaskUpdateTaskQueryParam &
  TaskUpdateTaskHeaderParam &
  TaskUpdateTaskBodyParam &
  RequestParameters;

export interface TaskListSubtasksHeaders {
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

export interface TaskListSubtasksQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string;
}

export interface TaskListSubtasksQueryParam {
  queryParameters?: TaskListSubtasksQueryParamProperties;
}

export interface TaskListSubtasksHeaderParam {
  headers?: RawHttpHeadersInput & TaskListSubtasksHeaders;
}

export type TaskListSubtasksParameters = TaskListSubtasksQueryParam &
  TaskListSubtasksHeaderParam &
  RequestParameters;

export interface TaskTerminateTaskHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface TaskTerminateTaskQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface TaskTerminateTaskQueryParam {
  queryParameters?: TaskTerminateTaskQueryParamProperties;
}

export interface TaskTerminateTaskHeaderParam {
  headers?: RawHttpHeadersInput & TaskTerminateTaskHeaders;
}

export type TaskTerminateTaskParameters = TaskTerminateTaskQueryParam &
  TaskTerminateTaskHeaderParam &
  RequestParameters;

export interface TaskReactivateTaskHeaders {
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
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service exactly matches the value specified by the client.
   */
  "if-match"?: string;
  /**
   * An ETag value associated with the version of the resource known to the client.
   * The operation will be performed only if the resource's current ETag on the
   * service does not match the value specified by the client.
   */
  "if-none-match"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  "if-modified-since"?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  "if-unmodified-since"?: string;
}

export interface TaskReactivateTaskQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface TaskReactivateTaskQueryParam {
  queryParameters?: TaskReactivateTaskQueryParamProperties;
}

export interface TaskReactivateTaskHeaderParam {
  headers?: RawHttpHeadersInput & TaskReactivateTaskHeaders;
}

export type TaskReactivateTaskParameters = TaskReactivateTaskQueryParam &
  TaskReactivateTaskHeaderParam &
  RequestParameters;

export interface ComputeNodesAddUserHeaders {
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

export interface ComputeNodesAddUserBodyParam {
  /** The user Account to be created. */
  body: ComputeNodeUser;
}

export interface ComputeNodesAddUserQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodesAddUserQueryParam {
  queryParameters?: ComputeNodesAddUserQueryParamProperties;
}

export interface ComputeNodesAddUserHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesAddUserHeaders;
}

export type ComputeNodesAddUserParameters = ComputeNodesAddUserQueryParam &
  ComputeNodesAddUserHeaderParam &
  ComputeNodesAddUserBodyParam &
  RequestParameters;

export interface ComputeNodesDeleteUserHeaders {
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

export interface ComputeNodesDeleteUserQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodesDeleteUserQueryParam {
  queryParameters?: ComputeNodesDeleteUserQueryParamProperties;
}

export interface ComputeNodesDeleteUserHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesDeleteUserHeaders;
}

export type ComputeNodesDeleteUserParameters =
  ComputeNodesDeleteUserQueryParam &
    ComputeNodesDeleteUserHeaderParam &
    RequestParameters;

export interface ComputeNodesUpdateUserHeaders {
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

export interface ComputeNodesUpdateUserBodyParam {
  /** The parameters for the request. */
  body: NodeUpdateUserParameters;
}

export interface ComputeNodesUpdateUserQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodesUpdateUserQueryParam {
  queryParameters?: ComputeNodesUpdateUserQueryParamProperties;
}

export interface ComputeNodesUpdateUserHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesUpdateUserHeaders;
}

export type ComputeNodesUpdateUserParameters =
  ComputeNodesUpdateUserQueryParam &
    ComputeNodesUpdateUserHeaderParam &
    ComputeNodesUpdateUserBodyParam &
    RequestParameters;

export interface ComputeNodesGetNodeHeaders {
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

export interface ComputeNodesGetNodeQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string;
}

export interface ComputeNodesGetNodeQueryParam {
  queryParameters?: ComputeNodesGetNodeQueryParamProperties;
}

export interface ComputeNodesGetNodeHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesGetNodeHeaders;
}

export type ComputeNodesGetNodeParameters = ComputeNodesGetNodeQueryParam &
  ComputeNodesGetNodeHeaderParam &
  RequestParameters;

export interface ComputeNodesRebootNodeHeaders {
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

export interface ComputeNodesRebootNodeBodyParam {
  /** The parameters for the request. */
  body?: NodeRebootParameters;
}

export interface ComputeNodesRebootNodeQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodesRebootNodeQueryParam {
  queryParameters?: ComputeNodesRebootNodeQueryParamProperties;
}

export interface ComputeNodesRebootNodeHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesRebootNodeHeaders;
}

export type ComputeNodesRebootNodeParameters =
  ComputeNodesRebootNodeQueryParam &
    ComputeNodesRebootNodeHeaderParam &
    ComputeNodesRebootNodeBodyParam &
    RequestParameters;

export interface ComputeNodesReimageNodeHeaders {
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

export interface ComputeNodesReimageNodeBodyParam {
  /** The parameters for the request. */
  body?: NodeReimageParameters;
}

export interface ComputeNodesReimageNodeQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodesReimageNodeQueryParam {
  queryParameters?: ComputeNodesReimageNodeQueryParamProperties;
}

export interface ComputeNodesReimageNodeHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesReimageNodeHeaders;
}

export type ComputeNodesReimageNodeParameters =
  ComputeNodesReimageNodeQueryParam &
    ComputeNodesReimageNodeHeaderParam &
    ComputeNodesReimageNodeBodyParam &
    RequestParameters;

export interface ComputeNodesDisableSchedulingHeaders {
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

export interface ComputeNodesDisableSchedulingBodyParam {
  /** The parameters for the request. */
  body?: NodeDisableSchedulingParameters;
}

export interface ComputeNodesDisableSchedulingQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodesDisableSchedulingQueryParam {
  queryParameters?: ComputeNodesDisableSchedulingQueryParamProperties;
}

export interface ComputeNodesDisableSchedulingHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesDisableSchedulingHeaders;
}

export type ComputeNodesDisableSchedulingParameters =
  ComputeNodesDisableSchedulingQueryParam &
    ComputeNodesDisableSchedulingHeaderParam &
    ComputeNodesDisableSchedulingBodyParam &
    RequestParameters;

export interface ComputeNodesEnableSchedulingHeaders {
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

export interface ComputeNodesEnableSchedulingQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodesEnableSchedulingQueryParam {
  queryParameters?: ComputeNodesEnableSchedulingQueryParamProperties;
}

export interface ComputeNodesEnableSchedulingHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesEnableSchedulingHeaders;
}

export type ComputeNodesEnableSchedulingParameters =
  ComputeNodesEnableSchedulingQueryParam &
    ComputeNodesEnableSchedulingHeaderParam &
    RequestParameters;

export interface ComputeNodesGetRemoteLoginSettingsHeaders {
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

export interface ComputeNodesGetRemoteLoginSettingsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodesGetRemoteLoginSettingsQueryParam {
  queryParameters?: ComputeNodesGetRemoteLoginSettingsQueryParamProperties;
}

export interface ComputeNodesGetRemoteLoginSettingsHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesGetRemoteLoginSettingsHeaders;
}

export type ComputeNodesGetRemoteLoginSettingsParameters =
  ComputeNodesGetRemoteLoginSettingsQueryParam &
    ComputeNodesGetRemoteLoginSettingsHeaderParam &
    RequestParameters;

export interface ComputeNodesGetRemoteDesktopHeaders {
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

export interface ComputeNodesGetRemoteDesktopQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodesGetRemoteDesktopQueryParam {
  queryParameters?: ComputeNodesGetRemoteDesktopQueryParamProperties;
}

export interface ComputeNodesGetRemoteDesktopHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesGetRemoteDesktopHeaders;
}

export type ComputeNodesGetRemoteDesktopParameters =
  ComputeNodesGetRemoteDesktopQueryParam &
    ComputeNodesGetRemoteDesktopHeaderParam &
    RequestParameters;

export interface ComputeNodesUploadBatchServiceLogsHeaders {
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

export interface ComputeNodesUploadBatchServiceLogsBodyParam {
  /** The Azure Batch service log files upload configuration. */
  body: UploadBatchServiceLogsConfiguration;
}

export interface ComputeNodesUploadBatchServiceLogsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodesUploadBatchServiceLogsQueryParam {
  queryParameters?: ComputeNodesUploadBatchServiceLogsQueryParamProperties;
}

export interface ComputeNodesUploadBatchServiceLogsHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesUploadBatchServiceLogsHeaders;
}

export type ComputeNodesUploadBatchServiceLogsParameters =
  ComputeNodesUploadBatchServiceLogsQueryParam &
    ComputeNodesUploadBatchServiceLogsHeaderParam &
    ComputeNodesUploadBatchServiceLogsBodyParam &
    RequestParameters;

export interface ComputeNodesListNodesHeaders {
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
}

export interface ComputeNodesListNodesQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-nodes-in-a-pool.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
}

export interface ComputeNodesListNodesQueryParam {
  queryParameters?: ComputeNodesListNodesQueryParamProperties;
}

export interface ComputeNodesListNodesHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesListNodesHeaders;
}

export type ComputeNodesListNodesParameters = ComputeNodesListNodesQueryParam &
  ComputeNodesListNodesHeaderParam &
  RequestParameters;

export interface ComputeNodeExtensionsGetExtensionHeaders {
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

export interface ComputeNodeExtensionsGetExtensionQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string;
}

export interface ComputeNodeExtensionsGetExtensionQueryParam {
  queryParameters?: ComputeNodeExtensionsGetExtensionQueryParamProperties;
}

export interface ComputeNodeExtensionsGetExtensionHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeExtensionsGetExtensionHeaders;
}

export type ComputeNodeExtensionsGetExtensionParameters =
  ComputeNodeExtensionsGetExtensionQueryParam &
    ComputeNodeExtensionsGetExtensionHeaderParam &
    RequestParameters;

export interface ComputeNodeExtensionsListExtensionsHeaders {
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  "ocp-date"?: string;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  "client-request-id"?: string;
  /** Whether the server should return the client-request-id in the response. */
  "return-client-request-id"?: boolean;
}

export interface ComputeNodeExtensionsListExtensionsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string;
}

export interface ComputeNodeExtensionsListExtensionsQueryParam {
  queryParameters?: ComputeNodeExtensionsListExtensionsQueryParamProperties;
}

export interface ComputeNodeExtensionsListExtensionsHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeExtensionsListExtensionsHeaders;
}

export type ComputeNodeExtensionsListExtensionsParameters =
  ComputeNodeExtensionsListExtensionsQueryParam &
    ComputeNodeExtensionsListExtensionsHeaderParam &
    RequestParameters;
