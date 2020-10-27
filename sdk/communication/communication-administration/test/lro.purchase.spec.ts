// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isPlaybackMode, Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import {
  CreateReservationRequest,
  ListPhonePlansRequest,
  PhoneNumberAdministrationClient,
  PhoneNumberReservation
} from "../src";
import { createRecordedPhoneNumberAdministrationClient } from "./utils/recordedClient";

describe("PhoneNumber - LROs - Purchase Reservation [Playback/Live]", function() {
  let recorder: Recorder;
  let client: PhoneNumberAdministrationClient;
  let includePhoneNumberLiveTests: boolean;
  let reservationId: string;
  let areaCode: string;
  let countryCode = "US";
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
  });

  it("can wait until a reservation is purchased", async function() {
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
    const reservePoller = await client.beginReservePhoneNumbers(reservationRequest);
    assert.ok(reservePoller.getOperationState().isStarted);

    const reservation: PhoneNumberReservation = await reservePoller.pollUntilDone();
    reservationId = reservation.reservationId || "";

    assert.ok(reservePoller.getOperationState().isCompleted);
    assert.equal(reservation.status, "Reserved");
    assert.equal(reservation.phoneNumbers?.length, 1);

    const purchasePoller = await client.beginPurchaseReservation(reservationId);
    assert.ok(purchasePoller.getOperationState().isStarted);

    await purchasePoller.pollUntilDone();
    assert.ok(purchasePoller.getOperationState().isCompleted);
  }).timeout(60000);
});
