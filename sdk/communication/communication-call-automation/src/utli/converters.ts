// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PhoneNumberIdentifier,
  CommunicationUserIdentifier,
  UnknownIdentifier,
  SerializedPhoneNumberIdentifier,
  CommunicationIdentifier,
  SerializedCommunicationIdentifier,
  MicrosoftTeamsUserIdentifier,
  MicrosoftTeamsAppIdentifier,
} from "@azure/communication-common";
import {
  serializeCommunicationIdentifier,
  isCommunicationUserIdentifier,
  isPhoneNumberIdentifier,
  isUnknownIdentifier,
  isMicrosoftTeamsUserIdentifier,
  isMicrosoftTeamsAppIdentifier,
} from "@azure/communication-common";
import type {
  CallParticipantInternal,
  CommunicationIdentifierModel,
  CommunicationIdentifierModelKind,
  KnownCommunicationCloudEnvironmentModel,
  PhoneNumberIdentifierModel,
  CommunicationUserIdentifierModel,
  MicrosoftTeamsAppIdentifierModel,
  TeamsPhoneCallDetailsInternal,
  TeamsPhoneCallerDetailsInternal,
  TeamsPhoneSourceDetailsInternal,
} from "../generated/src/index.js";
import { KnownCommunicationIdentifierModelKind } from "../generated/src/index.js";
import type {
  CallParticipant,
  TeamsPhoneCallDetails,
  TeamsPhoneCallerDetails,
  TeamsPhoneSourceDetails,
} from "../models/models.js";

function extractKind(
  identifierModel: CommunicationIdentifierModel,
): CommunicationIdentifierModelKind {
  if (identifierModel.communicationUser !== undefined) {
    return KnownCommunicationIdentifierModelKind.CommunicationUser;
  }
  if (identifierModel.phoneNumber !== undefined) {
    return KnownCommunicationIdentifierModelKind.PhoneNumber;
  }
  if (identifierModel.microsoftTeamsUser !== undefined) {
    return KnownCommunicationIdentifierModelKind.MicrosoftTeamsUser;
  }
  if (identifierModel.microsoftTeamsApp !== undefined) {
    return KnownCommunicationIdentifierModelKind.MicrosoftTeamsApp;
  }
  return KnownCommunicationIdentifierModelKind.Unknown;
}

/** Convert PhoneNumberIdentifier to PhoneNumberIdentifierModel(Internal usage class) */
export function PhoneNumberIdentifierModelConverter(
  phoneNumberIdentifier: PhoneNumberIdentifier | undefined,
): PhoneNumberIdentifierModel | undefined {
  if (phoneNumberIdentifier === undefined || phoneNumberIdentifier.phoneNumber === undefined) {
    return undefined;
  }

  const phoneNumberIdentifierModel =
    serializeCommunicationIdentifier(phoneNumberIdentifier).phoneNumber;
  return phoneNumberIdentifierModel;
}

/** Convert SerializedPhoneNumberIdentifier to PhoneNumberIdentifier(Public usage class) */
export function phoneNumberIdentifierConverter(
  serializedPhoneNumberIdentifier: SerializedPhoneNumberIdentifier | undefined,
): PhoneNumberIdentifier | undefined {
  if (
    serializedPhoneNumberIdentifier === undefined ||
    serializedPhoneNumberIdentifier?.value === null
  ) {
    return undefined;
  }

  const phoneNumberIdentifier: PhoneNumberIdentifier = {
    phoneNumber: serializedPhoneNumberIdentifier.value,
  };
  return phoneNumberIdentifier;
}

/** Convert CommunicationIdentifierModel to CommunicationIdentifier(Public usage class) */
export function communicationIdentifierConverter(
  identifierModel: CommunicationIdentifierModel,
): CommunicationIdentifier {
  const rawId = identifierModel.rawId;
  const kind =
    identifierModel.kind !== undefined ? identifierModel.kind : extractKind(identifierModel);

  if (
    kind === KnownCommunicationIdentifierModelKind.CommunicationUser &&
    identifierModel.communicationUser !== undefined
  ) {
    const communicationUserIdentifier: CommunicationUserIdentifier = {
      communicationUserId: identifierModel.communicationUser.id,
    };
    return communicationUserIdentifier;
  }

  if (
    kind === KnownCommunicationIdentifierModelKind.PhoneNumber &&
    identifierModel.phoneNumber !== undefined
  ) {
    const phoneNumberIdentifier: PhoneNumberIdentifier = {
      phoneNumber: identifierModel.phoneNumber.value,
      rawId: rawId,
    };
    return phoneNumberIdentifier;
  }

  if (
    kind === KnownCommunicationIdentifierModelKind.MicrosoftTeamsUser &&
    identifierModel.microsoftTeamsUser !== undefined
  ) {
    const microsoftTeamsUserIdentifier: MicrosoftTeamsUserIdentifier = {
      rawId: rawId,
      microsoftTeamsUserId: identifierModel.microsoftTeamsUser.userId,
      isAnonymous: identifierModel.microsoftTeamsUser.isAnonymous,
      cloud: identifierModel.microsoftTeamsUser.cloud as KnownCommunicationCloudEnvironmentModel,
    };
    return microsoftTeamsUserIdentifier;
  }

  if (
    kind === KnownCommunicationIdentifierModelKind.MicrosoftTeamsApp &&
    identifierModel.microsoftTeamsApp !== undefined
  ) {
    const microsoftTeamsAppIdentifier: MicrosoftTeamsAppIdentifier = {
      rawId: rawId,
      teamsAppId: identifierModel.microsoftTeamsApp.appId,
      cloud: identifierModel.microsoftTeamsApp.cloud as KnownCommunicationCloudEnvironmentModel,
    };
    return microsoftTeamsAppIdentifier;
  }

  const unknownIdentifier: UnknownIdentifier = {
    id: rawId ? rawId : "",
  };
  return unknownIdentifier;
}

/** Convert CommunicationIdentifier to CommunicationIdentifierModel(Internal usage class) */
export function communicationIdentifierModelConverter(
  identifier: CommunicationIdentifier,
): CommunicationIdentifierModel {
  const serializedIdentifier: SerializedCommunicationIdentifier =
    serializeCommunicationIdentifier(identifier);
  if (isCommunicationUserIdentifier(identifier)) {
    const communicationUserIdentifierModel: CommunicationIdentifierModel = {
      kind: KnownCommunicationIdentifierModelKind.CommunicationUser,
      ...serializedIdentifier,
    };
    return communicationUserIdentifierModel;
  }

  if (isPhoneNumberIdentifier(identifier)) {
    const phoneNumberIdentifierModel: CommunicationIdentifierModel = {
      kind: KnownCommunicationIdentifierModelKind.PhoneNumber,
      ...serializedIdentifier,
    };
    return phoneNumberIdentifierModel;
  }

  if (isMicrosoftTeamsUserIdentifier(identifier)) {
    const microsoftTeamsUserIdentifierModel: CommunicationIdentifierModel = {
      kind: KnownCommunicationIdentifierModelKind.MicrosoftTeamsUser,
      ...serializedIdentifier,
    };
    return microsoftTeamsUserIdentifierModel;
  }

  if (isMicrosoftTeamsAppIdentifier(identifier)) {
    const microsoftTeamsAppIdentifierModel: CommunicationIdentifierModel = {
      kind: KnownCommunicationIdentifierModelKind.MicrosoftTeamsApp,
      ...serializedIdentifier,
    };
    return microsoftTeamsAppIdentifierModel;
  }

  if (isUnknownIdentifier(identifier)) {
    const unknownIdentifierModel: CommunicationIdentifierModel = {
      kind: KnownCommunicationIdentifierModelKind.Unknown,
      ...serializedIdentifier,
    };
    return unknownIdentifierModel;
  }

  throw new Error();
}

/** Convert CallParticipantInternal to CallParticipant */
export function callParticipantConverter(
  acsCallParticipant: CallParticipantInternal,
): CallParticipant {
  const callParticipant: CallParticipant = {
    ...acsCallParticipant,
    identifier: acsCallParticipant.identifier
      ? communicationIdentifierConverter(acsCallParticipant.identifier)
      : undefined,
  };
  return callParticipant;
}

/** Convert CommunicationUserIdentifier to CommunicationUserIdentifierModel (Internal usage class) */
export function communicationUserIdentifierModelConverter(
  identifier: CommunicationUserIdentifier | undefined,
): CommunicationUserIdentifierModel | undefined {
  if (!identifier || !identifier.communicationUserId) {
    return undefined;
  }

  return { id: identifier.communicationUserId };
}

/** Convert CommunicationUserIdentifierModel to CommunicationUserIdentifier (Public usage class) */
export function communicationUserIdentifierConverter(
  identifier: CommunicationUserIdentifierModel | undefined,
): CommunicationUserIdentifier | undefined {
  if (!identifier || !identifier.id) {
    return undefined;
  }

  return { communicationUserId: identifier.id };
}

/** Convert MicrosoftTeamsAppIdentifier to MicrosoftTeamsAppIdentifierModel (Internal usage class) */
export function microsoftTeamsAppIdentifierModelConverter(
  identifier: MicrosoftTeamsAppIdentifier | undefined,
): MicrosoftTeamsAppIdentifierModel | undefined {
  if (!identifier || !identifier.teamsAppId) {
    return undefined;
  }

  return { appId: identifier.teamsAppId };
}

/** Convert MicrosoftTeamsAppIdentifierModel to MicrosoftTeamsAppIdentifier (Public usage class) */
export function microsoftTeamsAppIdentifierConverter(
  identifier: MicrosoftTeamsAppIdentifierModel | undefined,
): MicrosoftTeamsAppIdentifier | undefined {
  if (!identifier || !identifier.appId) {
    return undefined;
  }

  return { teamsAppId: identifier.appId };
}

/**
 * Converts from public TeamsPhoneCallerDetails to internal TeamsPhoneCallerDetailsModel
 */
export function teamsPhoneCallerDetailsModelConverter(
  teamsPhoneCallerDetails?: TeamsPhoneCallerDetails,
): TeamsPhoneCallerDetailsInternal | undefined {
  if (!teamsPhoneCallerDetails) {
    return undefined;
  }

  return {
    caller: communicationIdentifierModelConverter(teamsPhoneCallerDetails.caller),
    name: teamsPhoneCallerDetails.name,
    phoneNumber: teamsPhoneCallerDetails.phoneNumber,
    recordId: teamsPhoneCallerDetails.recordId,
    screenPopUrl: teamsPhoneCallerDetails.screenPopUrl,
    isAuthenticated: teamsPhoneCallerDetails.isAuthenticated,
    additionalCallerInformation: teamsPhoneCallerDetails.additionalCallerInformation,
  };
}

/**
 * Converts from public TeamsPhoneSourceDetails to internal TeamsPhoneSourceDetailsModel
 */
export function teamsPhoneSourceDetailsModelConverter(
  teamsPhoneSourceDetails?: TeamsPhoneSourceDetails,
): TeamsPhoneSourceDetailsInternal | undefined {
  if (!teamsPhoneSourceDetails) {
    return undefined;
  }

  const intendedTargets: { [key: string]: CommunicationIdentifierModel } = {};

  if (teamsPhoneSourceDetails.intendedTargets) {
    for (const [key, value] of Object.entries(teamsPhoneSourceDetails.intendedTargets)) {
      intendedTargets[key] = communicationIdentifierModelConverter(value);
    }
  }

  return {
    source: communicationIdentifierModelConverter(teamsPhoneSourceDetails.source),
    language: teamsPhoneSourceDetails.language,
    status: teamsPhoneSourceDetails.status,
    intendedTargets: Object.keys(intendedTargets).length > 0 ? intendedTargets : undefined,
  };
}

/**
 * Converts from public TeamsPhoneCallDetails to internal TeamsPhoneCallDetailsModel
 */
export function teamsPhoneCallDetailsModelConverter(
  teamsPhoneCallDetails?: TeamsPhoneCallDetails,
): TeamsPhoneCallDetailsInternal | undefined {
  if (!teamsPhoneCallDetails) {
    return undefined;
  }

  return {
    teamsPhoneCallerDetails: teamsPhoneCallerDetailsModelConverter(
      teamsPhoneCallDetails.teamsPhoneCallerDetails,
    ),
    teamsPhoneSourceDetails: teamsPhoneSourceDetailsModelConverter(
      teamsPhoneCallDetails.teamsPhoneSourceDetails,
    ),
    sessionId: teamsPhoneCallDetails.sessionId,
    intent: teamsPhoneCallDetails.intent,
    callTopic: teamsPhoneCallDetails.callTopic,
    callContext: teamsPhoneCallDetails.callContext,
    transcriptUrl: teamsPhoneCallDetails.transcriptUrl,
    callSentiment: teamsPhoneCallDetails.callSentiment,
    suggestedActions: teamsPhoneCallDetails.suggestedActions,
  };
}

/**
 * Converts from internal TeamsPhoneCallerDetailsInternal to public TeamsPhoneCallerDetails (for incoming events)
 */
export function teamsPhoneCallerDetailsConverter(
  teamsPhoneCallerDetails?: TeamsPhoneCallerDetailsInternal,
): TeamsPhoneCallerDetails | undefined {
  if (!teamsPhoneCallerDetails) {
    return undefined;
  }

  return {
    caller: communicationIdentifierConverter(teamsPhoneCallerDetails.caller),
    name: teamsPhoneCallerDetails.name,
    phoneNumber: teamsPhoneCallerDetails.phoneNumber,
    recordId: teamsPhoneCallerDetails.recordId,
    screenPopUrl: teamsPhoneCallerDetails.screenPopUrl,
    isAuthenticated: teamsPhoneCallerDetails.isAuthenticated,
    additionalCallerInformation: teamsPhoneCallerDetails.additionalCallerInformation,
  };
}

/**
 * Converts from internal TeamsPhoneSourceDetailsInternal to public TeamsPhoneSourceDetails (for incoming events)
 */
export function teamsPhoneSourceDetailsConverter(
  teamsPhoneSourceDetails?: TeamsPhoneSourceDetailsInternal,
): TeamsPhoneSourceDetails | undefined {
  if (!teamsPhoneSourceDetails) {
    return undefined;
  }

  const intendedTargets: { [key: string]: CommunicationIdentifier } = {};

  if (teamsPhoneSourceDetails.intendedTargets) {
    for (const [key, value] of Object.entries(teamsPhoneSourceDetails.intendedTargets)) {
      intendedTargets[key] = communicationIdentifierConverter(value);
    }
  }

  return {
    source: communicationIdentifierConverter(teamsPhoneSourceDetails.source),
    language: teamsPhoneSourceDetails.language,
    status: teamsPhoneSourceDetails.status,
    intendedTargets: Object.keys(intendedTargets).length > 0 ? intendedTargets : undefined,
  };
}

/**
 * Converts from internal TeamsPhoneCallDetailsInternal to public TeamsPhoneCallDetails (for incoming events)
 */
export function teamsPhoneCallDetailsConverter(
  teamsPhoneCallDetails?: TeamsPhoneCallDetailsInternal,
): TeamsPhoneCallDetails | undefined {
  if (!teamsPhoneCallDetails) {
    return undefined;
  }

  return {
    kind: "teamsPhoneCallDetails",
    teamsPhoneCallerDetails: teamsPhoneCallerDetailsConverter(
      teamsPhoneCallDetails.teamsPhoneCallerDetails,
    ),
    teamsPhoneSourceDetails: teamsPhoneSourceDetailsConverter(
      teamsPhoneCallDetails.teamsPhoneSourceDetails,
    ),
    sessionId: teamsPhoneCallDetails.sessionId,
    intent: teamsPhoneCallDetails.intent,
    callTopic: teamsPhoneCallDetails.callTopic,
    callContext: teamsPhoneCallDetails.callContext,
    transcriptUrl: teamsPhoneCallDetails.transcriptUrl,
    callSentiment: teamsPhoneCallDetails.callSentiment,
    suggestedActions: teamsPhoneCallDetails.suggestedActions,
  };
}
