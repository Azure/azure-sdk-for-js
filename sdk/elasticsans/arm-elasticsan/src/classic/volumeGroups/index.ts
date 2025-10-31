// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ElasticSanManagementContext } from "../../api/elasticSanManagementContext.js";
import {
  listByElasticSan,
  $delete,
  update,
  create,
  get,
} from "../../api/volumeGroups/operations.js";
import type {
  VolumeGroupsListByElasticSanOptionalParams,
  VolumeGroupsDeleteOptionalParams,
  VolumeGroupsUpdateOptionalParams,
  VolumeGroupsCreateOptionalParams,
  VolumeGroupsGetOptionalParams,
} from "../../api/volumeGroups/options.js";
import type { VolumeGroup, VolumeGroupUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VolumeGroups operations. */
export interface VolumeGroupsOperations {
  /** List VolumeGroups. */
  listByElasticSan: (
    resourceGroupName: string,
    elasticSanName: string,
    options?: VolumeGroupsListByElasticSanOptionalParams,
  ) => PagedAsyncIterableIterator<VolumeGroup>;
  /** Delete an VolumeGroup. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    options?: VolumeGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update an VolumeGroup. */
  update: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: VolumeGroupUpdate,
    options?: VolumeGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<VolumeGroup>, VolumeGroup>;
  /** Create a Volume Group. */
  create: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: VolumeGroup,
    options?: VolumeGroupsCreateOptionalParams,
  ) => PollerLike<OperationState<VolumeGroup>, VolumeGroup>;
  /** Get an VolumeGroups. */
  get: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    options?: VolumeGroupsGetOptionalParams,
  ) => Promise<VolumeGroup>;
}

function _getVolumeGroups(context: ElasticSanManagementContext) {
  return {
    listByElasticSan: (
      resourceGroupName: string,
      elasticSanName: string,
      options?: VolumeGroupsListByElasticSanOptionalParams,
    ) => listByElasticSan(context, resourceGroupName, elasticSanName, options),
    delete: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      options?: VolumeGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, elasticSanName, volumeGroupName, options),
    update: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: VolumeGroupUpdate,
      options?: VolumeGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, elasticSanName, volumeGroupName, parameters, options),
    create: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: VolumeGroup,
      options?: VolumeGroupsCreateOptionalParams,
    ) => create(context, resourceGroupName, elasticSanName, volumeGroupName, parameters, options),
    get: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      options?: VolumeGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, elasticSanName, volumeGroupName, options),
  };
}

export function _getVolumeGroupsOperations(
  context: ElasticSanManagementContext,
): VolumeGroupsOperations {
  return {
    ..._getVolumeGroups(context),
  };
}
