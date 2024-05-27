// Licensed under the MIT license.

import { RawHttpHeaders } from "@typespec/ts-http-runtime";
import { HttpResponse } from "@typespec/ts-http-runtime";
import {
  PagedOperationOutput,
  ErrorResponseOutput,
  OperationStatusResultOutput,
  AssetOutput,
  AssetListResultOutput,
  AssetEndpointProfileOutput,
  AssetEndpointProfileListResultOutput,
} from "./outputModels.js";

/** Azure operation completed successfully. */
export interface OperationsList200Response extends HttpResponse {
  status: "200";
  body: PagedOperationOutput;
}

export interface OperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface OperationStatusGet200Response extends HttpResponse {
  status: "200";
  body: OperationStatusResultOutput;
}

export interface OperationStatusGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface AssetsGet200Response extends HttpResponse {
  status: "200";
  body: AssetOutput;
}

export interface AssetsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'Asset' update operation succeeded */
export interface AssetsCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: AssetOutput;
}

export interface AssetsCreateOrReplace201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'Asset' create operation succeeded */
export interface AssetsCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: AssetOutput;
  headers: RawHttpHeaders & AssetsCreateOrReplace201Headers;
}

export interface AssetsCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrReplace operation */
export interface AssetsCreateOrReplaceLogicalResponse extends HttpResponse {
  status: "200";
  body: AssetOutput;
}

/** Azure operation completed successfully. */
export interface AssetsUpdate200Response extends HttpResponse {
  status: "200";
  body: AssetOutput;
}

export interface AssetsUpdate202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource update request accepted. */
export interface AssetsUpdate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & AssetsUpdate202Headers;
}

export interface AssetsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running update operation */
export interface AssetsUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: AssetOutput;
}

export interface AssetsDelete202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource deletion accepted. */
export interface AssetsDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & AssetsDelete202Headers;
}

/** Resource does not exist. */
export interface AssetsDelete204Response extends HttpResponse {
  status: "204";
}

export interface AssetsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface AssetsDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface AssetsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: AssetListResultOutput;
}

export interface AssetsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface AssetsListBySubscription200Response extends HttpResponse {
  status: "200";
  body: AssetListResultOutput;
}

export interface AssetsListBySubscriptionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface AssetEndpointProfilesGet200Response extends HttpResponse {
  status: "200";
  body: AssetEndpointProfileOutput;
}

export interface AssetEndpointProfilesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'AssetEndpointProfile' update operation succeeded */
export interface AssetEndpointProfilesCreateOrReplace200Response
  extends HttpResponse {
  status: "200";
  body: AssetEndpointProfileOutput;
}

export interface AssetEndpointProfilesCreateOrReplace201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'AssetEndpointProfile' create operation succeeded */
export interface AssetEndpointProfilesCreateOrReplace201Response
  extends HttpResponse {
  status: "201";
  body: AssetEndpointProfileOutput;
  headers: RawHttpHeaders & AssetEndpointProfilesCreateOrReplace201Headers;
}

export interface AssetEndpointProfilesCreateOrReplaceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrReplace operation */
export interface AssetEndpointProfilesCreateOrReplaceLogicalResponse
  extends HttpResponse {
  status: "200";
  body: AssetEndpointProfileOutput;
}

/** Azure operation completed successfully. */
export interface AssetEndpointProfilesUpdate200Response extends HttpResponse {
  status: "200";
  body: AssetEndpointProfileOutput;
}

export interface AssetEndpointProfilesUpdate202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource update request accepted. */
export interface AssetEndpointProfilesUpdate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & AssetEndpointProfilesUpdate202Headers;
}

export interface AssetEndpointProfilesUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running update operation */
export interface AssetEndpointProfilesUpdateLogicalResponse
  extends HttpResponse {
  status: "200";
  body: AssetEndpointProfileOutput;
}

export interface AssetEndpointProfilesDelete202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource deletion accepted. */
export interface AssetEndpointProfilesDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & AssetEndpointProfilesDelete202Headers;
}

/** Resource does not exist. */
export interface AssetEndpointProfilesDelete204Response extends HttpResponse {
  status: "204";
}

export interface AssetEndpointProfilesDeleteDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface AssetEndpointProfilesDeleteLogicalResponse
  extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface AssetEndpointProfilesListByResourceGroup200Response
  extends HttpResponse {
  status: "200";
  body: AssetEndpointProfileListResultOutput;
}

export interface AssetEndpointProfilesListByResourceGroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface AssetEndpointProfilesListBySubscription200Response
  extends HttpResponse {
  status: "200";
  body: AssetEndpointProfileListResultOutput;
}

export interface AssetEndpointProfilesListBySubscriptionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
