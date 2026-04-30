// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext } from "../../api/computeManagementContext.js";
import { $delete, create, get } from "../../api/restorePoints/operations.js";
import type {
  RestorePointsDeleteOptionalParams,
  RestorePointsCreateOptionalParams,
  RestorePointsGetOptionalParams,
} from "../../api/restorePoints/options.js";
import type { RestorePoint } from "../../models/compute/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RestorePoints operations. */
export interface RestorePointsOperations {
  /** The operation to delete the restore point. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    restorePointName: string,
    options?: RestorePointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    restorePointName: string,
    options?: RestorePointsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    restorePointName: string,
    options?: RestorePointsDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation to create the restore point. Updating properties of an existing restore point is not allowed */
  create: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    restorePointName: string,
    parameters: RestorePoint,
    options?: RestorePointsCreateOptionalParams,
  ) => PollerLike<OperationState<RestorePoint>, RestorePoint>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    restorePointName: string,
    parameters: RestorePoint,
    options?: RestorePointsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<RestorePoint>, RestorePoint>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    restorePointName: string,
    parameters: RestorePoint,
    options?: RestorePointsCreateOptionalParams,
  ) => Promise<RestorePoint>;
  /** The operation to get the restore point. */
  get: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    restorePointName: string,
    options?: RestorePointsGetOptionalParams,
  ) => Promise<RestorePoint>;
}

function _getRestorePoints(context: ComputeManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      restorePointCollectionName: string,
      restorePointName: string,
      options?: RestorePointsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, restorePointCollectionName, restorePointName, options),
    beginDelete: async (
      resourceGroupName: string,
      restorePointCollectionName: string,
      restorePointName: string,
      options?: RestorePointsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        restorePointCollectionName,
        restorePointName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      restorePointCollectionName: string,
      restorePointName: string,
      options?: RestorePointsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        restorePointCollectionName,
        restorePointName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      restorePointCollectionName: string,
      restorePointName: string,
      parameters: RestorePoint,
      options?: RestorePointsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        restorePointCollectionName,
        restorePointName,
        parameters,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      restorePointCollectionName: string,
      restorePointName: string,
      parameters: RestorePoint,
      options?: RestorePointsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        restorePointCollectionName,
        restorePointName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      restorePointCollectionName: string,
      restorePointName: string,
      parameters: RestorePoint,
      options?: RestorePointsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        restorePointCollectionName,
        restorePointName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      restorePointCollectionName: string,
      restorePointName: string,
      options?: RestorePointsGetOptionalParams,
    ) => get(context, resourceGroupName, restorePointCollectionName, restorePointName, options),
  };
}

export function _getRestorePointsOperations(
  context: ComputeManagementContext,
): RestorePointsOperations {
  return {
    ..._getRestorePoints(context),
  };
}
