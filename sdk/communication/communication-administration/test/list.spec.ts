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
  const maxPageSize = 5;
  const countryCode = "US";

  beforeEach(function() {
    ({ client, recorder } = createRecordedPhoneNumberAdministrationClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can list all acquired phone numbers", async () => {
    for await (const acquired of client.listPhoneNumbers()) {
      assert.isString(acquired.phoneNumber, "Unexpected type of acquired phone number");
      assert.isNotEmpty(acquired.acquiredCapabilities);
      assert.isNotEmpty(acquired.availableCapabilities);
    }
  });

  it("can list acquired phone numbers by page", async () => {
    const phoneNumbers = await client.listPhoneNumbers({
      skip: 0,
      take: 5
    });
    const pages = await phoneNumbers.byPage({ maxPageSize });

    for await (const page of pages) {
      assert.ok(page.length <= maxPageSize);

      for (const acquired of page) {
        assert.isString(acquired.phoneNumber, "Unexpected type of acquired phone number");
        assert.isNotEmpty(acquired.acquiredCapabilities);
        assert.isNotEmpty(acquired.availableCapabilities);
      }
    }
  }).timeout(5000);

  it("can list all supported countries", async () => {
    for await (const country of client.listSupportedCountries()) {
      assert.isString(country.countryCode);
      assert.isString(country.localizedName);
    }
  });

  it("can list supported countries by page", async () => {
    const countries = await client.listSupportedCountries({
      skip: 0,
      take: 5
    });
    const pages = await countries.byPage({ maxPageSize });

    for await (const page of pages) {
      assert.ok(page.length <= maxPageSize);

      for await (const country of page) {
        assert.isString(country.countryCode);
        assert.isString(country.localizedName);
      }
    }
  });

  it("can list all phone plan groups of a country", async () => {
    for await (const phonePlanGroup of client.listPhonePlanGroups(countryCode)) {
      if (!planGroupIdToQuery) {
        planGroupIdToQuery = phonePlanGroup.phonePlanGroupId;
      }

      assert.isString(phonePlanGroup.phonePlanGroupId);
    }
  });

  it("can list phone plan groups of a country by page", async () => {
    const phonePlanGroups = client.listPhonePlanGroups(countryCode, {
      skip: 0,
      take: 5
    });
    const pages = await phonePlanGroups.byPage({ maxPageSize });

    for await (const page of pages) {
      assert.ok(page.length <= maxPageSize);

      for await (const phonePlanGroup of page) {
        assert.isString(phonePlanGroup.phonePlanGroupId);
      }
    }
  });

  it("can list all phone plans", async () => {
    const planGroupInfo: ListPhonePlansRequest = {
      phonePlanGroupId: planGroupIdToQuery,
      countryCode
    };

    for await (const phonePlan of client.listPhonePlans(planGroupInfo)) {
      assert.isString(phonePlan.phonePlanId);
    }
  });

  it("can list phone plans by page", async () => {
    const planGroupInfo: ListPhonePlansRequest = {
      phonePlanGroupId: planGroupIdToQuery,
      countryCode
    };
    const phonePlans = client.listPhonePlans(planGroupInfo, {
      skip: 0,
      take: 5
    });
    const pages = await phonePlans.byPage({ maxPageSize });

    for await (const page of pages) {
      assert.ok(page.length <= maxPageSize);

      for await (const phonePlan of page) {
        assert.isString(phonePlan.phonePlanId);
      }
    }
  });

  it("can list all releases", async () => {
    for await (const entity of client.listReleases()) {
      assert.isString(entity.id);
      assert.isString(entity.status);
    }
  });

  it("can list releases by page", async () => {
    const releases = client.listReleases({
      skip: 0,
      take: 5
    });
    const pages = releases.byPage({ maxPageSize });

    for await (const page of pages) {
      assert.ok(page.length <= maxPageSize);

      for await (const entity of page) {
        assert.isString(entity.id);
        assert.isString(entity.status);
      }
    }
  }).timeout(5000);

  it("can list all searches", async () => {
    for await (const entity of client.listSearches()) {
      assert.isString(entity.id);
      assert.isString(entity.status);
    }
  });

  it("can list searches by page", async () => {
    const searches = client.listSearches({
      skip: 0,
      take: 5
    });
    const pages = searches.byPage({ maxPageSize });

    for await (const page of pages) {
      assert.ok(page.length <= maxPageSize);

      for await (const entity of page) {
        assert.isString(entity.id);
        assert.isString(entity.status);
      }
    }
  }).timeout(5000);
});
