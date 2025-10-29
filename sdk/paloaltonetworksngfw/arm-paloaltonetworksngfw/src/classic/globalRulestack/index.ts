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
  getChangeLog,
  commit,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/globalRulestack/operations.js";
import type {
  GlobalRulestackRevertOptionalParams,
  GlobalRulestackListSecurityServicesOptionalParams,
  GlobalRulestackListPredefinedUrlCategoriesOptionalParams,
  GlobalRulestackListFirewallsOptionalParams,
  GlobalRulestackListCountriesOptionalParams,
  GlobalRulestackListAppIdsOptionalParams,
  GlobalRulestackListAdvancedSecurityObjectsOptionalParams,
  GlobalRulestackGetChangeLogOptionalParams,
  GlobalRulestackCommitOptionalParams,
  GlobalRulestackListOptionalParams,
  GlobalRulestackDeleteOptionalParams,
  GlobalRulestackUpdateOptionalParams,
  GlobalRulestackCreateOrUpdateOptionalParams,
  GlobalRulestackGetOptionalParams,
} from "../../api/globalRulestack/options.js";
import type {
  GlobalRulestackResource,
  GlobalRulestackResourceUpdate,
  Changelog,
  AdvSecurityObjectListResponse,
  _ListAppIdResponse,
  _CountriesResponse,
  ListFirewallsResponse,
  _PredefinedUrlCategoriesResponse,
  SecurityServicesResponse,
  AdvSecurityObjectTypeEnum,
  SecurityServicesTypeEnum,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GlobalRulestack operations. */
export interface GlobalRulestackOperations {
  /** Revert rulestack configuration */
  revert: (
    globalRulestackName: string,
    options?: GlobalRulestackRevertOptionalParams,
  ) => Promise<void>;
  /** List the security services for rulestack */
  listSecurityServices: (
    globalRulestackName: string,
    typeParam: SecurityServicesTypeEnum,
    options?: GlobalRulestackListSecurityServicesOptionalParams,
  ) => Promise<SecurityServicesResponse>;
  /** List predefined URL categories for rulestack */
  listPredefinedUrlCategories: (
    globalRulestackName: string,
    options?: GlobalRulestackListPredefinedUrlCategoriesOptionalParams,
  ) => Promise<_PredefinedUrlCategoriesResponse>;
  /** List of Firewalls associated with Rulestack */
  listFirewalls: (
    globalRulestackName: string,
    options?: GlobalRulestackListFirewallsOptionalParams,
  ) => Promise<ListFirewallsResponse>;
  /** List of countries for Rulestack */
  listCountries: (
    globalRulestackName: string,
    options?: GlobalRulestackListCountriesOptionalParams,
  ) => Promise<_CountriesResponse>;
  /** List of AppIds for GlobalRulestack ApiVersion */
  listAppIds: (
    globalRulestackName: string,
    options?: GlobalRulestackListAppIdsOptionalParams,
  ) => Promise<_ListAppIdResponse>;
  /** Get the list of advanced security objects */
  listAdvancedSecurityObjects: (
    globalRulestackName: string,
    typeParam: AdvSecurityObjectTypeEnum,
    options?: GlobalRulestackListAdvancedSecurityObjectsOptionalParams,
  ) => Promise<AdvSecurityObjectListResponse>;
  /** Get changelog */
  getChangeLog: (
    globalRulestackName: string,
    options?: GlobalRulestackGetChangeLogOptionalParams,
  ) => Promise<Changelog>;
  /** Commit rulestack configuration */
  commit: (
    globalRulestackName: string,
    options?: GlobalRulestackCommitOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List GlobalRulestackResource resources by Tenant */
  list: (
    options?: GlobalRulestackListOptionalParams,
  ) => PagedAsyncIterableIterator<GlobalRulestackResource>;
  /** Delete a GlobalRulestackResource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    globalRulestackName: string,
    options?: GlobalRulestackDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a GlobalRulestackResource */
  update: (
    globalRulestackName: string,
    properties: GlobalRulestackResourceUpdate,
    options?: GlobalRulestackUpdateOptionalParams,
  ) => Promise<GlobalRulestackResource>;
  /** Create a GlobalRulestackResource */
  createOrUpdate: (
    globalRulestackName: string,
    resource: GlobalRulestackResource,
    options?: GlobalRulestackCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<GlobalRulestackResource>, GlobalRulestackResource>;
  /** Get a GlobalRulestackResource */
  get: (
    globalRulestackName: string,
    options?: GlobalRulestackGetOptionalParams,
  ) => Promise<GlobalRulestackResource>;
}

function _getGlobalRulestack(context: PaloAltoNetworksCloudngfwContext) {
  return {
    revert: (globalRulestackName: string, options?: GlobalRulestackRevertOptionalParams) =>
      revert(context, globalRulestackName, options),
    listSecurityServices: (
      globalRulestackName: string,
      typeParam: SecurityServicesTypeEnum,
      options?: GlobalRulestackListSecurityServicesOptionalParams,
    ) => listSecurityServices(context, globalRulestackName, typeParam, options),
    listPredefinedUrlCategories: (
      globalRulestackName: string,
      options?: GlobalRulestackListPredefinedUrlCategoriesOptionalParams,
    ) => listPredefinedUrlCategories(context, globalRulestackName, options),
    listFirewalls: (
      globalRulestackName: string,
      options?: GlobalRulestackListFirewallsOptionalParams,
    ) => listFirewalls(context, globalRulestackName, options),
    listCountries: (
      globalRulestackName: string,
      options?: GlobalRulestackListCountriesOptionalParams,
    ) => listCountries(context, globalRulestackName, options),
    listAppIds: (globalRulestackName: string, options?: GlobalRulestackListAppIdsOptionalParams) =>
      listAppIds(context, globalRulestackName, options),
    listAdvancedSecurityObjects: (
      globalRulestackName: string,
      typeParam: AdvSecurityObjectTypeEnum,
      options?: GlobalRulestackListAdvancedSecurityObjectsOptionalParams,
    ) => listAdvancedSecurityObjects(context, globalRulestackName, typeParam, options),
    getChangeLog: (
      globalRulestackName: string,
      options?: GlobalRulestackGetChangeLogOptionalParams,
    ) => getChangeLog(context, globalRulestackName, options),
    commit: (globalRulestackName: string, options?: GlobalRulestackCommitOptionalParams) =>
      commit(context, globalRulestackName, options),
    list: (options?: GlobalRulestackListOptionalParams) => list(context, options),
    delete: (globalRulestackName: string, options?: GlobalRulestackDeleteOptionalParams) =>
      $delete(context, globalRulestackName, options),
    update: (
      globalRulestackName: string,
      properties: GlobalRulestackResourceUpdate,
      options?: GlobalRulestackUpdateOptionalParams,
    ) => update(context, globalRulestackName, properties, options),
    createOrUpdate: (
      globalRulestackName: string,
      resource: GlobalRulestackResource,
      options?: GlobalRulestackCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, globalRulestackName, resource, options),
    get: (globalRulestackName: string, options?: GlobalRulestackGetOptionalParams) =>
      get(context, globalRulestackName, options),
  };
}

export function _getGlobalRulestackOperations(
  context: PaloAltoNetworksCloudngfwContext,
): GlobalRulestackOperations {
  return {
    ..._getGlobalRulestack(context),
  };
}
