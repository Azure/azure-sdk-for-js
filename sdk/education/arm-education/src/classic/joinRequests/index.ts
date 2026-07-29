// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementContext } from "../../api/educationManagementContext.js";
import { deny, approve, list, get } from "../../api/joinRequests/operations.js";
import {
  JoinRequestsDenyOptionalParams,
  JoinRequestsApproveOptionalParams,
  JoinRequestsListOptionalParams,
  JoinRequestsGetOptionalParams,
} from "../../api/joinRequests/options.js";
import { JoinRequestDetails } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JoinRequests operations. */
export interface JoinRequestsOperations {
  /** Deny student joining the redeemable lab */
  deny: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    joinRequestName: string,
    options?: JoinRequestsDenyOptionalParams,
  ) => Promise<void>;
  /** Approve student joining the redeemable lab */
  approve: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    joinRequestName: string,
    options?: JoinRequestsApproveOptionalParams,
  ) => Promise<void>;
  /** get student join requests */
  list: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: JoinRequestsListOptionalParams,
  ) => PagedAsyncIterableIterator<JoinRequestDetails>;
  /** get student join requests */
  get: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    joinRequestName: string,
    options?: JoinRequestsGetOptionalParams,
  ) => Promise<JoinRequestDetails>;
}

function _getJoinRequests(context: EducationManagementContext) {
  return {
    deny: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      joinRequestName: string,
      options?: JoinRequestsDenyOptionalParams,
    ) =>
      deny(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        joinRequestName,
        options,
      ),
    approve: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      joinRequestName: string,
      options?: JoinRequestsApproveOptionalParams,
    ) =>
      approve(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        joinRequestName,
        options,
      ),
    list: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: JoinRequestsListOptionalParams,
    ) => list(context, billingAccountName, billingProfileName, invoiceSectionName, options),
    get: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      joinRequestName: string,
      options?: JoinRequestsGetOptionalParams,
    ) =>
      get(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        joinRequestName,
        options,
      ),
  };
}

export function _getJoinRequestsOperations(
  context: EducationManagementContext,
): JoinRequestsOperations {
  return {
    ..._getJoinRequests(context),
  };
}
