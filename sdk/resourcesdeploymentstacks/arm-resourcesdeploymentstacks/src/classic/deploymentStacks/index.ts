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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use deleteAtManagementGroup instead */
  beginDeleteAtManagementGroup: (
    managementGroupId: string,
    deploymentStackName: string,
    options?: DeploymentStacksDeleteAtManagementGroupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteAtManagementGroup instead */
  beginDeleteAtManagementGroupAndWait: (
    managementGroupId: string,
    deploymentStackName: string,
    options?: DeploymentStacksDeleteAtManagementGroupOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a Deployment stack at the specified scope. */
  createOrUpdateAtManagementGroup: (
    managementGroupId: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksCreateOrUpdateAtManagementGroupOptionalParams,
  ) => PollerLike<OperationState<DeploymentStack>, DeploymentStack>;
  /** @deprecated use createOrUpdateAtManagementGroup instead */
  beginCreateOrUpdateAtManagementGroup: (
    managementGroupId: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksCreateOrUpdateAtManagementGroupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DeploymentStack>, DeploymentStack>>;
  /** @deprecated use createOrUpdateAtManagementGroup instead */
  beginCreateOrUpdateAtManagementGroupAndWait: (
    managementGroupId: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksCreateOrUpdateAtManagementGroupOptionalParams,
  ) => Promise<DeploymentStack>;
  /** Runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. */
  validateStackAtManagementGroup: (
    managementGroupId: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksValidateStackAtManagementGroupOptionalParams,
  ) => PollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult>;
  /** @deprecated use validateStackAtManagementGroup instead */
  beginValidateStackAtManagementGroup: (
    managementGroupId: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksValidateStackAtManagementGroupOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult>
  >;
  /** @deprecated use validateStackAtManagementGroup instead */
  beginValidateStackAtManagementGroupAndWait: (
    managementGroupId: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksValidateStackAtManagementGroupOptionalParams,
  ) => Promise<DeploymentStackValidateResult>;
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
  /** @deprecated use deleteAtSubscription instead */
  beginDeleteAtSubscription: (
    deploymentStackName: string,
    options?: DeploymentStacksDeleteAtSubscriptionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteAtSubscription instead */
  beginDeleteAtSubscriptionAndWait: (
    deploymentStackName: string,
    options?: DeploymentStacksDeleteAtSubscriptionOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a Deployment stack at the specified scope. */
  createOrUpdateAtSubscription: (
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksCreateOrUpdateAtSubscriptionOptionalParams,
  ) => PollerLike<OperationState<DeploymentStack>, DeploymentStack>;
  /** @deprecated use createOrUpdateAtSubscription instead */
  beginCreateOrUpdateAtSubscription: (
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksCreateOrUpdateAtSubscriptionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DeploymentStack>, DeploymentStack>>;
  /** @deprecated use createOrUpdateAtSubscription instead */
  beginCreateOrUpdateAtSubscriptionAndWait: (
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksCreateOrUpdateAtSubscriptionOptionalParams,
  ) => Promise<DeploymentStack>;
  /** Runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. */
  validateStackAtSubscription: (
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksValidateStackAtSubscriptionOptionalParams,
  ) => PollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult>;
  /** @deprecated use validateStackAtSubscription instead */
  beginValidateStackAtSubscription: (
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksValidateStackAtSubscriptionOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult>
  >;
  /** @deprecated use validateStackAtSubscription instead */
  beginValidateStackAtSubscriptionAndWait: (
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksValidateStackAtSubscriptionOptionalParams,
  ) => Promise<DeploymentStackValidateResult>;
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
  /** @deprecated use deleteAtResourceGroup instead */
  beginDeleteAtResourceGroup: (
    resourceGroupName: string,
    deploymentStackName: string,
    options?: DeploymentStacksDeleteAtResourceGroupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteAtResourceGroup instead */
  beginDeleteAtResourceGroupAndWait: (
    resourceGroupName: string,
    deploymentStackName: string,
    options?: DeploymentStacksDeleteAtResourceGroupOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a Deployment stack at the specified scope. */
  createOrUpdateAtResourceGroup: (
    resourceGroupName: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksCreateOrUpdateAtResourceGroupOptionalParams,
  ) => PollerLike<OperationState<DeploymentStack>, DeploymentStack>;
  /** @deprecated use createOrUpdateAtResourceGroup instead */
  beginCreateOrUpdateAtResourceGroup: (
    resourceGroupName: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksCreateOrUpdateAtResourceGroupOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DeploymentStack>, DeploymentStack>>;
  /** @deprecated use createOrUpdateAtResourceGroup instead */
  beginCreateOrUpdateAtResourceGroupAndWait: (
    resourceGroupName: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksCreateOrUpdateAtResourceGroupOptionalParams,
  ) => Promise<DeploymentStack>;
  /** Runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. */
  validateStackAtResourceGroup: (
    resourceGroupName: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksValidateStackAtResourceGroupOptionalParams,
  ) => PollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult>;
  /** @deprecated use validateStackAtResourceGroup instead */
  beginValidateStackAtResourceGroup: (
    resourceGroupName: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksValidateStackAtResourceGroupOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DeploymentStackValidateResult>, DeploymentStackValidateResult>
  >;
  /** @deprecated use validateStackAtResourceGroup instead */
  beginValidateStackAtResourceGroupAndWait: (
    resourceGroupName: string,
    deploymentStackName: string,
    deploymentStack: DeploymentStack,
    options?: DeploymentStacksValidateStackAtResourceGroupOptionalParams,
  ) => Promise<DeploymentStackValidateResult>;
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
    beginDeleteAtManagementGroup: async (
      managementGroupId: string,
      deploymentStackName: string,
      options?: DeploymentStacksDeleteAtManagementGroupOptionalParams,
    ) => {
      const poller = deleteAtManagementGroup(
        context,
        managementGroupId,
        deploymentStackName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAtManagementGroupAndWait: async (
      managementGroupId: string,
      deploymentStackName: string,
      options?: DeploymentStacksDeleteAtManagementGroupOptionalParams,
    ) => {
      return await deleteAtManagementGroup(
        context,
        managementGroupId,
        deploymentStackName,
        options,
      );
    },
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
    beginCreateOrUpdateAtManagementGroup: async (
      managementGroupId: string,
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksCreateOrUpdateAtManagementGroupOptionalParams,
    ) => {
      const poller = createOrUpdateAtManagementGroup(
        context,
        managementGroupId,
        deploymentStackName,
        deploymentStack,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAtManagementGroupAndWait: async (
      managementGroupId: string,
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksCreateOrUpdateAtManagementGroupOptionalParams,
    ) => {
      return await createOrUpdateAtManagementGroup(
        context,
        managementGroupId,
        deploymentStackName,
        deploymentStack,
        options,
      );
    },
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
    beginValidateStackAtManagementGroup: async (
      managementGroupId: string,
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksValidateStackAtManagementGroupOptionalParams,
    ) => {
      const poller = validateStackAtManagementGroup(
        context,
        managementGroupId,
        deploymentStackName,
        deploymentStack,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateStackAtManagementGroupAndWait: async (
      managementGroupId: string,
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksValidateStackAtManagementGroupOptionalParams,
    ) => {
      return await validateStackAtManagementGroup(
        context,
        managementGroupId,
        deploymentStackName,
        deploymentStack,
        options,
      );
    },
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
    beginDeleteAtSubscription: async (
      deploymentStackName: string,
      options?: DeploymentStacksDeleteAtSubscriptionOptionalParams,
    ) => {
      const poller = deleteAtSubscription(context, deploymentStackName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAtSubscriptionAndWait: async (
      deploymentStackName: string,
      options?: DeploymentStacksDeleteAtSubscriptionOptionalParams,
    ) => {
      return await deleteAtSubscription(context, deploymentStackName, options);
    },
    createOrUpdateAtSubscription: (
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksCreateOrUpdateAtSubscriptionOptionalParams,
    ) => createOrUpdateAtSubscription(context, deploymentStackName, deploymentStack, options),
    beginCreateOrUpdateAtSubscription: async (
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksCreateOrUpdateAtSubscriptionOptionalParams,
    ) => {
      const poller = createOrUpdateAtSubscription(
        context,
        deploymentStackName,
        deploymentStack,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAtSubscriptionAndWait: async (
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksCreateOrUpdateAtSubscriptionOptionalParams,
    ) => {
      return await createOrUpdateAtSubscription(
        context,
        deploymentStackName,
        deploymentStack,
        options,
      );
    },
    validateStackAtSubscription: (
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksValidateStackAtSubscriptionOptionalParams,
    ) => validateStackAtSubscription(context, deploymentStackName, deploymentStack, options),
    beginValidateStackAtSubscription: async (
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksValidateStackAtSubscriptionOptionalParams,
    ) => {
      const poller = validateStackAtSubscription(
        context,
        deploymentStackName,
        deploymentStack,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateStackAtSubscriptionAndWait: async (
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksValidateStackAtSubscriptionOptionalParams,
    ) => {
      return await validateStackAtSubscription(
        context,
        deploymentStackName,
        deploymentStack,
        options,
      );
    },
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
    beginDeleteAtResourceGroup: async (
      resourceGroupName: string,
      deploymentStackName: string,
      options?: DeploymentStacksDeleteAtResourceGroupOptionalParams,
    ) => {
      const poller = deleteAtResourceGroup(
        context,
        resourceGroupName,
        deploymentStackName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAtResourceGroupAndWait: async (
      resourceGroupName: string,
      deploymentStackName: string,
      options?: DeploymentStacksDeleteAtResourceGroupOptionalParams,
    ) => {
      return await deleteAtResourceGroup(context, resourceGroupName, deploymentStackName, options);
    },
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
    beginCreateOrUpdateAtResourceGroup: async (
      resourceGroupName: string,
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksCreateOrUpdateAtResourceGroupOptionalParams,
    ) => {
      const poller = createOrUpdateAtResourceGroup(
        context,
        resourceGroupName,
        deploymentStackName,
        deploymentStack,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAtResourceGroupAndWait: async (
      resourceGroupName: string,
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksCreateOrUpdateAtResourceGroupOptionalParams,
    ) => {
      return await createOrUpdateAtResourceGroup(
        context,
        resourceGroupName,
        deploymentStackName,
        deploymentStack,
        options,
      );
    },
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
    beginValidateStackAtResourceGroup: async (
      resourceGroupName: string,
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksValidateStackAtResourceGroupOptionalParams,
    ) => {
      const poller = validateStackAtResourceGroup(
        context,
        resourceGroupName,
        deploymentStackName,
        deploymentStack,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateStackAtResourceGroupAndWait: async (
      resourceGroupName: string,
      deploymentStackName: string,
      deploymentStack: DeploymentStack,
      options?: DeploymentStacksValidateStackAtResourceGroupOptionalParams,
    ) => {
      return await validateStackAtResourceGroup(
        context,
        resourceGroupName,
        deploymentStackName,
        deploymentStack,
        options,
      );
    },
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
