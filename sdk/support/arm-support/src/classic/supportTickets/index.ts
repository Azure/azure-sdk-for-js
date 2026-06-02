// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import {
  checkNameAvailability,
  lookUpResourceId,
  list,
  update,
  create,
  get,
} from "../../api/supportTickets/operations.js";
import {
  SupportTicketsCheckNameAvailabilityOptionalParams,
  SupportTicketsLookUpResourceIdOptionalParams,
  SupportTicketsListOptionalParams,
  SupportTicketsUpdateOptionalParams,
  SupportTicketsCreateOptionalParams,
  SupportTicketsGetOptionalParams,
} from "../../api/supportTickets/options.js";
import {
  CheckNameAvailabilityInput,
  CheckNameAvailabilityOutput,
  SupportTicketDetails,
  UpdateSupportTicket,
  LookUpResourceIdRequest,
  LookUpResourceIdResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SupportTickets operations. */
export interface SupportTicketsOperations {
  /** Check the availability of a resource name. This API should be used to check the uniqueness of the name for support ticket creation for the selected subscription. */
  checkNameAvailability: (
    checkNameAvailabilityInput: CheckNameAvailabilityInput,
    options?: SupportTicketsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityOutput>;
  /** This operation fetches ARM resource id of support resource type. */
  lookUpResourceId: (
    lookUpResourceIdRequest: LookUpResourceIdRequest,
    options?: SupportTicketsLookUpResourceIdOptionalParams,
  ) => Promise<LookUpResourceIdResponse>;
  /** Lists all the support tickets for an Azure subscription. You can also filter the support tickets by _Status_, _CreatedDate_, _ServiceId_, and _ProblemClassificationId_ using the $filter parameter. Output will be a paged result with _nextLink_, using which you can retrieve the next set of support tickets. <br/><br/>Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error. */
  list: (
    options?: SupportTicketsListOptionalParams,
  ) => PagedAsyncIterableIterator<SupportTicketDetails>;
  /** This API allows you to update the severity level, ticket status, advanced diagnostic consent and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API. */
  update: (
    supportTicketName: string,
    updateSupportTicket: UpdateSupportTicket,
    options?: SupportTicketsUpdateOptionalParams,
  ) => Promise<SupportTicketDetails>;
  /** Creates a new support ticket for Subscription and Service limits (Quota), Technical, Billing, and Subscription Management issues for the specified subscription. Learn the [prerequisites](https://aka.ms/supportAPI) required to create a support ticket.<br/><br/>Always call the Services and ProblemClassifications API to get the most recent set of services and problem categories required for support ticket creation.<br/><br/>Adding attachments is not currently supported via the API. To add a file to an existing support ticket, visit the [Manage support ticket](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/managesupportrequest) page in the Azure portal, select the support ticket, and use the file upload control to add a new file.<br/><br/>Providing consent to share diagnostic information with Azure support is currently not supported via the API. The Azure support engineer working on your ticket will reach out to you for consent if your issue requires gathering diagnostic information from your Azure resources.<br/><br/>**Creating a support ticket for on-behalf-of**: Include _x-ms-authorization-auxiliary_ header to provide an auxiliary token as per [documentation](https://docs.microsoft.com/azure/azure-resource-manager/management/authenticate-multi-tenant). The primary token will be from the tenant for whom a support ticket is being raised against the subscription, i.e. Cloud solution provider (CSP) customer tenant. The auxiliary token will be from the Cloud solution provider (CSP) partner tenant. */
  create: (
    supportTicketName: string,
    createSupportTicketParameters: SupportTicketDetails,
    options?: SupportTicketsCreateOptionalParams,
  ) => PollerLike<OperationState<SupportTicketDetails>, SupportTicketDetails>;
  /** Get ticket details for an Azure subscription. Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error. */
  get: (
    supportTicketName: string,
    options?: SupportTicketsGetOptionalParams,
  ) => Promise<SupportTicketDetails>;
}

function _getSupportTickets(context: MicrosoftSupportContext) {
  return {
    checkNameAvailability: (
      checkNameAvailabilityInput: CheckNameAvailabilityInput,
      options?: SupportTicketsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, checkNameAvailabilityInput, options),
    lookUpResourceId: (
      lookUpResourceIdRequest: LookUpResourceIdRequest,
      options?: SupportTicketsLookUpResourceIdOptionalParams,
    ) => lookUpResourceId(context, lookUpResourceIdRequest, options),
    list: (options?: SupportTicketsListOptionalParams) => list(context, options),
    update: (
      supportTicketName: string,
      updateSupportTicket: UpdateSupportTicket,
      options?: SupportTicketsUpdateOptionalParams,
    ) => update(context, supportTicketName, updateSupportTicket, options),
    create: (
      supportTicketName: string,
      createSupportTicketParameters: SupportTicketDetails,
      options?: SupportTicketsCreateOptionalParams,
    ) => create(context, supportTicketName, createSupportTicketParameters, options),
    get: (supportTicketName: string, options?: SupportTicketsGetOptionalParams) =>
      get(context, supportTicketName, options),
  };
}

export function _getSupportTicketsOperations(
  context: MicrosoftSupportContext,
): SupportTicketsOperations {
  return {
    ..._getSupportTickets(context),
  };
}
