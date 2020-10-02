// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Recorder } from "@azure/test-utils-recorder";
import { ListPhonePlansRequest, PhoneNumberAdministrationClient } from "../src";
import { createRecordedPhoneNumberAdministrationClient } from "./utils/recordedClient";

describe("PhoneNumberAdministrationClient Lists [Playback/Live]", function() {
  let recorder: Recorder;
  let client: PhoneNumberAdministrationClient;
  let planGroupIdToQuery: string;

  beforeEach(function() {
    ({ client, recorder } = createRecordedPhoneNumberAdministrationClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can list phone numbers", async () => {
    for await (const acquired of client.listPhoneNumbers()) {
      assert.isString(acquired.phoneNumber, "Unexpected type of acquired phone number");
      assert.isNotEmpty(acquired.acquiredCapabilities);
      assert.isNotEmpty(acquired.availableCapabilities);
    }
  });

  it("can list supported countries", async () => {
    for await (const country of client.listSupportedCountries()) {
      assert.isString(country.countryCode);
      assert.isString(country.localizedName);
    }
  });

  it("can list phone plan groups", async () => {
    const countryCode = "US";

    for await (const phonePlanGroup of client.listPhonePlanGroups(countryCode)) {
      if (!planGroupIdToQuery) {
        planGroupIdToQuery = phonePlanGroup.phonePlanGroupId;
      }

      assert.isString(phonePlanGroup.phonePlanGroupId);
    }
  });

  it("can list phone plans", async () => {
    const planGroupInfo: ListPhonePlansRequest = {
      phonePlanGroupId: planGroupIdToQuery,
      countryCode: "US"
    };

    for await (const phonePlan of client.listPhonePlans(planGroupInfo)) {
      assert.isString(phonePlan.phonePlanId);
    }
  });

  it("can list releases", async () => {
    for await (const entity of client.listReleases()) {
      assert.isString(entity.id);
    }
  });

  it("can list searches", async () => {
    for await (const entity of client.listSearches()) {
      assert.isString(entity.id);
    }
  });
});
