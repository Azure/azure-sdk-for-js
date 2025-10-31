// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  listSupportInfo,
  listProductSerialNumberStatus,
  listCloudManagerTenants,
  createProductSerialNumber,
} from "../../api/paloAltoNetworksCloudngfwOperations/operations.js";
import type {
  PaloAltoNetworksCloudngfwOperationsListSupportInfoOptionalParams,
  PaloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusOptionalParams,
  PaloAltoNetworksCloudngfwOperationsListCloudManagerTenantsOptionalParams,
  PaloAltoNetworksCloudngfwOperationsCreateProductSerialNumberOptionalParams,
} from "../../api/paloAltoNetworksCloudngfwOperations/options.js";
import type {
  ProductSerialNumberRequestStatus,
  CloudManagerTenantList,
  ProductSerialNumberStatus,
  SupportInfoModel,
} from "../../models/models.js";

/** Interface representing a PaloAltoNetworksCloudngfwOperations operations. */
export interface PaloAltoNetworksCloudngfwOperationsOperations {
  listSupportInfo: (
    options?: PaloAltoNetworksCloudngfwOperationsListSupportInfoOptionalParams,
  ) => Promise<SupportInfoModel>;
  listProductSerialNumberStatus: (
    options?: PaloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusOptionalParams,
  ) => Promise<ProductSerialNumberStatus | null>;
  listCloudManagerTenants: (
    options?: PaloAltoNetworksCloudngfwOperationsListCloudManagerTenantsOptionalParams,
  ) => Promise<CloudManagerTenantList>;
  createProductSerialNumber: (
    options?: PaloAltoNetworksCloudngfwOperationsCreateProductSerialNumberOptionalParams,
  ) => Promise<ProductSerialNumberRequestStatus>;
}

function _getPaloAltoNetworksCloudngfwOperations(context: PaloAltoNetworksCloudngfwContext) {
  return {
    listSupportInfo: (options?: PaloAltoNetworksCloudngfwOperationsListSupportInfoOptionalParams) =>
      listSupportInfo(context, options),
    listProductSerialNumberStatus: (
      options?: PaloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusOptionalParams,
    ) => listProductSerialNumberStatus(context, options),
    listCloudManagerTenants: (
      options?: PaloAltoNetworksCloudngfwOperationsListCloudManagerTenantsOptionalParams,
    ) => listCloudManagerTenants(context, options),
    createProductSerialNumber: (
      options?: PaloAltoNetworksCloudngfwOperationsCreateProductSerialNumberOptionalParams,
    ) => createProductSerialNumber(context, options),
  };
}

export function _getPaloAltoNetworksCloudngfwOperationsOperations(
  context: PaloAltoNetworksCloudngfwContext,
): PaloAltoNetworksCloudngfwOperationsOperations {
  return {
    ..._getPaloAltoNetworksCloudngfwOperations(context),
  };
}
