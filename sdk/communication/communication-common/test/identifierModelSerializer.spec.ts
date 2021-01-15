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
        isAnonymous: false
      }
    );
    assertSerialize(
      { microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14", isAnonymous: true },
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: true
      }
    );
    assertSerialize(
      { id: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" },
      { kind: "unknown", id: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" }
    );
  });

  it("can deserialize", () => {
    assertDeserialize(
      {
        kind: "communicationUser",
        id: "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14"
      },
      {
        kind: "CommunicationUser",
        communicationUserId:
          "8:acs:37691ec4-57fb-4c0f-ae31-32791610cb14_37691ec4-57fb-4c0f-ae31-32791610cb14"
      }
    );
    assertDeserialize(
      { kind: "callingApplication", id: "28:37691ec4-57fb-4c0f-ae31-32791610cb14" },
      {
        kind: "CallingApplication",
        callingApplicationId: "28:37691ec4-57fb-4c0f-ae31-32791610cb14"
      }
    );
    assertDeserialize(
      { kind: "phoneNumber", phoneNumber: "+1234555000" },
      { kind: "PhoneNumber", phoneNumber: "+1234555000" }
    );
    assertDeserialize(
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: false
      },
      {
        kind: "MicrosoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: false
      }
    );
    assertDeserialize(
      {
        kind: "microsoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: true
      },
      {
        kind: "MicrosoftTeamsUser",
        microsoftTeamsUserId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
        isAnonymous: true
      }
    );
    assertDeserialize(
      { kind: "unknown", id: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" },
      { kind: "Unknown", id: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" }
    );
  });

  it("throws if kind not understood", () => {
    assert.throws(() => {
      _deserializeCommunicationIdentifier({
        kind: "foobar",
        id: "42"
      } as any);
    }, `Unsupported identifier kind foobar.`);
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
        id: "8:teamsvisitor:37691ec4-57fb-4c0f-ae31-32791610cb14"
      });
    });
  });
});
