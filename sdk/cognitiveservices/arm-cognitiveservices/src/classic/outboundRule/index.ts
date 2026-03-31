// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/outboundRule/operations.js";
import type {
  OutboundRuleListOptionalParams,
  OutboundRuleDeleteOptionalParams,
  OutboundRuleCreateOrUpdateOptionalParams,
  OutboundRuleGetOptionalParams,
} from "../../api/outboundRule/options.js";
import type { OutboundRuleBasicResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OutboundRule operations. */
export interface OutboundRuleOperations {
  /** The GET API for retrieving the list of outbound rules of the managed network associated with the cognitive services account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    options?: OutboundRuleListOptionalParams,
  ) => PagedAsyncIterableIterator<OutboundRuleBasicResource>;
  /** The DELETE API for deleting a single outbound rule of the managed network associated with the cognitive services account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    ruleName: string,
    options?: OutboundRuleDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    ruleName: string,
    options?: OutboundRuleDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    ruleName: string,
    options?: OutboundRuleDeleteOptionalParams,
  ) => Promise<void>;
  /** The PUT API for creating or updating a single outbound rule of the managed network associated with the cognitive services account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    ruleName: string,
    body: OutboundRuleBasicResource,
    options?: OutboundRuleCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OutboundRuleBasicResource>, OutboundRuleBasicResource>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    ruleName: string,
    body: OutboundRuleBasicResource,
    options?: OutboundRuleCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<OutboundRuleBasicResource>, OutboundRuleBasicResource>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    ruleName: string,
    body: OutboundRuleBasicResource,
    options?: OutboundRuleCreateOrUpdateOptionalParams,
  ) => Promise<OutboundRuleBasicResource>;
  /** The GET API for retrieving a single outbound rule of the managed network associated with the cognitive services account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    managedNetworkName: string,
    ruleName: string,
    options?: OutboundRuleGetOptionalParams,
  ) => Promise<OutboundRuleBasicResource>;
}

function _getOutboundRule(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      options?: OutboundRuleListOptionalParams,
    ) => list(context, resourceGroupName, accountName, managedNetworkName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      ruleName: string,
      options?: OutboundRuleDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, managedNetworkName, ruleName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      ruleName: string,
      options?: OutboundRuleDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        accountName,
        managedNetworkName,
        ruleName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      ruleName: string,
      options?: OutboundRuleDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        accountName,
        managedNetworkName,
        ruleName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      ruleName: string,
      body: OutboundRuleBasicResource,
      options?: OutboundRuleCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        managedNetworkName,
        ruleName,
        body,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      ruleName: string,
      body: OutboundRuleBasicResource,
      options?: OutboundRuleCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        managedNetworkName,
        ruleName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      ruleName: string,
      body: OutboundRuleBasicResource,
      options?: OutboundRuleCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        managedNetworkName,
        ruleName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      managedNetworkName: string,
      ruleName: string,
      options?: OutboundRuleGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, managedNetworkName, ruleName, options),
  };
}

export function _getOutboundRuleOperations(
  context: CognitiveServicesManagementContext,
): OutboundRuleOperations {
  return {
    ..._getOutboundRule(context),
  };
}
