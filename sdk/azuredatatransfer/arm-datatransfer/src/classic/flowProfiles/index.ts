// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDataTransferContext } from "../../api/azureDataTransferContext.js";
import {
  listByPipeline,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/flowProfiles/operations.js";
import type {
  FlowProfilesListByPipelineOptionalParams,
  FlowProfilesDeleteOptionalParams,
  FlowProfilesUpdateOptionalParams,
  FlowProfilesCreateOrUpdateOptionalParams,
  FlowProfilesGetOptionalParams,
} from "../../api/flowProfiles/options.js";
import type { FlowProfile, FlowProfilePatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FlowProfiles operations. */
export interface FlowProfilesOperations {
  /** Lists all FlowProfiles under a given Pipeline. */
  listByPipeline: (
    resourceGroupName: string,
    pipelineName: string,
    options?: FlowProfilesListByPipelineOptionalParams,
  ) => PagedAsyncIterableIterator<FlowProfile>;
  /** Deletes the specified FlowProfile resource. */
  delete: (
    resourceGroupName: string,
    pipelineName: string,
    flowProfileName: string,
    options?: FlowProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Applies partial updates to an existing FlowProfile resource. */
  update: (
    resourceGroupName: string,
    pipelineName: string,
    flowProfileName: string,
    properties: FlowProfilePatch,
    options?: FlowProfilesUpdateOptionalParams,
  ) => PollerLike<OperationState<FlowProfile>, FlowProfile>;
  /** Creates a new FlowProfile or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    pipelineName: string,
    flowProfileName: string,
    resource: FlowProfile,
    options?: FlowProfilesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FlowProfile>, FlowProfile>;
  /** Retrieves the specified FlowProfile resource. */
  get: (
    resourceGroupName: string,
    pipelineName: string,
    flowProfileName: string,
    options?: FlowProfilesGetOptionalParams,
  ) => Promise<FlowProfile>;
}

function _getFlowProfiles(context: AzureDataTransferContext) {
  return {
    listByPipeline: (
      resourceGroupName: string,
      pipelineName: string,
      options?: FlowProfilesListByPipelineOptionalParams,
    ) => listByPipeline(context, resourceGroupName, pipelineName, options),
    delete: (
      resourceGroupName: string,
      pipelineName: string,
      flowProfileName: string,
      options?: FlowProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, pipelineName, flowProfileName, options),
    update: (
      resourceGroupName: string,
      pipelineName: string,
      flowProfileName: string,
      properties: FlowProfilePatch,
      options?: FlowProfilesUpdateOptionalParams,
    ) => update(context, resourceGroupName, pipelineName, flowProfileName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      pipelineName: string,
      flowProfileName: string,
      resource: FlowProfile,
      options?: FlowProfilesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, pipelineName, flowProfileName, resource, options),
    get: (
      resourceGroupName: string,
      pipelineName: string,
      flowProfileName: string,
      options?: FlowProfilesGetOptionalParams,
    ) => get(context, resourceGroupName, pipelineName, flowProfileName, options),
  };
}

export function _getFlowProfilesOperations(
  context: AzureDataTransferContext,
): FlowProfilesOperations {
  return {
    ..._getFlowProfiles(context),
  };
}
