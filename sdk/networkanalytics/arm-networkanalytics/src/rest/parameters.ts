// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  DataType,
  DataTypeUpdate,
  ContainerSaS,
  DataProduct,
  DataProductUpdate,
  AccountSas,
  KeyVaultInfo,
  RoleAssignmentCommonProperties,
  RoleAssignmentDetail,
} from "./models.js";

export type OperationsListParameters = RequestParameters;
export type DataProductsCatalogsGetParameters = RequestParameters;
export type DataProductsCatalogsListByResourceGroupParameters =
  RequestParameters;
export type DataProductsCatalogsListBySubscriptionParameters =
  RequestParameters;

export interface DataTypesCreateBodyParam {
  /** Resource create parameters. */
  body: DataType;
}

export type DataTypesCreateParameters = DataTypesCreateBodyParam &
  RequestParameters;
export type DataTypesGetParameters = RequestParameters;

export interface DataTypesUpdateBodyParam {
  /** The resource properties to be updated. */
  body: DataTypeUpdate;
}

export type DataTypesUpdateParameters = DataTypesUpdateBodyParam &
  RequestParameters;
export type DataTypesDeleteParameters = RequestParameters;

export interface DataTypesDeleteDataBodyParam {
  /** The content of the action request */
  body: Record<string, unknown>;
}

export type DataTypesDeleteDataParameters = DataTypesDeleteDataBodyParam &
  RequestParameters;

export interface DataTypesGenerateStorageContainerSasTokenBodyParam {
  /** The content of the action request */
  body: ContainerSaS;
}

export type DataTypesGenerateStorageContainerSasTokenParameters =
  DataTypesGenerateStorageContainerSasTokenBodyParam & RequestParameters;
export type DataTypesListByDataProductParameters = RequestParameters;

export interface DataProductsCreateBodyParam {
  /** Resource create parameters. */
  body: DataProduct;
}

export type DataProductsCreateParameters = DataProductsCreateBodyParam &
  RequestParameters;
export type DataProductsGetParameters = RequestParameters;

export interface DataProductsUpdateBodyParam {
  /** The resource properties to be updated. */
  body: DataProductUpdate;
}

export type DataProductsUpdateParameters = DataProductsUpdateBodyParam &
  RequestParameters;
export type DataProductsDeleteParameters = RequestParameters;

export interface DataProductsGenerateStorageAccountSasTokenBodyParam {
  /** The content of the action request */
  body: AccountSas;
}

export type DataProductsGenerateStorageAccountSasTokenParameters =
  DataProductsGenerateStorageAccountSasTokenBodyParam & RequestParameters;

export interface DataProductsRotateKeyBodyParam {
  /** The content of the action request */
  body: KeyVaultInfo;
}

export type DataProductsRotateKeyParameters = DataProductsRotateKeyBodyParam &
  RequestParameters;

export interface DataProductsAddUserRoleBodyParam {
  /** The content of the action request */
  body: RoleAssignmentCommonProperties;
}

export type DataProductsAddUserRoleParameters =
  DataProductsAddUserRoleBodyParam & RequestParameters;

export interface DataProductsRemoveUserRoleBodyParam {
  /** The content of the action request */
  body: RoleAssignmentDetail;
}

export type DataProductsRemoveUserRoleParameters =
  DataProductsRemoveUserRoleBodyParam & RequestParameters;

export interface DataProductsListRolesAssignmentsBodyParam {
  /** The content of the action request */
  body: Record<string, unknown>;
}

export type DataProductsListRolesAssignmentsParameters =
  DataProductsListRolesAssignmentsBodyParam & RequestParameters;
export type DataProductsListByResourceGroupParameters = RequestParameters;
export type DataProductsListBySubscriptionParameters = RequestParameters;
