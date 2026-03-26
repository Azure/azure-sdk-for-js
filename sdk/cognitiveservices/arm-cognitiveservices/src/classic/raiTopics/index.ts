// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/raiTopics/operations.js";
import type {
  RaiTopicsListOptionalParams,
  RaiTopicsDeleteOptionalParams,
  RaiTopicsCreateOrUpdateOptionalParams,
  RaiTopicsGetOptionalParams,
} from "../../api/raiTopics/options.js";
import type { RaiTopic } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RaiTopics operations. */
export interface RaiTopicsOperations {
  /** Gets the custom topics associated with the Azure OpenAI account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: RaiTopicsListOptionalParams,
  ) => PagedAsyncIterableIterator<RaiTopic>;
  /** Deletes the specified custom topic associated with the Azure OpenAI account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    raiTopicName: string,
    options?: RaiTopicsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create the rai topic associated with the Azure OpenAI account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    raiTopicName: string,
    raiTopic: RaiTopic,
    options?: RaiTopicsCreateOrUpdateOptionalParams,
  ) => Promise<RaiTopic>;
  /** Gets the specified custom topic associated with the Azure OpenAI account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    raiTopicName: string,
    options?: RaiTopicsGetOptionalParams,
  ) => Promise<RaiTopic>;
}

function _getRaiTopics(context: CognitiveServicesManagementContext) {
  return {
    list: (resourceGroupName: string, accountName: string, options?: RaiTopicsListOptionalParams) =>
      list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      raiTopicName: string,
      options?: RaiTopicsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, raiTopicName, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      raiTopicName: string,
      raiTopic: RaiTopic,
      options?: RaiTopicsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, raiTopicName, raiTopic, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      raiTopicName: string,
      options?: RaiTopicsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, raiTopicName, options),
  };
}

export function _getRaiTopicsOperations(
  context: CognitiveServicesManagementContext,
): RaiTopicsOperations {
  return {
    ..._getRaiTopics(context),
  };
}
