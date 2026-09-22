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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    options?: VolumeGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    options?: VolumeGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update an VolumeGroup. */
  update: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: VolumeGroupUpdate,
    options?: VolumeGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<VolumeGroup>, VolumeGroup>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: VolumeGroupUpdate,
    options?: VolumeGroupsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VolumeGroup>, VolumeGroup>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: VolumeGroupUpdate,
    options?: VolumeGroupsUpdateOptionalParams,
  ) => Promise<VolumeGroup>;
  /** Create a Volume Group. */
  create: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: VolumeGroup,
    options?: VolumeGroupsCreateOptionalParams,
  ) => PollerLike<OperationState<VolumeGroup>, VolumeGroup>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: VolumeGroup,
    options?: VolumeGroupsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VolumeGroup>, VolumeGroup>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    elasticSanName: string,
    volumeGroupName: string,
    parameters: VolumeGroup,
    options?: VolumeGroupsCreateOptionalParams,
  ) => Promise<VolumeGroup>;
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
    beginDelete: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      options?: VolumeGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, elasticSanName, volumeGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      options?: VolumeGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, elasticSanName, volumeGroupName, options);
    },
    update: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: VolumeGroupUpdate,
      options?: VolumeGroupsUpdateOptionalParams,
    ) => update(context, resourceGroupName, elasticSanName, volumeGroupName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: VolumeGroupUpdate,
      options?: VolumeGroupsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: VolumeGroupUpdate,
      options?: VolumeGroupsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        parameters,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: VolumeGroup,
      options?: VolumeGroupsCreateOptionalParams,
    ) => create(context, resourceGroupName, elasticSanName, volumeGroupName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: VolumeGroup,
      options?: VolumeGroupsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      elasticSanName: string,
      volumeGroupName: string,
      parameters: VolumeGroup,
      options?: VolumeGroupsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        elasticSanName,
        volumeGroupName,
        parameters,
        options,
      );
    },
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
