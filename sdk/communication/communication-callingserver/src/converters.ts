// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationIdentifier,
  CommunicationUserIdentifier,
  isCommunicationUserIdentifier,
  isMicrosoftTeamsUserIdentifier,
  isPhoneNumberIdentifier,
  MicrosoftTeamsUserIdentifier,
  PhoneNumberIdentifier,
  UnknownIdentifier
} from "@azure/communication-common";
import { JoinCallOptions } from ".";
import { CommunicationIdentifierModel, JoinCallRequest } from "./generated/src";

export class JoinCallRequestConverter {
  static convert(source: CommunicationIdentifier, options: JoinCallOptions): JoinCallRequest {
    return {
      source: CommunicationIdentifierConverter.convert(source),
      callbackUri: options.callbackUri,
      requestedMediaTypes: options.requestedMediaTypes,
      requestedCallEvents: options.requestedCallEvents,
      subject: undefined
    };
  }
}

class CommunicationIdentifierConverter {
  static convert(source: CommunicationIdentifier): CommunicationIdentifierModel {
    if (isCommunicationUserIdentifier(source)) {
      return {
        communicationUser: { id: (source as CommunicationUserIdentifier).communicationUserId }
      };
    } else if (isPhoneNumberIdentifier(source)) {
      return {
        rawId: (source as PhoneNumberIdentifier).rawId,
        phoneNumber: { value: (source as PhoneNumberIdentifier).phoneNumber }
      };
    } else if (isMicrosoftTeamsUserIdentifier(source)) {
      return {
        rawId: (source as MicrosoftTeamsUserIdentifier).rawId,
        microsoftTeamsUser: {
          isAnonymous: (source as MicrosoftTeamsUserIdentifier).isAnonymous,
          userId: (source as MicrosoftTeamsUserIdentifier).microsoftTeamsUserId,
          cloud: (source as MicrosoftTeamsUserIdentifier).cloud
        }
      };
    }
    return {
      rawId: (source as UnknownIdentifier).id
    };
  }
}
