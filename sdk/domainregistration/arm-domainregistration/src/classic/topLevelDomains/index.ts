// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DomainRegistrationManagementContext } from "../../api/domainRegistrationManagementContext.js";
import { listAgreements, list, get } from "../../api/topLevelDomains/operations.js";
import type {
  TopLevelDomainsListAgreementsOptionalParams,
  TopLevelDomainsListOptionalParams,
  TopLevelDomainsGetOptionalParams,
} from "../../api/topLevelDomains/options.js";
import type {
  TopLevelDomain,
  TopLevelDomainAgreementOption,
  TldLegalAgreement,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TopLevelDomains operations. */
export interface TopLevelDomainsOperations {
  /** Description for Gets all legal agreements that user needs to accept before purchasing a domain. */
  listAgreements: (
    name: string,
    agreementOption: TopLevelDomainAgreementOption,
    options?: TopLevelDomainsListAgreementsOptionalParams,
  ) => PagedAsyncIterableIterator<TldLegalAgreement>;
  /** Description for Get all top-level domains supported for registration. */
  list: (options?: TopLevelDomainsListOptionalParams) => PagedAsyncIterableIterator<TopLevelDomain>;
  /** Description for Get details of a top-level domain. */
  get: (name: string, options?: TopLevelDomainsGetOptionalParams) => Promise<TopLevelDomain>;
}

function _getTopLevelDomains(context: DomainRegistrationManagementContext) {
  return {
    listAgreements: (
      name: string,
      agreementOption: TopLevelDomainAgreementOption,
      options?: TopLevelDomainsListAgreementsOptionalParams,
    ) => listAgreements(context, name, agreementOption, options),
    list: (options?: TopLevelDomainsListOptionalParams) => list(context, options),
    get: (name: string, options?: TopLevelDomainsGetOptionalParams) => get(context, name, options),
  };
}

export function _getTopLevelDomainsOperations(
  context: DomainRegistrationManagementContext,
): TopLevelDomainsOperations {
  return {
    ..._getTopLevelDomains(context),
  };
}
