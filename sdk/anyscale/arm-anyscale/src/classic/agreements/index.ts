// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext } from "../../api/platformContext.js";
import {
  $delete,
  createOrUpdate,
  listBySubscription,
  get,
} from "../../api/agreements/operations.js";
import type {
  AgreementsDeleteOptionalParams,
  AgreementsCreateOrUpdateOptionalParams,
  AgreementsListBySubscriptionOptionalParams,
  AgreementsGetOptionalParams,
} from "../../api/agreements/options.js";
import type { Agreement } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Agreements operations. */
export interface AgreementsOperations {
  /** Revoke the subscription's acceptance of the agreement. Refused (rejected at validation, before begin) while the subscription still has active Anyscale clouds, since those clouds depend on the accepted agreement -- delete the clouds first. Once permitted, the catalog entry persists (a subsequent GET returns status "Pending") and only the signed record is removed; idempotent. */
  delete: (agreementName: string, options?: AgreementsDeleteOptionalParams) => Promise<void>;
  /** Sign the agreement via PUT. The request body is intentionally empty -- send `{"properties": {}}`. Every agreement property is RP-managed and read-only, so any value supplied in the body is ignored; the accepting identity is taken from the ARM caller token, not the payload. Idempotent -- PUT-ting an already-Active agreement is a no-op. */
  createOrUpdate: (
    agreementName: string,
    resource: Agreement,
    options?: AgreementsCreateOrUpdateOptionalParams,
  ) => Promise<Agreement>;
  /** List the agreements available to the subscription. */
  listBySubscription: (
    options?: AgreementsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Agreement>;
  /** Get an agreement. Returns the catalog entry (status "Pending") until accepted, then the full signed record. */
  get: (agreementName: string, options?: AgreementsGetOptionalParams) => Promise<Agreement>;
}

function _getAgreements(context: PlatformContext) {
  return {
    delete: (agreementName: string, options?: AgreementsDeleteOptionalParams) =>
      $delete(context, agreementName, options),
    createOrUpdate: (
      agreementName: string,
      resource: Agreement,
      options?: AgreementsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, agreementName, resource, options),
    listBySubscription: (options?: AgreementsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    get: (agreementName: string, options?: AgreementsGetOptionalParams) =>
      get(context, agreementName, options),
  };
}

export function _getAgreementsOperations(context: PlatformContext): AgreementsOperations {
  return {
    ..._getAgreements(context),
  };
}
