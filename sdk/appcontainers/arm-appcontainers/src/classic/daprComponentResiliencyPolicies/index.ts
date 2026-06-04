// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/daprComponentResiliencyPolicies/operations.js";
import {
  DaprComponentResiliencyPoliciesListOptionalParams,
  DaprComponentResiliencyPoliciesDeleteOptionalParams,
  DaprComponentResiliencyPoliciesCreateOrUpdateOptionalParams,
  DaprComponentResiliencyPoliciesGetOptionalParams,
} from "../../api/daprComponentResiliencyPolicies/options.js";
import { DaprComponentResiliencyPolicy } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DaprComponentResiliencyPolicies operations. */
export interface DaprComponentResiliencyPoliciesOperations {
  /** Get the resiliency policies for a Dapr component. */
  list: (
    resourceGroupName: string,
    environmentName: string,
    componentName: string,
    options?: DaprComponentResiliencyPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<DaprComponentResiliencyPolicy>;
  /** Delete a resiliency policy for a Dapr component. */
  delete: (
    resourceGroupName: string,
    environmentName: string,
    componentName: string,
    name: string,
    options?: DaprComponentResiliencyPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a resiliency policy for a Dapr component. */
  createOrUpdate: (
    resourceGroupName: string,
    environmentName: string,
    componentName: string,
    name: string,
    daprComponentResiliencyPolicyEnvelope: DaprComponentResiliencyPolicy,
    options?: DaprComponentResiliencyPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<DaprComponentResiliencyPolicy>;
  /** Get a Dapr component resiliency policy. */
  get: (
    resourceGroupName: string,
    environmentName: string,
    componentName: string,
    name: string,
    options?: DaprComponentResiliencyPoliciesGetOptionalParams,
  ) => Promise<DaprComponentResiliencyPolicy>;
}

function _getDaprComponentResiliencyPolicies(context: ContainerAppsAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      environmentName: string,
      componentName: string,
      options?: DaprComponentResiliencyPoliciesListOptionalParams,
    ) => list(context, resourceGroupName, environmentName, componentName, options),
    delete: (
      resourceGroupName: string,
      environmentName: string,
      componentName: string,
      name: string,
      options?: DaprComponentResiliencyPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, environmentName, componentName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      environmentName: string,
      componentName: string,
      name: string,
      daprComponentResiliencyPolicyEnvelope: DaprComponentResiliencyPolicy,
      options?: DaprComponentResiliencyPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        environmentName,
        componentName,
        name,
        daprComponentResiliencyPolicyEnvelope,
        options,
      ),
    get: (
      resourceGroupName: string,
      environmentName: string,
      componentName: string,
      name: string,
      options?: DaprComponentResiliencyPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, environmentName, componentName, name, options),
  };
}

export function _getDaprComponentResiliencyPoliciesOperations(
  context: ContainerAppsAPIContext,
): DaprComponentResiliencyPoliciesOperations {
  return {
    ..._getDaprComponentResiliencyPolicies(context),
  };
}
