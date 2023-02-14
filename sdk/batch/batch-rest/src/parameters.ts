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

export interface ApplicationOperationsListHeaders {
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

export interface ApplicationOperationsListQueryParamProperties {
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

export interface ApplicationOperationsListQueryParam {
  queryParameters?: ApplicationOperationsListQueryParamProperties;
}

export interface ApplicationOperationsListHeaderParam {
  headers?: RawHttpHeadersInput & ApplicationOperationsListHeaders;
}

export type ApplicationOperationsListParameters =
  ApplicationOperationsListQueryParam &
    ApplicationOperationsListHeaderParam &
    RequestParameters;
export type ApplicationOperationsGetParameters = RequestParameters;
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
  $select: string;
  /** An OData $expand clause. */
  $expand: string;
}

export interface PoolGetQueryParam {
  queryParameters: PoolGetQueryParamProperties;
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
  body: BatchJobTerminateParameters;
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
  $filter: string;
  /** An OData $select clause. */
  $select: string;
  /** An OData $expand clause. */
  $expand: string;
}

export interface JobListQueryParam {
  queryParameters: JobListQueryParamProperties;
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
  $filter: string;
  /** An OData $select clause. */
  $select: string;
  /** An OData $expand clause. */
  $expand: string;
}

export interface JobListFromJobScheduleQueryParam {
  queryParameters: JobListFromJobScheduleQueryParamProperties;
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
  $filter: string;
  /** An OData $select clause. */
  $select: string;
}

export interface JobListPreparationAndReleaseTaskStatusQueryParam {
  queryParameters: JobListPreparationAndReleaseTaskStatusQueryParamProperties;
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

export interface CertificateOperationsAddHeaders {
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

export interface CertificateOperationsAddBodyParam {
  /** The Certificate to be added. */
  body: Certificate;
}

export interface CertificateOperationsAddQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface CertificateOperationsAddQueryParam {
  queryParameters?: CertificateOperationsAddQueryParamProperties;
}

export interface CertificateOperationsAddHeaderParam {
  headers?: RawHttpHeadersInput & CertificateOperationsAddHeaders;
}

export type CertificateOperationsAddParameters =
  CertificateOperationsAddQueryParam &
    CertificateOperationsAddHeaderParam &
    CertificateOperationsAddBodyParam &
    RequestParameters;

export interface CertificateOperationsListHeaders {
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

export interface CertificateOperationsListQueryParamProperties {
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
  $filter: string;
  /** An OData $select clause. */
  $select: string;
}

export interface CertificateOperationsListQueryParam {
  queryParameters: CertificateOperationsListQueryParamProperties;
}

export interface CertificateOperationsListHeaderParam {
  headers?: RawHttpHeadersInput & CertificateOperationsListHeaders;
}

export type CertificateOperationsListParameters =
  CertificateOperationsListQueryParam &
    CertificateOperationsListHeaderParam &
    RequestParameters;

export interface CertificateOperationsCancelDeletionHeaders {
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

export interface CertificateOperationsCancelDeletionQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface CertificateOperationsCancelDeletionQueryParam {
  queryParameters?: CertificateOperationsCancelDeletionQueryParamProperties;
}

export interface CertificateOperationsCancelDeletionHeaderParam {
  headers?: RawHttpHeadersInput & CertificateOperationsCancelDeletionHeaders;
}

export type CertificateOperationsCancelDeletionParameters =
  CertificateOperationsCancelDeletionQueryParam &
    CertificateOperationsCancelDeletionHeaderParam &
    RequestParameters;

export interface CertificateOperationsDeleteHeaders {
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

export interface CertificateOperationsDeleteQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface CertificateOperationsDeleteQueryParam {
  queryParameters?: CertificateOperationsDeleteQueryParamProperties;
}

export interface CertificateOperationsDeleteHeaderParam {
  headers?: RawHttpHeadersInput & CertificateOperationsDeleteHeaders;
}

export type CertificateOperationsDeleteParameters =
  CertificateOperationsDeleteQueryParam &
    CertificateOperationsDeleteHeaderParam &
    RequestParameters;

export interface CertificateOperationsGetHeaders {
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

export interface CertificateOperationsGetQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select: string;
}

export interface CertificateOperationsGetQueryParam {
  queryParameters: CertificateOperationsGetQueryParamProperties;
}

export interface CertificateOperationsGetHeaderParam {
  headers?: RawHttpHeadersInput & CertificateOperationsGetHeaders;
}

export type CertificateOperationsGetParameters =
  CertificateOperationsGetQueryParam &
    CertificateOperationsGetHeaderParam &
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
  recursive: boolean;
}

export interface FileDeleteFromTaskQueryParam {
  queryParameters: FileDeleteFromTaskQueryParamProperties;
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
  $filter: string;
  /**
   * Whether to list children of the Task directory. This parameter can be used in
   * combination with the filter parameter to list specific type of files.
   */
  recursive: boolean;
}

export interface FileListFromTaskQueryParam {
  queryParameters: FileListFromTaskQueryParamProperties;
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
  $filter: string;
  /** Whether to list children of a directory. */
  recursive: boolean;
}

export interface FileListFromComputeNodeQueryParam {
  queryParameters: FileListFromComputeNodeQueryParamProperties;
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

export interface ComputeNodeOperationsAddUserHeaders {
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

export interface ComputeNodeOperationsAddUserBodyParam {
  /** The user Account to be created. */
  body: ComputeNodeUser;
}

export interface ComputeNodeOperationsAddUserQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodeOperationsAddUserQueryParam {
  queryParameters?: ComputeNodeOperationsAddUserQueryParamProperties;
}

export interface ComputeNodeOperationsAddUserHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeOperationsAddUserHeaders;
}

export type ComputeNodeOperationsAddUserParameters =
  ComputeNodeOperationsAddUserQueryParam &
    ComputeNodeOperationsAddUserHeaderParam &
    ComputeNodeOperationsAddUserBodyParam &
    RequestParameters;

export interface ComputeNodeOperationsDeleteUserHeaders {
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

export interface ComputeNodeOperationsDeleteUserQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodeOperationsDeleteUserQueryParam {
  queryParameters?: ComputeNodeOperationsDeleteUserQueryParamProperties;
}

export interface ComputeNodeOperationsDeleteUserHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeOperationsDeleteUserHeaders;
}

export type ComputeNodeOperationsDeleteUserParameters =
  ComputeNodeOperationsDeleteUserQueryParam &
    ComputeNodeOperationsDeleteUserHeaderParam &
    RequestParameters;

export interface ComputeNodeOperationsUpdateUserHeaders {
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

export interface ComputeNodeOperationsUpdateUserBodyParam {
  /** The parameters for the request. */
  body: NodeUpdateUserParameters;
}

export interface ComputeNodeOperationsUpdateUserQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodeOperationsUpdateUserQueryParam {
  queryParameters?: ComputeNodeOperationsUpdateUserQueryParamProperties;
}

export interface ComputeNodeOperationsUpdateUserHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeOperationsUpdateUserHeaders;
}

export type ComputeNodeOperationsUpdateUserParameters =
  ComputeNodeOperationsUpdateUserQueryParam &
    ComputeNodeOperationsUpdateUserHeaderParam &
    ComputeNodeOperationsUpdateUserBodyParam &
    RequestParameters;

export interface ComputeNodeOperationsGetHeaders {
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

export interface ComputeNodeOperationsGetQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string;
}

export interface ComputeNodeOperationsGetQueryParam {
  queryParameters?: ComputeNodeOperationsGetQueryParamProperties;
}

export interface ComputeNodeOperationsGetHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeOperationsGetHeaders;
}

export type ComputeNodeOperationsGetParameters =
  ComputeNodeOperationsGetQueryParam &
    ComputeNodeOperationsGetHeaderParam &
    RequestParameters;

export interface ComputeNodeOperationsRebootHeaders {
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

export interface ComputeNodeOperationsRebootBodyParam {
  /** The parameters for the request. */
  body: NodeRebootParameters;
}

export interface ComputeNodeOperationsRebootQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodeOperationsRebootQueryParam {
  queryParameters?: ComputeNodeOperationsRebootQueryParamProperties;
}

export interface ComputeNodeOperationsRebootHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeOperationsRebootHeaders;
}

export type ComputeNodeOperationsRebootParameters =
  ComputeNodeOperationsRebootQueryParam &
    ComputeNodeOperationsRebootHeaderParam &
    ComputeNodeOperationsRebootBodyParam &
    RequestParameters;

export interface ComputeNodeOperationsReimageHeaders {
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

export interface ComputeNodeOperationsReimageBodyParam {
  /** The parameters for the request. */
  body: NodeReimageParameters;
}

export interface ComputeNodeOperationsReimageQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodeOperationsReimageQueryParam {
  queryParameters?: ComputeNodeOperationsReimageQueryParamProperties;
}

export interface ComputeNodeOperationsReimageHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeOperationsReimageHeaders;
}

export type ComputeNodeOperationsReimageParameters =
  ComputeNodeOperationsReimageQueryParam &
    ComputeNodeOperationsReimageHeaderParam &
    ComputeNodeOperationsReimageBodyParam &
    RequestParameters;

export interface ComputeNodeOperationsDisableSchedulingHeaders {
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

export interface ComputeNodeOperationsDisableSchedulingBodyParam {
  /** The parameters for the request. */
  body: NodeDisableSchedulingParameters;
}

export interface ComputeNodeOperationsDisableSchedulingQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodeOperationsDisableSchedulingQueryParam {
  queryParameters?: ComputeNodeOperationsDisableSchedulingQueryParamProperties;
}

export interface ComputeNodeOperationsDisableSchedulingHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeOperationsDisableSchedulingHeaders;
}

export type ComputeNodeOperationsDisableSchedulingParameters =
  ComputeNodeOperationsDisableSchedulingQueryParam &
    ComputeNodeOperationsDisableSchedulingHeaderParam &
    ComputeNodeOperationsDisableSchedulingBodyParam &
    RequestParameters;

export interface ComputeNodeOperationsEnableSchedulingHeaders {
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

export interface ComputeNodeOperationsEnableSchedulingQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodeOperationsEnableSchedulingQueryParam {
  queryParameters?: ComputeNodeOperationsEnableSchedulingQueryParamProperties;
}

export interface ComputeNodeOperationsEnableSchedulingHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeOperationsEnableSchedulingHeaders;
}

export type ComputeNodeOperationsEnableSchedulingParameters =
  ComputeNodeOperationsEnableSchedulingQueryParam &
    ComputeNodeOperationsEnableSchedulingHeaderParam &
    RequestParameters;

export interface ComputeNodeOperationsGetRemoteLoginSettingsHeaders {
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

export interface ComputeNodeOperationsGetRemoteLoginSettingsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodeOperationsGetRemoteLoginSettingsQueryParam {
  queryParameters?: ComputeNodeOperationsGetRemoteLoginSettingsQueryParamProperties;
}

export interface ComputeNodeOperationsGetRemoteLoginSettingsHeaderParam {
  headers?: RawHttpHeadersInput &
    ComputeNodeOperationsGetRemoteLoginSettingsHeaders;
}

export type ComputeNodeOperationsGetRemoteLoginSettingsParameters =
  ComputeNodeOperationsGetRemoteLoginSettingsQueryParam &
    ComputeNodeOperationsGetRemoteLoginSettingsHeaderParam &
    RequestParameters;

export interface ComputeNodeOperationsGetRemoteDesktopHeaders {
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

export interface ComputeNodeOperationsGetRemoteDesktopQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodeOperationsGetRemoteDesktopQueryParam {
  queryParameters?: ComputeNodeOperationsGetRemoteDesktopQueryParamProperties;
}

export interface ComputeNodeOperationsGetRemoteDesktopHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeOperationsGetRemoteDesktopHeaders;
}

export type ComputeNodeOperationsGetRemoteDesktopParameters =
  ComputeNodeOperationsGetRemoteDesktopQueryParam &
    ComputeNodeOperationsGetRemoteDesktopHeaderParam &
    RequestParameters;

export interface ComputeNodeOperationsUploadBatchServiceLogsHeaders {
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

export interface ComputeNodeOperationsUploadBatchServiceLogsBodyParam {
  /** The Azure Batch service log files upload configuration. */
  body: UploadBatchServiceLogsConfiguration;
}

export interface ComputeNodeOperationsUploadBatchServiceLogsQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
}

export interface ComputeNodeOperationsUploadBatchServiceLogsQueryParam {
  queryParameters?: ComputeNodeOperationsUploadBatchServiceLogsQueryParamProperties;
}

export interface ComputeNodeOperationsUploadBatchServiceLogsHeaderParam {
  headers?: RawHttpHeadersInput &
    ComputeNodeOperationsUploadBatchServiceLogsHeaders;
}

export type ComputeNodeOperationsUploadBatchServiceLogsParameters =
  ComputeNodeOperationsUploadBatchServiceLogsQueryParam &
    ComputeNodeOperationsUploadBatchServiceLogsHeaderParam &
    ComputeNodeOperationsUploadBatchServiceLogsBodyParam &
    RequestParameters;

export interface ComputeNodeOperationsListHeaders {
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

export interface ComputeNodeOperationsListQueryParamProperties {
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
  $filter: string;
  /** An OData $select clause. */
  $select?: string;
}

export interface ComputeNodeOperationsListQueryParam {
  queryParameters: ComputeNodeOperationsListQueryParamProperties;
}

export interface ComputeNodeOperationsListHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeOperationsListHeaders;
}

export type ComputeNodeOperationsListParameters =
  ComputeNodeOperationsListQueryParam &
    ComputeNodeOperationsListHeaderParam &
    RequestParameters;

export interface ComputeNodeExtensionOperationsGetHeaders {
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

export interface ComputeNodeExtensionOperationsGetQueryParamProperties {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /** An OData $select clause. */
  $select?: string;
}

export interface ComputeNodeExtensionOperationsGetQueryParam {
  queryParameters?: ComputeNodeExtensionOperationsGetQueryParamProperties;
}

export interface ComputeNodeExtensionOperationsGetHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeExtensionOperationsGetHeaders;
}

export type ComputeNodeExtensionOperationsGetParameters =
  ComputeNodeExtensionOperationsGetQueryParam &
    ComputeNodeExtensionOperationsGetHeaderParam &
    RequestParameters;

export interface ComputeNodeExtensionOperationsListHeaders {
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

export interface ComputeNodeExtensionOperationsListQueryParamProperties {
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

export interface ComputeNodeExtensionOperationsListQueryParam {
  queryParameters?: ComputeNodeExtensionOperationsListQueryParamProperties;
}

export interface ComputeNodeExtensionOperationsListHeaderParam {
  headers?: RawHttpHeadersInput & ComputeNodeExtensionOperationsListHeaders;
}

export type ComputeNodeExtensionOperationsListParameters =
  ComputeNodeExtensionOperationsListQueryParam &
    ComputeNodeExtensionOperationsListHeaderParam &
    RequestParameters;
