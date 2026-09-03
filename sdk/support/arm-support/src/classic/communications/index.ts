// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import { checkNameAvailability, list, create, get } from "../../api/communications/operations.js";
import {
  CommunicationsCheckNameAvailabilityOptionalParams,
  CommunicationsListOptionalParams,
  CommunicationsCreateOptionalParams,
  CommunicationsGetOptionalParams,
} from "../../api/communications/options.js";
import {
  CommunicationDetails,
  CheckNameAvailabilityInput,
  CheckNameAvailabilityOutput,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Communications operations. */
export interface CommunicationsOperations {
  /** Check the availability of a resource name. This API should be used to check the uniqueness of the name for adding a new communication to the support ticket. */
  checkNameAvailability: (
    supportTicketName: string,
    checkNameAvailabilityInput: CheckNameAvailabilityInput,
    options?: CommunicationsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityOutput>;
  /** Lists all communications (attachments not included) for a support ticket. <br/></br> You can also filter support ticket communications by _CreatedDate_ or _CommunicationType_ using the $filter parameter. The only type of communication supported today is _Web_. Output will be a paged result with _nextLink_, using which you can retrieve the next set of Communication results. <br/><br/>Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error. */
  list: (
    supportTicketName: string,
    options?: CommunicationsListOptionalParams,
  ) => PagedAsyncIterableIterator<CommunicationDetails>;
  /** Adds a new customer communication to an Azure support ticket. */
  create: (
    supportTicketName: string,
    communicationName: string,
    createCommunicationParameters: CommunicationDetails,
    options?: CommunicationsCreateOptionalParams,
  ) => PollerLike<OperationState<CommunicationDetails>, CommunicationDetails>;
  /** @deprecated use create instead */
  beginCreate: (
    supportTicketName: string,
    communicationName: string,
    createCommunicationParameters: CommunicationDetails,
    options?: CommunicationsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CommunicationDetails>, CommunicationDetails>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    supportTicketName: string,
    communicationName: string,
    createCommunicationParameters: CommunicationDetails,
    options?: CommunicationsCreateOptionalParams,
  ) => Promise<CommunicationDetails>;
  /** Returns communication details for a support ticket. */
  get: (
    supportTicketName: string,
    communicationName: string,
    options?: CommunicationsGetOptionalParams,
  ) => Promise<CommunicationDetails>;
}

function _getCommunications(context: MicrosoftSupportContext) {
  return {
    checkNameAvailability: (
      supportTicketName: string,
      checkNameAvailabilityInput: CheckNameAvailabilityInput,
      options?: CommunicationsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, supportTicketName, checkNameAvailabilityInput, options),
    list: (supportTicketName: string, options?: CommunicationsListOptionalParams) =>
      list(context, supportTicketName, options),
    create: (
      supportTicketName: string,
      communicationName: string,
      createCommunicationParameters: CommunicationDetails,
      options?: CommunicationsCreateOptionalParams,
    ) =>
      create(context, supportTicketName, communicationName, createCommunicationParameters, options),
    beginCreate: async (
      supportTicketName: string,
      communicationName: string,
      createCommunicationParameters: CommunicationDetails,
      options?: CommunicationsCreateOptionalParams,
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
      options?: CommunicationsCreateOptionalParams,
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
      options?: CommunicationsGetOptionalParams,
    ) => get(context, supportTicketName, communicationName, options),
  };
}

export function _getCommunicationsOperations(
  context: MicrosoftSupportContext,
): CommunicationsOperations {
  return {
    ..._getCommunications(context),
  };
}
