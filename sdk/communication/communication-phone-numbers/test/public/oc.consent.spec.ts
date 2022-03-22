// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { createRecordedOcClient, createRecordedOcClientWithToken } from "./utils/recordedClient";
import {
  OperatorConnectClient,
  KnownConsentStatus,
  Contact
} from "../../src/";

matrix([[true, false]], async function (useAad) {
  describe(`OperatorConnectClient - get operators list${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let client: OperatorConnectClient;

    beforeEach(function (this: Context) {
      ({ client, recorder } = useAad
        ? createRecordedOcClientWithToken(this)!
        : createRecordedOcClient(this));
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("can retrieve consents list", async function (this: Context) {
      let activeConsentCount = 0;
      for await (const operator of client.listConsents()) {
        if (operator.status == KnownConsentStatus.Active) {
          activeConsentCount++;
        }
      }
      assert.isTrue(activeConsentCount > 0);
    }).timeout(60000);

    const operatorId = "123";
    const companyName = "Test Company";
    const contact: Contact = {
      fullName: "Test User",
      email: "BillTest@contoso.com",
      phoneNumber: "+1234"
    }
    const defaultCountry = "US";
    it("can create consent and get it back", async function (this: Context) {
      const createResponse = await client.createConsent(operatorId, companyName, [defaultCountry], contact);
      assert.deepEqual(createResponse.consentedBy, contact);
      assert.deepEqual(createResponse.lastModifiedBy, contact);
      assert.equal(createResponse.operatorId, operatorId);
      assert.equal(createResponse.companyName, companyName);
      assert.equal(createResponse.consentedCountries, [defaultCountry]);
      assert.equal(createResponse.contacts, [contact]);
      assert.equal(createResponse.status, KnownConsentStatus.Active);

      const getResponse = await client.getConsent(operatorId);
      assert.deepEqual(getResponse, createResponse);
    }).timeout(60000);

    it("can create consent and remove consent", async function (this: Context) {
      const createResponse = await client.createConsent(operatorId, companyName, [defaultCountry], contact);
      assert.equal(createResponse.status, KnownConsentStatus.Active);

      const removeResponse = await client.removeConsent(operatorId, contact);
      assert.equal(removeResponse.status, KnownConsentStatus.Removed);
    }).timeout(60000);

    it("can create consent with suspended state", async function (this: Context) {
      const createResponse = await client.createConsent(operatorId, companyName, [defaultCountry], contact, undefined, KnownConsentStatus.Suspended);
      assert.equal(createResponse.status, KnownConsentStatus.Suspended);
    }).timeout(60000);

    it("can create consent with 2 contacts", async function (this: Context) {
      const backupContact = {
        fullName: "Test User 2",
        email: "BillTest2@contoso.com",
        phoneNumber: "+1234"
      }
      const createResponse = await client.createConsent(operatorId, companyName, [defaultCountry], contact, [contact, backupContact]);
      assert.equal(createResponse.contacts?.length, 2);
    }).timeout(60000);

    it("can update consent's company name only", async function (this: Context) {
      await client.createConsent(operatorId, companyName, [defaultCountry], contact);
      const updateResponse = await client.updateConsent(operatorId, contact, {
        companyName: companyName
      });

      assert.equal(updateResponse.companyName, companyName);
    }).timeout(60000);

    it("can update consent's status only", async function (this: Context) {
      await client.createConsent(operatorId, companyName, [defaultCountry], contact);
      const updateResponse = await client.updateConsent(operatorId, contact, {
        status: KnownConsentStatus.Suspended
      });

      assert.equal(updateResponse.status, KnownConsentStatus.Suspended);
    }).timeout(60000);

    it("can update consent's countries only", async function (this: Context) {
      await client.createConsent(operatorId, companyName, [defaultCountry], contact);
      const updateResponse = await client.updateConsent(operatorId, contact, {
        consentedCountries: [defaultCountry, "UK"],
      });

      assert.equal(updateResponse.consentedCountries?.length, 2);
    }).timeout(60000);

    it("can update consent's contacts only", async function (this: Context) {
      await client.createConsent(operatorId, companyName, [defaultCountry], contact);
      const updateResponse = await client.updateConsent(operatorId, contact, {
        contacts: [{
          fullName: "Some other user",
          email: "BillTest2@contoso.com",
          phoneNumber: "+1234"
        }]
      });

      assert.equal(updateResponse.contacts?.length, 2);
      assert.equal(updateResponse.contacts![0].fullName, "Some other user");
    }).timeout(60000);

    it("can update consent's all parameters", async function (this: Context) {
      await client.createConsent(operatorId, companyName, [defaultCountry], contact);
      const updateResponse = await client.updateConsent(operatorId, contact, {
        companyName: companyName,
        status: KnownConsentStatus.Suspended,
        consentedCountries: [defaultCountry, "UK"],
        contacts: [contact, {
          fullName: "Some other user",
          email: "BillTest2@contoso.com",
          phoneNumber: "+1234"
        }]
      });

      assert.equal(updateResponse.companyName, companyName);
      assert.equal(updateResponse.status, KnownConsentStatus.Suspended);
      assert.equal(updateResponse.consentedCountries?.length, 2);
      assert.equal(updateResponse.contacts?.length, 2);
    }).timeout(60000);
  });
});
