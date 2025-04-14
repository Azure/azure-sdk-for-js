// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CallConnectionProperties } from "../../src/models/models.js";
import type { AnswerCallResult, CreateCallResult } from "../../src/models/responses.js";
import {
  CALL_CALLBACK_URL,
  CALL_INCOMING_CALL_CONTEXT,
  CALL_TARGET_ID,
  CALL_TARGET_ID_2,
} from "../utils/connectionUtils.js";
import type {
  CommunicationIdentifier,
  MicrosoftTeamsAppIdentifier,
} from "@azure/communication-common";
import type { CallInvite, CallConnection, AnswerCallOptions } from "../../src/index.js";
import type {
  AnswerCallEventResult,
  CreateCallEventResult,
} from "../../src/eventprocessor/eventResponses.js";
import { randomUUID } from "@azure/core-util";
import { KnownCommunicationCloudEnvironmentModel } from "../../src/generated/src/index.js";
import type { MockedObject } from "vitest";
import { describe, it, assert, expect, vi, beforeEach } from "vitest";

vi.mock("../src/index.js", async (importActual) => {
  const CallAutomationClient = vi.fn();
  CallAutomationClient.prototype.createCall = vi.fn();
  CallAutomationClient.prototype.createGroupCall = vi.fn();
  CallAutomationClient.prototype.answerCall = vi.fn();
  CallAutomationClient.prototype.redirectCall = vi.fn();
  CallAutomationClient.prototype.rejectCall = vi.fn();

  return {
    ...(await importActual()),
    CallAutomationClient,
  };
});

import { CallAutomationClient } from "../../src/index.js";

describe("Call Automation Client Unit Tests", () => {
  let targets: CommunicationIdentifier[];
  let target: CallInvite;
  let client: MockedObject<CallAutomationClient>;

  beforeEach(() => {
    // set up
    targets = [
      {
        communicationUserId: CALL_TARGET_ID,
      },
      {
        communicationUserId: CALL_TARGET_ID_2,
      },
    ];
    target = {
      targetParticipant: { communicationUserId: CALL_TARGET_ID },
    };
    // stub CallAutomationClient
    client = vi.mocked(
      new CallAutomationClient(
        "endpoint=https://redacted.communication.azure.com/;accesskey=redacted",
      ),
    );
  });

  it("RepeatabilityHeadersGeneration", async () => {
    // mocks
    const repeatabilityFirstSent: string = new Date().toUTCString();
    const repeatabilityRequestID: string = randomUUID();

    // asserts
    assert.isNotNull(repeatabilityFirstSent);
    assert.isNotNull(repeatabilityRequestID);
    assert.typeOf(repeatabilityFirstSent, "string");
    assert.typeOf(repeatabilityRequestID, "string");
  });

  it("CreateCall", async () => {
    // mocks
    const createCallResultMock: CreateCallResult = {
      callConnectionProperties: {} as CallConnectionProperties,
      callConnection: {} as CallConnection,
      waitForEventProcessor: async () => {
        return {} as CreateCallEventResult;
      },
    };
    vi.spyOn(client, "createCall").mockResolvedValue(createCallResultMock);

    const promiseResult = client.createCall(target, CALL_CALLBACK_URL);

    // asserts
    const result = await promiseResult;
    assert.isNotNull(result);
    expect(client.createCall).toHaveBeenCalledWith(target, CALL_CALLBACK_URL);
    assert.equal(result, createCallResultMock);
  });

  it("CreateGroupCall", async () => {
    // mocks
    const createGroupCallResultMock: CreateCallResult = {
      callConnectionProperties: {} as CallConnectionProperties,
      callConnection: {} as CallConnection,
      waitForEventProcessor: async () => {
        return {} as CreateCallEventResult;
      },
    };

    vi.spyOn(client, "createGroupCall").mockResolvedValue(createGroupCallResultMock);

    const promiseResult = client.createGroupCall(targets, CALL_CALLBACK_URL);

    // asserts
    const result = await promiseResult;
    assert.isNotNull(result);
    expect(client.createGroupCall).toHaveBeenCalledWith(targets, CALL_CALLBACK_URL);
    assert.equal(result, createGroupCallResultMock);
  });

  it("CreateOPSCall", async () => {
    // defined dummy variables
    const appId = "28:acs:redacted";
    const appCloud = KnownCommunicationCloudEnvironmentModel.Public;

    // mocks
    const createCallResultMock: CreateCallResult = {
      callConnectionProperties: {
        source: {
          rawId: appId,
          teamsAppId: appId,
          cloud: appCloud,
        } as MicrosoftTeamsAppIdentifier,
      } as CallConnectionProperties,
      callConnection: {} as CallConnection,
      waitForEventProcessor: async () => {
        return {} as CreateCallEventResult;
      },
    };

    vi.spyOn(client, "createCall").mockResolvedValue(createCallResultMock);
    const promiseResult = client.createCall(target, CALL_CALLBACK_URL, {
      teamsAppSource: {
        rawId: appId,
        teamsAppId: appId,
        cloud: appCloud,
      } as MicrosoftTeamsAppIdentifier,
    });

    // asserts
    promiseResult
      .then((result: CreateCallResult) => {
        assert.isNotNull(result);
        expect(client.createCall).toHaveBeenCalledWith(target, CALL_CALLBACK_URL, {
          teamsAppSource: {
            rawId: appId,
            teamsAppId: appId,
            cloud: appCloud,
          } as MicrosoftTeamsAppIdentifier,
        });
        assert.equal(result, createCallResultMock);
        return;
      })
      .catch((error) => console.error(error));
  });

  it("AnswerCall", async () => {
    // mocks
    const answerCallResultMock: AnswerCallResult = {
      callConnectionProperties: {} as CallConnectionProperties,
      callConnection: {} as CallConnection,
      waitForEventProcessor: async () => {
        return {} as AnswerCallEventResult;
      },
    };
    vi.spyOn(client, "answerCall").mockResolvedValue(answerCallResultMock);

    const promiseResult = client.answerCall(CALL_INCOMING_CALL_CONTEXT, CALL_CALLBACK_URL);

    // asserts
    const result = await promiseResult;

    assert.isNotNull(result);
    expect(client.answerCall).toHaveBeenCalledWith(CALL_INCOMING_CALL_CONTEXT, CALL_CALLBACK_URL);
    assert.equal(result, answerCallResultMock);
  });

  it("AnswerCall with custom context", async () => {
    // mocks
    const answerCallResultMock: AnswerCallResult = {
      callConnectionProperties: {} as CallConnectionProperties,
      callConnection: {} as CallConnection,
      waitForEventProcessor: async () => {
        return {} as AnswerCallEventResult;
      },
    };
    vi.spyOn(client, "answerCall").mockResolvedValue(answerCallResultMock);
    const answerCallOptions: AnswerCallOptions = {
      operationContext: "operationContextAnswerCall",
      customCallingContext: [{ kind: "voip", key: "foo", value: "bar" }],
    };
    const promiseResult = client.answerCall(
      CALL_INCOMING_CALL_CONTEXT,
      CALL_CALLBACK_URL,
      answerCallOptions,
    );

    // asserts
    const result = await promiseResult;

    assert.isNotNull(result);
    expect(client.answerCall).toHaveBeenCalledWith(
      CALL_INCOMING_CALL_CONTEXT,
      CALL_CALLBACK_URL,
      answerCallOptions,
    );
    assert.equal(result, answerCallResultMock);
  });

  it("RedirectCall", async () => {
    // mocks
    vi.spyOn(client, "redirectCall").mockReturnValue(
      new Promise((resolve) => {
        resolve(undefined);
      }),
    );

    const promiseResult = client.redirectCall(CALL_INCOMING_CALL_CONTEXT, target);

    // asserts
    await promiseResult;
    expect(client.redirectCall).toHaveBeenCalledWith(CALL_INCOMING_CALL_CONTEXT, target);
  });

  it("RejectCall", async () => {
    // mocks
    vi.spyOn(client, "rejectCall").mockReturnValue(
      new Promise((resolve) => {
        resolve(undefined);
      }),
    );

    const promiseResult = client.rejectCall(CALL_INCOMING_CALL_CONTEXT);

    // asserts
    await promiseResult;
    expect(client.rejectCall).toHaveBeenCalledWith(CALL_INCOMING_CALL_CONTEXT);
  });
});
