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
  /** A long-running provider action. */
  listSupportInfo: (
    options?: PaloAltoNetworksCloudngfwOperationsListSupportInfoOptionalParams,
  ) => Promise<SupportInfoModel>;
  /** A long-running provider action. */
  listProductSerialNumberStatus: (
    options?: PaloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusOptionalParams,
  ) => Promise<ProductSerialNumberStatus | void>;
  /** A long-running provider action. */
  listCloudManagerTenants: (
    options?: PaloAltoNetworksCloudngfwOperationsListCloudManagerTenantsOptionalParams,
  ) => Promise<CloudManagerTenantList>;
  /** A long-running provider action. */
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
