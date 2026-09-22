// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import { list, get } from "../../api/verifiedPartners/operations.js";
import type {
  VerifiedPartnersListOptionalParams,
  VerifiedPartnersGetOptionalParams,
} from "../../api/verifiedPartners/options.js";
import type { VerifiedPartner } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VerifiedPartners operations. */
export interface VerifiedPartnersOperations {
  /** Get a list of all verified partners. */
  list: (
    options?: VerifiedPartnersListOptionalParams,
  ) => PagedAsyncIterableIterator<VerifiedPartner>;
  /** Get properties of a verified partner. */
  get: (
    verifiedPartnerName: string,
    options?: VerifiedPartnersGetOptionalParams,
  ) => Promise<VerifiedPartner>;
}

function _getVerifiedPartners(context: EventGridManagementContext) {
  return {
    list: (options?: VerifiedPartnersListOptionalParams) => list(context, options),
    get: (verifiedPartnerName: string, options?: VerifiedPartnersGetOptionalParams) =>
      get(context, verifiedPartnerName, options),
  };
}

export function _getVerifiedPartnersOperations(
  context: EventGridManagementContext,
): VerifiedPartnersOperations {
  return {
    ..._getVerifiedPartners(context),
  };
}
