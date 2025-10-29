// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext } from "../../api/paloAltoNetworksCloudngfwContext.js";
import {
  revert,
  listSecurityServices,
  listPredefinedUrlCategories,
  listFirewalls,
  listCountries,
  listAppIds,
  listAdvancedSecurityObjects,
  getSupportInfo,
  getChangeLog,
  commit,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/localRulestacks/operations.js";
import type {
  LocalRulestacksRevertOptionalParams,
  LocalRulestacksListSecurityServicesOptionalParams,
  LocalRulestacksListPredefinedUrlCategoriesOptionalParams,
  LocalRulestacksListFirewallsOptionalParams,
  LocalRulestacksListCountriesOptionalParams,
  LocalRulestacksListAppIdsOptionalParams,
  LocalRulestacksListAdvancedSecurityObjectsOptionalParams,
  LocalRulestacksGetSupportInfoOptionalParams,
  LocalRulestacksGetChangeLogOptionalParams,
  LocalRulestacksCommitOptionalParams,
  LocalRulestacksListBySubscriptionOptionalParams,
  LocalRulestacksListByResourceGroupOptionalParams,
  LocalRulestacksDeleteOptionalParams,
  LocalRulestacksUpdateOptionalParams,
  LocalRulestacksCreateOrUpdateOptionalParams,
  LocalRulestacksGetOptionalParams,
} from "../../api/localRulestacks/options.js";
import type {
  Changelog,
  AdvSecurityObjectListResponse,
  Country,
  ListFirewallsResponse,
  PredefinedUrlCategory,
  SecurityServicesResponse,
  SupportInfo,
  LocalRulestackResource,
  LocalRulestackResourceUpdate,
  AdvSecurityObjectTypeEnum,
  SecurityServicesTypeEnum,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LocalRulestacks operations. */
export interface LocalRulestacksOperations {
  /** Revert rulestack configuration */
  revert: (
    resourceGroupName: string,
    localRulestackName: string,
    options?: LocalRulestacksRevertOptionalParams,
  ) => Promise<void>;
  /** List the security services for rulestack */
  listSecurityServices: (
    resourceGroupName: string,
    localRulestackName: string,
    typeParam: SecurityServicesTypeEnum,
    options?: LocalRulestacksListSecurityServicesOptionalParams,
  ) => Promise<SecurityServicesResponse>;
  /** List predefined URL categories for rulestack */
  listPredefinedUrlCategories: (
    resourceGroupName: string,
    localRulestackName: string,
    options?: LocalRulestacksListPredefinedUrlCategoriesOptionalParams,
  ) => PagedAsyncIterableIterator<PredefinedUrlCategory>;
  /** List of Firewalls associated with Rulestack */
  listFirewalls: (
    resourceGroupName: string,
    localRulestackName: string,
    options?: LocalRulestacksListFirewallsOptionalParams,
  ) => Promise<ListFirewallsResponse>;
  /** List of countries for Rulestack */
  listCountries: (
    resourceGroupName: string,
    localRulestackName: string,
    options?: LocalRulestacksListCountriesOptionalParams,
  ) => PagedAsyncIterableIterator<Country>;
  /** List of AppIds for LocalRulestack ApiVersion */
  listAppIds: (
    resourceGroupName: string,
    localRulestackName: string,
    options?: LocalRulestacksListAppIdsOptionalParams,
  ) => PagedAsyncIterableIterator<string>;
  /** Get the list of advanced security objects */
  listAdvancedSecurityObjects: (
    resourceGroupName: string,
    localRulestackName: string,
    typeParam: AdvSecurityObjectTypeEnum,
    options?: LocalRulestacksListAdvancedSecurityObjectsOptionalParams,
  ) => Promise<AdvSecurityObjectListResponse>;
  /** support info for rulestack. */
  getSupportInfo: (
    resourceGroupName: string,
    localRulestackName: string,
    options?: LocalRulestacksGetSupportInfoOptionalParams,
  ) => Promise<SupportInfo>;
  /** Get changelog */
  getChangeLog: (
    resourceGroupName: string,
    localRulestackName: string,
    options?: LocalRulestacksGetChangeLogOptionalParams,
  ) => Promise<Changelog>;
  /** Commit rulestack configuration */
  commit: (
    resourceGroupName: string,
    localRulestackName: string,
    options?: LocalRulestacksCommitOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List LocalRulestackResource resources by subscription ID */
  listBySubscription: (
    options?: LocalRulestacksListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<LocalRulestackResource>;
  /** List LocalRulestackResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: LocalRulestacksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<LocalRulestackResource>;
  /** Delete a LocalRulestackResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    localRulestackName: string,
    options?: LocalRulestacksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a LocalRulestackResource */
  update: (
    resourceGroupName: string,
    localRulestackName: string,
    properties: LocalRulestackResourceUpdate,
    options?: LocalRulestacksUpdateOptionalParams,
  ) => Promise<LocalRulestackResource>;
  /** Create a LocalRulestackResource */
  createOrUpdate: (
    resourceGroupName: string,
    localRulestackName: string,
    resource: LocalRulestackResource,
    options?: LocalRulestacksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<LocalRulestackResource>, LocalRulestackResource>;
  /** Get a LocalRulestackResource */
  get: (
    resourceGroupName: string,
    localRulestackName: string,
    options?: LocalRulestacksGetOptionalParams,
  ) => Promise<LocalRulestackResource>;
}

function _getLocalRulestacks(context: PaloAltoNetworksCloudngfwContext) {
  return {
    revert: (
      resourceGroupName: string,
      localRulestackName: string,
      options?: LocalRulestacksRevertOptionalParams,
    ) => revert(context, resourceGroupName, localRulestackName, options),
    listSecurityServices: (
      resourceGroupName: string,
      localRulestackName: string,
      typeParam: SecurityServicesTypeEnum,
      options?: LocalRulestacksListSecurityServicesOptionalParams,
    ) => listSecurityServices(context, resourceGroupName, localRulestackName, typeParam, options),
    listPredefinedUrlCategories: (
      resourceGroupName: string,
      localRulestackName: string,
      options?: LocalRulestacksListPredefinedUrlCategoriesOptionalParams,
    ) => listPredefinedUrlCategories(context, resourceGroupName, localRulestackName, options),
    listFirewalls: (
      resourceGroupName: string,
      localRulestackName: string,
      options?: LocalRulestacksListFirewallsOptionalParams,
    ) => listFirewalls(context, resourceGroupName, localRulestackName, options),
    listCountries: (
      resourceGroupName: string,
      localRulestackName: string,
      options?: LocalRulestacksListCountriesOptionalParams,
    ) => listCountries(context, resourceGroupName, localRulestackName, options),
    listAppIds: (
      resourceGroupName: string,
      localRulestackName: string,
      options?: LocalRulestacksListAppIdsOptionalParams,
    ) => listAppIds(context, resourceGroupName, localRulestackName, options),
    listAdvancedSecurityObjects: (
      resourceGroupName: string,
      localRulestackName: string,
      typeParam: AdvSecurityObjectTypeEnum,
      options?: LocalRulestacksListAdvancedSecurityObjectsOptionalParams,
    ) =>
      listAdvancedSecurityObjects(
        context,
        resourceGroupName,
        localRulestackName,
        typeParam,
        options,
      ),
    getSupportInfo: (
      resourceGroupName: string,
      localRulestackName: string,
      options?: LocalRulestacksGetSupportInfoOptionalParams,
    ) => getSupportInfo(context, resourceGroupName, localRulestackName, options),
    getChangeLog: (
      resourceGroupName: string,
      localRulestackName: string,
      options?: LocalRulestacksGetChangeLogOptionalParams,
    ) => getChangeLog(context, resourceGroupName, localRulestackName, options),
    commit: (
      resourceGroupName: string,
      localRulestackName: string,
      options?: LocalRulestacksCommitOptionalParams,
    ) => commit(context, resourceGroupName, localRulestackName, options),
    listBySubscription: (options?: LocalRulestacksListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: LocalRulestacksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      localRulestackName: string,
      options?: LocalRulestacksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, localRulestackName, options),
    update: (
      resourceGroupName: string,
      localRulestackName: string,
      properties: LocalRulestackResourceUpdate,
      options?: LocalRulestacksUpdateOptionalParams,
    ) => update(context, resourceGroupName, localRulestackName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      localRulestackName: string,
      resource: LocalRulestackResource,
      options?: LocalRulestacksCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, localRulestackName, resource, options),
    get: (
      resourceGroupName: string,
      localRulestackName: string,
      options?: LocalRulestacksGetOptionalParams,
    ) => get(context, resourceGroupName, localRulestackName, options),
  };
}

export function _getLocalRulestacksOperations(
  context: PaloAltoNetworksCloudngfwContext,
): LocalRulestacksOperations {
  return {
    ..._getLocalRulestacks(context),
  };
}
