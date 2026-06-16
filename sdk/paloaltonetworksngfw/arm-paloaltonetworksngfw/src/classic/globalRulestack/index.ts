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
  ListAppIdResponse,
  CountriesResponse,
  ListFirewallsResponse,
  PredefinedUrlCategoriesResponse,
  SecurityServicesResponse,
  AdvSecurityObjectTypeEnum,
  SecurityServicesTypeEnum,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  ) => Promise<PredefinedUrlCategoriesResponse>;
  /** List of Firewalls associated with Rulestack */
  listFirewalls: (
    globalRulestackName: string,
    options?: GlobalRulestackListFirewallsOptionalParams,
  ) => Promise<ListFirewallsResponse>;
  /** List of countries for Rulestack */
  listCountries: (
    globalRulestackName: string,
    options?: GlobalRulestackListCountriesOptionalParams,
  ) => Promise<CountriesResponse>;
  /** List of AppIds for GlobalRulestack ApiVersion */
  listAppIds: (
    globalRulestackName: string,
    options?: GlobalRulestackListAppIdsOptionalParams,
  ) => Promise<ListAppIdResponse>;
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
  /** @deprecated use commit instead */
  beginCommit: (
    globalRulestackName: string,
    options?: GlobalRulestackCommitOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use commit instead */
  beginCommitAndWait: (
    globalRulestackName: string,
    options?: GlobalRulestackCommitOptionalParams,
  ) => Promise<void>;
  /** List GlobalRulestackResource resources by Tenant */
  list: (
    options?: GlobalRulestackListOptionalParams,
  ) => PagedAsyncIterableIterator<GlobalRulestackResource>;
  /** Delete a GlobalRulestackResource */
  delete: (
    globalRulestackName: string,
    options?: GlobalRulestackDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    globalRulestackName: string,
    options?: GlobalRulestackDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    globalRulestackName: string,
    options?: GlobalRulestackDeleteOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    globalRulestackName: string,
    resource: GlobalRulestackResource,
    options?: GlobalRulestackCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GlobalRulestackResource>, GlobalRulestackResource>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    globalRulestackName: string,
    resource: GlobalRulestackResource,
    options?: GlobalRulestackCreateOrUpdateOptionalParams,
  ) => Promise<GlobalRulestackResource>;
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
    beginCommit: async (
      globalRulestackName: string,
      options?: GlobalRulestackCommitOptionalParams,
    ) => {
      const poller = commit(context, globalRulestackName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCommitAndWait: async (
      globalRulestackName: string,
      options?: GlobalRulestackCommitOptionalParams,
    ) => {
      return await commit(context, globalRulestackName, options);
    },
    list: (options?: GlobalRulestackListOptionalParams) => list(context, options),
    delete: (globalRulestackName: string, options?: GlobalRulestackDeleteOptionalParams) =>
      $delete(context, globalRulestackName, options),
    beginDelete: async (
      globalRulestackName: string,
      options?: GlobalRulestackDeleteOptionalParams,
    ) => {
      const poller = $delete(context, globalRulestackName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      globalRulestackName: string,
      options?: GlobalRulestackDeleteOptionalParams,
    ) => {
      return await $delete(context, globalRulestackName, options);
    },
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
    beginCreateOrUpdate: async (
      globalRulestackName: string,
      resource: GlobalRulestackResource,
      options?: GlobalRulestackCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, globalRulestackName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      globalRulestackName: string,
      resource: GlobalRulestackResource,
      options?: GlobalRulestackCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, globalRulestackName, resource, options);
    },
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
