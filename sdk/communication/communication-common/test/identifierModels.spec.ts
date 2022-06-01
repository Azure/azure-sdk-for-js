// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationIdentifier,
  CommunicationIdentifierKind,
  PhoneNumberIdentifier,
  createIdentifierFromRawId,
  getIdentifierKind,
  getIdentifierRawId,
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

  it("get raw id of identifier", () => {
    const assertRawId = (identifier: CommunicationIdentifier, expectedRawId: string) =>
      assert.strictEqual(getIdentifierRawId(identifier), expectedRawId);

    assertRawId(
      {
        communicationUserId:
          "8:acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
      },
      "8:acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130"
    );
    assertRawId(
      {
        communicationUserId:
          "8:gcch-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
      },
      "8:gcch-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130"
    );
    assertRawId(
      {
        communicationUserId: "someFutureFormat",
      },
      "someFutureFormat"
    );
    assertRawId(
      { microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130" },
      "8:orgid:45ab2481-1c1c-4005-be24-0ffb879b1130"
    );
    assertRawId(
      {
        microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        cloud: "public",
      },
      "8:orgid:45ab2481-1c1c-4005-be24-0ffb879b1130"
    );
    assertRawId(
      {
        microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        cloud: "dod",
      },
      "8:dod:45ab2481-1c1c-4005-be24-0ffb879b1130"
    );
    assertRawId(
      {
        microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        cloud: "gcch",
      },
      "8:gcch:45ab2481-1c1c-4005-be24-0ffb879b1130"
    );
    assertRawId(
      {
        microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        isAnonymous: false,
      },
      "8:orgid:45ab2481-1c1c-4005-be24-0ffb879b1130"
    );
    assertRawId(
      {
        microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        isAnonymous: true,
      },
      "8:teamsvisitor:45ab2481-1c1c-4005-be24-0ffb879b1130"
    );
    assertRawId(
      {
        microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        rawId: "8:orgid:legacyFormat",
      },
      "8:orgid:legacyFormat"
    );
    assertRawId(
      {
        phoneNumber: "+112345556789",
      },
      "4:112345556789"
    );
    assertRawId(
      {
        phoneNumber: "+112345556789",
        rawId: "4:otherFormat",
      },
      "4:otherFormat"
    );
    assertRawId(
      {
        id: "28:45ab2481-1c1c-4005-be24-0ffb879b1130",
      },
      "28:45ab2481-1c1c-4005-be24-0ffb879b1130"
    );
    assertRawId(
      {
        foo: "nonsense",
      } as any,
      undefined as unknown as string
    );
  });

  it("create identifier from raw id", () => {
    const assertIdentifier = (rawId: string, expectedIdentifier: CommunicationIdentifierKind) =>
      assert.deepStrictEqual(createIdentifierFromRawId(rawId), expectedIdentifier);

    assertIdentifier(
      "8:acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
      {
        communicationUserId:
          "8:acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
        kind: "communicationUser",
      }
    );
    assertIdentifier(
      "8:spool:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
      {
        communicationUserId:
          "8:spool:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
        kind: "communicationUser",
      }
    );
    assertIdentifier(
      "8:dod-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
      {
        communicationUserId:
          "8:dod-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
        kind: "communicationUser",
      }
    );
    assertIdentifier(
      "8:gcch-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
      {
        communicationUserId:
          "8:gcch-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
        kind: "communicationUser",
      }
    );
    assertIdentifier("8:acs:something", {
      communicationUserId: "8:acs:something",
      kind: "communicationUser",
    });
    assertIdentifier("8:orgid:45ab2481-1c1c-4005-be24-0ffb879b1130", {
      microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
      cloud: "public",
      isAnonymous: false,
      kind: "microsoftTeamsUser",
    });
    assertIdentifier("8:dod:45ab2481-1c1c-4005-be24-0ffb879b1130", {
      microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
      cloud: "dod",
      isAnonymous: false,
      kind: "microsoftTeamsUser",
    });
    assertIdentifier("8:gcch:45ab2481-1c1c-4005-be24-0ffb879b1130", {
      microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
      cloud: "gcch",
      isAnonymous: false,
      kind: "microsoftTeamsUser",
    });
    assertIdentifier("8:teamsvisitor:45ab2481-1c1c-4005-be24-0ffb879b1130", {
      microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
      isAnonymous: true,
      kind: "microsoftTeamsUser",
    });
    assertIdentifier("8:orgid:legacyFormat", {
      microsoftTeamsUserId: "legacyFormat",
      cloud: "public",
      isAnonymous: false,
      kind: "microsoftTeamsUser",
    });
    assertIdentifier("4:112345556789", {
      phoneNumber: "+112345556789",
      kind: "phoneNumber",
    });
    assertIdentifier("4:otherFormat", {
      phoneNumber: "+otherFormat",
      kind: "phoneNumber",
    });
    assertIdentifier("28:45ab2481-1c1c-4005-be24-0ffb879b1130", {
      id: "28:45ab2481-1c1c-4005-be24-0ffb879b1130",
      kind: "unknown",
    });
    assertIdentifier("", {
      id: "",
      kind: "unknown",
    });
    assert.throws(() => createIdentifierFromRawId(undefined as unknown as string));
    assert.throws(() => createIdentifierFromRawId(null as unknown as string));
  });

  it("rawId stays the same after conversion to identifier and back", () => {
    const assertRoundtrip = (rawId: string) =>
      assert.strictEqual(getIdentifierRawId(createIdentifierFromRawId(rawId)), rawId);

    assertRoundtrip(
      "8:acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130"
    );
    assertRoundtrip(
      "8:spool:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130"
    );
    assertRoundtrip(
      "8:dod-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130"
    );
    assertRoundtrip(
      "8:gcch-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130"
    );
    assertRoundtrip("8:acs:something");
    assertRoundtrip("8:orgid:45ab2481-1c1c-4005-be24-0ffb879b1130");
    assertRoundtrip("8:dod:45ab2481-1c1c-4005-be24-0ffb879b1130");
    assertRoundtrip("8:gcch:45ab2481-1c1c-4005-be24-0ffb879b1130");
    assertRoundtrip("8:teamsvisitor:45ab2481-1c1c-4005-be24-0ffb879b1130");
    assertRoundtrip("8:orgid:legacyFormat");
    assertRoundtrip("4:112345556789");
    assertRoundtrip("4:otherFormat");
    assertRoundtrip("28:45ab2481-1c1c-4005-be24-0ffb879b1130");
    assertRoundtrip("");
  });
});
