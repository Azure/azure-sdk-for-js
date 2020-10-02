// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Recorder } from "@azure/test-utils-recorder";
import { ListPhonePlansRequest, LocationOptions, PhoneNumberAdministrationClient } from "../src";
import { createRecordedPhoneNumberAdministrationClient } from "./utils/recordedClient";

describe("PhoneNumberAdministrationClient [Playback/Live]", function() {
  let recorder: Recorder;
  let client: PhoneNumberAdministrationClient;
  let phonePlanGroupId: string;
  let phonePlanId: string;
  let locationOptions: LocationOptions | undefined;
  let searchId: string;
  const countryCode = "US";

  beforeEach(function() {
    ({ client, recorder } = createRecordedPhoneNumberAdministrationClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can get phonePlanGroupId and phonePlanId for other tests", async function() {
    for await (const phonePlanGroup of client.listPhonePlanGroups(countryCode)) {
      assert.isString(phonePlanGroup.phonePlanGroupId);
      ({ phonePlanGroupId } = phonePlanGroup);
      assert.isString(phonePlanGroupId);

      break;
    }

    const planGroupInfo: ListPhonePlansRequest = {
      phonePlanGroupId,
      countryCode
    };

    for await (const phonePlan of client.listPhonePlans(planGroupInfo)) {
      assert.isString(phonePlan.phonePlanId);
      ({ phonePlanId } = phonePlan);
      assert.isString(phonePlanId);
    }
  }).timeout(5000);

  it("can get location options", async function() {
    ({ locationOptions } = await client.getPhonePlanLocationOptions({
      countryCode,
      phonePlanGroupId,
      phonePlanId
    }));

    assert.isDefined(locationOptions);
    assert.isString(locationOptions?.labelId);
    assert.isString(locationOptions?.labelName);
  });

  it("can get area codes", async function() {
    const { primaryAreaCodes } = await client.getAreaCodes(
      {
        locationType: "selection",
        countryCode,
        phonePlanId
      },
      {
        locationOptions: [
          { labelId: "state", optionsValue: "CA" },
          { labelId: "city", optionsValue: "NOAM-US-CA-LA" }
        ]
      }
    );

    assert.isArray(primaryAreaCodes);
  });

  it("can start a phone number search", async function() {
    ({ searchId } = await client.createSearch({
      phonePlanIds: [phonePlanId],
      areaCode: "800",
      name: "LRO Test Search",
      description: "Test search for JS phone number admin SDK.",
      quantity: 1
    }));
    assert.isString(searchId);
  });
});
