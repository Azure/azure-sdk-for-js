// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  PagedOperationOutput,
  ErrorResponseOutput,
  DataProductsCatalogOutput,
  DataProductsCatalogListResultOutput,
  DataTypeOutput,
  ContainerSasTokenOutput,
  DataTypeListResultOutput,
  DataProductOutput,
  AccountSasTokenOutput,
  RoleAssignmentDetailOutput,
  ListRoleAssignmentsOutput,
  DataProductListResultOutput,
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
export interface DataProductsCatalogsGet200Response extends HttpResponse {
  status: "200";
  body: DataProductsCatalogOutput;
}

export interface DataProductsCatalogsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DataProductsCatalogsListByResourceGroup200Response
  extends HttpResponse {
  status: "200";
  body: DataProductsCatalogListResultOutput;
}

export interface DataProductsCatalogsListByResourceGroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DataProductsCatalogsListBySubscription200Response
  extends HttpResponse {
  status: "200";
  body: DataProductsCatalogListResultOutput;
}

export interface DataProductsCatalogsListBySubscriptionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'DataType' update operation succeeded */
export interface DataTypesCreate200Response extends HttpResponse {
  status: "200";
  body: DataTypeOutput;
}

export interface DataTypesCreate201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'DataType' create operation succeeded */
export interface DataTypesCreate201Response extends HttpResponse {
  status: "201";
  body: DataTypeOutput;
  headers: RawHttpHeaders & DataTypesCreate201Headers;
}

export interface DataTypesCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running create operation */
export interface DataTypesCreateLogicalResponse extends HttpResponse {
  status: "200";
  body: DataTypeOutput;
}

/** Azure operation completed successfully. */
export interface DataTypesGet200Response extends HttpResponse {
  status: "200";
  body: DataTypeOutput;
}

export interface DataTypesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DataTypesUpdate200Response extends HttpResponse {
  status: "200";
  body: DataTypeOutput;
}

export interface DataTypesUpdate202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource update request accepted. */
export interface DataTypesUpdate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DataTypesUpdate202Headers;
}

export interface DataTypesUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running update operation */
export interface DataTypesUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: DataTypeOutput;
}

export interface DataTypesDeleteOperation202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource deletion accepted. */
export interface DataTypesDeleteOperation202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DataTypesDeleteOperation202Headers;
}

/** Resource does not exist. */
export interface DataTypesDeleteOperation204Response extends HttpResponse {
  status: "204";
}

export interface DataTypesDeleteOperationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface DataTypesDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

export interface DataTypesDeleteData202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource operation accepted. */
export interface DataTypesDeleteData202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DataTypesDeleteData202Headers;
}

/** Action completed successfully. */
export interface DataTypesDeleteData204Response extends HttpResponse {
  status: "204";
}

export interface DataTypesDeleteDataDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running deleteData operation */
export interface DataTypesDeleteDataLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface DataTypesGenerateStorageContainerSasToken200Response
  extends HttpResponse {
  status: "200";
  body: ContainerSasTokenOutput;
}

export interface DataTypesGenerateStorageContainerSasTokenDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DataTypesListByDataProduct200Response extends HttpResponse {
  status: "200";
  body: DataTypeListResultOutput;
}

export interface DataTypesListByDataProductDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'DataProduct' update operation succeeded */
export interface DataProductsCreate200Response extends HttpResponse {
  status: "200";
  body: DataProductOutput;
}

export interface DataProductsCreate201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'DataProduct' create operation succeeded */
export interface DataProductsCreate201Response extends HttpResponse {
  status: "201";
  body: DataProductOutput;
  headers: RawHttpHeaders & DataProductsCreate201Headers;
}

export interface DataProductsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running create operation */
export interface DataProductsCreateLogicalResponse extends HttpResponse {
  status: "200";
  body: DataProductOutput;
}

/** Azure operation completed successfully. */
export interface DataProductsGet200Response extends HttpResponse {
  status: "200";
  body: DataProductOutput;
}

export interface DataProductsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DataProductsUpdate200Response extends HttpResponse {
  status: "200";
  body: DataProductOutput;
}

export interface DataProductsUpdate202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource update request accepted. */
export interface DataProductsUpdate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DataProductsUpdate202Headers;
}

export interface DataProductsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running update operation */
export interface DataProductsUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: DataProductOutput;
}

export interface DataProductsDeleteOperation202Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
}

/** Resource deletion accepted. */
export interface DataProductsDeleteOperation202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DataProductsDeleteOperation202Headers;
}

/** Resource does not exist. */
export interface DataProductsDeleteOperation204Response extends HttpResponse {
  status: "204";
}

export interface DataProductsDeleteOperationDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface DataProductsDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface DataProductsGenerateStorageAccountSasToken200Response
  extends HttpResponse {
  status: "200";
  body: AccountSasTokenOutput;
}

export interface DataProductsGenerateStorageAccountSasTokenDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Action completed successfully. */
export interface DataProductsRotateKey204Response extends HttpResponse {
  status: "204";
}

export interface DataProductsRotateKeyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DataProductsAddUserRole200Response extends HttpResponse {
  status: "200";
  body: RoleAssignmentDetailOutput;
}

export interface DataProductsAddUserRoleDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Action completed successfully. */
export interface DataProductsRemoveUserRole204Response extends HttpResponse {
  status: "204";
}

export interface DataProductsRemoveUserRoleDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DataProductsListRolesAssignments200Response
  extends HttpResponse {
  status: "200";
  body: ListRoleAssignmentsOutput;
}

export interface DataProductsListRolesAssignmentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DataProductsListByResourceGroup200Response
  extends HttpResponse {
  status: "200";
  body: DataProductListResultOutput;
}

export interface DataProductsListByResourceGroupDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DataProductsListBySubscription200Response
  extends HttpResponse {
  status: "200";
  body: DataProductListResultOutput;
}

export interface DataProductsListBySubscriptionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
