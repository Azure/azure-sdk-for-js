// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { isPlaybackMode, Recorder } from "@azure/test-utils-recorder";
import {
  CreateSearchOptions,
  CreateSearchRequest,
  PhoneNumberAdministrationClient,
  PhoneNumberSearch
} from "../src";
import { createRecordedPhoneNumberAdministrationClient } from "./utils/recordedClient";

describe("PhoneNumberAdministrationClient - Long Running Operations [Playback/Live]", function() {
  let recorder: Recorder;
  let client: PhoneNumberAdministrationClient;
  let searchId: string;
  let phonePlanIds: string;
  let areaCodeForSearch: string;
  let shouldRunTNMTests: boolean;

  beforeEach(function() {
    ({
      client,
      recorder,
      phonePlanIds,
      areaCodeForSearch,
      shouldRunTNMTests
    } = createRecordedPhoneNumberAdministrationClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can wait until a search is completed", async function() {
    if (!shouldRunTNMTests && !isPlaybackMode()) {
      this.skip();
    }

    const searchRequest: CreateSearchRequest = {
      name: "LRO Test Search",
      description: "Test search for JS phone number admin SDK.",
      phonePlanIds: phonePlanIds.split(",").map((id) => id.trim()),
      areaCode: areaCodeForSearch
    };
    const searchOptions: CreateSearchOptions = {
      quantity: 1
    };
    const poller = await client.beginCreateSearch(searchRequest, searchOptions);
    assert.ok(poller.getOperationState().isStarted);

    const phoneNumberSearch: PhoneNumberSearch = await poller.pollUntilDone();
    searchId = phoneNumberSearch.searchId || "";

    assert.ok(poller.getOperationState().isCompleted);
    assert.equal(phoneNumberSearch.status, "Reserved");
    assert.equal(phoneNumberSearch.phoneNumbers?.length, 1);
  }).timeout(30000);

  it("can wait until a search is cancelled", async function() {
    if (!shouldRunTNMTests && !isPlaybackMode()) {
      this.skip();
    }

    const poller = await client.beginCancelSearch(searchId);
    assert.ok(poller.getOperationState().isStarted);

    const phoneNumberSearch: PhoneNumberSearch = await poller.pollUntilDone();

    assert.equal(phoneNumberSearch.searchId, searchId);
    assert.ok(poller.getOperationState().isCompleted);
    assert.equal(phoneNumberSearch.status, "Cancelled");
    assert.equal(phoneNumberSearch.phoneNumbers?.length, 1);
  }).timeout(30000);
});
