// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthContext } from "../../api/cloudHealthContext.js";
import { SignalDefinition } from "../../models/models.js";
import {
  SignalDefinitionsListByHealthModelOptionalParams,
  SignalDefinitionsDeleteOptionalParams,
  SignalDefinitionsCreateOrUpdateOptionalParams,
  SignalDefinitionsGetOptionalParams,
} from "../../api/signalDefinitions/options.js";
import {
  listByHealthModel,
  $delete,
  createOrUpdate,
  get,
} from "../../api/signalDefinitions/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SignalDefinitions operations. */
export interface SignalDefinitionsOperations {
  /** List SignalDefinition resources by HealthModel */
  listByHealthModel: (
    resourceGroupName: string,
    healthModelName: string,
    options?: SignalDefinitionsListByHealthModelOptionalParams,
  ) => PagedAsyncIterableIterator<SignalDefinition>;
  /** Delete a SignalDefinition */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    healthModelName: string,
    signalDefinitionName: string,
    options?: SignalDefinitionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a SignalDefinition */
  createOrUpdate: (
    resourceGroupName: string,
    healthModelName: string,
    signalDefinitionName: string,
    resource: SignalDefinition,
    options?: SignalDefinitionsCreateOrUpdateOptionalParams,
  ) => Promise<SignalDefinition>;
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
