// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationIdentifier,
  CommunicationIdentifierKind,
  SerializedCommunicationIdentifier,
  deserializeCommunicationIdentifier,
  serializeCommunicationIdentifier,
} from "../src";
import { assert } from "chai";

const assertSerialize = (
  identifier: CommunicationIdentifier,
  expected: SerializedCommunicationIdentifier
): void => {
  assert.deepEqual(serializeCommunicationIdentifier(identifier), expected);
};

const assertDeserialize = (
  serializedIdentifier: SerializedCommunicationIdentifier,
  expected: CommunicationIdentifierKind
): void => {
  assert.deepEqual(deserializeCommunicationIdentifier(serializedIdentifier), expected);
};

const assertThrowsMissingProperty = <
  P extends keyof SerializedCommunicationIdentifier,
  Q extends keyof Required<SerializedCommunicationIdentifier>[P]
>(
  serializedIdentifier: SerializedCommunicationIdentifier,
  identifierType: P,
  missingPropertyName: Q
): void => {
  assert.throws(() => {
    deserializeCommunicationIdentifier(serializedIdentifier);
  }, `Property ${missingPropertyName} is required for identifier of type ${identifierType}.`);
};

const assertThrowsTooManyProperties = (
  serializedIdentifier: SerializedCommunicationIdentifier
): void => {
  const { rawId: _rawId, ...props } = serializedIdentifier;
  assert.throws(() => {
    deserializeCommunicationIdentifier(serializedIdentifier);
  }, `Only one of the properties in ${JSON.stringify(Object.keys(props))} should be present.`);
};

describe("Identifier model serializer", () => {
  it("can serialize", () => {
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
      }
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
      }
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
      }
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
      }
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
      }
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
      }
    );
    assertSerialize(
      { phoneNumber: "+12345556789" },
      {
        rawId: "4:12345556789",
        phoneNumber: {
          value: "+12345556789",
        },
      }
    );
    assertSerialize(
      { phoneNumber: "+12345556789", rawId: "override" },
      {
        rawId: "override",
        phoneNumber: {
          value: "+12345556789",
        },
      }
    );
    assertSerialize(
      { id: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" },
      { rawId: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" }
    );
  });

  it("serializes as unknown identifier if kind not understood", () => {
    assertSerialize({ kind: "foobar", id: "42", someOtherProp: true } as any, {
      rawId: "42",
    });
  });

  it("can deserialize", () => {
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
      }
    );
    assertDeserialize(
      { phoneNumber: { value: "+1234555000" }, rawId: "4:+1234555000" },
      { kind: "phoneNumber", phoneNumber: "+1234555000", rawId: "4:+1234555000" }
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
      }
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
      }
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
      }
    );
    assertDeserialize(
      { rawId: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" },
      { kind: "unknown", id: "48:37691ec4-57fb-4c0f-ae31-32791610cb14" }
    );
  });

  it("deserializes as unknown identifier if kind not understood", () => {
    assertDeserialize({ rawId: "42", someOtherProp: true } as any, {
      kind: "unknown",
      id: "42",
    });
  });

  it("throws if property is missing", () => {
    assertThrowsMissingProperty(
      {
        communicationUser: {} as any,
      },
      "communicationUser",
      "id"
    );
    assertThrowsMissingProperty(
      {
        phoneNumber: {} as any,
      },
      "phoneNumber",
      "value"
    );
    assertThrowsMissingProperty(
      {
        microsoftTeamsUser: {
          isAnonymous: false,
        } as any,
      },
      "microsoftTeamsUser",
      "userId"
    );
    assertThrowsMissingProperty(
      {
        microsoftTeamsUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          cloud: "public",
        } as any,
      },
      "microsoftTeamsUser",
      "isAnonymous"
    );
    assertThrowsMissingProperty(
      {
        microsoftTeamsUser: {
          userId: "37691ec4-57fb-4c0f-ae31-32791610cb14",
          isAnonymous: false,
        } as any,
      },
      "microsoftTeamsUser",
      "cloud"
    );

    assert.throws(() => {
      deserializeCommunicationIdentifier({ someProp: true } as any);
    }, `Property rawId is required for identifier of type unknown.`);
  });

  it("ignores additional properties", () => {
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

  it("throws if more than one nested model", () => {
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
  });
});
