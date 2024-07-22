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
} from "../../src";
import { assert } from "chai";

describe("Identifier models", function () {
  it("type guards", function () {
    const communicationUser = { communicationUserId: "alice" };
    assert.isTrue(isCommunicationUserIdentifier(communicationUser));
    assert.isFalse(isPhoneNumberIdentifier(communicationUser));
    assert.isFalse(isMicrosoftTeamsUserIdentifier(communicationUser));
    assert.isFalse(isUnknownIdentifier(communicationUser));
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
    const assertRawId = (identifier: CommunicationIdentifier, expectedRawId: string) =>
      assert.strictEqual(getIdentifierRawId(identifier), expectedRawId);

    assertRawId(
      {
        communicationUserId:
          "8:acs:52a5e676-39a3-4f45-a8ed-5a162dbbd7eb_cdc5aeea-15c5-4db6-b079-fcadd2505dc2_cab309e5-a2e7-4ac8-b04e-5fadc3aa90fa",
      },
      "8:acs:52a5e676-39a3-4f45-a8ed-5a162dbbd7eb_cdc5aeea-15c5-4db6-b079-fcadd2505dc2_cab309e5-a2e7-4ac8-b04e-5fadc3aa90fa",
    );
    assertRawId(
      {
        communicationUserId:
          "8:acs:52a5e676-39a3-4f45-a8ed-5a162dbbd7eb_ext_cdc5aeea-15c5-4db6-b079-fcadd2505dc2_cab309e5-a2e7-4ac8-b04e-5fadc3aa90fa",
      },
      "8:acs:52a5e676-39a3-4f45-a8ed-5a162dbbd7eb_ext_cdc5aeea-15c5-4db6-b079-fcadd2505dc2_cab309e5-a2e7-4ac8-b04e-5fadc3aa90fa",
    );
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
    const assertIdentifier = (rawId: string, expectedIdentifier: CommunicationIdentifierKind) =>
      assert.deepStrictEqual(createIdentifierFromRawId(rawId), expectedIdentifier);

    assertIdentifier(
      "8:acs:52a5e676-39a3-4f45-a8ed-5a162dbbd7eb_cdc5aeea-15c5-4db6-b079-fcadd2505dc2_cab309e5-a2e7-4ac8-b04e-5fadc3aa90fa",
      {
        communicationUserId:
          "8:acs:52a5e676-39a3-4f45-a8ed-5a162dbbd7eb_cdc5aeea-15c5-4db6-b079-fcadd2505dc2_cab309e5-a2e7-4ac8-b04e-5fadc3aa90fa",
        kind: "communicationUser",
      },
    );
    assertIdentifier(
      "8:acs:52a5e676-39a3-4f45-a8ed-5a162dbbd7eb_ext_cdc5aeea-15c5-4db6-b079-fcadd2505dc2_cab309e5-a2e7-4ac8-b04e-5fadc3aa90fa",
      {
        communicationUserId:
          "8:acs:52a5e676-39a3-4f45-a8ed-5a162dbbd7eb_ext_cdc5aeea-15c5-4db6-b079-fcadd2505dc2_cab309e5-a2e7-4ac8-b04e-5fadc3aa90fa",
        kind: "communicationUser",
      },
    );
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
    });
    assertIdentifier("4:+112345556789", {
      phoneNumber: "+112345556789",
      kind: "phoneNumber",
    });
    assertIdentifier("4:207ffef6-9444-41fb-92ab-20eacaae2768", {
      phoneNumber: "207ffef6-9444-41fb-92ab-20eacaae2768",
      kind: "phoneNumber",
    });
    assertIdentifier(
      "4:207ffef6-9444-41fb-92ab-20eacaae2768_207ffef6-9444-41fb-92ab-20eacaae2768",
      {
        phoneNumber: "207ffef6-9444-41fb-92ab-20eacaae2768_207ffef6-9444-41fb-92ab-20eacaae2768",
        kind: "phoneNumber",
      },
    );
    assertIdentifier("4:+112345556789_207ffef6-9444-41fb-92ab-20eacaae2768", {
      phoneNumber: "+112345556789_207ffef6-9444-41fb-92ab-20eacaae2768",
      kind: "phoneNumber",
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
    const assertRoundtrip = (rawId: string) =>
      assert.strictEqual(getIdentifierRawId(createIdentifierFromRawId(rawId)), rawId);

    assertRoundtrip(
      "8:acs:52a5e676-39a3-4f45-a8ed-5a162dbbd7eb_cdc5aeea-15c5-4db6-b079-fcadd2505dc2_cab309e5-a2e7-4ac8-b04e-5fadc3aa90fa",
    );
    assertRoundtrip(
      "8:acs:52a5e676-39a3-4f45-a8ed-5a162dbbd7eb_ext_cdc5aeea-15c5-4db6-b079-fcadd2505dc2_cab309e5-a2e7-4ac8-b04e-5fadc3aa90fa",
    );
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
    assertRoundtrip("28:45ab2481-1c1c-4005-be24-0ffb879b1130");
    assertRoundtrip("28:gcch-global:01234567-89ab-cdef-0123-456789abcdef");
    assertRoundtrip("28:dod-global:01234567-89ab-cdef-0123-456789abcdef");
    assertRoundtrip("28:orgid:01234567-89ab-cdef-0123-456789abcdef");
    assertRoundtrip("28:gcch:01234567-89ab-cdef-0123-456789abcdef");
    assertRoundtrip("28:dod:01234567-89ab-cdef-0123-456789abcdef");
    assertRoundtrip("28:gal-global:01234567-89ab-cdef-0123-456789abcdef");
    assertRoundtrip("48:45ab2481-1c1c-4005-be24-0ffb879b1130");
    assertRoundtrip("");
  });
});
