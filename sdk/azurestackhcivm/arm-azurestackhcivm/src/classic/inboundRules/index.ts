// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIVMManagementContext } from "../../api/azureStackHcivmManagementContext.js";
import {
  listByNatGateway,
  $delete,
  createOrUpdate,
  get,
} from "../../api/inboundRules/operations.js";
import type {
  InboundRulesListByNatGatewayOptionalParams,
  InboundRulesDeleteOptionalParams,
  InboundRulesCreateOrUpdateOptionalParams,
  InboundRulesGetOptionalParams,
} from "../../api/inboundRules/options.js";
import type { InboundRule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a InboundRules operations. */
export interface InboundRulesOperations {
  /** Lists all of the inbound rules in the specified NAT gateway. Use the nextLink property in the response to get the next page of inbound rules. */
  listByNatGateway: (
    resourceGroupName: string,
    natGatewayName: string,
    options?: InboundRulesListByNatGatewayOptionalParams,
  ) => PagedAsyncIterableIterator<InboundRule>;
  /** The operation to delete an inbound rule. */
  delete: (
    resourceGroupName: string,
    natGatewayName: string,
    inboundRuleName: string,
    options?: InboundRulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to create or update an inbound rule. Please note some properties can be set only during inbound rule creation. */
  createOrUpdate: (
    resourceGroupName: string,
    natGatewayName: string,
    inboundRuleName: string,
    resource: InboundRule,
    options?: InboundRulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<InboundRule>, InboundRule>;
  /** The operation to get an inbound rule. */
  get: (
    resourceGroupName: string,
    natGatewayName: string,
    inboundRuleName: string,
    options?: InboundRulesGetOptionalParams,
  ) => Promise<InboundRule>;
}

function _getInboundRules(context: AzureStackHCIVMManagementContext) {
  return {
    listByNatGateway: (
      resourceGroupName: string,
      natGatewayName: string,
      options?: InboundRulesListByNatGatewayOptionalParams,
    ) => listByNatGateway(context, resourceGroupName, natGatewayName, options),
    delete: (
      resourceGroupName: string,
      natGatewayName: string,
      inboundRuleName: string,
      options?: InboundRulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, natGatewayName, inboundRuleName, options),
    createOrUpdate: (
      resourceGroupName: string,
      natGatewayName: string,
      inboundRuleName: string,
      resource: InboundRule,
      options?: InboundRulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        natGatewayName,
        inboundRuleName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      natGatewayName: string,
      inboundRuleName: string,
      options?: InboundRulesGetOptionalParams,
    ) => get(context, resourceGroupName, natGatewayName, inboundRuleName, options),
  };
}

export function _getInboundRulesOperations(
  context: AzureStackHCIVMManagementContext,
): InboundRulesOperations {
  return {
    ..._getInboundRules(context),
  };
}
