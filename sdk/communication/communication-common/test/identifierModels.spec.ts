// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PhoneNumberIdentifier,
  getIdentifierKind,
  isCommunicationUserIdentifier,
  isMicrosoftTeamsUserIdentifier,
  isPhoneNumberIdentifier,
  isUnknownIdentifier,
} from "../src";
import { assert } from "chai";

describe("Identifier models", () => {
  it("type guards", () => {
    const communicationUser = { communicationUserId: "alice" };
    assert.isTrue(isCommunicationUserIdentifier(communicationUser));
    assert.isFalse(isPhoneNumberIdentifier(communicationUser));
    assert.isFalse(isMicrosoftTeamsUserIdentifier(communicationUser));
    assert.isFalse(isUnknownIdentifier(communicationUser));
  });

  it("get kind", () => {
    const phoneNumber = { phoneNumber: "123" };
    const identifierKind = getIdentifierKind(phoneNumber);
    assert.strictEqual(identifierKind.kind, "phoneNumber");
    assert.strictEqual(
      (identifierKind as PhoneNumberIdentifier).phoneNumber,
      phoneNumber.phoneNumber
    );
  });
});
