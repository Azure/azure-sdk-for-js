// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";

export interface OperationsListOptionalParams extends OperationOptions {}

export interface DataProductsCatalogsGetOptionalParams
  extends OperationOptions {}

export interface DataProductsCatalogsListByResourceGroupOptionalParams
  extends OperationOptions {}

export interface DataProductsCatalogsListBySubscriptionOptionalParams
  extends OperationOptions {}

export interface DataTypesCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DataTypesGetOptionalParams extends OperationOptions {}

export interface DataTypesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DataTypesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DataTypesDeleteDataOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DataTypesGenerateStorageContainerSasTokenOptionalParams
  extends OperationOptions {}

export interface DataTypesListByDataProductOptionalParams
  extends OperationOptions {}

export interface DataProductsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DataProductsGetOptionalParams extends OperationOptions {}

export interface DataProductsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DataProductsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

export interface DataProductsGenerateStorageAccountSasTokenOptionalParams
  extends OperationOptions {}

export interface DataProductsRotateKeyOptionalParams extends OperationOptions {}

export interface DataProductsAddUserRoleOptionalParams
  extends OperationOptions {}

export interface DataProductsRemoveUserRoleOptionalParams
  extends OperationOptions {}

export interface DataProductsListRolesAssignmentsOptionalParams
  extends OperationOptions {}

export interface DataProductsListByResourceGroupOptionalParams
  extends OperationOptions {}

export interface DataProductsListBySubscriptionOptionalParams
  extends OperationOptions {}
