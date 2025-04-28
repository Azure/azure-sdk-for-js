// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CommunicationIdentifier,
  CommunicationIdentifierKind,
  PhoneNumberIdentifier,
} from "../../src/index.js";
import {
  createIdentifierFromRawId,
  getIdentifierKind,
  getIdentifierRawId,
  isCommunicationUserIdentifier,
  isMicrosoftTeamsUserIdentifier,
  isPhoneNumberIdentifier,
  isTeamsExtensionUserIdentifier,
  isUnknownIdentifier,
} from "../../src/index.js";
import { describe, it, assert } from "vitest";

describe("Identifier models", function () {
  it("type guards", function () {
    const communicationUser = { communicationUserId: "alice" };
    assert.isTrue(isCommunicationUserIdentifier(communicationUser));
    assert.isFalse(isPhoneNumberIdentifier(communicationUser));
    assert.isFalse(isMicrosoftTeamsUserIdentifier(communicationUser));
    assert.isFalse(isUnknownIdentifier(communicationUser));
    assert.isFalse(isTeamsExtensionUserIdentifier(communicationUser));
  });

  it("get kind", function () {
    const phoneNumber = { phoneNumber: "123" };
    const identifierKind = getIdentifierKind(phoneNumber);
    assert.strictEqual(identifierKind.kind, "phoneNumber");
    assert.strictEqual(
      (identifierKind as PhoneNumberIdentifier).phoneNumber,
      phoneNumber.phoneNumber,
    );
  });

  it("get raw id of identifier", function () {
    const assertRawId = (identifier: CommunicationIdentifier, expectedRawId: string): void =>
      assert.strictEqual(getIdentifierRawId(identifier), expectedRawId);

    assertRawId(
      {
        communicationUserId:
          "8:acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
      },
      "8:acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
    );
    assertRawId(
      {
        communicationUserId:
          "8:gcch-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
      },
      "8:gcch-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
    );
    assertRawId(
      {
        communicationUserId: "someFutureFormat",
      },
      "someFutureFormat",
    );
    assertRawId(
      { microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130" },
      "8:orgid:45ab2481-1c1c-4005-be24-0ffb879b1130",
    );
    assertRawId(
      {
        microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        cloud: "public",
      },
      "8:orgid:45ab2481-1c1c-4005-be24-0ffb879b1130",
    );
    assertRawId(
      {
        microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        cloud: "dod",
      },
      "8:dod:45ab2481-1c1c-4005-be24-0ffb879b1130",
    );
    assertRawId(
      {
        microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        cloud: "gcch",
      },
      "8:gcch:45ab2481-1c1c-4005-be24-0ffb879b1130",
    );
    assertRawId(
      {
        microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        isAnonymous: false,
      },
      "8:orgid:45ab2481-1c1c-4005-be24-0ffb879b1130",
    );
    assertRawId(
      {
        microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        isAnonymous: true,
      },
      "8:teamsvisitor:45ab2481-1c1c-4005-be24-0ffb879b1130",
    );
    assertRawId(
      {
        microsoftTeamsUserId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        rawId: "8:orgid:legacyFormat",
      },
      "8:orgid:legacyFormat",
    );
    assertRawId(
      {
        userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
        tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
      },
      "8:acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130_207ffef6-9444-41fb-92ab-20eacaae2768",
    );
    assertRawId(
      {
        userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
        tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
        cloud: "dod",
      },
      "8:dod-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130_207ffef6-9444-41fb-92ab-20eacaae2768",
    );
    assertRawId(
      {
        userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
        tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
        cloud: "gcch",
      },
      "8:gcch-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130_207ffef6-9444-41fb-92ab-20eacaae2768",
    );
    assertRawId(
      {
        rawId: "8:acs:resource_tenant_user",
        userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
        tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
      },
      "8:acs:resource_tenant_user",
    );
    assertRawId(
      {
        phoneNumber: "+112345556789",
      },
      "4:+112345556789",
    );
    assertRawId(
      {
        phoneNumber: "112345556789",
      },
      "4:112345556789",
    );
    assertRawId(
      {
        phoneNumber: "+112345556789",
        rawId: "4:112345556789",
      },
      "4:112345556789",
    );
    assertRawId(
      {
        phoneNumber: "otherFormat",
        rawId: "4:207ffef6-9444-41fb-92ab-20eacaae2768",
      },
      "4:207ffef6-9444-41fb-92ab-20eacaae2768",
    );
    assertRawId(
      {
        phoneNumber: "otherFormat",
        rawId: "4:207ffef6-9444-41fb-92ab-20eacaae2768_207ffef6-9444-41fb-92ab-20eacaae2768",
      },
      "4:207ffef6-9444-41fb-92ab-20eacaae2768_207ffef6-9444-41fb-92ab-20eacaae2768",
    );
    assertRawId(
      {
        phoneNumber: "otherFormat",
        rawId: "4:+112345556789_207ffef6-9444-41fb-92ab-20eacaae2768",
      },
      "4:+112345556789_207ffef6-9444-41fb-92ab-20eacaae2768",
    );
    assertRawId(
      {
        id: "28:45ab2481-1c1c-4005-be24-0ffb879b1130",
      },
      "28:45ab2481-1c1c-4005-be24-0ffb879b1130",
    );
    assertRawId(
      {
        foo: "nonsense",
      } as any,
      undefined as unknown as string,
    );
  });

  it("create identifier from raw id", function () {
    const assertIdentifier = (
      rawId: string,
      expectedIdentifier: CommunicationIdentifierKind,
    ): void => assert.deepStrictEqual(createIdentifierFromRawId(rawId), expectedIdentifier);

    assertIdentifier(
      "8:acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
      {
        communicationUserId:
          "8:acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
        kind: "communicationUser",
      },
    );
    assertIdentifier(
      "8:spool:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
      {
        communicationUserId:
          "8:spool:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
        kind: "communicationUser",
      },
    );
    assertIdentifier(
      "8:dod-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
      {
        communicationUserId:
          "8:dod-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
        kind: "communicationUser",
      },
    );
    assertIdentifier(
      "8:gcch-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
      {
        communicationUserId:
          "8:gcch-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
        kind: "communicationUser",
      },
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
      phoneNumber: "112345556789",
      kind: "phoneNumber",
      isAnonymous: false,
      assertedId: undefined,
    });
    assertIdentifier("4:+112345556789", {
      phoneNumber: "+112345556789",
      kind: "phoneNumber",
      isAnonymous: false,
      assertedId: undefined,
    });
    assertIdentifier("4:207ffef6-9444-41fb-92ab-20eacaae2768", {
      phoneNumber: "207ffef6-9444-41fb-92ab-20eacaae2768",
      kind: "phoneNumber",
      isAnonymous: false,
      assertedId: undefined,
    });
    assertIdentifier(
      "4:207ffef6-9444-41fb-92ab-20eacaae2768_207ffef6-9444-41fb-92ab-20eacaae2768",
      {
        phoneNumber: "207ffef6-9444-41fb-92ab-20eacaae2768_207ffef6-9444-41fb-92ab-20eacaae2768",
        kind: "phoneNumber",
        isAnonymous: false,
        assertedId: "207ffef6-9444-41fb-92ab-20eacaae2768",
      },
    );
    assertIdentifier("4:+112345556789_207ffef6-9444-41fb-92ab-20eacaae2768", {
      phoneNumber: "+112345556789_207ffef6-9444-41fb-92ab-20eacaae2768",
      kind: "phoneNumber",
      isAnonymous: false,
      assertedId: "207ffef6-9444-41fb-92ab-20eacaae2768",
    });
    assertIdentifier("4:207ffef6-9444-41fb-92ab-20eacaae2768_", {
      phoneNumber: "207ffef6-9444-41fb-92ab-20eacaae2768_",
      kind: "phoneNumber",
      isAnonymous: false,
      assertedId: undefined,
    });
    assertIdentifier("4:+112345556789_207ffef6-9444-41fb-92ab-20eacaae2768_123", {
      phoneNumber: "+112345556789_207ffef6-9444-41fb-92ab-20eacaae2768_123",
      kind: "phoneNumber",
      isAnonymous: false,
      assertedId: "123",
    });
    assertIdentifier("4:_123", {
      phoneNumber: "_123",
      kind: "phoneNumber",
      isAnonymous: false,
      assertedId: "123",
    });
    assertIdentifier("4:anonymous", {
      phoneNumber: "anonymous",
      kind: "phoneNumber",
      isAnonymous: true,
      assertedId: undefined,
    });
    assertIdentifier("4:anonymous_123", {
      phoneNumber: "anonymous_123",
      kind: "phoneNumber",
      isAnonymous: false,
      assertedId: "123",
    });
    assertIdentifier("4:_anonymous", {
      phoneNumber: "_anonymous",
      kind: "phoneNumber",
      isAnonymous: false,
      assertedId: "anonymous",
    });
    assertIdentifier("28:45ab2481-1c1c-4005-be24-0ffb879b1130", {
      id: "28:45ab2481-1c1c-4005-be24-0ffb879b1130",
      kind: "unknown",
    });
    assertIdentifier("28:gcch-global:01234567-89ab-cdef-0123-456789abcdef", {
      kind: "unknown",
      id: "28:gcch-global:01234567-89ab-cdef-0123-456789abcdef",
    });
    assertIdentifier("28:dod-global:01234567-89ab-cdef-0123-456789abcdef", {
      kind: "unknown",
      id: "28:dod-global:01234567-89ab-cdef-0123-456789abcdef",
    });
    assertIdentifier("28:orgid:01234567-89ab-cdef-0123-456789abcdef", {
      cloud: "public",
      kind: "microsoftTeamsApp",
      teamsAppId: "01234567-89ab-cdef-0123-456789abcdef",
    });
    assertIdentifier("28:gcch:01234567-89ab-cdef-0123-456789abcdef", {
      kind: "microsoftTeamsApp",
      cloud: "gcch",
      teamsAppId: "01234567-89ab-cdef-0123-456789abcdef",
    });
    assertIdentifier("28:dod:01234567-89ab-cdef-0123-456789abcdef", {
      kind: "microsoftTeamsApp",
      cloud: "dod",
      teamsAppId: "01234567-89ab-cdef-0123-456789abcdef",
    });
    assertIdentifier(
      "8:gcch-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130_207ffef6-9444-41fb-92ab-20eacaae2768",
      {
        userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
        tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
        cloud: "gcch",
        kind: "teamsExtensionUser",
      },
    );
    assertIdentifier(
      "8:dod-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130_207ffef6-9444-41fb-92ab-20eacaae2768",
      {
        userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
        tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
        cloud: "dod",
        kind: "teamsExtensionUser",
      },
    );
    assertIdentifier(
      "8:acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130_207ffef6-9444-41fb-92ab-20eacaae2768",
      {
        userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
        tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
        cloud: "public",
        kind: "teamsExtensionUser",
      },
    );

    assertIdentifier("28:ag08-global:01234567-89ab-cdef-0123-456789abcdef", {
      id: "28:ag08-global:01234567-89ab-cdef-0123-456789abcdef",
      kind: "unknown",
    });
    assertIdentifier("28:ag09-global:01234567-89ab-cdef-0123-456789abcdef", {
      id: "28:ag09-global:01234567-89ab-cdef-0123-456789abcdef",
      kind: "unknown",
    });
    assertIdentifier("28:gal-global:01234567-89ab-cdef-0123-456789abcdef", {
      id: "28:gal-global:01234567-89ab-cdef-0123-456789abcdef",
      kind: "unknown",
    });
    assertIdentifier("48:45ab2481-1c1c-4005-be24-0ffb879b1130", {
      id: "48:45ab2481-1c1c-4005-be24-0ffb879b1130",
      kind: "unknown",
    });
    assertIdentifier("", {
      id: "",
      kind: "unknown",
    });
    assert.throws(() => createIdentifierFromRawId(undefined as unknown as string));
    assert.throws(() => createIdentifierFromRawId(null as unknown as string));
  });

  it("rawId stays the same after conversion to identifier and back", function () {
    const assertRoundtrip = (rawId: string): void =>
      assert.strictEqual(getIdentifierRawId(createIdentifierFromRawId(rawId)), rawId);

    assertRoundtrip(
      "8:acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
    );
    assertRoundtrip(
      "8:spool:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
    );
    assertRoundtrip(
      "8:dod-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
    );
    assertRoundtrip(
      "8:gcch-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130",
    );
    assertRoundtrip("8:acs:something");
    assertRoundtrip("8:orgid:45ab2481-1c1c-4005-be24-0ffb879b1130");
    assertRoundtrip("8:dod:45ab2481-1c1c-4005-be24-0ffb879b1130");
    assertRoundtrip("8:gcch:45ab2481-1c1c-4005-be24-0ffb879b1130");
    assertRoundtrip("8:teamsvisitor:45ab2481-1c1c-4005-be24-0ffb879b1130");
    assertRoundtrip("8:orgid:legacyFormat");
    assertRoundtrip("4:112345556789");
    assertRoundtrip("4:+112345556789");
    assertRoundtrip("4:207ffef6-9444-41fb-92ab-20eacaae2768");
    assertRoundtrip("4:207ffef6-9444-41fb-92ab-20eacaae2768_207ffef6-9444-41fb-92ab-20eacaae2768");
    assertRoundtrip("4:+112345556789_207ffef6-9444-41fb-92ab-20eacaae2768");
    assertRoundtrip("4:anonymous");
    assertRoundtrip("4:_anonymous");
    assertRoundtrip("28:45ab2481-1c1c-4005-be24-0ffb879b1130");
    assertRoundtrip("28:gcch-global:01234567-89ab-cdef-0123-456789abcdef");
    assertRoundtrip("28:dod-global:01234567-89ab-cdef-0123-456789abcdef");
    assertRoundtrip("28:orgid:01234567-89ab-cdef-0123-456789abcdef");
    assertRoundtrip("28:gcch:01234567-89ab-cdef-0123-456789abcdef");
    assertRoundtrip("28:dod:01234567-89ab-cdef-0123-456789abcdef");
    assertRoundtrip("28:gal-global:01234567-89ab-cdef-0123-456789abcdef");
    assertRoundtrip("48:45ab2481-1c1c-4005-be24-0ffb879b1130");
    assertRoundtrip(
      "8:gcch-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130_207ffef6-9444-41fb-92ab-20eacaae2768",
    );
    assertRoundtrip(
      "8:dod-acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130_207ffef6-9444-41fb-92ab-20eacaae2768",
    );
    assertRoundtrip(
      "8:acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130_207ffef6-9444-41fb-92ab-20eacaae2768",
    );
    assertRoundtrip("");
  });
});
