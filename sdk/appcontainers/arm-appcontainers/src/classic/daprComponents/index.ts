// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  listSecrets,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/daprComponents/operations.js";
import {
  DaprComponentsListSecretsOptionalParams,
  DaprComponentsListOptionalParams,
  DaprComponentsDeleteOptionalParams,
  DaprComponentsCreateOrUpdateOptionalParams,
  DaprComponentsGetOptionalParams,
} from "../../api/daprComponents/options.js";
import { DaprComponent, DaprSecretsCollection } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DaprComponents operations. */
export interface DaprComponentsOperations {
  /** List secrets for a dapr component */
  listSecrets: (
    resourceGroupName: string,
    environmentName: string,
    componentName: string,
    options?: DaprComponentsListSecretsOptionalParams,
  ) => Promise<DaprSecretsCollection>;
  /** Get the Dapr Components for a managed environment. */
  list: (
    resourceGroupName: string,
    environmentName: string,
    options?: DaprComponentsListOptionalParams,
  ) => PagedAsyncIterableIterator<DaprComponent>;
  /** Delete a Dapr Component from a Managed Environment. */
  delete: (
    resourceGroupName: string,
    environmentName: string,
    componentName: string,
    options?: DaprComponentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a Dapr Component in a Managed Environment. */
  createOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    componentName: string,
    daprComponentEnvelope: DaprComponent,
    options?: DaprComponentsCreateOrUpdateOptionalParams,
  ) => Promise<DaprComponent>;
  /** Get a dapr component. */
  get: (
    resourceGroupName: string,
    environmentName: string,
    componentName: string,
    options?: DaprComponentsGetOptionalParams,
  ) => Promise<DaprComponent>;
}

function _getDaprComponents(context: ContainerAppsAPIContext) {
  return {
    listSecrets: (
      resourceGroupName: string,
      environmentName: string,
      componentName: string,
      options?: DaprComponentsListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, environmentName, componentName, options),
    list: (
      resourceGroupName: string,
      environmentName: string,
      options?: DaprComponentsListOptionalParams,
    ) => list(context, resourceGroupName, environmentName, options),
    delete: (
      resourceGroupName: string,
      environmentName: string,
      componentName: string,
      options?: DaprComponentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, environmentName, componentName, options),
    createOrUpdate: (
      resourceGroupName: string,
      environmentName: string,
      componentName: string,
      daprComponentEnvelope: DaprComponent,
      options?: DaprComponentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        componentName,
        daprComponentEnvelope,
        options,
      ),
    get: (
      resourceGroupName: string,
      environmentName: string,
      componentName: string,
      options?: DaprComponentsGetOptionalParams,
    ) => get(context, resourceGroupName, environmentName, componentName, options),
  };
}

export function _getDaprComponentsOperations(
  context: ContainerAppsAPIContext,
): DaprComponentsOperations {
  return {
    ..._getDaprComponents(context),
  };
}
