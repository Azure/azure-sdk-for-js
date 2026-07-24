// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import {
  checkNameAvailability,
  list,
  create,
  get,
} from "../../api/communicationsNoSubscription/operations.js";
import type {
  CommunicationsNoSubscriptionCheckNameAvailabilityOptionalParams,
  CommunicationsNoSubscriptionListOptionalParams,
  CommunicationsNoSubscriptionCreateOptionalParams,
  CommunicationsNoSubscriptionGetOptionalParams,
} from "../../api/communicationsNoSubscription/options.js";
import type {
  CommunicationDetails,
  CheckNameAvailabilityInput,
  CheckNameAvailabilityOutput,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CommunicationsNoSubscription operations. */
export interface CommunicationsNoSubscriptionOperations {
  /** Check the availability of a resource name. This API should be used to check the uniqueness of the name for adding a new communication to the support ticket. */
  checkNameAvailability: (
    supportTicketName: string,
    checkNameAvailabilityInput: CheckNameAvailabilityInput,
    options?: CommunicationsNoSubscriptionCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityOutput>;
  /** Lists all communications (attachments not included) for a support ticket. <br/></br> You can also filter support ticket communications by _CreatedDate_ or _CommunicationType_ using the $filter parameter. The only type of communication supported today is _Web_. Output will be a paged result with _nextLink_, using which you can retrieve the next set of Communication results. <br/><br/>Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error. */
  list: (
    supportTicketName: string,
    options?: CommunicationsNoSubscriptionListOptionalParams,
  ) => PagedAsyncIterableIterator<CommunicationDetails>;
  /** Adds a new customer communication to an Azure support ticket. */
  create: (
    supportTicketName: string,
    communicationName: string,
    createCommunicationParameters: CommunicationDetails,
    options?: CommunicationsNoSubscriptionCreateOptionalParams,
  ) => PollerLike<OperationState<CommunicationDetails>, CommunicationDetails>;
  /** @deprecated use create instead */
  beginCreate: (
    supportTicketName: string,
    communicationName: string,
    createCommunicationParameters: CommunicationDetails,
    options?: CommunicationsNoSubscriptionCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CommunicationDetails>, CommunicationDetails>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    supportTicketName: string,
    communicationName: string,
    createCommunicationParameters: CommunicationDetails,
    options?: CommunicationsNoSubscriptionCreateOptionalParams,
  ) => Promise<CommunicationDetails>;
  /** Returns communication details for a support ticket. */
  get: (
    supportTicketName: string,
    communicationName: string,
    options?: CommunicationsNoSubscriptionGetOptionalParams,
  ) => Promise<CommunicationDetails>;
}

function _getCommunicationsNoSubscription(context: MicrosoftSupportContext) {
  return {
    checkNameAvailability: (
      supportTicketName: string,
      checkNameAvailabilityInput: CheckNameAvailabilityInput,
      options?: CommunicationsNoSubscriptionCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, supportTicketName, checkNameAvailabilityInput, options),
    list: (supportTicketName: string, options?: CommunicationsNoSubscriptionListOptionalParams) =>
      list(context, supportTicketName, options),
    create: (
      supportTicketName: string,
      communicationName: string,
      createCommunicationParameters: CommunicationDetails,
      options?: CommunicationsNoSubscriptionCreateOptionalParams,
    ) =>
      create(context, supportTicketName, communicationName, createCommunicationParameters, options),
    beginCreate: async (
      supportTicketName: string,
      communicationName: string,
      createCommunicationParameters: CommunicationDetails,
      options?: CommunicationsNoSubscriptionCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        supportTicketName,
        communicationName,
        createCommunicationParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      supportTicketName: string,
      communicationName: string,
      createCommunicationParameters: CommunicationDetails,
      options?: CommunicationsNoSubscriptionCreateOptionalParams,
    ) => {
      return await create(
        context,
        supportTicketName,
        communicationName,
        createCommunicationParameters,
        options,
      );
    },
    get: (
      supportTicketName: string,
      communicationName: string,
      options?: CommunicationsNoSubscriptionGetOptionalParams,
    ) => get(context, supportTicketName, communicationName, options),
  };
}

export function _getCommunicationsNoSubscriptionOperations(
  context: MicrosoftSupportContext,
): CommunicationsNoSubscriptionOperations {
  return {
    ..._getCommunicationsNoSubscription(context),
  };
}
