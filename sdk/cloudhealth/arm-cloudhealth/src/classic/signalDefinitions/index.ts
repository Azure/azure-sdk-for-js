// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CloudHealthContext } from "../../api/cloudHealthContext.js";
import {
  listByHealthModel,
  $delete,
  createOrUpdate,
  get,
} from "../../api/signalDefinitions/operations.js";
import type {
  SignalDefinitionsListByHealthModelOptionalParams,
  SignalDefinitionsDeleteOptionalParams,
  SignalDefinitionsCreateOrUpdateOptionalParams,
  SignalDefinitionsGetOptionalParams,
} from "../../api/signalDefinitions/options.js";
import type { SignalDefinition } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SignalDefinitions operations. */
export interface SignalDefinitionsOperations {
  /** List SignalDefinition resources by HealthModel */
  listByHealthModel: (
    resourceGroupName: string,
    healthModelName: string,
    options?: SignalDefinitionsListByHealthModelOptionalParams,
  ) => PagedAsyncIterableIterator<SignalDefinition>;
  /** Delete a SignalDefinition */
  delete: (
    resourceGroupName: string,
    healthModelName: string,
    signalDefinitionName: string,
    options?: SignalDefinitionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a SignalDefinition */
  createOrUpdate: (
    resourceGroupName: string,
    healthModelName: string,
    signalDefinitionName: string,
    resource: SignalDefinition,
    options?: SignalDefinitionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SignalDefinition>, SignalDefinition>;
  /** Get a SignalDefinition */
  get: (
    resourceGroupName: string,
    healthModelName: string,
    signalDefinitionName: string,
    options?: SignalDefinitionsGetOptionalParams,
  ) => Promise<SignalDefinition>;
}

function _getSignalDefinitions(context: CloudHealthContext) {
  return {
    listByHealthModel: (
      resourceGroupName: string,
      healthModelName: string,
      options?: SignalDefinitionsListByHealthModelOptionalParams,
    ) => listByHealthModel(context, resourceGroupName, healthModelName, options),
    delete: (
      resourceGroupName: string,
      healthModelName: string,
      signalDefinitionName: string,
      options?: SignalDefinitionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, healthModelName, signalDefinitionName, options),
    createOrUpdate: (
      resourceGroupName: string,
      healthModelName: string,
      signalDefinitionName: string,
      resource: SignalDefinition,
      options?: SignalDefinitionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        healthModelName,
        signalDefinitionName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      healthModelName: string,
      signalDefinitionName: string,
      options?: SignalDefinitionsGetOptionalParams,
    ) => get(context, resourceGroupName, healthModelName, signalDefinitionName, options),
  };
}

export function _getSignalDefinitionsOperations(
  context: CloudHealthContext,
): SignalDefinitionsOperations {
  return {
    ..._getSignalDefinitions(context),
  };
}
