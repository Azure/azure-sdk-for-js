// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SovereignContext } from "../../api/sovereignContext.js";
import {
  remediationResult,
  remediate,
  complianceResourceDetails,
  operationalStatus,
  filterValues,
  complianceDetails,
  complianceSummary,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/sovereignViewOperations/operations.js";
import type {
  SovereignViewOperationsRemediationResultOptionalParams,
  SovereignViewOperationsRemediateOptionalParams,
  SovereignViewOperationsComplianceResourceDetailsOptionalParams,
  SovereignViewOperationsOperationalStatusOptionalParams,
  SovereignViewOperationsFilterValuesOptionalParams,
  SovereignViewOperationsComplianceDetailsOptionalParams,
  SovereignViewOperationsComplianceSummaryOptionalParams,
  SovereignViewOperationsListBySubscriptionOptionalParams,
  SovereignViewOperationsListByResourceGroupOptionalParams,
  SovereignViewOperationsDeleteOptionalParams,
  SovereignViewOperationsUpdateOptionalParams,
  SovereignViewOperationsCreateOptionalParams,
  SovereignViewOperationsGetOptionalParams,
} from "../../api/sovereignViewOperations/options.js";
import type {
  SovereignViewResource,
  SovereignViewResourcePatch,
  SovereignViewComplianceSummaryResult,
  SovereignViewComplianceDetailsContent,
  SovereignViewComplianceDetailsResult,
  SovereignViewFilterValuesContent,
  SovereignViewFilterValuesResult,
  SovereignViewOperationalStatusContent,
  SovereignViewOperationalStatusResult,
  SovereignViewComplianceResourceDetailsContent,
  SovereignViewComplianceResourceDetailsResult,
  SovereignViewRemediateContent,
  SovereignViewRemediateResult,
  SovereignViewRemediationResultContent,
  SovereignViewRemediationResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SovereignViewOperations operations. */
export interface SovereignViewOperationsOperations {
  /** Fetches the result of a previously triggered remediation. */
  remediationResult: (
    resourceGroupName: string,
    sovereignViewName: string,
    body: SovereignViewRemediationResultContent,
    options?: SovereignViewOperationsRemediationResultOptionalParams,
  ) => Promise<SovereignViewRemediationResult>;
  /** Remediates the Sovereign View resource for the given Azure Resource Manager resource IDs. */
  remediate: (
    resourceGroupName: string,
    sovereignViewName: string,
    body: SovereignViewRemediateContent,
    options?: SovereignViewOperationsRemediateOptionalParams,
  ) => PollerLike<OperationState<SovereignViewRemediateResult>, SovereignViewRemediateResult>;
  /** Gets the compliance reasoning for given resource and dimension, including the reasoning for its linked and replica resources. */
  complianceResourceDetails: (
    resourceGroupName: string,
    sovereignViewName: string,
    body: SovereignViewComplianceResourceDetailsContent,
    options?: SovereignViewOperationsComplianceResourceDetailsOptionalParams,
  ) => Promise<SovereignViewComplianceResourceDetailsResult>;
  /** Gets the operational status for the Sovereign View resource. */
  operationalStatus: (
    resourceGroupName: string,
    sovereignViewName: string,
    body: SovereignViewOperationalStatusContent,
    options?: SovereignViewOperationsOperationalStatusOptionalParams,
  ) => Promise<SovereignViewOperationalStatusResult>;
  /** Gets filter values for the Sovereign View resource. */
  filterValues: (
    resourceGroupName: string,
    sovereignViewName: string,
    body: SovereignViewFilterValuesContent,
    options?: SovereignViewOperationsFilterValuesOptionalParams,
  ) => Promise<SovereignViewFilterValuesResult>;
  /** Gets compliance details for the Sovereign View resource. */
  complianceDetails: (
    resourceGroupName: string,
    sovereignViewName: string,
    body: SovereignViewComplianceDetailsContent,
    options?: SovereignViewOperationsComplianceDetailsOptionalParams,
  ) => Promise<SovereignViewComplianceDetailsResult>;
  /** Gets the compliance summary for the Sovereign View resource. */
  complianceSummary: (
    resourceGroupName: string,
    sovereignViewName: string,
    options?: SovereignViewOperationsComplianceSummaryOptionalParams,
  ) => Promise<SovereignViewComplianceSummaryResult>;
  /** Lists the Sovereign View resources within a subscription. */
  listBySubscription: (
    options?: SovereignViewOperationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SovereignViewResource>;
  /** Lists the Sovereign View resources within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SovereignViewOperationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SovereignViewResource>;
  /** Deletes the Sovereign View resource. */
  delete: (
    resourceGroupName: string,
    sovereignViewName: string,
    options?: SovereignViewOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the Sovereign View resource. */
  update: (
    resourceGroupName: string,
    sovereignViewName: string,
    properties: SovereignViewResourcePatch,
    options?: SovereignViewOperationsUpdateOptionalParams,
  ) => PollerLike<OperationState<SovereignViewResource>, SovereignViewResource>;
  /** Creates or updates the Sovereign View resource. */
  create: (
    resourceGroupName: string,
    sovereignViewName: string,
    resource: SovereignViewResource,
    options?: SovereignViewOperationsCreateOptionalParams,
  ) => PollerLike<OperationState<SovereignViewResource>, SovereignViewResource>;
  /** Gets the Sovereign View resource. */
  get: (
    resourceGroupName: string,
    sovereignViewName: string,
    options?: SovereignViewOperationsGetOptionalParams,
  ) => Promise<SovereignViewResource>;
}

function _getSovereignViewOperations(context: SovereignContext) {
  return {
    remediationResult: (
      resourceGroupName: string,
      sovereignViewName: string,
      body: SovereignViewRemediationResultContent,
      options?: SovereignViewOperationsRemediationResultOptionalParams,
    ) => remediationResult(context, resourceGroupName, sovereignViewName, body, options),
    remediate: (
      resourceGroupName: string,
      sovereignViewName: string,
      body: SovereignViewRemediateContent,
      options?: SovereignViewOperationsRemediateOptionalParams,
    ) => remediate(context, resourceGroupName, sovereignViewName, body, options),
    complianceResourceDetails: (
      resourceGroupName: string,
      sovereignViewName: string,
      body: SovereignViewComplianceResourceDetailsContent,
      options?: SovereignViewOperationsComplianceResourceDetailsOptionalParams,
    ) => complianceResourceDetails(context, resourceGroupName, sovereignViewName, body, options),
    operationalStatus: (
      resourceGroupName: string,
      sovereignViewName: string,
      body: SovereignViewOperationalStatusContent,
      options?: SovereignViewOperationsOperationalStatusOptionalParams,
    ) => operationalStatus(context, resourceGroupName, sovereignViewName, body, options),
    filterValues: (
      resourceGroupName: string,
      sovereignViewName: string,
      body: SovereignViewFilterValuesContent,
      options?: SovereignViewOperationsFilterValuesOptionalParams,
    ) => filterValues(context, resourceGroupName, sovereignViewName, body, options),
    complianceDetails: (
      resourceGroupName: string,
      sovereignViewName: string,
      body: SovereignViewComplianceDetailsContent,
      options?: SovereignViewOperationsComplianceDetailsOptionalParams,
    ) => complianceDetails(context, resourceGroupName, sovereignViewName, body, options),
    complianceSummary: (
      resourceGroupName: string,
      sovereignViewName: string,
      options?: SovereignViewOperationsComplianceSummaryOptionalParams,
    ) => complianceSummary(context, resourceGroupName, sovereignViewName, options),
    listBySubscription: (options?: SovereignViewOperationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SovereignViewOperationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      sovereignViewName: string,
      options?: SovereignViewOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sovereignViewName, options),
    update: (
      resourceGroupName: string,
      sovereignViewName: string,
      properties: SovereignViewResourcePatch,
      options?: SovereignViewOperationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, sovereignViewName, properties, options),
    create: (
      resourceGroupName: string,
      sovereignViewName: string,
      resource: SovereignViewResource,
      options?: SovereignViewOperationsCreateOptionalParams,
    ) => create(context, resourceGroupName, sovereignViewName, resource, options),
    get: (
      resourceGroupName: string,
      sovereignViewName: string,
      options?: SovereignViewOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, sovereignViewName, options),
  };
}

export function _getSovereignViewOperationsOperations(
  context: SovereignContext,
): SovereignViewOperationsOperations {
  return {
    ..._getSovereignViewOperations(context),
  };
}
