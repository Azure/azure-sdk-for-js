// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NetworkAnalyticsContext } from "../../api/NetworkAnalyticsContext.js";
import {
  DataProduct,
  DataProductUpdate,
  AccountSas,
  AccountSasToken,
  KeyVaultInfo,
  RoleAssignmentCommonProperties,
  RoleAssignmentDetail,
  ListRoleAssignments,
} from "../../models/models.js";
import {
  dataProductsCreate,
  dataProductsGet,
  dataProductsUpdate,
  dataProductsDeleteOperation,
  dataProductsGenerateStorageAccountSasToken,
  dataProductsRotateKey,
  dataProductsAddUserRole,
  dataProductsRemoveUserRole,
  dataProductsListRolesAssignments,
  dataProductsListByResourceGroup,
  dataProductsListBySubscription,
} from "../../api/dataProducts/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  DataProductsCreateOptions,
  DataProductsGetOptions,
  DataProductsUpdateOptions,
  DataProductsDeleteOperationOptions,
  DataProductsGenerateStorageAccountSasTokenOptions,
  DataProductsRotateKeyOptions,
  DataProductsAddUserRoleOptions,
  DataProductsRemoveUserRoleOptions,
  DataProductsListRolesAssignmentsOptions,
  DataProductsListByResourceGroupOptions,
  DataProductsListBySubscriptionOptions,
} from "../../models/options.js";

export interface DataProductsOperations {
  create: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    resource: DataProduct,
    options?: DataProductsCreateOptions,
  ) => PollerLike<OperationState<DataProduct>, DataProduct>;
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    options?: DataProductsGetOptions,
  ) => Promise<DataProduct>;
  update: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    properties: DataProductUpdate,
    options?: DataProductsUpdateOptions,
  ) => PollerLike<OperationState<DataProduct>, DataProduct>;
  deleteOperation: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    options?: DataProductsDeleteOperationOptions,
  ) => PollerLike<OperationState<void>, void>;
  generateStorageAccountSasToken: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    body: AccountSas,
    options?: DataProductsGenerateStorageAccountSasTokenOptions,
  ) => Promise<AccountSasToken>;
  rotateKey: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    body: KeyVaultInfo,
    options?: DataProductsRotateKeyOptions,
  ) => Promise<void>;
  addUserRole: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    body: RoleAssignmentCommonProperties,
    options?: DataProductsAddUserRoleOptions,
  ) => Promise<RoleAssignmentDetail>;
  removeUserRole: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    body: RoleAssignmentDetail,
    options?: DataProductsRemoveUserRoleOptions,
  ) => Promise<void>;
  listRolesAssignments: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    body: Record<string, any>,
    options?: DataProductsListRolesAssignmentsOptions,
  ) => Promise<ListRoleAssignments>;
  listByResourceGroup: (
    subscriptionId: string,
    resourceGroupName: string,
    options?: DataProductsListByResourceGroupOptions,
  ) => PagedAsyncIterableIterator<DataProduct>;
  listBySubscription: (
    subscriptionId: string,
    options?: DataProductsListBySubscriptionOptions,
  ) => PagedAsyncIterableIterator<DataProduct>;
}

export function getDataProducts(context: NetworkAnalyticsContext) {
  return {
    create: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      resource: DataProduct,
      options?: DataProductsCreateOptions,
    ) =>
      dataProductsCreate(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        resource,
        options,
      ),
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      options?: DataProductsGetOptions,
    ) =>
      dataProductsGet(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        options,
      ),
    update: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      properties: DataProductUpdate,
      options?: DataProductsUpdateOptions,
    ) =>
      dataProductsUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        properties,
        options,
      ),
    deleteOperation: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      options?: DataProductsDeleteOperationOptions,
    ) =>
      dataProductsDeleteOperation(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        options,
      ),
    generateStorageAccountSasToken: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      body: AccountSas,
      options?: DataProductsGenerateStorageAccountSasTokenOptions,
    ) =>
      dataProductsGenerateStorageAccountSasToken(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        body,
        options,
      ),
    rotateKey: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      body: KeyVaultInfo,
      options?: DataProductsRotateKeyOptions,
    ) =>
      dataProductsRotateKey(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        body,
        options,
      ),
    addUserRole: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      body: RoleAssignmentCommonProperties,
      options?: DataProductsAddUserRoleOptions,
    ) =>
      dataProductsAddUserRole(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        body,
        options,
      ),
    removeUserRole: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      body: RoleAssignmentDetail,
      options?: DataProductsRemoveUserRoleOptions,
    ) =>
      dataProductsRemoveUserRole(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        body,
        options,
      ),
    listRolesAssignments: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      body: Record<string, any>,
      options?: DataProductsListRolesAssignmentsOptions,
    ) =>
      dataProductsListRolesAssignments(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        body,
        options,
      ),
    listByResourceGroup: (
      subscriptionId: string,
      resourceGroupName: string,
      options?: DataProductsListByResourceGroupOptions,
    ) =>
      dataProductsListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      subscriptionId: string,
      options?: DataProductsListBySubscriptionOptions,
    ) => dataProductsListBySubscription(context, subscriptionId, options),
  };
}

export function getDataProductsOperations(
  context: NetworkAnalyticsContext,
): DataProductsOperations {
  return {
    ...getDataProducts(context),
  };
}
