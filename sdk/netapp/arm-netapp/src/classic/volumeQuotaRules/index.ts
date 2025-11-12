// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listByVolume,
  $delete,
  update,
  create,
  get,
} from "../../api/volumeQuotaRules/operations.js";
import type {
  VolumeQuotaRulesListByVolumeOptionalParams,
  VolumeQuotaRulesDeleteOptionalParams,
  VolumeQuotaRulesUpdateOptionalParams,
  VolumeQuotaRulesCreateOptionalParams,
  VolumeQuotaRulesGetOptionalParams,
} from "../../api/volumeQuotaRules/options.js";
import type { VolumeQuotaRule, VolumeQuotaRulePatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VolumeQuotaRules operations. */
export interface VolumeQuotaRulesOperations {
  /** List all quota rules associated with the volume */
  listByVolume: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: VolumeQuotaRulesListByVolumeOptionalParams,
  ) => PagedAsyncIterableIterator<VolumeQuotaRule>;
  /** Delete quota rule */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    volumeQuotaRuleName: string,
    options?: VolumeQuotaRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch a quota rule */
  update: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    volumeQuotaRuleName: string,
    body: VolumeQuotaRulePatch,
    options?: VolumeQuotaRulesUpdateOptionalParams,
  ) => PollerLike<OperationState<VolumeQuotaRule>, VolumeQuotaRule>;
  /** Create the specified quota rule within the given volume */
  create: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    volumeQuotaRuleName: string,
    body: VolumeQuotaRule,
    options?: VolumeQuotaRulesCreateOptionalParams,
  ) => PollerLike<OperationState<VolumeQuotaRule>, VolumeQuotaRule>;
  /** Get details of the specified quota rule */
  get: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    volumeQuotaRuleName: string,
    options?: VolumeQuotaRulesGetOptionalParams,
  ) => Promise<VolumeQuotaRule>;
}

function _getVolumeQuotaRules(context: NetAppManagementContext) {
  return {
    listByVolume: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: VolumeQuotaRulesListByVolumeOptionalParams,
    ) => listByVolume(context, resourceGroupName, accountName, poolName, volumeName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      volumeQuotaRuleName: string,
      options?: VolumeQuotaRulesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        volumeQuotaRuleName,
        options,
      ),
    update: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      volumeQuotaRuleName: string,
      body: VolumeQuotaRulePatch,
      options?: VolumeQuotaRulesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        volumeQuotaRuleName,
        body,
        options,
      ),
    create: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      volumeQuotaRuleName: string,
      body: VolumeQuotaRule,
      options?: VolumeQuotaRulesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        volumeQuotaRuleName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      volumeQuotaRuleName: string,
      options?: VolumeQuotaRulesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        volumeQuotaRuleName,
        options,
      ),
  };
}

export function _getVolumeQuotaRulesOperations(
  context: NetAppManagementContext,
): VolumeQuotaRulesOperations {
  return {
    ..._getVolumeQuotaRules(context),
  };
}
