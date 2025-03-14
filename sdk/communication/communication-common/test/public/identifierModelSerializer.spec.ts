// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CommunicationIdentifier,
  CommunicationIdentifierKind,
  SerializedCommunicationIdentifier,
} from "../../src/index.js";
import {
  deserializeCommunicationIdentifier,
  serializeCommunicationIdentifier,
} from "../../src/index.js";
import { describe, it, assert } from "vitest";

const assertSerialize = (
  identifier: CommunicationIdentifier,
  expected: SerializedCommunicationIdentifier,
): void => {
  assert.deepEqual(serializeCommunicationIdentifier(identifier), expected);
};

const assertDeserialize = (
  serializedIdentifier: SerializedCommunicationIdentifier,
  expected: CommunicationIdentifierKind,
): void => {
  assert.deepEqual(deserializeCommunicationIdentifier(serializedIdentifier), expected);
};

const assertThrowsMissingProperty = <
  P extends keyof SerializedCommunicationIdentifier,
  Q extends string & keyof Required<SerializedCommunicationIdentifier>[P],
>(
  serializedIdentifier: SerializedCommunicationIdentifier,
  identifierType: P,
  missingPropertyName: Q,
): void => {
  assert.throws(() => {
    deserializeCommunicationIdentifier(serializedIdentifier);
  }, `Property ${missingPropertyName} is required for identifier of type ${identifierType}.`);
};

const assertThrowsTooManyProperties = (
  serializedIdentifier: SerializedCommunicationIdentifier,
): void => {
  assert.throws(() => {
    deserializeCommunicationIdentifier(serializedIdentifier);
  }, /^Only one of the properties in \[[\w,"\s]+\] should be present.$/);
};

describe("Identifier model serializer", function () {
  const resourceId = "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd";
  const tenantId = "45ab2481-1c1c-4005-be24-0ffb879b1130";
  const userId = "207ffef6-9444-41fb-92ab-20eacaae2768";
  it("can serialize", function () {
    assertSerialize(
      {
        communicationUserId:
          "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
      {
        rawId: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
        communicationUser: {
          id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
        },
      },
    );
    assertSerialize(
      { microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14" },
      {
        rawId: "8:orgid:37691ec4-57fb-4c0f-ae31-32791610cb14",
        microsoftTeamsUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          isAnonymous: false,
          cloud: "public",
        },
      },
    );
    assertSerialize(
      { microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14", isAnonymous: false },
      {
        rawId: "8:orgid:37691ec4-57fb-4c0f-ae31-32791610cb14",
        microsoftTeamsUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          isAnonymous: false,
          cloud: "public",
        },
      },
    );
    assertSerialize(
      { microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14", isAnonymous: true },
      {
        rawId: "8:teamsvisitor:37691ec4-57fb-4c0f-ae31-32791610cb14",
        microsoftTeamsUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          isAnonymous: true,
          cloud: "public",
        },
      },
    );
    assertSerialize(
      { microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14", rawId: "override" },
      {
        rawId: "override",
        microsoftTeamsUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          isAnonymous: false,
          cloud: "public",
        },
      },
    );
    assertSerialize(
      {
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        cloud: "dod",
      },
      {
        rawId: "8:dod:37691ec4-57fb-4c0f-ae31-32791610cb14",
        microsoftTeamsUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          isAnonymous: false,
          cloud: "dod",
        },
      },
    );
    assertSerialize(
      { phoneNumber: "+12345556789" },
      {
        rawId: "4:+12345556789",
        phoneNumber: {
          value: "+12345556789",
          isAnonymous: false,
          assertedId: undefined,
        },
      },
    );
    assertSerialize(
      { phoneNumber: "+12345556789", rawId: "override" },
      {
        rawId: "override",
        phoneNumber: {
          value: "+12345556789",
          isAnonymous: false,
          assertedId: undefined,
        },
      },
    );
    assertSerialize(
      { phoneNumber: "anonymous", isAnonymous: true },
      {
        rawId: "4:anonymous",
        phoneNumber: {
          value: "anonymous",
          isAnonymous: true,
          assertedId: undefined,
        },
      },
    );
    assertSerialize(
      { phoneNumber: "+12345556789_123", assertedId: "123" },
      {
        rawId: "4:+12345556789_123",
        phoneNumber: {
          value: "+12345556789_123",
          isAnonymous: false,
          assertedId: "123",
        },
      },
    );
    assertSerialize(
      {
        userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
        tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
      },
      {
        rawId: `8:acs:${resourceId}_${tenantId}_${userId}`,
        teamsExtensionUser: {
          userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
          tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
          resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
          cloud: "public",
        },
      },
    );
    assertSerialize(
      {
        userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
        tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
        cloud: "dod",
      },
      {
        rawId: `8:dod-acs:${resourceId}_${tenantId}_${userId}`,
        teamsExtensionUser: {
          userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
          tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
          resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
          cloud: "dod",
        },
      },
    );
    assertSerialize(
      { id: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" },
      { rawId: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" },
    );
  });

  it("serializes as unknown identifier if kind not understood", function () {
    assertSerialize({ kind: "foobar", id: "42", someOtherProp: true } as any, {
      rawId: "42",
    });
  });

  it("can deserialize", function () {
    assertDeserialize(
      {
        communicationUser: {
          id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
        },
      },
      {
        kind: "communicationUser",
        communicationUserId:
          "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
    );
    assertDeserialize(
      {
        kind: "communicationUser",
        communicationUser: {
          id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
        },
      } as any,
      {
        kind: "communicationUser",
        communicationUserId:
          "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
    );
    assertDeserialize(
      {
        kind: "communicationUser",
        communicationUser: {
          id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
        },
      },
      {
        kind: "communicationUser",
        communicationUserId:
          "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
    );
    assertDeserialize(
      {
        kind: "communicationUser",
        rawId: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
      {
        kind: "unknown",
        id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
    );
    assertDeserialize(
      {
        kind: "communicationUser",
        communicationUser: {
          id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
        },
      } as any,
      {
        kind: "communicationUser",
        communicationUserId:
          "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
    );
    assertDeserialize(
      {
        someFutureProperty: "fooBar",
        communicationUser: {
          id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
        },
      } as any,
      {
        kind: "communicationUser",
        communicationUserId:
          "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
    );
    assertDeserialize(
      {
        phoneNumber: {
          value: "+1234555000",
        },
        rawId: "4:+1234555000",
      },
      {
        kind: "phoneNumber",
        phoneNumber: "+1234555000",
        rawId: "4:+1234555000",
        isAnonymous: false,
        assertedId: undefined,
      },
    );
    assertDeserialize(
      {
        kind: "phoneNumber",
        phoneNumber: {
          value: "+1234555000",
        },
        rawId: "4:+1234555000",
      },
      {
        kind: "phoneNumber",
        phoneNumber: "+1234555000",
        rawId: "4:+1234555000",
        isAnonymous: false,
        assertedId: undefined,
      },
    );
    assertDeserialize(
      {
        phoneNumber: {
          value: "anonymous",
          isAnonymous: true,
        },
        rawId: "4:anonymous",
      },
      {
        kind: "phoneNumber",
        phoneNumber: "anonymous",
        rawId: "4:anonymous",
        isAnonymous: true,
        assertedId: undefined,
      },
    );
    assertDeserialize(
      {
        phoneNumber: {
          value: "+1234555000_123",
          isAnonymous: false,
          assertedId: "123",
        },
        rawId: "4:+1234555000",
      },
      {
        kind: "phoneNumber",
        phoneNumber: "+1234555000_123",
        rawId: "4:+1234555000",
        isAnonymous: false,
        assertedId: "123",
      },
    );
    assertDeserialize(
      {
        phoneNumber: {
          value: "+1234555000_123",
          assertedId: "123",
        },
        rawId: "4:+1234555000",
      },
      {
        kind: "phoneNumber",
        phoneNumber: "+1234555000_123",
        rawId: "4:+1234555000",
        isAnonymous: false,
        assertedId: "123",
      },
    );
    assertDeserialize(
      { kind: "phoneNumber", rawId: "4:+1234555000" },
      { kind: "unknown", id: "4:+1234555000" },
    );
    assertDeserialize(
      {
        microsoftTeamsUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          isAnonymous: false,
          cloud: "public",
        },
        rawId: "8:orgid:37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: false,
        cloud: "public",
        rawId: "8:orgid:37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
    );
    assertDeserialize(
      {
        microsoftTeamsUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          isAnonymous: true,
          cloud: "public",
        },
        rawId: "8:teamsvisitor:37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: true,
        cloud: "public",
        rawId: "8:teamsvisitor:37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
    );
    assertDeserialize(
      {
        microsoftTeamsUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          isAnonymous: false,
          cloud: "gcch",
        },
        rawId: "8:gcch:37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: false,
        cloud: "gcch",
        rawId: "8:gcch:37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
    );
    assertDeserialize(
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          isAnonymous: false,
          cloud: "public",
        },
        rawId: "8:orgid:37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: false,
        cloud: "public",
        rawId: "8:orgid:37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
    );
    assertDeserialize(
      {
        kind: "microsoftTeamsUser",
        rawId: "8:orgid:37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
      {
        kind: "unknown",
        id: "8:orgid:37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
    );
    assertDeserialize(
      {
        kind: "teamsExtensionUser",
        rawId: `8:dod-acs:${resourceId}_${tenantId}_${userId}`,
        teamsExtensionUser: {
          userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
          tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
          resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
          cloud: "dod",
        },
      },
      {
        kind: "teamsExtensionUser",
        userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
        tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
        cloud: "dod",
        rawId: `8:dod-acs:${resourceId}_${tenantId}_${userId}`,
      },
    );
    assertDeserialize(
      {
        kind: "teamsExtensionUser",
        rawId: `8:acs:${resourceId}_${tenantId}_${userId}`,
        teamsExtensionUser: {
          userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
          tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
          resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
          cloud: "public",
        },
      },
      {
        kind: "teamsExtensionUser",
        userId: "207ffef6-9444-41fb-92ab-20eacaae2768",
        tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
        rawId: `8:acs:${resourceId}_${tenantId}_${userId}`,
        cloud: "public",
      },
    );
    assertDeserialize(
      {
        rawId: `8:acs:${resourceId}_${tenantId}_${userId}`,
        kind: "teamsExtensionUser",
      },
      {
        kind: "unknown",
        id: "8:acs:bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd_45ab2481-1c1c-4005-be24-0ffb879b1130_207ffef6-9444-41fb-92ab-20eacaae2768",
      },
    );
    assertDeserialize(
      { rawId: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" },
      { kind: "unknown", id: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" },
    );
    assertDeserialize(
      { kind: "unknown", rawId: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" },
      { kind: "unknown", id: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" },
    );
  });

  it("deserializes as unknown identifier if kind not understood", function () {
    assertDeserialize({ rawId: "42", someOtherProp: true } as any, {
      kind: "unknown",
      id: "42",
    });
  });

  it("throws if property is missing", function () {
    assertThrowsMissingProperty(
      {
        communicationUser: {} as any,
      },
      "communicationUser",
      "id",
    );
    assertThrowsMissingProperty(
      {
        phoneNumber: {} as any,
      },
      "phoneNumber",
      "value",
    );
    assertThrowsMissingProperty(
      {
        microsoftTeamsUser: {
          isAnonymous: false,
        } as any,
      },
      "microsoftTeamsUser",
      "userId",
    );
    assertThrowsMissingProperty(
      {
        microsoftTeamsUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          cloud: "public",
        } as any,
      },
      "microsoftTeamsUser",
      "isAnonymous",
    );
    assertThrowsMissingProperty(
      {
        microsoftTeamsUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          isAnonymous: false,
        } as any,
      },
      "microsoftTeamsUser",
      "cloud",
    );
    assertThrowsMissingProperty(
      {
        teamsExtensionUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        } as any,
      },
      "teamsExtensionUser",
      "tenantId",
    );
    assertThrowsMissingProperty(
      {
        teamsExtensionUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        } as any,
      },
      "teamsExtensionUser",
      "resourceId",
    );
    assertThrowsMissingProperty(
      {
        teamsExtensionUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
          resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
        } as any,
      },
      "teamsExtensionUser",
      "cloud",
    );
    assert.throws(() => {
      deserializeCommunicationIdentifier({ someProp: true } as any);
    }, `Property rawId is required for identifier of type unknown.`);
  });

  it("ignores additional properties", function () {
    assert.doesNotThrow(() => {
      deserializeCommunicationIdentifier({
        microsoftTeamsUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          isAnonymous: true,
          cloud: "public",
          someOtherProp: true,
        } as any,
        rawId: "8:teamsvisitor:37691ec4-57fb-4c0f-ae31-32791610cb14",
      });
    });
  });

  it("throws if more than one nested model", function () {
    assertThrowsTooManyProperties({
      rawId: "rawId",
      microsoftTeamsUser: {
        userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: false,
        cloud: "public",
      },
      communicationUser: {
        id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
    });
    assertThrowsTooManyProperties({
      rawId: "rawId",
      communicationUser: {
        id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
      phoneNumber: {
        value: "phoneNumber",
      },
    });
    assertThrowsTooManyProperties({
      rawId: "rawId",
      microsoftTeamsUser: {
        userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: false,
        cloud: "public",
      },
      phoneNumber: {
        value: "phoneNumber",
      },
    });
    assertThrowsTooManyProperties({
      rawId: "rawId",
      microsoftTeamsUser: {
        userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: false,
        cloud: "public",
      },
      communicationUser: {
        id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
      phoneNumber: {
        value: "phoneNumber",
      },
    });
    assertThrowsTooManyProperties({
      rawId: "rawId",
      teamsExtensionUser: {
        userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        tenantId: "45ab2481-1c1c-4005-be24-0ffb879b1130",
        resourceId: "bbbcbc1e-9f06-482a-b5d8-20e3f26ef0cd",
        cloud: "public",
      },
      communicationUser: {
        id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14",
      },
    });
  });
});
