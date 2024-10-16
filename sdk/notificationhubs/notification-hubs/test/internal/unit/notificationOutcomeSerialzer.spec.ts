// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { parseNotificationOutcome } from "../../../src/serializers/notificationOutcomeSerializer.js";

const FEEDBACK = `<NotificationOutcome xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
  <Success>1</Success>
  <Failure>1</Failure>
  <Results>
    <RegistrationResult>
      <ApplicationPlatform>apple</ApplicationPlatform>
      <PnsHandle>00FC13ADFF785122B4AD28809A3420982341241421348097878E577C991DE8F0</PnsHandle>
      <RegistrationId>849523884231660601-248604613279522266-3</RegistrationId>
      <Outcome>The Push Notification System handle for the registration is invalid</Outcome>
    </RegistrationResult>
    <RegistrationResult>
      <ApplicationPlatform>apple</ApplicationPlatform>
      <PnsHandle>7603CF2F5537AADF272DEA23B4FB4D33B56F0F8FE697F57777EC459594910786</PnsHandle>
      <RegistrationId>282625459606590828-2679902039720441464-3</RegistrationId>
      <Outcome>The Notification was successfully sent to the Push Notification System</Outcome>
    </RegistrationResult>
  </Results>
</NotificationOutcome>`;

const SINGLE_FEEDBACK = `<NotificationOutcome xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
  <Success>1</Success>
  <Failure>0</Failure>
  <Results>
    <RegistrationResult>
      <ApplicationPlatform>apple</ApplicationPlatform>
      <PnsHandle>7603CF2F5537AADF272DEA23B4FB4D33B56F0F8FE697F57777EC459594910786</PnsHandle>
      <RegistrationId>282625459606590828-2679902039720441464-3</RegistrationId>
      <Outcome>The Notification was successfully sent to the Push Notification System</Outcome>
    </RegistrationResult>
  </Results>
</NotificationOutcome>`;

const EMPTY_FEEDBACK = `<NotificationOutcome xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect">
  <Success>0</Success>
  <Failure>0</Failure>
  <Results />
</NotificationOutcome>`;

describe("notificationOutcomeSerializer", () => {
  it("should parse a feed", async () => {
    const parsed = await parseNotificationOutcome(FEEDBACK);

    assert.equal(parsed.successCount, 1);
    assert.equal(parsed.failureCount, 1);
    assert.equal(parsed.results.length, 2);

    let result = parsed.results[0];
    assert.equal(result.applicationPlatform, "apple");
    assert.equal(
      result.pnsHandle,
      "00FC13ADFF785122B4AD28809A3420982341241421348097878E577C991DE8F0",
    );
    assert.equal(result.registrationId, "849523884231660601-248604613279522266-3");
    assert.equal(
      result.outcome,
      "The Push Notification System handle for the registration is invalid",
    );

    result = parsed.results[1];
    assert.equal(result.applicationPlatform, "apple");
    assert.equal(
      result.pnsHandle,
      "7603CF2F5537AADF272DEA23B4FB4D33B56F0F8FE697F57777EC459594910786",
    );
    assert.equal(result.registrationId, "282625459606590828-2679902039720441464-3");
    assert.equal(
      result.outcome,
      "The Notification was successfully sent to the Push Notification System",
    );
  });

  it("should parse a single result in the feed", async () => {
    const parsed = await parseNotificationOutcome(SINGLE_FEEDBACK);
    assert.equal(parsed.successCount, 1);
    assert.equal(parsed.failureCount, 0);
    assert.equal(parsed.results.length, 1);

    const result = parsed.results[0];
    assert.equal(result.applicationPlatform, "apple");
    assert.equal(
      result.pnsHandle,
      "7603CF2F5537AADF272DEA23B4FB4D33B56F0F8FE697F57777EC459594910786",
    );
    assert.equal(result.registrationId, "282625459606590828-2679902039720441464-3");
    assert.equal(
      result.outcome,
      "The Notification was successfully sent to the Push Notification System",
    );
  });

  it("should parse an empty feed", async () => {
    const parsed = await parseNotificationOutcome(EMPTY_FEEDBACK);
    assert.equal(parsed.successCount, 0);
    assert.equal(parsed.failureCount, 0);
    assert.equal(parsed.results.length, 0);
  });
});
