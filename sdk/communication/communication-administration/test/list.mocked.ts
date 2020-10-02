// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { ListPhonePlansRequest } from "../src";
import { TestPhoneNumberAdministrationClient } from "./utils/testPhoneNumberAdministrationClient";

describe("PhoneNumberAdministrationClient Lists [Mocked]", () => {
  const client = new TestPhoneNumberAdministrationClient();
  it("can list phone numbers", async () => {
    let found = 0;
    for await (const acquired of client.listPhoneNumbersTest()) {
      assert.isString(acquired.phoneNumber, "Unexpected type of acquired phone number");
      assert.isNotEmpty(acquired.acquiredCapabilities);
      assert.isNotEmpty(acquired.availableCapabilities);

      found += 1;
    }

    assert.equal(found, 3, "Unexpected number of phone numbers found by getPhoneNumbers.");
  });

  it("can list supported countries", async () => {
    let found = 0;
    for await (const country of client.listSupportedCountriesTest()) {
      assert.isString(country.countryCode);
      assert.isString(country.localizedName);
      assert.isTrue(country.localizedName === "France" || country.localizedName === "Canada");
      assert.isTrue(country.countryCode === "FR" || country.countryCode === "CA");

      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of countries found by getSupportedCountries.");
  });

  it("can list phone plan groups", async () => {
    const countryCode = "FR";
    const localizedName = "France";
    let found = 0;
    for await (const phonePlanGroup of client.listPhonePlanGroupsTest(countryCode)) {
      assert.equal(phonePlanGroup.localizedName, localizedName);
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of phone plan groups found by getPhonePlanGroups.");
  });

  it("can list phone plans", async () => {
    const planGroupInfo: ListPhonePlansRequest = {
      phonePlanGroupId: "1",
      countryCode: "FR"
    };
    let found = 0;
    for await (const phonePlan of client.listPhonePlansTest(planGroupInfo)) {
      assert.equal(phonePlan.localizedName, "France");
      found += 1;
    }

    assert.equal(found, 2, "Unexpected number of phone plans found by getPhonePlans.");
  });

  it("can list releases", async () => {
    let found = 0;
    for await (const entity of client.listReleasesTest()) {
      assert.isString(entity.id);
      found += 1;
    }

    assert.equal(found, 3, "Unexpected number of entities found by getReleases.");
  });

  it("can list searches", async () => {
    let found = 0;
    for await (const entity of client.listSearchesTest()) {
      assert.isString(entity.id);
      found += 1;
    }

    assert.equal(found, 3, "Unexpected number of entities found by getSearches.");
  });
});
