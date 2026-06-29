// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext } from "../../api/policyInsightsContext.js";
import {
  cancelAtManagementGroup,
  listDeploymentsAtManagementGroup,
  cancelAtResource,
  listDeploymentsAtResource,
  listForResource,
  deleteAtResource,
  createOrUpdateAtResource,
  getAtResource,
  cancelAtResourceGroup,
  listDeploymentsAtResourceGroup,
  listForResourceGroup,
  deleteAtResourceGroup,
  createOrUpdateAtResourceGroup,
  getAtResourceGroup,
  cancelAtSubscription,
  listDeploymentsAtSubscription,
  listForSubscription,
  deleteAtSubscription,
  createOrUpdateAtSubscription,
  getAtSubscription,
  listForManagementGroup,
  deleteAtManagementGroup,
  createOrUpdateAtManagementGroup,
  getAtManagementGroup,
} from "../../api/remediations/operations.js";
import type {
  RemediationsCancelAtManagementGroupOptionalParams,
  RemediationsListDeploymentsAtManagementGroupOptionalParams,
  RemediationsCancelAtResourceOptionalParams,
  RemediationsListDeploymentsAtResourceOptionalParams,
  RemediationsListForResourceOptionalParams,
  RemediationsDeleteAtResourceOptionalParams,
  RemediationsCreateOrUpdateAtResourceOptionalParams,
  RemediationsGetAtResourceOptionalParams,
  RemediationsCancelAtResourceGroupOptionalParams,
  RemediationsListDeploymentsAtResourceGroupOptionalParams,
  RemediationsListForResourceGroupOptionalParams,
  RemediationsDeleteAtResourceGroupOptionalParams,
  RemediationsCreateOrUpdateAtResourceGroupOptionalParams,
  RemediationsGetAtResourceGroupOptionalParams,
  RemediationsCancelAtSubscriptionOptionalParams,
  RemediationsListDeploymentsAtSubscriptionOptionalParams,
  RemediationsListForSubscriptionOptionalParams,
  RemediationsDeleteAtSubscriptionOptionalParams,
  RemediationsCreateOrUpdateAtSubscriptionOptionalParams,
  RemediationsGetAtSubscriptionOptionalParams,
  RemediationsListForManagementGroupOptionalParams,
  RemediationsDeleteAtManagementGroupOptionalParams,
  RemediationsCreateOrUpdateAtManagementGroupOptionalParams,
  RemediationsGetAtManagementGroupOptionalParams,
} from "../../api/remediations/options.js";
import type { Remediation, RemediationDeployment } from "../../models/policyInsightsApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Remediations operations. */
export interface RemediationsOperations {
  /** Cancels a remediation at management group scope. */
  cancelAtManagementGroup: (
    managementGroupId: string,
    remediationName: string,
    options?: RemediationsCancelAtManagementGroupOptionalParams,
  ) => Promise<Remediation>;
  /** Gets all deployments for a remediation at management group scope. */
  listDeploymentsAtManagementGroup: (
    managementGroupId: string,
    remediationName: string,
    options?: RemediationsListDeploymentsAtManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<RemediationDeployment>;
  /** Cancel a remediation at resource scope. */
  cancelAtResource: (
    resourceId: string,
    remediationName: string,
    options?: RemediationsCancelAtResourceOptionalParams,
  ) => Promise<Remediation>;
  /** Gets all deployments for a remediation at resource scope. */
  listDeploymentsAtResource: (
    resourceId: string,
    remediationName: string,
    options?: RemediationsListDeploymentsAtResourceOptionalParams,
  ) => PagedAsyncIterableIterator<RemediationDeployment>;
  /** Gets all remediations for a resource. */
  listForResource: (
    resourceId: string,
    options?: RemediationsListForResourceOptionalParams,
  ) => PagedAsyncIterableIterator<Remediation>;
  /** Deletes an existing remediation at individual resource scope. */
  deleteAtResource: (
    resourceId: string,
    remediationName: string,
    options?: RemediationsDeleteAtResourceOptionalParams,
  ) => Promise<Remediation | undefined>;
  /** Creates or updates a remediation at resource scope. */
  createOrUpdateAtResource: (
    resourceId: string,
    remediationName: string,
    parameters: Remediation,
    options?: RemediationsCreateOrUpdateAtResourceOptionalParams,
  ) => Promise<Remediation>;
  /** Gets an existing remediation at resource scope. */
  getAtResource: (
    resourceId: string,
    remediationName: string,
    options?: RemediationsGetAtResourceOptionalParams,
  ) => Promise<Remediation>;
  /** Cancels a remediation at resource group scope. */
  cancelAtResourceGroup: (
    resourceGroupName: string,
    remediationName: string,
    options?: RemediationsCancelAtResourceGroupOptionalParams,
  ) => Promise<Remediation>;
  /** Gets all deployments for a remediation at resource group scope. */
  listDeploymentsAtResourceGroup: (
    resourceGroupName: string,
    remediationName: string,
    options?: RemediationsListDeploymentsAtResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<RemediationDeployment>;
  /** Gets all remediations for the subscription. */
  listForResourceGroup: (
    resourceGroupName: string,
    options?: RemediationsListForResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Remediation>;
  /** Deletes an existing remediation at resource group scope. */
  deleteAtResourceGroup: (
    resourceGroupName: string,
    remediationName: string,
    options?: RemediationsDeleteAtResourceGroupOptionalParams,
  ) => Promise<Remediation | undefined>;
  /** Creates or updates a remediation at resource group scope. */
  createOrUpdateAtResourceGroup: (
    resourceGroupName: string,
    remediationName: string,
    parameters: Remediation,
    options?: RemediationsCreateOrUpdateAtResourceGroupOptionalParams,
  ) => Promise<Remediation>;
  /** Gets an existing remediation at resource group scope. */
  getAtResourceGroup: (
    resourceGroupName: string,
    remediationName: string,
    options?: RemediationsGetAtResourceGroupOptionalParams,
  ) => Promise<Remediation>;
  /** Cancels a remediation at subscription scope. */
  cancelAtSubscription: (
    remediationName: string,
    options?: RemediationsCancelAtSubscriptionOptionalParams,
  ) => Promise<Remediation>;
  /** Gets all deployments for a remediation at subscription scope. */
  listDeploymentsAtSubscription: (
    remediationName: string,
    options?: RemediationsListDeploymentsAtSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<RemediationDeployment>;
  /** Gets all remediations for the subscription. */
  listForSubscription: (
    options?: RemediationsListForSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Remediation>;
  /** Deletes an existing remediation at subscription scope. */
  deleteAtSubscription: (
    remediationName: string,
    options?: RemediationsDeleteAtSubscriptionOptionalParams,
  ) => Promise<Remediation | undefined>;
  /** Creates or updates a remediation at subscription scope. */
  createOrUpdateAtSubscription: (
    remediationName: string,
    parameters: Remediation,
    options?: RemediationsCreateOrUpdateAtSubscriptionOptionalParams,
  ) => Promise<Remediation>;
  /** Gets an existing remediation at subscription scope. */
  getAtSubscription: (
    remediationName: string,
    options?: RemediationsGetAtSubscriptionOptionalParams,
  ) => Promise<Remediation>;
  /** Gets all remediations for the management group. */
  listForManagementGroup: (
    managementGroupId: string,
    options?: RemediationsListForManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Remediation>;
  /** Deletes an existing remediation at management group scope. */
  deleteAtManagementGroup: (
    managementGroupId: string,
    remediationName: string,
    options?: RemediationsDeleteAtManagementGroupOptionalParams,
  ) => Promise<Remediation | undefined>;
  /** Creates or updates a remediation at management group scope. */
  createOrUpdateAtManagementGroup: (
    managementGroupId: string,
    remediationName: string,
    parameters: Remediation,
    options?: RemediationsCreateOrUpdateAtManagementGroupOptionalParams,
  ) => Promise<Remediation>;
  /** Gets an existing remediation at management group scope. */
  getAtManagementGroup: (
    managementGroupId: string,
    remediationName: string,
    options?: RemediationsGetAtManagementGroupOptionalParams,
  ) => Promise<Remediation>;
}

function _getRemediations(context: PolicyInsightsContext) {
  return {
    cancelAtManagementGroup: (
      managementGroupId: string,
      remediationName: string,
      options?: RemediationsCancelAtManagementGroupOptionalParams,
    ) => cancelAtManagementGroup(context, managementGroupId, remediationName, options),
    listDeploymentsAtManagementGroup: (
      managementGroupId: string,
      remediationName: string,
      options?: RemediationsListDeploymentsAtManagementGroupOptionalParams,
    ) => listDeploymentsAtManagementGroup(context, managementGroupId, remediationName, options),
    cancelAtResource: (
      resourceId: string,
      remediationName: string,
      options?: RemediationsCancelAtResourceOptionalParams,
    ) => cancelAtResource(context, resourceId, remediationName, options),
    listDeploymentsAtResource: (
      resourceId: string,
      remediationName: string,
      options?: RemediationsListDeploymentsAtResourceOptionalParams,
    ) => listDeploymentsAtResource(context, resourceId, remediationName, options),
    listForResource: (resourceId: string, options?: RemediationsListForResourceOptionalParams) =>
      listForResource(context, resourceId, options),
    deleteAtResource: (
      resourceId: string,
      remediationName: string,
      options?: RemediationsDeleteAtResourceOptionalParams,
    ) => deleteAtResource(context, resourceId, remediationName, options),
    createOrUpdateAtResource: (
      resourceId: string,
      remediationName: string,
      parameters: Remediation,
      options?: RemediationsCreateOrUpdateAtResourceOptionalParams,
    ) => createOrUpdateAtResource(context, resourceId, remediationName, parameters, options),
    getAtResource: (
      resourceId: string,
      remediationName: string,
      options?: RemediationsGetAtResourceOptionalParams,
    ) => getAtResource(context, resourceId, remediationName, options),
    cancelAtResourceGroup: (
      resourceGroupName: string,
      remediationName: string,
      options?: RemediationsCancelAtResourceGroupOptionalParams,
    ) => cancelAtResourceGroup(context, resourceGroupName, remediationName, options),
    listDeploymentsAtResourceGroup: (
      resourceGroupName: string,
      remediationName: string,
      options?: RemediationsListDeploymentsAtResourceGroupOptionalParams,
    ) => listDeploymentsAtResourceGroup(context, resourceGroupName, remediationName, options),
    listForResourceGroup: (
      resourceGroupName: string,
      options?: RemediationsListForResourceGroupOptionalParams,
    ) => listForResourceGroup(context, resourceGroupName, options),
    deleteAtResourceGroup: (
      resourceGroupName: string,
      remediationName: string,
      options?: RemediationsDeleteAtResourceGroupOptionalParams,
    ) => deleteAtResourceGroup(context, resourceGroupName, remediationName, options),
    createOrUpdateAtResourceGroup: (
      resourceGroupName: string,
      remediationName: string,
      parameters: Remediation,
      options?: RemediationsCreateOrUpdateAtResourceGroupOptionalParams,
    ) =>
      createOrUpdateAtResourceGroup(
        context,
        resourceGroupName,
        remediationName,
        parameters,
        options,
      ),
    getAtResourceGroup: (
      resourceGroupName: string,
      remediationName: string,
      options?: RemediationsGetAtResourceGroupOptionalParams,
    ) => getAtResourceGroup(context, resourceGroupName, remediationName, options),
    cancelAtSubscription: (
      remediationName: string,
      options?: RemediationsCancelAtSubscriptionOptionalParams,
    ) => cancelAtSubscription(context, remediationName, options),
    listDeploymentsAtSubscription: (
      remediationName: string,
      options?: RemediationsListDeploymentsAtSubscriptionOptionalParams,
    ) => listDeploymentsAtSubscription(context, remediationName, options),
    listForSubscription: (options?: RemediationsListForSubscriptionOptionalParams) =>
      listForSubscription(context, options),
    deleteAtSubscription: (
      remediationName: string,
      options?: RemediationsDeleteAtSubscriptionOptionalParams,
    ) => deleteAtSubscription(context, remediationName, options),
    createOrUpdateAtSubscription: (
      remediationName: string,
      parameters: Remediation,
      options?: RemediationsCreateOrUpdateAtSubscriptionOptionalParams,
    ) => createOrUpdateAtSubscription(context, remediationName, parameters, options),
    getAtSubscription: (
      remediationName: string,
      options?: RemediationsGetAtSubscriptionOptionalParams,
    ) => getAtSubscription(context, remediationName, options),
    listForManagementGroup: (
      managementGroupId: string,
      options?: RemediationsListForManagementGroupOptionalParams,
    ) => listForManagementGroup(context, managementGroupId, options),
    deleteAtManagementGroup: (
      managementGroupId: string,
      remediationName: string,
      options?: RemediationsDeleteAtManagementGroupOptionalParams,
    ) => deleteAtManagementGroup(context, managementGroupId, remediationName, options),
    createOrUpdateAtManagementGroup: (
      managementGroupId: string,
      remediationName: string,
      parameters: Remediation,
      options?: RemediationsCreateOrUpdateAtManagementGroupOptionalParams,
    ) =>
      createOrUpdateAtManagementGroup(
        context,
        managementGroupId,
        remediationName,
        parameters,
        options,
      ),
    getAtManagementGroup: (
      managementGroupId: string,
      remediationName: string,
      options?: RemediationsGetAtManagementGroupOptionalParams,
    ) => getAtManagementGroup(context, managementGroupId, remediationName, options),
  };
}

export function _getRemediationsOperations(context: PolicyInsightsContext): RemediationsOperations {
  return {
    ..._getRemediations(context),
  };
}
