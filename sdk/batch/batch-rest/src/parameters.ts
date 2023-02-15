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
} from "./models";

export interface ApplicationsListHeaders {
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

export interface ApplicationsListQueryParamProperties {
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

export interface ApplicationsListQueryParam {
  queryParameters?: ApplicationsListQueryParamProperties;
}

export interface ApplicationsListHeaderParam {
  headers?: RawHttpHeadersInput & ApplicationsListHeaders;
}

export type ApplicationsListParameters = ApplicationsListQueryParam &
  ApplicationsListHeaderParam &
  RequestParameters;
export type ApplicationsGetParameters = RequestParameters;
export type PoolListUsageMetricsParameters = RequestParameters;

export interface PoolGetAllLifetimeStatisticsHeaders {
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

export interface PoolGetAllLifetimeStatisticsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolGetAllLifetimeStatisticsQueryParam {
  queryParameters?: PoolGetAllLifetimeStatisticsQueryParamProperties;
}

export interface PoolGetAllLifetimeStatisticsHeaderParam {
  headers?: RawHttpHeadersInput & PoolGetAllLifetimeStatisticsHeaders;
}

export type PoolGetAllLifetimeStatisticsParameters =
  PoolGetAllLifetimeStatisticsQueryParam &
    PoolGetAllLifetimeStatisticsHeaderParam &
    RequestParameters;

export interface PoolAddHeaders {
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

export interface PoolAddBodyParam {
  /** The Pool to be added. */
  body: BatchPool;
}

export interface PoolAddQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolAddQueryParam {
  queryParameters?: PoolAddQueryParamProperties;
}

export interface PoolAddHeaderParam {
  headers?: RawHttpHeadersInput & PoolAddHeaders;
}

export type PoolAddParameters = PoolAddQueryParam &
  PoolAddHeaderParam &
  PoolAddBodyParam &
  RequestParameters;

export interface PoolListHeaders {
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

export interface PoolListQueryParamProperties {
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

export interface PoolListQueryParam {
  queryParameters?: PoolListQueryParamProperties;
}

export interface PoolListHeaderParam {
  headers?: RawHttpHeadersInput & PoolListHeaders;
}

export type PoolListParameters = PoolListQueryParam &
  PoolListHeaderParam &
  RequestParameters;

export interface PoolDeleteHeaders {
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

export interface PoolDeleteQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolDeleteQueryParam {
  queryParameters?: PoolDeleteQueryParamProperties;
}

export interface PoolDeleteHeaderParam {
  headers?: RawHttpHeadersInput & PoolDeleteHeaders;
}

export type PoolDeleteParameters = PoolDeleteQueryParam &
  PoolDeleteHeaderParam &
  RequestParameters;

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

export interface PoolExistsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolExistsQueryParam {
  queryParameters?: PoolExistsQueryParamProperties;
}

export interface PoolExistsHeaderParam {
  headers?: RawHttpHeadersInput & PoolExistsHeaders;
}

export type PoolExistsParameters = PoolExistsQueryParam &
  PoolExistsHeaderParam &
  RequestParameters;

export interface PoolGetHeaders {
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

export interface PoolGetQueryParamProperties {
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

export interface PoolGetQueryParam {
  queryParameters?: PoolGetQueryParamProperties;
}

export interface PoolGetHeaderParam {
  headers?: RawHttpHeadersInput & PoolGetHeaders;
}

export type PoolGetParameters = PoolGetQueryParam &
  PoolGetHeaderParam &
  RequestParameters;

export interface PoolPatchHeaders {
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

export interface PoolPatchBodyParam {
  /** The parameters for the request. */
  body: BatchPool;
}

export interface PoolPatchQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolPatchQueryParam {
  queryParameters?: PoolPatchQueryParamProperties;
}

export interface PoolPatchHeaderParam {
  headers?: RawHttpHeadersInput & PoolPatchHeaders;
}

export type PoolPatchParameters = PoolPatchQueryParam &
  PoolPatchHeaderParam &
  PoolPatchBodyParam &
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

export interface PoolResizeHeaders {
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

export interface PoolResizeBodyParam {
  /** The parameters for the request. */
  body: BatchPoolResizeParameters;
}

export interface PoolResizeQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolResizeQueryParam {
  queryParameters?: PoolResizeQueryParamProperties;
}

export interface PoolResizeHeaderParam {
  headers?: RawHttpHeadersInput & PoolResizeHeaders;
}

export type PoolResizeParameters = PoolResizeQueryParam &
  PoolResizeHeaderParam &
  PoolResizeBodyParam &
  RequestParameters;

export interface PoolStopResizeHeaders {
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

export interface PoolStopResizeQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolStopResizeQueryParam {
  queryParameters?: PoolStopResizeQueryParamProperties;
}

export interface PoolStopResizeHeaderParam {
  headers?: RawHttpHeadersInput & PoolStopResizeHeaders;
}

export type PoolStopResizeParameters = PoolStopResizeQueryParam &
  PoolStopResizeHeaderParam &
  RequestParameters;

export interface PoolUpdatePropertiesHeaders {
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

export interface PoolUpdatePropertiesBodyParam {
  /** The parameters for the request. */
  body: BatchPool;
}

export interface PoolUpdatePropertiesQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolUpdatePropertiesQueryParam {
  queryParameters?: PoolUpdatePropertiesQueryParamProperties;
}

export interface PoolUpdatePropertiesHeaderParam {
  headers?: RawHttpHeadersInput & PoolUpdatePropertiesHeaders;
}

export type PoolUpdatePropertiesParameters = PoolUpdatePropertiesQueryParam &
  PoolUpdatePropertiesHeaderParam &
  PoolUpdatePropertiesBodyParam &
  RequestParameters;

export interface PoolRemoveNodesHeaders {
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

export interface PoolRemoveNodesBodyParam {
  /** The parameters for the request. */
  body: NodeRemoveParameters;
}

export interface PoolRemoveNodesQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface PoolRemoveNodesQueryParam {
  queryParameters?: PoolRemoveNodesQueryParamProperties;
}

export interface PoolRemoveNodesHeaderParam {
  headers?: RawHttpHeadersInput & PoolRemoveNodesHeaders;
}

export type PoolRemoveNodesParameters = PoolRemoveNodesQueryParam &
  PoolRemoveNodesHeaderParam &
  PoolRemoveNodesBodyParam &
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

export interface JobDeleteHeaders {
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

export interface JobDeleteQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobDeleteQueryParam {
  queryParameters?: JobDeleteQueryParamProperties;
}

export interface JobDeleteHeaderParam {
  headers?: RawHttpHeadersInput & JobDeleteHeaders;
}

export type JobDeleteParameters = JobDeleteQueryParam &
  JobDeleteHeaderParam &
  RequestParameters;

export interface JobGetHeaders {
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

export interface JobGetQueryParamProperties {
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

export interface JobGetQueryParam {
  queryParameters?: JobGetQueryParamProperties;
}

export interface JobGetHeaderParam {
  headers?: RawHttpHeadersInput & JobGetHeaders;
}

export type JobGetParameters = JobGetQueryParam &
  JobGetHeaderParam &
  RequestParameters;

export interface JobPatchHeaders {
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

export interface JobPatchBodyParam {
  /** The parameters for the request. */
  body: BatchJob;
}

export interface JobPatchQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobPatchQueryParam {
  queryParameters?: JobPatchQueryParamProperties;
}

export interface JobPatchHeaderParam {
  headers?: RawHttpHeadersInput & JobPatchHeaders;
}

export type JobPatchParameters = JobPatchQueryParam &
  JobPatchHeaderParam &
  JobPatchBodyParam &
  RequestParameters;

export interface JobUpdateHeaders {
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

export interface JobUpdateBodyParam {
  /** The parameters for the request. */
  body: BatchJob;
}

export interface JobUpdateQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobUpdateQueryParam {
  queryParameters?: JobUpdateQueryParamProperties;
}

export interface JobUpdateHeaderParam {
  headers?: RawHttpHeadersInput & JobUpdateHeaders;
}

export type JobUpdateParameters = JobUpdateQueryParam &
  JobUpdateHeaderParam &
  JobUpdateBodyParam &
  RequestParameters;

export interface JobDisableHeaders {
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

export interface JobDisableBodyParam {
  /** The parameters for the request. */
  body: BatchJobDisableParameters;
}

export interface JobDisableQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobDisableQueryParam {
  queryParameters?: JobDisableQueryParamProperties;
}

export interface JobDisableHeaderParam {
  headers?: RawHttpHeadersInput & JobDisableHeaders;
}

export type JobDisableParameters = JobDisableQueryParam &
  JobDisableHeaderParam &
  JobDisableBodyParam &
  RequestParameters;

export interface JobEnableHeaders {
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

export interface JobEnableQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobEnableQueryParam {
  queryParameters?: JobEnableQueryParamProperties;
}

export interface JobEnableHeaderParam {
  headers?: RawHttpHeadersInput & JobEnableHeaders;
}

export type JobEnableParameters = JobEnableQueryParam &
  JobEnableHeaderParam &
  RequestParameters;

export interface JobTerminateHeaders {
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

export interface JobTerminateBodyParam {
  /** The parameters for the request. */
  body?: BatchJobTerminateParameters;
}

export interface JobTerminateQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobTerminateQueryParam {
  queryParameters?: JobTerminateQueryParamProperties;
}

export interface JobTerminateHeaderParam {
  headers?: RawHttpHeadersInput & JobTerminateHeaders;
}

export type JobTerminateParameters = JobTerminateQueryParam &
  JobTerminateHeaderParam &
  JobTerminateBodyParam &
  RequestParameters;

export interface JobAddHeaders {
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

export interface JobAddBodyParam {
  /** The Job to be added. */
  body: BatchJob;
}

export interface JobAddQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobAddQueryParam {
  queryParameters?: JobAddQueryParamProperties;
}

export interface JobAddHeaderParam {
  headers?: RawHttpHeadersInput & JobAddHeaders;
}

export type JobAddParameters = JobAddQueryParam &
  JobAddHeaderParam &
  JobAddBodyParam &
  RequestParameters;

export interface JobListHeaders {
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

export interface JobListQueryParamProperties {
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

export interface JobListQueryParam {
  queryParameters?: JobListQueryParamProperties;
}

export interface JobListHeaderParam {
  headers?: RawHttpHeadersInput & JobListHeaders;
}

export type JobListParameters = JobListQueryParam &
  JobListHeaderParam &
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

export interface CertificatesAddHeaders {
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

export interface CertificatesAddBodyParam {
  /** The Certificate to be added. */
  body: Certificate;
}

export interface CertificatesAddQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface CertificatesAddQueryParam {
  queryParameters?: CertificatesAddQueryParamProperties;
}

export interface CertificatesAddHeaderParam {
  headers?: RawHttpHeadersInput & CertificatesAddHeaders;
}

export type CertificatesAddParameters = CertificatesAddQueryParam &
  CertificatesAddHeaderParam &
  CertificatesAddBodyParam &
  RequestParameters;

export interface CertificatesListHeaders {
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

export interface CertificatesListQueryParamProperties {
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

export interface CertificatesListQueryParam {
  queryParameters?: CertificatesListQueryParamProperties;
}

export interface CertificatesListHeaderParam {
  headers?: RawHttpHeadersInput & CertificatesListHeaders;
}

export type CertificatesListParameters = CertificatesListQueryParam &
  CertificatesListHeaderParam &
  RequestParameters;

export interface CertificatesCancelDeletionHeaders {
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

export interface CertificatesCancelDeletionQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface CertificatesCancelDeletionQueryParam {
  queryParameters?: CertificatesCancelDeletionQueryParamProperties;
}

export interface CertificatesCancelDeletionHeaderParam {
  headers?: RawHttpHeadersInput & CertificatesCancelDeletionHeaders;
}

export type CertificatesCancelDeletionParameters =
  CertificatesCancelDeletionQueryParam &
    CertificatesCancelDeletionHeaderParam &
    RequestParameters;

export interface CertificatesDeleteHeaders {
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

export interface CertificatesDeleteQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface CertificatesDeleteQueryParam {
  queryParameters?: CertificatesDeleteQueryParamProperties;
}

export interface CertificatesDeleteHeaderParam {
  headers?: RawHttpHeadersInput & CertificatesDeleteHeaders;
}

export type CertificatesDeleteParameters = CertificatesDeleteQueryParam &
  CertificatesDeleteHeaderParam &
  RequestParameters;

export interface CertificatesGetHeaders {
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

export interface CertificatesGetQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string;
}

export interface CertificatesGetQueryParam {
  queryParameters?: CertificatesGetQueryParamProperties;
}

export interface CertificatesGetHeaderParam {
  headers?: RawHttpHeadersInput & CertificatesGetHeaders;
}

export type CertificatesGetParameters = CertificatesGetQueryParam &
  CertificatesGetHeaderParam &
  RequestParameters;

export interface FileDeleteFromTaskHeaders {
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

export interface FileDeleteFromTaskQueryParamProperties {
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

export interface FileDeleteFromTaskQueryParam {
  queryParameters?: FileDeleteFromTaskQueryParamProperties;
}

export interface FileDeleteFromTaskHeaderParam {
  headers?: RawHttpHeadersInput & FileDeleteFromTaskHeaders;
}

export type FileDeleteFromTaskParameters = FileDeleteFromTaskQueryParam &
  FileDeleteFromTaskHeaderParam &
  RequestParameters;

export interface FileGetFromTaskHeaders {
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

export interface FileGetFromTaskQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface FileGetFromTaskQueryParam {
  queryParameters?: FileGetFromTaskQueryParamProperties;
}

export interface FileGetFromTaskHeaderParam {
  headers?: RawHttpHeadersInput & FileGetFromTaskHeaders;
}

export type FileGetFromTaskParameters = FileGetFromTaskQueryParam &
  FileGetFromTaskHeaderParam &
  RequestParameters;

export interface FileGetPropertiesFromTaskHeaders {
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

export interface FileGetPropertiesFromTaskQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface FileGetPropertiesFromTaskQueryParam {
  queryParameters?: FileGetPropertiesFromTaskQueryParamProperties;
}

export interface FileGetPropertiesFromTaskHeaderParam {
  headers?: RawHttpHeadersInput & FileGetPropertiesFromTaskHeaders;
}

export type FileGetPropertiesFromTaskParameters =
  FileGetPropertiesFromTaskQueryParam &
    FileGetPropertiesFromTaskHeaderParam &
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

export interface FileGetFromComputeNodeHeaders {
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

export interface FileGetFromComputeNodeQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface FileGetFromComputeNodeQueryParam {
  queryParameters?: FileGetFromComputeNodeQueryParamProperties;
}

export interface FileGetFromComputeNodeHeaderParam {
  headers?: RawHttpHeadersInput & FileGetFromComputeNodeHeaders;
}

export type FileGetFromComputeNodeParameters =
  FileGetFromComputeNodeQueryParam &
    FileGetFromComputeNodeHeaderParam &
    RequestParameters;

export interface FileGetPropertiesFromComputeNodeHeaders {
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

export interface FileGetPropertiesFromComputeNodeQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface FileGetPropertiesFromComputeNodeQueryParam {
  queryParameters?: FileGetPropertiesFromComputeNodeQueryParamProperties;
}

export interface FileGetPropertiesFromComputeNodeHeaderParam {
  headers?: RawHttpHeadersInput & FileGetPropertiesFromComputeNodeHeaders;
}

export type FileGetPropertiesFromComputeNodeParameters =
  FileGetPropertiesFromComputeNodeQueryParam &
    FileGetPropertiesFromComputeNodeHeaderParam &
    RequestParameters;

export interface FileListFromTaskHeaders {
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

export interface FileListFromTaskQueryParamProperties {
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

export interface FileListFromTaskQueryParam {
  queryParameters?: FileListFromTaskQueryParamProperties;
}

export interface FileListFromTaskHeaderParam {
  headers?: RawHttpHeadersInput & FileListFromTaskHeaders;
}

export type FileListFromTaskParameters = FileListFromTaskQueryParam &
  FileListFromTaskHeaderParam &
  RequestParameters;

export interface FileListFromComputeNodeHeaders {
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

export interface FileListFromComputeNodeQueryParamProperties {
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

export interface FileListFromComputeNodeQueryParam {
  queryParameters?: FileListFromComputeNodeQueryParamProperties;
}

export interface FileListFromComputeNodeHeaderParam {
  headers?: RawHttpHeadersInput & FileListFromComputeNodeHeaders;
}

export type FileListFromComputeNodeParameters =
  FileListFromComputeNodeQueryParam &
    FileListFromComputeNodeHeaderParam &
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

export interface JobScheduleExistsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
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

export interface JobScheduleDeleteHeaders {
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

export interface JobScheduleDeleteQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobScheduleDeleteQueryParam {
  queryParameters?: JobScheduleDeleteQueryParamProperties;
}

export interface JobScheduleDeleteHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleDeleteHeaders;
}

export type JobScheduleDeleteParameters = JobScheduleDeleteQueryParam &
  JobScheduleDeleteHeaderParam &
  RequestParameters;

export interface JobScheduleGetHeaders {
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

export interface JobScheduleGetQueryParamProperties {
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

export interface JobScheduleGetQueryParam {
  queryParameters?: JobScheduleGetQueryParamProperties;
}

export interface JobScheduleGetHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleGetHeaders;
}

export type JobScheduleGetParameters = JobScheduleGetQueryParam &
  JobScheduleGetHeaderParam &
  RequestParameters;

export interface JobSchedulePatchHeaders {
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

export interface JobSchedulePatchBodyParam {
  /** The parameters for the request. */
  body: BatchJobSchedule;
}

export interface JobSchedulePatchQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobSchedulePatchQueryParam {
  queryParameters?: JobSchedulePatchQueryParamProperties;
}

export interface JobSchedulePatchHeaderParam {
  headers?: RawHttpHeadersInput & JobSchedulePatchHeaders;
}

export type JobSchedulePatchParameters = JobSchedulePatchQueryParam &
  JobSchedulePatchHeaderParam &
  JobSchedulePatchBodyParam &
  RequestParameters;

export interface JobScheduleUpdateHeaders {
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

export interface JobScheduleUpdateBodyParam {
  /** The parameters for the request. */
  body: BatchJobSchedule;
}

export interface JobScheduleUpdateQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobScheduleUpdateQueryParam {
  queryParameters?: JobScheduleUpdateQueryParamProperties;
}

export interface JobScheduleUpdateHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleUpdateHeaders;
}

export type JobScheduleUpdateParameters = JobScheduleUpdateQueryParam &
  JobScheduleUpdateHeaderParam &
  JobScheduleUpdateBodyParam &
  RequestParameters;

export interface JobScheduleDisableHeaders {
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

export interface JobScheduleDisableQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobScheduleDisableQueryParam {
  queryParameters?: JobScheduleDisableQueryParamProperties;
}

export interface JobScheduleDisableHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleDisableHeaders;
}

export type JobScheduleDisableParameters = JobScheduleDisableQueryParam &
  JobScheduleDisableHeaderParam &
  RequestParameters;

export interface JobScheduleEnableHeaders {
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

export interface JobScheduleEnableQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobScheduleEnableQueryParam {
  queryParameters?: JobScheduleEnableQueryParamProperties;
}

export interface JobScheduleEnableHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleEnableHeaders;
}

export type JobScheduleEnableParameters = JobScheduleEnableQueryParam &
  JobScheduleEnableHeaderParam &
  RequestParameters;

export interface JobScheduleTerminateHeaders {
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

export interface JobScheduleTerminateQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobScheduleTerminateQueryParam {
  queryParameters?: JobScheduleTerminateQueryParamProperties;
}

export interface JobScheduleTerminateHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleTerminateHeaders;
}

export type JobScheduleTerminateParameters = JobScheduleTerminateQueryParam &
  JobScheduleTerminateHeaderParam &
  RequestParameters;

export interface JobScheduleAddHeaders {
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

export interface JobScheduleAddBodyParam {
  /** The Job Schedule to be added. */
  body: BatchJobSchedule;
}

export interface JobScheduleAddQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface JobScheduleAddQueryParam {
  queryParameters?: JobScheduleAddQueryParamProperties;
}

export interface JobScheduleAddHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleAddHeaders;
}

export type JobScheduleAddParameters = JobScheduleAddQueryParam &
  JobScheduleAddHeaderParam &
  JobScheduleAddBodyParam &
  RequestParameters;

export interface JobScheduleListHeaders {
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

export interface JobScheduleListQueryParamProperties {
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

export interface JobScheduleListQueryParam {
  queryParameters?: JobScheduleListQueryParamProperties;
}

export interface JobScheduleListHeaderParam {
  headers?: RawHttpHeadersInput & JobScheduleListHeaders;
}

export type JobScheduleListParameters = JobScheduleListQueryParam &
  JobScheduleListHeaderParam &
  RequestParameters;

export interface TaskAddHeaders {
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

export interface TaskAddBodyParam {
  /** The Task to be added. */
  body: BatchTask;
}

export interface TaskAddQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface TaskAddQueryParam {
  queryParameters?: TaskAddQueryParamProperties;
}

export interface TaskAddHeaderParam {
  headers?: RawHttpHeadersInput & TaskAddHeaders;
}

export type TaskAddParameters = TaskAddQueryParam &
  TaskAddHeaderParam &
  TaskAddBodyParam &
  RequestParameters;

export interface TaskListHeaders {
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

export interface TaskListQueryParamProperties {
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

export interface TaskListQueryParam {
  queryParameters?: TaskListQueryParamProperties;
}

export interface TaskListHeaderParam {
  headers?: RawHttpHeadersInput & TaskListHeaders;
}

export type TaskListParameters = TaskListQueryParam &
  TaskListHeaderParam &
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

export interface TaskDeleteHeaders {
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

export interface TaskDeleteQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface TaskDeleteQueryParam {
  queryParameters?: TaskDeleteQueryParamProperties;
}

export interface TaskDeleteHeaderParam {
  headers?: RawHttpHeadersInput & TaskDeleteHeaders;
}

export type TaskDeleteParameters = TaskDeleteQueryParam &
  TaskDeleteHeaderParam &
  RequestParameters;

export interface TaskGetHeaders {
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

export interface TaskGetQueryParamProperties {
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

export interface TaskGetQueryParam {
  queryParameters?: TaskGetQueryParamProperties;
}

export interface TaskGetHeaderParam {
  headers?: RawHttpHeadersInput & TaskGetHeaders;
}

export type TaskGetParameters = TaskGetQueryParam &
  TaskGetHeaderParam &
  RequestParameters;

export interface TaskUpdateHeaders {
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

export interface TaskUpdateBodyParam {
  /** The parameters for the request. */
  body: BatchTask;
}

export interface TaskUpdateQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface TaskUpdateQueryParam {
  queryParameters?: TaskUpdateQueryParamProperties;
}

export interface TaskUpdateHeaderParam {
  headers?: RawHttpHeadersInput & TaskUpdateHeaders;
}

export type TaskUpdateParameters = TaskUpdateQueryParam &
  TaskUpdateHeaderParam &
  TaskUpdateBodyParam &
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

export interface TaskTerminateHeaders {
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

export interface TaskTerminateQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface TaskTerminateQueryParam {
  queryParameters?: TaskTerminateQueryParamProperties;
}

export interface TaskTerminateHeaderParam {
  headers?: RawHttpHeadersInput & TaskTerminateHeaders;
}

export type TaskTerminateParameters = TaskTerminateQueryParam &
  TaskTerminateHeaderParam &
  RequestParameters;

export interface TaskReactivateHeaders {
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

export interface TaskReactivateQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface TaskReactivateQueryParam {
  queryParameters?: TaskReactivateQueryParamProperties;
}

export interface TaskReactivateHeaderParam {
  headers?: RawHttpHeadersInput & TaskReactivateHeaders;
}

export type TaskReactivateParameters = TaskReactivateQueryParam &
  TaskReactivateHeaderParam &
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

export interface ComputeNodesGetHeaders {
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

export interface ComputeNodesGetQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string;
}

export interface ComputeNodesGetQueryParam {
  queryParameters?: ComputeNodesGetQueryParamProperties;
}

export interface ComputeNodesGetHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesGetHeaders;
}

export type ComputeNodesGetParameters = ComputeNodesGetQueryParam &
  ComputeNodesGetHeaderParam &
  RequestParameters;

export interface ComputeNodesRebootHeaders {
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

export interface ComputeNodesRebootBodyParam {
  /** The parameters for the request. */
  body?: NodeRebootParameters;
}

export interface ComputeNodesRebootQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodesRebootQueryParam {
  queryParameters?: ComputeNodesRebootQueryParamProperties;
}

export interface ComputeNodesRebootHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesRebootHeaders;
}

export type ComputeNodesRebootParameters = ComputeNodesRebootQueryParam &
  ComputeNodesRebootHeaderParam &
  ComputeNodesRebootBodyParam &
  RequestParameters;

export interface ComputeNodesReimageHeaders {
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

export interface ComputeNodesReimageBodyParam {
  /** The parameters for the request. */
  body?: NodeReimageParameters;
}

export interface ComputeNodesReimageQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodesReimageQueryParam {
  queryParameters?: ComputeNodesReimageQueryParamProperties;
}

export interface ComputeNodesReimageHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesReimageHeaders;
}

export type ComputeNodesReimageParameters = ComputeNodesReimageQueryParam &
  ComputeNodesReimageHeaderParam &
  ComputeNodesReimageBodyParam &
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

export interface ComputeNodesListHeaders {
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

export interface ComputeNodesListQueryParamProperties {
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

export interface ComputeNodesListQueryParam {
  queryParameters?: ComputeNodesListQueryParamProperties;
}

export interface ComputeNodesListHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodesListHeaders;
}

export type ComputeNodesListParameters = ComputeNodesListQueryParam &
  ComputeNodesListHeaderParam &
  RequestParameters;

export interface ComputeNodeExtensionsGetHeaders {
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

export interface ComputeNodeExtensionsGetQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string;
}

export interface ComputeNodeExtensionsGetQueryParam {
  queryParameters?: ComputeNodeExtensionsGetQueryParamProperties;
}

export interface ComputeNodeExtensionsGetHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeExtensionsGetHeaders;
}

export type ComputeNodeExtensionsGetParameters =
  ComputeNodeExtensionsGetQueryParam &
    ComputeNodeExtensionsGetHeaderParam &
    RequestParameters;

export interface ComputeNodeExtensionsListHeaders {
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

export interface ComputeNodeExtensionsListQueryParamProperties {
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

export interface ComputeNodeExtensionsListQueryParam {
  queryParameters?: ComputeNodeExtensionsListQueryParamProperties;
}

export interface ComputeNodeExtensionsListHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeExtensionsListHeaders;
}

export type ComputeNodeExtensionsListParameters =
  ComputeNodeExtensionsListQueryParam &
    ComputeNodeExtensionsListHeaderParam &
    RequestParameters;
