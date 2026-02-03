// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeploymentStacksContext } from "../../api/deploymentStacksContext.js";
import {
  exportTemplateAtManagementGroup,
  deleteAtManagementGroup,
  createOrUpdateAtManagementGroup,
  validateStackAtManagementGroup,
  listAtManagementGroup,
  getAtManagementGroup,
  exportTemplateAtSubscription,
  deleteAtSubscription,
  createOrUpdateAtSubscription,
  validateStackAtSubscription,
  listAtSubscription,
  getAtSubscription,
  exportTemplateAtResourceGroup,
  deleteAtResourceGroup,
  createOrUpdateAtResourceGroup,
  validateStackAtResourceGroup,
  listAtResourceGroup,
  getAtResourceGroup,
} from "../../api/deploymentStacks/operations.js";
import type {
  DeploymentStacksExportTemplateAtManagementGroupOptionalParams,
  DeploymentStacksDeleteAtManagementGroupOptionalParams,
  DeploymentStacksCreateOrUpdateAtManagementGroupOptionalParams,
  DeploymentStacksValidateStackAtManagementGroupOptionalParams,
  DeploymentStacksListAtManagementGroupOptionalParams,
  DeploymentStacksGetAtManagementGroupOptionalParams,
  DeploymentStacksExportTemplateAtSubscriptionOptionalParams,
  DeploymentStacksDeleteAtSubscriptionOptionalParams,
  DeploymentStacksCreateOrUpdateAtSubscriptionOptionalParams,
  DeploymentStacksValidateStackAtSubscriptionOptionalParams,
  DeploymentStacksListAtSubscriptionOptionalParams,
  DeploymentStacksGetAtSubscriptionOptionalParams,
  DeploymentStacksExportTemplateAtResourceGroupOptionalParams,
  DeploymentStacksDeleteAtResourceGroupOptionalParams,
  DeploymentStacksCreateOrUpdateAtResourceGroupOptionalParams,
  DeploymentStacksValidateStackAtResourceGroupOptionalParams,
  DeploymentStacksListAtResourceGroupOptionalParams,
  DeploymentStacksGetAtResourceGroupOptionalParams,
} from "../../api/deploymentStacks/options.js";
import type {
  DeploymentStack,
  DeploymentStackValidateResult,
  DeploymentStackTemplateDefinition,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeploymentStacks operations. */
export interface DeploymentStacksOperations {
  /** Exports the template used to create the Deployment stack at the specified scope. */
  exportTemplateAtManagementGroup: (
    managementGroupId: string,
    deploymentStackName: string,
    options?: DeploymentStacksExportTemplateAtManagementGroupOptionalParams,
  ) => Promise<DeploymentStackTemplateDefinition>;
  /** Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. */
  deleteAtManagementGroup: (
    managementGroupId: string,
    deploymentStackName: string,
    options?: DeploymentStacksDeleteAtManagementGroupOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates a Deployment stack at the specified scope. */
  createOrUpdateAtManagementGroup: (
    managementGroupId: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksCreateOrUpdateAtManagementGroupOptionalParams,
  ) => PollerLike<OperationState<DeploymentStack>, DeploymentStack>;
  /** Runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. */
  validateStackAtManagementGroup: (
    managementGroupId: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksValidateStackAtManagementGroupOptionalParams,
  ) => PollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult>;
  /** Lists Deployment stacks at the specified scope. */
  listAtManagementGroup: (
    managementGroupId: string,
    options?: DeploymentStacksListAtManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentStack>;
  /** Gets the Deployment stack with the given name. */
  getAtManagementGroup: (
    managementGroupId: string,
    deploymentStackName: string,
    options?: DeploymentStacksGetAtManagementGroupOptionalParams,
  ) => Promise<DeploymentStack>;
  /** Exports the template used to create the Deployment stack at the specified scope. */
  exportTemplateAtSubscription: (
    deploymentStackName: string,
    options?: DeploymentStacksExportTemplateAtSubscriptionOptionalParams,
  ) => Promise<DeploymentStackTemplateDefinition>;
  /** Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. */
  deleteAtSubscription: (
    deploymentStackName: string,
    options?: DeploymentStacksDeleteAtSubscriptionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates a Deployment stack at the specified scope. */
  createOrUpdateAtSubscription: (
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksCreateOrUpdateAtSubscriptionOptionalParams,
  ) => PollerLike<OperationState<DeploymentStack>, DeploymentStack>;
  /** Runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. */
  validateStackAtSubscription: (
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksValidateStackAtSubscriptionOptionalParams,
  ) => PollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult>;
  /** Lists Deployment stacks at the specified scope. */
  listAtSubscription: (
    options?: DeploymentStacksListAtSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentStack>;
  /** Gets the Deployment stack with the given name. */
  getAtSubscription: (
    deploymentStackName: string,
    options?: DeploymentStacksGetAtSubscriptionOptionalParams,
  ) => Promise<DeploymentStack>;
  /** Exports the template used to create the Deployment stack at the specified scope. */
  exportTemplateAtResourceGroup: (
    resourceGroupName: string,
    deploymentStackName: string,
    options?: DeploymentStacksExportTemplateAtResourceGroupOptionalParams,
  ) => Promise<DeploymentStackTemplateDefinition>;
  /** Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. */
  deleteAtResourceGroup: (
    resourceGroupName: string,
    deploymentStackName: string,
    options?: DeploymentStacksDeleteAtResourceGroupOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates a Deployment stack at the specified scope. */
  createOrUpdateAtResourceGroup: (
    resourceGroupName: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksCreateOrUpdateAtResourceGroupOptionalParams,
  ) => PollerLike<OperationState<DeploymentStack>, DeploymentStack>;
  /** Runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. */
  validateStackAtResourceGroup: (
    resourceGroupName: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksValidateStackAtResourceGroupOptionalParams,
  ) => PollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult>;
  /** Lists Deployment stacks at the specified scope. */
  listAtResourceGroup: (
    resourceGroupName: string,
    options?: DeploymentStacksListAtResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentStack>;
  /** Gets the Deployment stack with the given name. */
  getAtResourceGroup: (
    resourceGroupName: string,
    deploymentStackName: string,
    options?: DeploymentStacksGetAtResourceGroupOptionalParams,
  ) => Promise<DeploymentStack>;
}

function _getDeploymentStacks(context: DeploymentStacksContext) {
  return {
    exportTemplateAtManagementGroup: (
      managementGroupId: string,
      deploymentStackName: string,
      options?: DeploymentStacksExportTemplateAtManagementGroupOptionalParams,
    ) => exportTemplateAtManagementGroup(context, managementGroupId, deploymentStackName, options),
    deleteAtManagementGroup: (
      managementGroupId: string,
      deploymentStackName: string,
      options?: DeploymentStacksDeleteAtManagementGroupOptionalParams,
    ) => deleteAtManagementGroup(context, managementGroupId, deploymentStackName, options),
    createOrUpdateAtManagementGroup: (
      managementGroupId: string,
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksCreateOrUpdateAtManagementGroupOptionalParams,
    ) =>
      createOrUpdateAtManagementGroup(
        context,
        managementGroupId,
        deploymentStackName,
        deploymentStack,
        options,
      ),
    validateStackAtManagementGroup: (
      managementGroupId: string,
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksValidateStackAtManagementGroupOptionalParams,
    ) =>
      validateStackAtManagementGroup(
        context,
        managementGroupId,
        deploymentStackName,
        deploymentStack,
        options,
      ),
    listAtManagementGroup: (
      managementGroupId: string,
      options?: DeploymentStacksListAtManagementGroupOptionalParams,
    ) => listAtManagementGroup(context, managementGroupId, options),
    getAtManagementGroup: (
      managementGroupId: string,
      deploymentStackName: string,
      options?: DeploymentStacksGetAtManagementGroupOptionalParams,
    ) => getAtManagementGroup(context, managementGroupId, deploymentStackName, options),
    exportTemplateAtSubscription: (
      deploymentStackName: string,
      options?: DeploymentStacksExportTemplateAtSubscriptionOptionalParams,
    ) => exportTemplateAtSubscription(context, deploymentStackName, options),
    deleteAtSubscription: (
      deploymentStackName: string,
      options?: DeploymentStacksDeleteAtSubscriptionOptionalParams,
    ) => deleteAtSubscription(context, deploymentStackName, options),
    createOrUpdateAtSubscription: (
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksCreateOrUpdateAtSubscriptionOptionalParams,
    ) => createOrUpdateAtSubscription(context, deploymentStackName, deploymentStack, options),
    validateStackAtSubscription: (
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksValidateStackAtSubscriptionOptionalParams,
    ) => validateStackAtSubscription(context, deploymentStackName, deploymentStack, options),
    listAtSubscription: (options?: DeploymentStacksListAtSubscriptionOptionalParams) =>
      listAtSubscription(context, options),
    getAtSubscription: (
      deploymentStackName: string,
      options?: DeploymentStacksGetAtSubscriptionOptionalParams,
    ) => getAtSubscription(context, deploymentStackName, options),
    exportTemplateAtResourceGroup: (
      resourceGroupName: string,
      deploymentStackName: string,
      options?: DeploymentStacksExportTemplateAtResourceGroupOptionalParams,
    ) => exportTemplateAtResourceGroup(context, resourceGroupName, deploymentStackName, options),
    deleteAtResourceGroup: (
      resourceGroupName: string,
      deploymentStackName: string,
      options?: DeploymentStacksDeleteAtResourceGroupOptionalParams,
    ) => deleteAtResourceGroup(context, resourceGroupName, deploymentStackName, options),
    createOrUpdateAtResourceGroup: (
      resourceGroupName: string,
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksCreateOrUpdateAtResourceGroupOptionalParams,
    ) =>
      createOrUpdateAtResourceGroup(
        context,
        resourceGroupName,
        deploymentStackName,
        deploymentStack,
        options,
      ),
    validateStackAtResourceGroup: (
      resourceGroupName: string,
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksValidateStackAtResourceGroupOptionalParams,
    ) =>
      validateStackAtResourceGroup(
        context,
        resourceGroupName,
        deploymentStackName,
        deploymentStack,
        options,
      ),
    listAtResourceGroup: (
      resourceGroupName: string,
      options?: DeploymentStacksListAtResourceGroupOptionalParams,
    ) => listAtResourceGroup(context, resourceGroupName, options),
    getAtResourceGroup: (
      resourceGroupName: string,
      deploymentStackName: string,
      options?: DeploymentStacksGetAtResourceGroupOptionalParams,
    ) => getAtResourceGroup(context, resourceGroupName, deploymentStackName, options),
  };
}

export function _getDeploymentStacksOperations(
  context: DeploymentStacksContext,
): DeploymentStacksOperations {
  return {
    ..._getDeploymentStacks(context),
  };
}
