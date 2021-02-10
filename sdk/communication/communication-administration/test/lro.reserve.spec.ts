// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollerLike, PollOperationState } from "@azure/core-lro";
import { isPlaybackMode, Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import {
  CreateReservationRequest,
  ListPhonePlansRequest,
  PhoneNumberAdministrationClient,
  PhoneNumberReservation
} from "../src";
import {
  createRecordedPhoneNumberAdministrationClient,
  testPollerOptions
} from "./utils/recordedClient";

describe("PhoneNumber - LROs - Phone Number Reservations [Playback/Live]", function() {
  let recorder: Recorder;
  let client: PhoneNumberAdministrationClient;
  let includePhoneNumberLiveTests: boolean;
  let reservationId: string;
  let areaCode: string;
  let poller: PollerLike<PollOperationState<PhoneNumberReservation>, PhoneNumberReservation>;
  const countryCode = "US";
  const phonePlanIds: string[] = [];

  beforeEach(function() {
    ({
      client,
      recorder,
      includePhoneNumberLiveTests
    } = createRecordedPhoneNumberAdministrationClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can get phonePlanIds and areaCode to create reservation", async function() {
    if (!includePhoneNumberLiveTests && !isPlaybackMode()) {
      this.skip();
    }

    let phonePlanGroupId: string = "";
    for await (const phonePlanGroup of client.listPhonePlanGroups(countryCode)) {
      if (phonePlanGroup.phoneNumberType == "Geographic") {
        assert.isString(phonePlanGroup.phonePlanGroupId);
        ({ phonePlanGroupId } = phonePlanGroup);
        assert.isString(phonePlanGroupId);
        break;
      }
    }

    const planGroupInfo: ListPhonePlansRequest = {
      phonePlanGroupId,
      countryCode
    };

    for await (const phonePlan of client.listPhonePlans(planGroupInfo)) {
      assert.isString(phonePlan.phonePlanId);
      phonePlanIds.push(phonePlan.phonePlanId);
    }

    const { primaryAreaCodes } = await client.getAreaCodes({
      locationType: "selection",
      countryCode,
      phonePlanId: phonePlanIds[1],
      locationOptionsQueries: {
        locationOptions: [
          {
            labelId: "state",
            optionsValue: "AL"
          },
          {
            labelId: "city",
            optionsValue: "NOAM-US-AL-BI"
          }
        ]
      }
    });
    areaCode = primaryAreaCodes ? primaryAreaCodes[0] : "";
  }).timeout(30000);

  it("can wait until a search is completed", async function() {
    if (!includePhoneNumberLiveTests && !isPlaybackMode()) {
      this.skip();
    }

    const reservationRequest: CreateReservationRequest = {
      name: "LRO Test Search",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds,
      areaCode,
      quantity: 1
    };
    poller = await client.beginReservePhoneNumbers(reservationRequest, testPollerOptions);
    assert.ok(poller.getOperationState().isStarted);

    const reservation: PhoneNumberReservation = await poller.pollUntilDone();
    reservationId = reservation.reservationId || "";

    assert.ok(poller.getOperationState().isCompleted);
    assert.equal(reservation.status, "Reserved");
    assert.equal(reservation.phoneNumbers?.length, 1);
  }).timeout(30000);

  it("can cancel a phone number reservation", async function() {
    if (!includePhoneNumberLiveTests && !isPlaybackMode()) {
      this.skip();
    }

    assert.ok(poller.getOperationState().isCompleted);
    await poller.cancelOperation();
    assert.ok(poller.getOperationState().isCancelled);

    const { status } = await client.getReservation(reservationId);
    assert.equal(status, "Cancelling" || "Cancelled");
  }).timeout(30000);
});
