// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementContext } from "../../api/educationManagementContext.js";
import {
  generateInviteCode,
  listAll,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/labs/operations.js";
import {
  LabsGenerateInviteCodeOptionalParams,
  LabsListAllOptionalParams,
  LabsListOptionalParams,
  LabsDeleteOptionalParams,
  LabsCreateOrUpdateOptionalParams,
  LabsGetOptionalParams,
} from "../../api/labs/options.js";
import { LabDetails, InviteCodeGenerateRequest } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Labs operations. */
export interface LabsOperations {
  /** Generate invite code for a lab */
  generateInviteCode: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    parameters: InviteCodeGenerateRequest,
    options?: LabsGenerateInviteCodeOptionalParams,
  ) => Promise<LabDetails>;
  /** Get a list of labs associated with the provided billing account name and billing profile name. */
  listAll: (
    billingAccountName: string,
    billingProfileName: string,
    options?: LabsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<LabDetails>;
  /** Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name. */
  list: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: LabsListOptionalParams,
  ) => PagedAsyncIterableIterator<LabDetails>;
  /** Delete a specific lab associated with the provided billing account name, billing profile name, and invoice section name. Note all students must be removed from the lab in order to delete the lab. */
  delete: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: LabsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a new lab or update a previously created lab. */
  createOrUpdate: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    parameters: LabDetails,
    options?: LabsCreateOrUpdateOptionalParams,
  ) => Promise<LabDetails>;
  /** Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name. */
  get: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: LabsGetOptionalParams,
  ) => Promise<LabDetails>;
}

function _getLabs(context: EducationManagementContext) {
  return {
    generateInviteCode: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      parameters: InviteCodeGenerateRequest,
      options?: LabsGenerateInviteCodeOptionalParams,
    ) =>
      generateInviteCode(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        parameters,
        options,
      ),
    listAll: (
      billingAccountName: string,
      billingProfileName: string,
      options?: LabsListAllOptionalParams,
    ) => listAll(context, billingAccountName, billingProfileName, options),
    list: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: LabsListOptionalParams,
    ) => list(context, billingAccountName, billingProfileName, invoiceSectionName, options),
    delete: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: LabsDeleteOptionalParams,
    ) => $delete(context, billingAccountName, billingProfileName, invoiceSectionName, options),
    createOrUpdate: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      parameters: LabDetails,
      options?: LabsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        parameters,
        options,
      ),
    get: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: LabsGetOptionalParams,
    ) => get(context, billingAccountName, billingProfileName, invoiceSectionName, options),
  };
}

export function _getLabsOperations(context: EducationManagementContext): LabsOperations {
  return {
    ..._getLabs(context),
  };
}
