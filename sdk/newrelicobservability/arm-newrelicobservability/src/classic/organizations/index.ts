// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservabilityContext } from "../../api/newRelicObservabilityContext.js";
import { list } from "../../api/organizations/operations.js";
import { OrganizationsListOptionalParams } from "../../api/organizations/options.js";
import { OrganizationResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Organizations operations. */
export interface OrganizationsOperations {
  /** Lists all the New Relic organizations linked to your email address, helping you understand the existing organizations that have been created */
  list: (
    userEmail: string,
    location: string,
    options?: OrganizationsListOptionalParams,
  ) => PagedAsyncIterableIterator<OrganizationResource>;
}

function _getOrganizations(context: NewRelicObservabilityContext) {
  return {
    list: (userEmail: string, location: string, options?: OrganizationsListOptionalParams) =>
      list(context, userEmail, location, options),
  };
}

export function _getOrganizationsOperations(
  context: NewRelicObservabilityContext,
): OrganizationsOperations {
  return {
    ..._getOrganizations(context),
  };
}
