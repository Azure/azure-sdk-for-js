// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { assert } from "chai";
import { Context } from "mocha";
import { OperatorConnectRecordedClient } from "./utils/recordedClient";
import {
  Contact
} from "../../src";

matrix([[true, false]], async function (useAad) {
  describe(`OperatorConnectClient - consent operations${useAad ? " [AAD]" : ""}`, function () {
    const defaultTimeoutMs = 60000

    const operatorId = "fa82b96a-3352-4594-80f2-a0a18924a001";
    const companyName = "Test Company";
    const contact: Contact = {
      fullName: "Test User",
      email: "BillTest@contoso.com",
      phoneNumber: "+1234"
    }
    const defaultCountry = "US";

    let client: OperatorConnectRecordedClient;

    beforeEach(function (this: Context) {
      client = new OperatorConnectRecordedClient(this, useAad);
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await client.stopRecorder();
      }
    });

    it("can retrieve consents list", async function (this: Context) {
      let activeConsentCount = 0;
      for await (const operator of client.listConsents({ requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } })) {
        if (operator.status == "Active") {
          activeConsentCount++;
        }
      }
      assert.isTrue(activeConsentCount > 0);
    }).timeout(defaultTimeoutMs);

    it("can get consent", async function (this: Context) {
      const getResponse = await client.getConsent(operatorId, { requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } });
      assert.equal(getResponse.operatorId, operatorId);
    }).timeout(defaultTimeoutMs);

    it("can create consent and get it back", async function (this: Context) {
      const createResponse = await client.createConsent({
        operatorId: operatorId,
        companyName: companyName,
        consentedCountries: [defaultCountry],
        consentedBy: contact,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } // Todo: remove. sent to get mocked results while api is not ready
      });
      assert.deepEqual(createResponse.consentedBy, contact);
      assert.deepEqual(createResponse.lastModifiedBy, contact);
      assert.equal(createResponse.operatorId, operatorId);
      assert.equal(createResponse.companyName, companyName);
      assert.equal(createResponse.consentedCountries, [defaultCountry]);
      assert.equal(createResponse.contacts, [contact]);
      assert.equal(createResponse.status, "Active");

      const getResponse = await client.getConsent(operatorId, { requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } });
      assert.deepEqual(getResponse, createResponse);
    }).timeout(defaultTimeoutMs);

    it("can create consent and remove consent", async function (this: Context) {
      const createResponse = await client.createConsent({
        operatorId: operatorId,
        companyName: companyName,
        consentedCountries: [defaultCountry],
        consentedBy: contact,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } // Todo: remove. sent to get mocked results while api is not ready
      });
      assert.equal(createResponse.status, "Active");

      const removeResponse = await client.removeConsent({
        operatorId: operatorId,
        lastModifiedBy: contact,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } // Todo: remove. sent to get mocked results while api is not ready
      });
      assert.equal(removeResponse.status, "Removed");
    }).timeout(defaultTimeoutMs);

    it("can create consent with suspended state", async function (this: Context) {
      const createResponse = await client.createConsent({
        operatorId: operatorId,
        companyName: companyName,
        consentedCountries: [defaultCountry],
        consentedBy: contact,
        status: "Suspended",
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } // Todo: remove. sent to get mocked results while api is not ready
      });
      assert.equal(createResponse.status, "Suspended");
    }).timeout(defaultTimeoutMs);

    it("can create consent with 2 contacts", async function (this: Context) {
      const backupContact = {
        fullName: "Test User 2",
        email: "BillTest2@contoso.com",
        phoneNumber: "+1234"
      }
      const createResponse = await client.createConsent({
        operatorId: operatorId,
        companyName: companyName,
        consentedCountries: [defaultCountry],
        consentedBy: contact,
        contacts: [contact, backupContact],
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } // Todo: remove. sent to get mocked results while api is not ready
      });
      assert.equal(createResponse.contacts?.length, 2);
    }).timeout(defaultTimeoutMs);


    it("can update consent's company name only", async function (this: Context) {
      await client.createConsent({
        operatorId: operatorId,
        companyName: companyName,
        consentedCountries: [defaultCountry],
        consentedBy: contact,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } // Todo: remove. sent to get mocked results while api is not ready
      });
      const updateResponse = await client.updateConsent({
        operatorId,
        lastModifiedBy: contact,
        companyName: companyName,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } },// Todo: remove. sent to get mocked results while api is not ready
      });

      assert.equal(updateResponse.companyName, companyName);
    }).timeout(defaultTimeoutMs);
    
    it("can update consent's company name only", async function (this: Context) {
      await client.createConsent({
        operatorId: operatorId,
        companyName: companyName,
        consentedCountries: [defaultCountry],
        consentedBy: contact,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } // Todo: remove. sent to get mocked results while api is not ready
      });
      const updateResponse = await client.updateConsent({
        operatorId,
        lastModifiedBy: contact,
        companyName: companyName,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } },// Todo: remove. sent to get mocked results while api is not ready
      });

      assert.equal(updateResponse.companyName, companyName);
    }).timeout(defaultTimeoutMs);

    it("can update consent's status only", async function (this: Context) {
      await client.createConsent({
        operatorId: operatorId,
        companyName: companyName,
        consentedCountries: [defaultCountry],
        consentedBy: contact,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } // Todo: remove. sent to get mocked results while api is not ready
      });
      const updateResponse = await client.updateConsent({
        operatorId: operatorId,
        lastModifiedBy: contact,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } },
        status: "Suspended"
      });

      assert.equal(updateResponse.status, "Suspended");
    }).timeout(defaultTimeoutMs);

    it("can update consent's countries only", async function (this: Context) {
      await client.createConsent({
        operatorId: operatorId,
        companyName: companyName,
        consentedCountries: [defaultCountry],
        consentedBy: contact,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } // Todo: remove. sent to get mocked results while api is not ready
      });
      const updateResponse = await client.updateConsent({
        operatorId: operatorId,
        lastModifiedBy: contact,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } },
        consentedCountries: [defaultCountry, "UK"],
      });

      assert.equal(updateResponse.consentedCountries?.length, 2);
    }).timeout(defaultTimeoutMs);

    it("can update consent's contacts only", async function (this: Context) {
      await client.createConsent({
        operatorId: operatorId,
        companyName: companyName,
        consentedCountries: [defaultCountry],
        consentedBy: contact,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } // Todo: remove. sent to get mocked results while api is not ready
      });
      const updateResponse = await client.updateConsent({
        operatorId: operatorId,
        lastModifiedBy: contact,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } },
        contacts: [{
          fullName: "Some other user",
          email: "BillTest2@contoso.com",
          phoneNumber: "+1234"
        }]
      });

      assert.equal(updateResponse.contacts?.length, 2);
      assert.equal(updateResponse.contacts![0].fullName, "Some other user");
    }).timeout(defaultTimeoutMs);

    it("can update consent's all parameters", async function (this: Context) {
      await client.createConsent({
        operatorId: operatorId,
        companyName: companyName,
        consentedCountries: [defaultCountry],
        consentedBy: contact,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } // Todo: remove. sent to get mocked results while api is not ready
      });
      const updateResponse = await client.updateConsent({
        operatorId: operatorId,
        lastModifiedBy: contact,
        requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } },
        companyName: companyName,
        status: "Suspended",
        consentedCountries: [defaultCountry, "UK"],
        contacts: [contact, {
          fullName: "Some other user",
          email: "BillTest2@contoso.com",
          phoneNumber: "+1234"
        }]
      });

      assert.equal(updateResponse.companyName, companyName);
      assert.equal(updateResponse.status, "Suspended");
      assert.equal(updateResponse.consentedCountries?.length, 2);
      assert.equal(updateResponse.contacts?.length, 2);
    }).timeout(defaultTimeoutMs);

    it("can handle not found in get consent", async function (this: Context) {
      assert.fail("Not implemented")
    }).timeout(defaultTimeoutMs);

    it("can handle error in get consent", async function (this: Context) {
      assert.fail("Not implemented")
    }).timeout(defaultTimeoutMs);

    it("can handle error in create consent", async function (this: Context) {
      assert.fail("Not implemented")
    }).timeout(defaultTimeoutMs);
  });
});
