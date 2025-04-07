// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { PhoneNumberCapabilitiesRequest, PhoneNumbersClient } from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { isClientErrorStatusCode } from "./utils/statusCodeHelpers.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getAzurePhoneNumber } from "../utils/injectables.js";

describe.each([true, false])(`PhoneNumbersClient - lro - update (AAD = %s)`, (useAad) => {
  const purchasedPhoneNumber = getAzurePhoneNumber();
  const update: PhoneNumberCapabilitiesRequest = { calling: "none", sms: "outbound" };
  let recorder: Recorder;
  let client: PhoneNumbersClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = useAad
      ? await createRecordedClientWithToken(ctx)!
      : await createRecordedClient(ctx));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can update a phone number's capabilities", { timeout: 120000 }, async () => {
    const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
      purchasedPhoneNumber,
      update,
    );

    const phoneNumber = await updatePoller.pollUntilDone();
    await updatePoller.pollUntilDone();
    assert.ok(updatePoller.getOperationState().isCompleted);
    assert.deepEqual(phoneNumber.capabilities, update);
  });

  it("update throws when phone number is unauthorized", async () => {
    const fakeNumber = "+14155550100";
    try {
      const searchPoller = await client.beginUpdatePhoneNumberCapabilities(fakeNumber, update);
      await searchPoller.pollUntilDone();
    } catch (error: any) {
      assert.isTrue(
        isClientErrorStatusCode(error.statusCode),
        `Status code ${error.statusCode} does not indicate client error.`,
      );
      return;
    }

    assert.fail("beginUpdatePhoneNumberCapabilities should have thrown an exception.");
  });

  it("update throws when phone number is invalid", async () => {
    const fakeNumber = "invalid_phone_number";
    try {
      const searchPoller = await client.beginUpdatePhoneNumberCapabilities(fakeNumber, update);
      await searchPoller.pollUntilDone();
    } catch (error: any) {
      assert.isTrue(
        isClientErrorStatusCode(error.statusCode),
        `Status code ${error.statusCode} does not indicate client error.`,
      );
      return;
    }

    assert.fail("beginUpdatePhoneNumberCapabilities should have thrown an exception.");
  });

  it("update throws when phone number is empty", async () => {
    const fakeNumber = "";
    try {
      const searchPoller = await client.beginUpdatePhoneNumberCapabilities(fakeNumber, update);
      await searchPoller.pollUntilDone();
    } catch (error: any) {
      assert.equal(error.message, "phone number can't be empty");
      return;
    }

    assert.fail("beginUpdatePhoneNumberCapabilities should have thrown an exception.");
  });
});
