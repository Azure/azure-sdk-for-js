// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import { listByCredit, $delete, update, create, get } from "../../api/sources/operations.js";
import {
  SourcesListByCreditOptionalParams,
  SourcesDeleteOptionalParams,
  SourcesUpdateOptionalParams,
  SourcesCreateOptionalParams,
  SourcesGetOptionalParams,
} from "../../api/sources/options.js";
import { CreditSource, CreditSourcePatchRequest } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Sources operations. */
export interface SourcesOperations {
  /** List credit sources for a credit under a resource group from primary service admin. */
  listByCredit: (
    resourceGroupName: string,
    creditName: string,
    options?: SourcesListByCreditOptionalParams,
  ) => PagedAsyncIterableIterator<CreditSource>;
  /** Delete a credit source. */
  delete: (
    resourceGroupName: string,
    creditName: string,
    sourceName: string,
    options?: SourcesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a credit source. */
  update: (
    resourceGroupName: string,
    creditName: string,
    sourceName: string,
    body: CreditSourcePatchRequest,
    options?: SourcesUpdateOptionalParams,
  ) => Promise<CreditSource>;
  /** Create a credit source. */
  create: (
    resourceGroupName: string,
    creditName: string,
    sourceName: string,
    body: CreditSource,
    options?: SourcesCreateOptionalParams,
  ) => Promise<CreditSource>;
  /** Get a credit source. */
  get: (
    resourceGroupName: string,
    creditName: string,
    sourceName: string,
    options?: SourcesGetOptionalParams,
  ) => Promise<CreditSource>;
}

function _getSources(context: BillingBenefitsRPContext) {
  return {
    listByCredit: (
      resourceGroupName: string,
      creditName: string,
      options?: SourcesListByCreditOptionalParams,
    ) => listByCredit(context, resourceGroupName, creditName, options),
    delete: (
      resourceGroupName: string,
      creditName: string,
      sourceName: string,
      options?: SourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, creditName, sourceName, options),
    update: (
      resourceGroupName: string,
      creditName: string,
      sourceName: string,
      body: CreditSourcePatchRequest,
      options?: SourcesUpdateOptionalParams,
    ) => update(context, resourceGroupName, creditName, sourceName, body, options),
    create: (
      resourceGroupName: string,
      creditName: string,
      sourceName: string,
      body: CreditSource,
      options?: SourcesCreateOptionalParams,
    ) => create(context, resourceGroupName, creditName, sourceName, body, options),
    get: (
      resourceGroupName: string,
      creditName: string,
      sourceName: string,
      options?: SourcesGetOptionalParams,
    ) => get(context, resourceGroupName, creditName, sourceName, options),
  };
}

export function _getSourcesOperations(context: BillingBenefitsRPContext): SourcesOperations {
  return {
    ..._getSources(context),
  };
}
