// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";

export interface OperationsListOptions extends OperationOptions {}

export interface DataProductsCatalogsGetOptions extends OperationOptions {}

export interface DataProductsCatalogsListByResourceGroupOptions
  extends OperationOptions {}

export interface DataProductsCatalogsListBySubscriptionOptions
  extends OperationOptions {}

export interface DataTypesCreateOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DataTypesGetOptions extends OperationOptions {}

export interface DataTypesUpdateOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DataTypesDeleteOperationOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DataTypesDeleteDataOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DataTypesGenerateStorageContainerSasTokenOptions
  extends OperationOptions {}

export interface DataTypesListByDataProductOptions extends OperationOptions {}

export interface DataProductsCreateOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DataProductsGetOptions extends OperationOptions {}

export interface DataProductsUpdateOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DataProductsDeleteOperationOptions extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DataProductsGenerateStorageAccountSasTokenOptions
  extends OperationOptions {}

export interface DataProductsRotateKeyOptions extends OperationOptions {}

export interface DataProductsAddUserRoleOptions extends OperationOptions {}

export interface DataProductsRemoveUserRoleOptions extends OperationOptions {}

export interface DataProductsListRolesAssignmentsOptions
  extends OperationOptions {}

export interface DataProductsListByResourceGroupOptions
  extends OperationOptions {}

export interface DataProductsListBySubscriptionOptions
  extends OperationOptions {}
