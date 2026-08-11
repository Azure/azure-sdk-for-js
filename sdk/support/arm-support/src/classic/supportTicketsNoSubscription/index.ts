// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import {
  checkNameAvailability,
  list,
  update,
  create,
  get,
} from "../../api/supportTicketsNoSubscription/operations.js";
import {
  SupportTicketsNoSubscriptionCheckNameAvailabilityOptionalParams,
  SupportTicketsNoSubscriptionListOptionalParams,
  SupportTicketsNoSubscriptionUpdateOptionalParams,
  SupportTicketsNoSubscriptionCreateOptionalParams,
  SupportTicketsNoSubscriptionGetOptionalParams,
} from "../../api/supportTicketsNoSubscription/options.js";
import {
  CheckNameAvailabilityInput,
  CheckNameAvailabilityOutput,
  SupportTicketDetails,
  UpdateSupportTicket,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SupportTicketsNoSubscription operations. */
export interface SupportTicketsNoSubscriptionOperations {
  /** Check the availability of a resource name. This API should be used to check the uniqueness of the name for support ticket creation for the selected subscription. */
  checkNameAvailability: (
    checkNameAvailabilityInput: CheckNameAvailabilityInput,
    options?: SupportTicketsNoSubscriptionCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityOutput>;
  /** Lists all the support tickets. <br/><br/>You can also filter the support tickets by <i>Status</i>, <i>CreatedDate</i>, , <i>ServiceId</i>, and <i>ProblemClassificationId</i> using the $filter parameter. Output will be a paged result with <i>nextLink</i>, using which you can retrieve the next set of support tickets. <br/><br/>Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error. */
  list: (
    options?: SupportTicketsNoSubscriptionListOptionalParams,
  ) => PagedAsyncIterableIterator<SupportTicketDetails>;
  /** This API allows you to update the severity level, ticket status, and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API. */
  update: (
    supportTicketName: string,
    updateSupportTicket: UpdateSupportTicket,
    options?: SupportTicketsNoSubscriptionUpdateOptionalParams,
  ) => Promise<SupportTicketDetails>;
  /** Creates a new support ticket for Billing, and Subscription Management issues. Learn the [prerequisites](https://aka.ms/supportAPI) required to create a support ticket.<br/><br/>Always call the Services and ProblemClassifications API to get the most recent set of services and problem categories required for support ticket creation.<br/><br/>Adding attachments is not currently supported via the API. To add a file to an existing support ticket, visit the [Manage support ticket](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/managesupportrequest) page in the Azure portal, select the support ticket, and use the file upload control to add a new file.<br/><br/>Providing consent to share diagnostic information with Azure support is currently not supported via the API. The Azure support engineer working on your ticket will reach out to you for consent if your issue requires gathering diagnostic information from your Azure resources.<br/><br/> */
  create: (
    supportTicketName: string,
    createSupportTicketParameters: SupportTicketDetails,
    options?: SupportTicketsNoSubscriptionCreateOptionalParams,
  ) => PollerLike<OperationState<SupportTicketDetails>, SupportTicketDetails>;
  /** @deprecated use create instead */
  beginCreate: (
    supportTicketName: string,
    createSupportTicketParameters: SupportTicketDetails,
    options?: SupportTicketsNoSubscriptionCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SupportTicketDetails>, SupportTicketDetails>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    supportTicketName: string,
    createSupportTicketParameters: SupportTicketDetails,
    options?: SupportTicketsNoSubscriptionCreateOptionalParams,
  ) => Promise<SupportTicketDetails>;
  /** Gets details for a specific support ticket. Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error. */
  get: (
    supportTicketName: string,
    options?: SupportTicketsNoSubscriptionGetOptionalParams,
  ) => Promise<SupportTicketDetails>;
}

function _getSupportTicketsNoSubscription(context: MicrosoftSupportContext) {
  return {
    checkNameAvailability: (
      checkNameAvailabilityInput: CheckNameAvailabilityInput,
      options?: SupportTicketsNoSubscriptionCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, checkNameAvailabilityInput, options),
    list: (options?: SupportTicketsNoSubscriptionListOptionalParams) => list(context, options),
    update: (
      supportTicketName: string,
      updateSupportTicket: UpdateSupportTicket,
      options?: SupportTicketsNoSubscriptionUpdateOptionalParams,
    ) => update(context, supportTicketName, updateSupportTicket, options),
    create: (
      supportTicketName: string,
      createSupportTicketParameters: SupportTicketDetails,
      options?: SupportTicketsNoSubscriptionCreateOptionalParams,
    ) => create(context, supportTicketName, createSupportTicketParameters, options),
    beginCreate: async (
      supportTicketName: string,
      createSupportTicketParameters: SupportTicketDetails,
      options?: SupportTicketsNoSubscriptionCreateOptionalParams,
    ) => {
      const poller = create(context, supportTicketName, createSupportTicketParameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      supportTicketName: string,
      createSupportTicketParameters: SupportTicketDetails,
      options?: SupportTicketsNoSubscriptionCreateOptionalParams,
    ) => {
      return await create(context, supportTicketName, createSupportTicketParameters, options);
    },
    get: (supportTicketName: string, options?: SupportTicketsNoSubscriptionGetOptionalParams) =>
      get(context, supportTicketName, options),
  };
}

export function _getSupportTicketsNoSubscriptionOperations(
  context: MicrosoftSupportContext,
): SupportTicketsNoSubscriptionOperations {
  return {
    ..._getSupportTicketsNoSubscription(context),
  };
}
