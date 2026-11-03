// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DomainRegistrationManagementContext } from "../../api/domainRegistrationManagementContext.js";
import {
  listRecommendations,
  getControlCenterSsoRequest,
  checkAvailability,
  listOwnershipIdentifiers,
  deleteOwnershipIdentifier,
  updateOwnershipIdentifier,
  createOrUpdateOwnershipIdentifier,
  getOwnershipIdentifier,
  transferOut,
  renew,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/domains/operations.js";
import type {
  DomainsListRecommendationsOptionalParams,
  DomainsGetControlCenterSsoRequestOptionalParams,
  DomainsCheckAvailabilityOptionalParams,
  DomainsListOwnershipIdentifiersOptionalParams,
  DomainsDeleteOwnershipIdentifierOptionalParams,
  DomainsUpdateOwnershipIdentifierOptionalParams,
  DomainsCreateOrUpdateOwnershipIdentifierOptionalParams,
  DomainsGetOwnershipIdentifierOptionalParams,
  DomainsTransferOutOptionalParams,
  DomainsRenewOptionalParams,
  DomainsListOptionalParams,
  DomainsListByResourceGroupOptionalParams,
  DomainsDeleteOptionalParams,
  DomainsUpdateOptionalParams,
  DomainsCreateOrUpdateOptionalParams,
  DomainsGetOptionalParams,
} from "../../api/domains/options.js";
import type {
  Domain,
  DomainPatchResource,
  DomainOwnershipIdentifier,
  NameIdentifier,
  DomainAvailabilityCheckResult,
  DomainControlCenterSsoRequest,
  DomainRecommendationSearchParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Domains operations. */
export interface DomainsOperations {
  /** Description for Get domain name recommendations based on keywords. */
  listRecommendations: (
    parameters: DomainRecommendationSearchParameters,
    options?: DomainsListRecommendationsOptionalParams,
  ) => PagedAsyncIterableIterator<NameIdentifier>;
  /** Description for Generate a single sign-on request for the domain management portal. */
  getControlCenterSsoRequest: (
    options?: DomainsGetControlCenterSsoRequestOptionalParams,
  ) => Promise<DomainControlCenterSsoRequest>;
  /** Description for Check if a domain is available for registration. */
  checkAvailability: (
    identifier: NameIdentifier,
    options?: DomainsCheckAvailabilityOptionalParams,
  ) => Promise<DomainAvailabilityCheckResult>;
  /** Description for Lists domain ownership identifiers. */
  listOwnershipIdentifiers: (
    resourceGroupName: string,
    domainName: string,
    options?: DomainsListOwnershipIdentifiersOptionalParams,
  ) => PagedAsyncIterableIterator<DomainOwnershipIdentifier>;
  /** Description for Delete ownership identifier for domain */
  deleteOwnershipIdentifier: (
    resourceGroupName: string,
    domainName: string,
    name: string,
    options?: DomainsDeleteOwnershipIdentifierOptionalParams,
  ) => Promise<void>;
  /** Description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier */
  updateOwnershipIdentifier: (
    resourceGroupName: string,
    domainName: string,
    name: string,
    domainOwnershipIdentifier: DomainOwnershipIdentifier,
    options?: DomainsUpdateOwnershipIdentifierOptionalParams,
  ) => Promise<DomainOwnershipIdentifier>;
  /** Description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier */
  createOrUpdateOwnershipIdentifier: (
    resourceGroupName: string,
    domainName: string,
    name: string,
    domainOwnershipIdentifier: DomainOwnershipIdentifier,
    options?: DomainsCreateOrUpdateOwnershipIdentifierOptionalParams,
  ) => Promise<DomainOwnershipIdentifier>;
  /** Description for Get ownership identifier for domain */
  getOwnershipIdentifier: (
    resourceGroupName: string,
    domainName: string,
    name: string,
    options?: DomainsGetOwnershipIdentifierOptionalParams,
  ) => Promise<DomainOwnershipIdentifier>;
  /** Transfer out domain to another registrar */
  transferOut: (
    resourceGroupName: string,
    domainName: string,
    options?: DomainsTransferOutOptionalParams,
  ) => Promise<Domain>;
  /** Description for Renew a domain. */
  renew: (
    resourceGroupName: string,
    domainName: string,
    options?: DomainsRenewOptionalParams,
  ) => Promise<void>;
  /** Description for Get all domains in a subscription. */
  list: (options?: DomainsListOptionalParams) => PagedAsyncIterableIterator<Domain>;
  /** Description for Get all domains in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DomainsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Domain>;
  /** Description for Delete a domain. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    domainName: string,
    options?: DomainsDeleteOptionalParams,
  ) => Promise<void>;
  /** Description for Creates or updates a domain. */
  update: (
    resourceGroupName: string,
    domainName: string,
    domain: DomainPatchResource,
    options?: DomainsUpdateOptionalParams,
  ) => Promise<Domain>;
  /** Description for Creates or updates a domain. */
  createOrUpdate: (
    resourceGroupName: string,
    domainName: string,
    domain: Domain,
    options?: DomainsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Domain>, Domain>;
  /** Description for Get a domain. */
  get: (
    resourceGroupName: string,
    domainName: string,
    options?: DomainsGetOptionalParams,
  ) => Promise<Domain>;
}

function _getDomains(context: DomainRegistrationManagementContext) {
  return {
    listRecommendations: (
      parameters: DomainRecommendationSearchParameters,
      options?: DomainsListRecommendationsOptionalParams,
    ) => listRecommendations(context, parameters, options),
    getControlCenterSsoRequest: (options?: DomainsGetControlCenterSsoRequestOptionalParams) =>
      getControlCenterSsoRequest(context, options),
    checkAvailability: (
      identifier: NameIdentifier,
      options?: DomainsCheckAvailabilityOptionalParams,
    ) => checkAvailability(context, identifier, options),
    listOwnershipIdentifiers: (
      resourceGroupName: string,
      domainName: string,
      options?: DomainsListOwnershipIdentifiersOptionalParams,
    ) => listOwnershipIdentifiers(context, resourceGroupName, domainName, options),
    deleteOwnershipIdentifier: (
      resourceGroupName: string,
      domainName: string,
      name: string,
      options?: DomainsDeleteOwnershipIdentifierOptionalParams,
    ) => deleteOwnershipIdentifier(context, resourceGroupName, domainName, name, options),
    updateOwnershipIdentifier: (
      resourceGroupName: string,
      domainName: string,
      name: string,
      domainOwnershipIdentifier: DomainOwnershipIdentifier,
      options?: DomainsUpdateOwnershipIdentifierOptionalParams,
    ) =>
      updateOwnershipIdentifier(
        context,
        resourceGroupName,
        domainName,
        name,
        domainOwnershipIdentifier,
        options,
      ),
    createOrUpdateOwnershipIdentifier: (
      resourceGroupName: string,
      domainName: string,
      name: string,
      domainOwnershipIdentifier: DomainOwnershipIdentifier,
      options?: DomainsCreateOrUpdateOwnershipIdentifierOptionalParams,
    ) =>
      createOrUpdateOwnershipIdentifier(
        context,
        resourceGroupName,
        domainName,
        name,
        domainOwnershipIdentifier,
        options,
      ),
    getOwnershipIdentifier: (
      resourceGroupName: string,
      domainName: string,
      name: string,
      options?: DomainsGetOwnershipIdentifierOptionalParams,
    ) => getOwnershipIdentifier(context, resourceGroupName, domainName, name, options),
    transferOut: (
      resourceGroupName: string,
      domainName: string,
      options?: DomainsTransferOutOptionalParams,
    ) => transferOut(context, resourceGroupName, domainName, options),
    renew: (resourceGroupName: string, domainName: string, options?: DomainsRenewOptionalParams) =>
      renew(context, resourceGroupName, domainName, options),
    list: (options?: DomainsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DomainsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      domainName: string,
      options?: DomainsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, domainName, options),
    update: (
      resourceGroupName: string,
      domainName: string,
      domain: DomainPatchResource,
      options?: DomainsUpdateOptionalParams,
    ) => update(context, resourceGroupName, domainName, domain, options),
    createOrUpdate: (
      resourceGroupName: string,
      domainName: string,
      domain: Domain,
      options?: DomainsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, domainName, domain, options),
    get: (resourceGroupName: string, domainName: string, options?: DomainsGetOptionalParams) =>
      get(context, resourceGroupName, domainName, options),
  };
}

export function _getDomainsOperations(
  context: DomainRegistrationManagementContext,
): DomainsOperations {
  return {
    ..._getDomains(context),
  };
}
