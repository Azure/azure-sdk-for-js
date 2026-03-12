// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext } from "../../api/azureQuotaExtensionAPIContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/groupQuotas/operations.js";
import type {
  GroupQuotasListOptionalParams,
  GroupQuotasDeleteOptionalParams,
  GroupQuotasUpdateOptionalParams,
  GroupQuotasCreateOrUpdateOptionalParams,
  GroupQuotasGetOptionalParams,
} from "../../api/groupQuotas/options.js";
import type { GroupQuotasEntity } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GroupQuotas operations. */
export interface GroupQuotasOperations {
  /** Lists GroupQuotas for the scope passed. It will return the GroupQuotas QuotaEntity properties only.The details on group quota can be access from the group quota APIs. */
  list: (
    managementGroupId: string,
    options?: GroupQuotasListOptionalParams,
  ) => PagedAsyncIterableIterator<GroupQuotasEntity>;
  /** Deletes the GroupQuotas for the name passed. All the remaining shareQuota in the GroupQuotas will be lost. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    managementGroupId: string,
    groupQuotaName: string,
    options?: GroupQuotasDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /**
   * Updates the GroupQuotas for the name passed. A GroupQuotas RequestId will be returned by the Service. The status can be polled periodically. The status Async polling is using standards defined at - https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/async-api-reference.md#asynchronous-operations. Use the OperationsStatus URI provided in Azure-AsyncOperation header, the duration will be specified in retry-after header. Once the operation gets to terminal state - Succeeded | Failed, then the URI will change to Get URI and full details can be checked.
   * Any change in the filters will be applicable to the future quota assignments, existing quota allocated to subscriptions from the GroupQuotas remains unchanged.
   */
  update: (
    managementGroupId: string,
    groupQuotaName: string,
    options?: GroupQuotasUpdateOptionalParams,
  ) => PollerLike<OperationState<GroupQuotasEntity>, GroupQuotasEntity>;
  /** Creates a new GroupQuota for the name passed. A RequestId will be returned by the Service. The status can be polled periodically. The status Async polling is using standards defined at - https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/async-api-reference.md#asynchronous-operations. Use the OperationsStatus URI provided in Azure-AsyncOperation header, the duration will be specified in retry-after header. Once the operation gets to terminal state - Succeeded | Failed, then the URI will change to Get URI and full details can be checked. */
  createOrUpdate: (
    managementGroupId: string,
    groupQuotaName: string,
    options?: GroupQuotasCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GroupQuotasEntity>, GroupQuotasEntity>;
  /** Gets the GroupQuotas for the name passed. It will return the GroupQuotas properties only. The details on group quota can be access from the group quota APIs. */
  get: (
    managementGroupId: string,
    groupQuotaName: string,
    options?: GroupQuotasGetOptionalParams,
  ) => Promise<GroupQuotasEntity>;
}

function _getGroupQuotas(context: AzureQuotaExtensionAPIContext) {
  return {
    list: (managementGroupId: string, options?: GroupQuotasListOptionalParams) =>
      list(context, managementGroupId, options),
    delete: (
      managementGroupId: string,
      groupQuotaName: string,
      options?: GroupQuotasDeleteOptionalParams,
    ) => $delete(context, managementGroupId, groupQuotaName, options),
    update: (
      managementGroupId: string,
      groupQuotaName: string,
      options?: GroupQuotasUpdateOptionalParams,
    ) => update(context, managementGroupId, groupQuotaName, options),
    createOrUpdate: (
      managementGroupId: string,
      groupQuotaName: string,
      options?: GroupQuotasCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, managementGroupId, groupQuotaName, options),
    get: (
      managementGroupId: string,
      groupQuotaName: string,
      options?: GroupQuotasGetOptionalParams,
    ) => get(context, managementGroupId, groupQuotaName, options),
  };
}

export function _getGroupQuotasOperations(
  context: AzureQuotaExtensionAPIContext,
): GroupQuotasOperations {
  return {
    ..._getGroupQuotas(context),
  };
}
