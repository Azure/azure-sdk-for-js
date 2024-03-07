// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationsListParameters,
  DataProductsCatalogsGetParameters,
  DataProductsCatalogsListByResourceGroupParameters,
  DataProductsCatalogsListBySubscriptionParameters,
  DataTypesCreateParameters,
  DataTypesGetParameters,
  DataTypesUpdateParameters,
  DataTypesDeleteParameters,
  DataTypesDeleteDataParameters,
  DataTypesGenerateStorageContainerSasTokenParameters,
  DataTypesListByDataProductParameters,
  DataProductsCreateParameters,
  DataProductsGetParameters,
  DataProductsUpdateParameters,
  DataProductsDeleteParameters,
  DataProductsGenerateStorageAccountSasTokenParameters,
  DataProductsRotateKeyParameters,
  DataProductsAddUserRoleParameters,
  DataProductsRemoveUserRoleParameters,
  DataProductsListRolesAssignmentsParameters,
  DataProductsListByResourceGroupParameters,
  DataProductsListBySubscriptionParameters,
} from "./parameters.js";
import {
  OperationsList200Response,
  OperationsListDefaultResponse,
  DataProductsCatalogsGet200Response,
  DataProductsCatalogsGetDefaultResponse,
  DataProductsCatalogsListByResourceGroup200Response,
  DataProductsCatalogsListByResourceGroupDefaultResponse,
  DataProductsCatalogsListBySubscription200Response,
  DataProductsCatalogsListBySubscriptionDefaultResponse,
  DataTypesCreate200Response,
  DataTypesCreate201Response,
  DataTypesCreateDefaultResponse,
  DataTypesGet200Response,
  DataTypesGetDefaultResponse,
  DataTypesUpdate200Response,
  DataTypesUpdate202Response,
  DataTypesUpdateDefaultResponse,
  DataTypesDeleteOperation202Response,
  DataTypesDeleteOperation204Response,
  DataTypesDeleteOperationDefaultResponse,
  DataTypesDeleteData202Response,
  DataTypesDeleteData204Response,
  DataTypesDeleteDataDefaultResponse,
  DataTypesGenerateStorageContainerSasToken200Response,
  DataTypesGenerateStorageContainerSasTokenDefaultResponse,
  DataTypesListByDataProduct200Response,
  DataTypesListByDataProductDefaultResponse,
  DataProductsCreate200Response,
  DataProductsCreate201Response,
  DataProductsCreateDefaultResponse,
  DataProductsGet200Response,
  DataProductsGetDefaultResponse,
  DataProductsUpdate200Response,
  DataProductsUpdate202Response,
  DataProductsUpdateDefaultResponse,
  DataProductsDeleteOperation202Response,
  DataProductsDeleteOperation204Response,
  DataProductsDeleteOperationDefaultResponse,
  DataProductsGenerateStorageAccountSasToken200Response,
  DataProductsGenerateStorageAccountSasTokenDefaultResponse,
  DataProductsRotateKey204Response,
  DataProductsRotateKeyDefaultResponse,
  DataProductsAddUserRole200Response,
  DataProductsAddUserRoleDefaultResponse,
  DataProductsRemoveUserRole204Response,
  DataProductsRemoveUserRoleDefaultResponse,
  DataProductsListRolesAssignments200Response,
  DataProductsListRolesAssignmentsDefaultResponse,
  DataProductsListByResourceGroup200Response,
  DataProductsListByResourceGroupDefaultResponse,
  DataProductsListBySubscription200Response,
  DataProductsListBySubscriptionDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface OperationsList {
  /** List the operations for the provider */
  get(
    options?: OperationsListParameters,
  ): StreamableMethod<
    OperationsList200Response | OperationsListDefaultResponse
  >;
}

export interface DataProductsCatalogsGet {
  /** Retrieve data type resource. */
  get(
    options?: DataProductsCatalogsGetParameters,
  ): StreamableMethod<
    DataProductsCatalogsGet200Response | DataProductsCatalogsGetDefaultResponse
  >;
}

export interface DataProductsCatalogsListByResourceGroup {
  /** List data catalog by resource group. */
  get(
    options?: DataProductsCatalogsListByResourceGroupParameters,
  ): StreamableMethod<
    | DataProductsCatalogsListByResourceGroup200Response
    | DataProductsCatalogsListByResourceGroupDefaultResponse
  >;
}

export interface DataProductsCatalogsListBySubscription {
  /** List data catalog by subscription. */
  get(
    options?: DataProductsCatalogsListBySubscriptionParameters,
  ): StreamableMethod<
    | DataProductsCatalogsListBySubscription200Response
    | DataProductsCatalogsListBySubscriptionDefaultResponse
  >;
}

export interface DataTypesCreate {
  /** Create data type resource. */
  put(
    options: DataTypesCreateParameters,
  ): StreamableMethod<
    | DataTypesCreate200Response
    | DataTypesCreate201Response
    | DataTypesCreateDefaultResponse
  >;
  /** Retrieve data type resource. */
  get(
    options?: DataTypesGetParameters,
  ): StreamableMethod<DataTypesGet200Response | DataTypesGetDefaultResponse>;
  /** Update data type resource. */
  patch(
    options: DataTypesUpdateParameters,
  ): StreamableMethod<
    | DataTypesUpdate200Response
    | DataTypesUpdate202Response
    | DataTypesUpdateDefaultResponse
  >;
  /** Delete data type resource. */
  delete(
    options?: DataTypesDeleteParameters,
  ): StreamableMethod<
    | DataTypesDeleteOperation202Response
    | DataTypesDeleteOperation204Response
    | DataTypesDeleteOperationDefaultResponse
  >;
}

export interface DataTypesDeleteData {
  /** Delete data for data type. */
  post(
    options: DataTypesDeleteDataParameters,
  ): StreamableMethod<
    | DataTypesDeleteData202Response
    | DataTypesDeleteData204Response
    | DataTypesDeleteDataDefaultResponse
  >;
}

export interface DataTypesGenerateStorageContainerSasToken {
  /** Generate sas token for storage container. */
  post(
    options: DataTypesGenerateStorageContainerSasTokenParameters,
  ): StreamableMethod<
    | DataTypesGenerateStorageContainerSasToken200Response
    | DataTypesGenerateStorageContainerSasTokenDefaultResponse
  >;
}

export interface DataTypesListByDataProduct {
  /** List data type by parent resource. */
  get(
    options?: DataTypesListByDataProductParameters,
  ): StreamableMethod<
    | DataTypesListByDataProduct200Response
    | DataTypesListByDataProductDefaultResponse
  >;
}

export interface DataProductsCreate {
  /** Create data product resource. */
  put(
    options: DataProductsCreateParameters,
  ): StreamableMethod<
    | DataProductsCreate200Response
    | DataProductsCreate201Response
    | DataProductsCreateDefaultResponse
  >;
  /** Retrieve data product resource. */
  get(
    options?: DataProductsGetParameters,
  ): StreamableMethod<
    DataProductsGet200Response | DataProductsGetDefaultResponse
  >;
  /** Update data product resource. */
  patch(
    options: DataProductsUpdateParameters,
  ): StreamableMethod<
    | DataProductsUpdate200Response
    | DataProductsUpdate202Response
    | DataProductsUpdateDefaultResponse
  >;
  /** Delete data product resource. */
  delete(
    options?: DataProductsDeleteParameters,
  ): StreamableMethod<
    | DataProductsDeleteOperation202Response
    | DataProductsDeleteOperation204Response
    | DataProductsDeleteOperationDefaultResponse
  >;
}

export interface DataProductsGenerateStorageAccountSasToken {
  /** Generate sas token for storage account. */
  post(
    options: DataProductsGenerateStorageAccountSasTokenParameters,
  ): StreamableMethod<
    | DataProductsGenerateStorageAccountSasToken200Response
    | DataProductsGenerateStorageAccountSasTokenDefaultResponse
  >;
}

export interface DataProductsRotateKey {
  /** Initiate key rotation on Data Product. */
  post(
    options: DataProductsRotateKeyParameters,
  ): StreamableMethod<
    DataProductsRotateKey204Response | DataProductsRotateKeyDefaultResponse
  >;
}

export interface DataProductsAddUserRole {
  /** Assign role to the data product. */
  post(
    options: DataProductsAddUserRoleParameters,
  ): StreamableMethod<
    DataProductsAddUserRole200Response | DataProductsAddUserRoleDefaultResponse
  >;
}

export interface DataProductsRemoveUserRole {
  /** Remove role from the data product. */
  post(
    options: DataProductsRemoveUserRoleParameters,
  ): StreamableMethod<
    | DataProductsRemoveUserRole204Response
    | DataProductsRemoveUserRoleDefaultResponse
  >;
}

export interface DataProductsListRolesAssignments {
  /** List user roles associated with the data product. */
  post(
    options: DataProductsListRolesAssignmentsParameters,
  ): StreamableMethod<
    | DataProductsListRolesAssignments200Response
    | DataProductsListRolesAssignmentsDefaultResponse
  >;
}

export interface DataProductsListByResourceGroup {
  /** List data products by resource group. */
  get(
    options?: DataProductsListByResourceGroupParameters,
  ): StreamableMethod<
    | DataProductsListByResourceGroup200Response
    | DataProductsListByResourceGroupDefaultResponse
  >;
}

export interface DataProductsListBySubscription {
  /** List data products by subscription. */
  get(
    options?: DataProductsListBySubscriptionParameters,
  ): StreamableMethod<
    | DataProductsListBySubscription200Response
    | DataProductsListBySubscriptionDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/providers/Microsoft.NetworkAnalytics/operations' has methods for the following verbs: get */
  (path: "/providers/Microsoft.NetworkAnalytics/operations"): OperationsList;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.NetworkAnalytics/dataProductsCatalogs/default' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProductsCatalogs/default",
    subscriptionId: string,
    resourceGroupName: string,
  ): DataProductsCatalogsGet;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.NetworkAnalytics/dataProductsCatalogs' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProductsCatalogs",
    subscriptionId: string,
    resourceGroupName: string,
  ): DataProductsCatalogsListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.NetworkAnalytics/dataProductsCatalogs' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkAnalytics/dataProductsCatalogs",
    subscriptionId: string,
  ): DataProductsCatalogsListBySubscription;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.NetworkAnalytics/dataProducts/\{dataProductName\}/dataTypes/\{dataTypeName\}' has methods for the following verbs: put, get, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}",
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
  ): DataTypesCreate;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.NetworkAnalytics/dataProducts/\{dataProductName\}/dataTypes/\{dataTypeName\}/deleteData' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}/deleteData",
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
  ): DataTypesDeleteData;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.NetworkAnalytics/dataProducts/\{dataProductName\}/dataTypes/\{dataTypeName\}/generateStorageContainerSasToken' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}/generateStorageContainerSasToken",
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
  ): DataTypesGenerateStorageContainerSasToken;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.NetworkAnalytics/dataProducts/\{dataProductName\}/dataTypes' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes",
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
  ): DataTypesListByDataProduct;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.NetworkAnalytics/dataProducts/\{dataProductName\}' has methods for the following verbs: put, get, patch, delete */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}",
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
  ): DataProductsCreate;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.NetworkAnalytics/dataProducts/\{dataProductName\}/generateStorageAccountSasToken' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/generateStorageAccountSasToken",
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
  ): DataProductsGenerateStorageAccountSasToken;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.NetworkAnalytics/dataProducts/\{dataProductName\}/rotateKey' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/rotateKey",
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
  ): DataProductsRotateKey;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.NetworkAnalytics/dataProducts/\{dataProductName\}/addUserRole' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/addUserRole",
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
  ): DataProductsAddUserRole;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.NetworkAnalytics/dataProducts/\{dataProductName\}/removeUserRole' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/removeUserRole",
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
  ): DataProductsRemoveUserRole;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.NetworkAnalytics/dataProducts/\{dataProductName\}/listRolesAssignments' has methods for the following verbs: post */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/listRolesAssignments",
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
  ): DataProductsListRolesAssignments;
  /** Resource for '/subscriptions/\{subscriptionId\}/resourceGroups/\{resourceGroupName\}/providers/Microsoft.NetworkAnalytics/dataProducts' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts",
    subscriptionId: string,
    resourceGroupName: string,
  ): DataProductsListByResourceGroup;
  /** Resource for '/subscriptions/\{subscriptionId\}/providers/Microsoft.NetworkAnalytics/dataProducts' has methods for the following verbs: get */
  (
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkAnalytics/dataProducts",
    subscriptionId: string,
  ): DataProductsListBySubscription;
}

export type NetworkAnalyticsContext = Client & {
  path: Routes;
};
