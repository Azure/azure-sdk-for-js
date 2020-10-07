// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isPlaybackMode, Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import {
  CreateReservationRequest,
  ListPhonePlansRequest,
  PhoneNumberAdministrationClient,
  PhoneNumberSearch
} from "../src";
import { createRecordedPhoneNumberAdministrationClient } from "./utils/recordedClient";

describe("PhoneNumber - Long Running Operations - Purchase Reservation [Playback/Live]", function() {
  let recorder: Recorder;
  let client: PhoneNumberAdministrationClient;
  let includePhoneNumberTests: boolean;
  let reservationId: string;
  let areaCode: string;
  let countryCode = "US";
  const phonePlanIds: string[] = [];

  beforeEach(function() {
    ({ client, recorder, includePhoneNumberTests } = createRecordedPhoneNumberAdministrationClient(
      this
    ));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can get phonePlanIds and areaCode to create reservation", async function() {
    if (!includePhoneNumberTests && !isPlaybackMode()) {
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
  });

  it("can wait until a reservation is purchased", async function() {
    if (!includePhoneNumberTests && !isPlaybackMode()) {
      this.skip();
    }

    const reservationRequest: CreateReservationRequest = {
      name: "LRO Test Search",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds,
      areaCode,
      quantity: 1
    };
    const reservePoller = await client.startReservePhoneNumbers(reservationRequest);
    assert.ok(reservePoller.getOperationState().isStarted);

    const phoneNumberSearch: PhoneNumberSearch = await reservePoller.pollUntilDone();
    reservationId = phoneNumberSearch.searchId || "";

    assert.ok(reservePoller.getOperationState().isCompleted);
    assert.equal(phoneNumberSearch.status, "Reserved");
    assert.equal(phoneNumberSearch.phoneNumbers?.length, 1);

    const purchasePoller = await client.startPurchaseReservation(reservationId);
    assert.ok(purchasePoller.getOperationState().isStarted);

    const results = await purchasePoller.pollUntilDone();
    assert.ok(purchasePoller.getOperationState().isCompleted);
    assert.equal(results.status, "Success");
  }).timeout(60000);
});
