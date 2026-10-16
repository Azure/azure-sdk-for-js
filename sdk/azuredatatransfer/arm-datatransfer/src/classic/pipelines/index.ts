// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDataTransferContext } from "../../api/azureDataTransferContext.js";
import {
  rejectConnection,
  listSchemasList,
  list,
  executeAction,
  approveConnection,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/pipelines/operations.js";
import type {
  PipelinesRejectConnectionOptionalParams,
  PipelinesListSchemasListOptionalParams,
  PipelinesListOptionalParams,
  PipelinesExecuteActionOptionalParams,
  PipelinesApproveConnectionOptionalParams,
  PipelinesListBySubscriptionOptionalParams,
  PipelinesListByResourceGroupOptionalParams,
  PipelinesDeleteOptionalParams,
  PipelinesUpdateOptionalParams,
  PipelinesCreateOrUpdateOptionalParams,
  PipelinesGetOptionalParams,
} from "../../api/pipelines/options.js";
import type {
  Pipeline,
  PipelinesPatch,
  ResourceBody,
  Connection,
  Schema,
  Action,
  ConnectionIdList,
  ListFlowsByPipelineResult,
  SchemasListResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Pipelines operations. */
export interface PipelinesOperations {
  /** Rejects a pending connection request associated with the specified Pipeline. */
  rejectConnection: (
    resourceGroupName: string,
    pipelineName: string,
    connection: ResourceBody,
    options?: PipelinesRejectConnectionOptionalParams,
  ) => PollerLike<OperationState<Connection>, Connection>;
  /** Lists the schemas associated with a specific connection in the Pipeline. This operation has reached end of life support starting version 2025-05-30-preview. For schema support please create and use a FlowProfile resource. */
  listSchemasList: (
    resourceGroupName: string,
    pipelineName: string,
    schema: Schema,
    options?: PipelinesListSchemasListOptionalParams,
  ) => Promise<SchemasListResult>;
  /** Lists all Flows associated with the specified Pipeline. */
  list: (
    resourceGroupName: string,
    pipelineName: string,
    body: {
      connections?: ConnectionIdList;
    },
    options?: PipelinesListOptionalParams,
  ) => Promise<ListFlowsByPipelineResult>;
  /** Executes a privileged or administrative action on the specified Pipeline. */
  executeAction: (
    resourceGroupName: string,
    pipelineName: string,
    action: Action,
    options?: PipelinesExecuteActionOptionalParams,
  ) => PollerLike<OperationState<Pipeline>, Pipeline>;
  /** Approves a pending connection request associated with the specified Pipeline. */
  approveConnection: (
    resourceGroupName: string,
    pipelineName: string,
    connection: ResourceBody,
    options?: PipelinesApproveConnectionOptionalParams,
  ) => PollerLike<OperationState<Connection>, Connection>;
  /** Lists all Pipeline resources within the current subscription. */
  listBySubscription: (
    options?: PipelinesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Pipeline>;
  /** Lists all Pipeline resources within the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PipelinesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Pipeline>;
  /** Deletes the specified Pipeline resource. */
  delete: (
    resourceGroupName: string,
    pipelineName: string,
    options?: PipelinesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Applies partial updates to an existing Pipeline resource. This operation supports patch semantics and returns the updated Pipeline. */
  update: (
    resourceGroupName: string,
    pipelineName: string,
    pipeline: PipelinesPatch,
    options?: PipelinesUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates a new Pipeline resource or updates an existing one. This operation is asynchronous and returns the resulting Pipeline. */
  createOrUpdate: (
    resourceGroupName: string,
    pipelineName: string,
    pipeline: Pipeline,
    options?: PipelinesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Pipeline>, Pipeline>;
  /** Retrieves the specified Pipeline resource. */
  get: (
    resourceGroupName: string,
    pipelineName: string,
    options?: PipelinesGetOptionalParams,
  ) => Promise<Pipeline>;
}

function _getPipelines(context: AzureDataTransferContext) {
  return {
    rejectConnection: (
      resourceGroupName: string,
      pipelineName: string,
      connection: ResourceBody,
      options?: PipelinesRejectConnectionOptionalParams,
    ) => rejectConnection(context, resourceGroupName, pipelineName, connection, options),
    listSchemasList: (
      resourceGroupName: string,
      pipelineName: string,
      schema: Schema,
      options?: PipelinesListSchemasListOptionalParams,
    ) => listSchemasList(context, resourceGroupName, pipelineName, schema, options),
    list: (
      resourceGroupName: string,
      pipelineName: string,
      body: {
        connections?: ConnectionIdList;
      },
      options?: PipelinesListOptionalParams,
    ) => list(context, resourceGroupName, pipelineName, body, options),
    executeAction: (
      resourceGroupName: string,
      pipelineName: string,
      action: Action,
      options?: PipelinesExecuteActionOptionalParams,
    ) => executeAction(context, resourceGroupName, pipelineName, action, options),
    approveConnection: (
      resourceGroupName: string,
      pipelineName: string,
      connection: ResourceBody,
      options?: PipelinesApproveConnectionOptionalParams,
    ) => approveConnection(context, resourceGroupName, pipelineName, connection, options),
    listBySubscription: (options?: PipelinesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PipelinesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      pipelineName: string,
      options?: PipelinesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, pipelineName, options),
    update: (
      resourceGroupName: string,
      pipelineName: string,
      pipeline: PipelinesPatch,
      options?: PipelinesUpdateOptionalParams,
    ) => update(context, resourceGroupName, pipelineName, pipeline, options),
    createOrUpdate: (
      resourceGroupName: string,
      pipelineName: string,
      pipeline: Pipeline,
      options?: PipelinesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, pipelineName, pipeline, options),
    get: (resourceGroupName: string, pipelineName: string, options?: PipelinesGetOptionalParams) =>
      get(context, resourceGroupName, pipelineName, options),
  };
}

export function _getPipelinesOperations(context: AzureDataTransferContext): PipelinesOperations {
  return {
    ..._getPipelines(context),
  };
}
