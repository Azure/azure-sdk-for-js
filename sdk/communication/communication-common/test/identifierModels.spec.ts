// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  isCommunicationUser,
  isCallingApplication,
  isPhoneNumber,
  getIdentifierKind,
  PhoneNumber,
  isUnknownIdentifier
} from "../src";

describe("Identifier models", () => {
  it("type guards", () => {
    const communicationUser = { communicationUserId: "alice" };
    assert.isTrue(isCommunicationUser(communicationUser));
    assert.isFalse(isCallingApplication(communicationUser));
    assert.isFalse(isPhoneNumber(communicationUser));
    assert.isFalse(isUnknownIdentifier(communicationUser));
  });

  it("get kind", () => {
    const phoneNumber = { phoneNumber: "123" };
    const identifierKind = getIdentifierKind(phoneNumber);
    assert.strictEqual(identifierKind.kind, "PhoneNumber");
    assert.strictEqual((identifierKind as PhoneNumber).phoneNumber, phoneNumber.phoneNumber);
  });
});
