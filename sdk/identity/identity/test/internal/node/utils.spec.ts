// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { parseRefreshTimestamp } from "../../../src/credentials/managedIdentityCredential/utils";
import { processMultiTenantRequest } from "../../../src/util/tenantIdUtils";

describe("Identity utilities (Node.js only)", function () {
  describe("validateMultiTenantRequest (Node.js only)", function () {
    afterEach(() => {
      delete process.env.AZURE_IDENTITY_DISABLE_MULTITENANTAUTH;
    });

    it("returns the original tenant and doesn't throw if getTokenOptions does not have a tenantId, even if AZURE_IDENTITY_DISABLE_MULTITENANTAUTH is defined", async function () {
      process.env.AZURE_IDENTITY_DISABLE_MULTITENANTAUTH = "true";
      const originalTenant = "credential-options-tenant-id";
      const resultingTenant = processMultiTenantRequest(originalTenant);
      assert.equal(resultingTenant, originalTenant);
    });
  });

  describe("returns correctly parsed refresh timestamp", function () {
    it("when expires_on is currentTimePlusThreeHours", () => {
      const currentTimePlusThreeHours = (Date.now() + 10800000) / 1000;
      const refreshTimestamp = parseRefreshTimestamp({
        access_token: "token",
        expires_on: currentTimePlusThreeHours,
        expires_in: 0,
      });
      const refreshTime = Math.floor((refreshTimestamp - Date.now()) / 1000);
      assert.closeTo(refreshTime, 5400, 10, "The refresh timestamp should be ");
    });
    it("when expires_on is currentTimePlusOneHour", () => {
      const currentTimePlusOneHour = (Date.now() + 3600000) / 1000;
      const refreshTimestamp = parseRefreshTimestamp({
        access_token: "token",
        expires_on: currentTimePlusOneHour,
        expires_in: 0,
      });
      const refreshTime = Math.floor((refreshTimestamp - Date.now()) / 1000);
      assert.closeTo(refreshTime, 3600, 10);
    });
    it("when expires_in is currentTimePlusThreeHours", () => {
      const threeHoursInSeconds = 10800;
      const refreshTimestamp = parseRefreshTimestamp({
        access_token: "token",
        expires_in: threeHoursInSeconds,
      });
      const refreshTime = Math.floor((refreshTimestamp - Date.now()) / 1000);
      assert.closeTo(refreshTime, 5400, 10);
    });
    it("when expires_in is currentTimePlusOneHour", () => {
      const oneHourInSeconds = 3600;
      const refreshTimestamp = parseRefreshTimestamp({
        access_token: "token",
        expires_in: oneHourInSeconds,
      });
      const refreshTime = Math.floor((refreshTimestamp - Date.now()) / 1000);
      assert.closeTo(refreshTime, 3600, 10);
    });
    it("when refresh_in is specified", () => {
      const refreshTimestamp = parseRefreshTimestamp({
        access_token: "token",
        refresh_in: 3200,
        expires_in: 0,
      });
      const refreshTime = Math.floor((refreshTimestamp - Date.now()) / 1000);
      assert.closeTo(refreshTime, 3200, 10);
    });
    it("when refresh_in is 0", () => {
      const refreshTimestamp = parseRefreshTimestamp({
        access_token: "token",
        refresh_in: 0,
        expires_in: 0,
      });
      const refreshTime = Math.floor((refreshTimestamp - Date.now()) / 1000);
      assert.closeTo(refreshTime, 0, 10);
    });
  });
});
