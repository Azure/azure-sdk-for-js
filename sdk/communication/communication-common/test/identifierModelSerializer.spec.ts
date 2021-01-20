// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  _serializeCommunicationIdentifier,
  _deserializeCommunicationIdentifier,
  CommunicationIdentifier,
  _SerializedCommunicationIdentifier,
  CommunicationIdentifierKind
} from "../src";

const assertSerialize = (
  identifier: CommunicationIdentifier,
  expected: _SerializedCommunicationIdentifier
): void => {
  assert.deepEqual(_serializeCommunicationIdentifier(identifier), expected);
};

const assertDeserialize = (
  serializedIdentifier: _SerializedCommunicationIdentifier,
  expected: CommunicationIdentifierKind
): void => {
  assert.deepEqual(_deserializeCommunicationIdentifier(serializedIdentifier), expected);
};

const assertThrowsMissingProperty = <P extends keyof _SerializedCommunicationIdentifier>(
  serializedIdentifier: _SerializedCommunicationIdentifier,
  missingPropertyName: P
) => {
  assert.throws(() => {
    _deserializeCommunicationIdentifier(serializedIdentifier);
  }, `Property ${missingPropertyName} is required for identifier of kind ${serializedIdentifier.kind}.`);
};

describe("Identifier model serializer", () => {
  it("can serialize", () => {
    assertSerialize(
      {
        communicationUserId:
          "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14"
      },
      {
        kind: "communicationUser",
        id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14"
      }
    );
    assertSerialize(
      { callingApplicationId: "28:37691ec4-57fb-4c0f-ae31-32791610cb14" },
      { kind: "callingApplication", id: "28:37691ec4-57fb-4c0f-ae31-32791610cb14" }
    );
    assertSerialize(
      { phoneNumber: "+1234555000" },
      { kind: "phoneNumber", phoneNumber: "+1234555000" }
    );
    assertSerialize(
      { microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14", isAnonymous: false },
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: false,
        cloud: "public"
      }
    );
    assertSerialize(
      { microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14", isAnonymous: true },
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: true,
        cloud: "public"
      }
    );
    assertSerialize(
      {
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: true,
        cloud: "dod"
      },
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: true,
        cloud: "dod"
      }
    );
    assertSerialize(
      { id: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" },
      { kind: "unknown", id: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" }
    );
  });

  it("serializes as unknown identifier if kind not understood", () => {
    assertSerialize({ kind: "foobar", id: "42", someOtherProp: true } as any, {
      kind: "unknown",
      id: "42"
    });
  });

  it("can deserialize", () => {
    assertDeserialize(
      {
        kind: "communicationUser",
        id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14"
      },
      {
        kind: "communicationUser",
        communicationUserId:
          "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14",
        id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14"
      }
    );
    assertDeserialize(
      { kind: "callingApplication", id: "28:37691ec4-57fb-4c0f-ae31-32791610cb14" },
      {
        kind: "callingApplication",
        callingApplicationId: "28:37691ec4-57fb-4c0f-ae31-32791610cb14",
        id: "28:37691ec4-57fb-4c0f-ae31-32791610cb14"
      }
    );
    assertDeserialize(
      { kind: "phoneNumber", phoneNumber: "+1234555000", id: "4:+1234555000" },
      { kind: "phoneNumber", phoneNumber: "+1234555000", id: "4:+1234555000" }
    );
    assertDeserialize(
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: false,
        cloud: "public",
        id: "8:orgid:37691ec4-57fb-4c0f-ae31-32791610cb14"
      },
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: false,
        cloud: "public",
        id: "8:orgid:37691ec4-57fb-4c0f-ae31-32791610cb14"
      }
    );
    assertDeserialize(
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: true,
        cloud: "public",
        id: "8:teamsvisitor:37691ec4-57fb-4c0f-ae31-32791610cb14"
      },
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: true,
        cloud: "public",
        id: "8:teamsvisitor:37691ec4-57fb-4c0f-ae31-32791610cb14"
      }
    );
    assertDeserialize(
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: false,
        cloud: "gcch",
        id: "8:gcch:37691ec4-57fb-4c0f-ae31-32791610cb14"
      },
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: false,
        cloud: "gcch",
        id: "8:gcch:37691ec4-57fb-4c0f-ae31-32791610cb14"
      }
    );
    assertDeserialize(
      { kind: "unknown", id: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" },
      { kind: "unknown", id: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" }
    );
  });

  it("deserializes as unknown identifier if kind not understood", () => {
    assertDeserialize({ kind: "foobar", id: "42", someOtherProp: true } as any, {
      kind: "unknown",
      id: "42"
    });
  });

  it("throws if kind not understood and id property is missing", () => {
    assertThrowsMissingProperty(
      {
        kind: "foobar",
        someOtherProp: true
      } as any,
      "id"
    );
  });

  it("throws if property is missing", () => {
    assertThrowsMissingProperty(
      {
        kind: "communicationUser"
      },
      "id"
    );
    assertThrowsMissingProperty(
      {
        kind: "callingApplication"
      },
      "id"
    );
    assertThrowsMissingProperty(
      {
        kind: "phoneNumber"
      },
      "phoneNumber"
    );
    assertThrowsMissingProperty(
      {
        kind: "microsoftTeamsUser",
        isAnonymous: false
      },
      "microsoftTeamsUserId"
    );
    assertThrowsMissingProperty(
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14"
      },
      "isAnonymous"
    );
    assertThrowsMissingProperty(
      {
        kind: "unknown"
      },
      "id"
    );
  });

  it("ignores additional properties", () => {
    assert.doesNotThrow(() => {
      _deserializeCommunicationIdentifier({
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: true,
        cloud: "public",
        id: "8:teamsvisitor:37691ec4-57fb-4c0f-ae31-32791610cb14"
      });
    });
  });
});
