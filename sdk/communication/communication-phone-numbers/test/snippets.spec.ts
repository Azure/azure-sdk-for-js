// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import {
  PhoneNumberCapabilitiesRequest,
  PhoneNumbersClient,
  SearchAvailablePhoneNumbersRequest,
  SipRoutingClient,
} from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreatePhoneClient_ConnectionString", async () => {
    const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
    const client = new PhoneNumbersClient(connectionString);
  });

  it("ReadmeSampleCreateSipClient_ConnectionString", async () => {
    const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
    const client = new SipRoutingClient(connectionString);
  });

  it("ReadmeSampleCreatePhoneClient_KeyCredential", async () => {
    const credential = new AzureKeyCredential("<key-from-resource>");
    const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
  });

  it("ReadmeSampleCreateSipClient_KeyCredential", async () => {
    const credential = new AzureKeyCredential("<key-from-resource>");
    const client = new SipRoutingClient("<endpoint-from-resource>", credential);
  });

  it("ReadmeSampleCreatePhoneClient_DefaultAzureCredential", async () => {
    const credential = new DefaultAzureCredential();
    const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
  });

  it("ReadmeSampleCreateSipClient_DefaultAzureCredential", async () => {
    const credential = new DefaultAzureCredential();
    const client = new SipRoutingClient("<endpoint-from-resource>", credential);
  });

  it("PhoneNumbersClientSearchAvailablePhoneNumbers", async () => {
    const credential = new DefaultAzureCredential();
    const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const searchRequest: SearchAvailablePhoneNumbersRequest = {
      countryCode: "US",
      phoneNumberType: "tollFree",
      assignmentType: "application",
      capabilities: {
        sms: "outbound",
        calling: "none",
      },
      quantity: 1,
    };
    // @ts-preserve-whitespace
    const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);
    // @ts-preserve-whitespace
    // The search is underway. Wait to receive searchId.
    const searchResults = await searchPoller.pollUntilDone();
    console.log(`Found phone number: ${searchResults.phoneNumbers[0]}`);
    console.log(`searchId: ${searchResults.searchId}`);
  });

  it("PhoneNumbersClientPurchasePhoneNumbers", async () => {
    const credential = new DefaultAzureCredential();
    const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const searchRequest: SearchAvailablePhoneNumbersRequest = {
      countryCode: "US",
      phoneNumberType: "tollFree",
      assignmentType: "application",
      capabilities: {
        sms: "outbound",
        calling: "none",
      },
      quantity: 1,
    };
    // @ts-preserve-whitespace
    const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);
    // @ts-preserve-whitespace
    // The search is underway. Wait to receive searchId.
    const { searchId, phoneNumbers } = await searchPoller.pollUntilDone();
    // @ts-preserve-whitespace
    const purchasePoller = await client.beginPurchasePhoneNumbers(searchId);
    // @ts-preserve-whitespace
    // Purchase is underway.
    await purchasePoller.pollUntilDone();
    console.log(`Successfully purchased ${phoneNumbers[0]}`);
  });

  it("PhoneNumbersClientReleasePhoneNumber", async () => {
    const credential = new DefaultAzureCredential();
    const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const phoneNumberToRelease = "<phone-number-to-release>";
    // @ts-preserve-whitespace
    const releasePoller = await client.beginReleasePhoneNumber(phoneNumberToRelease);
    // @ts-preserve-whitespace
    // Release is underway.
    await releasePoller.pollUntilDone();
    console.log("Successfully release phone number.");
  });

  it("PhoneNumbersClientUpdatePhoneNumberCapabilities", async () => {
    const credential = new DefaultAzureCredential();
    const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const phoneNumberToUpdate = "<phone-number-to-update>";
    // @ts-preserve-whitespace
    // This will update phone number to send and receive sms, but only send calls.
    const updateRequest: PhoneNumberCapabilitiesRequest = {
      sms: "inbound+outbound",
      calling: "outbound",
    };
    // @ts-preserve-whitespace
    const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
      phoneNumberToUpdate,
      updateRequest,
    );
    // @ts-preserve-whitespace
    // Update is underway.
    const { capabilities } = await updatePoller.pollUntilDone();
    console.log(`These are the update capabilities: ${capabilities}`);
  });

  it("PhoneNumbersClientGetPurchasedPhoneNumber", async () => {
    const credential = new DefaultAzureCredential();
    const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const phoneNumberToGet = "<phone-number-to-get>";
    // @ts-preserve-whitespace
    const phoneNumber = await client.getPurchasedPhoneNumber(phoneNumberToGet);
    // @ts-preserve-whitespace
    console.log(`The id is the same as the phone number: ${phoneNumber.id}`);
    console.log(`Phone number type is ${phoneNumber.phoneNumberType}`);
  });

  it("PhoneNumbersClientListPurchasedPhoneNumbers", async () => {
    const credential = new DefaultAzureCredential();
    const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const phoneNumbers = client.listPurchasedPhoneNumbers();
    // @ts-preserve-whitespace
    for await (const phoneNumber of phoneNumbers) {
      console.log(`The id is the same as the phone number: ${phoneNumber.id}`);
      console.log(`Phone number type is ${phoneNumber.phoneNumberType}`);
    }
  });

  it("PhoneNumbersClientListAvailableCountries", async () => {
    const credential = new DefaultAzureCredential();
    const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    for await (const country of client.listAvailableCountries()) {
      console.log("country: ", country.localizedName);
    }
  });

  it("PhoneNumbersClientListTollFreeAreaCodes", async () => {
    const credential = new DefaultAzureCredential();
    const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    for await (const areaCodeItem of client.listAvailableTollFreeAreaCodes("US")) {
      console.log("area code: ", areaCodeItem.areaCode);
    }
  });

  it("PhoneNumbersClientListGeographicAreaCodes", async () => {
    const credential = new DefaultAzureCredential();
    const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    for await (const areaCodeItem of client.listAvailableGeographicAreaCodes("US")) {
      console.log("area code: ", areaCodeItem.areaCode);
    }
  });

  it("PhoneNumbersClientListAvailableLocalities", async () => {
    const credential = new DefaultAzureCredential();
    const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    for await (const locality of client.listAvailableLocalities("US")) {
      console.log("locality: ", locality.localizedName);
    }
  });

  it("PhoneNumbersClientListAvailableOfferings", async () => {
    const credential = new DefaultAzureCredential();
    const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    for await (const offering of client.listAvailableOfferings("US")) {
      console.log("phone number type: ", offering.phoneNumberType);
      console.log("cost: ", offering.cost.amount);
    }
  });

  it("SipRoutingClientRetrieveTrunksAndRoutes", async () => {
    const credential = new DefaultAzureCredential();
    const client = new SipRoutingClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const trunks = client.listTrunks();
    const routes = client.listRoutes();
    for await (const trunk of trunks) {
      console.log(`Trunk ${trunk.fqdn}:${trunk.sipSignalingPort}`);
    }
    // @ts-preserve-whitespace
    for await (const route of routes) {
      console.log(`Route ${route.name} with pattern ${route.numberPattern}`);
      console.log(`Route's trunks: ${route.trunks?.join()}`);
    }
  });

  it("SipRoutingClientReplaceTrunksAndRoutes", async () => {
    const credential = new DefaultAzureCredential();
    const client = new SipRoutingClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    await client.setTrunks([
      {
        fqdn: "sbc.one.domain.com",
        sipSignalingPort: 1234,
      },
      {
        fqdn: "sbc.two.domain.com",
        sipSignalingPort: 1234,
      },
    ]);
    // @ts-preserve-whitespace
    await client.setRoutes([
      {
        name: "First Route",
        description: "route's description",
        numberPattern: "^+[1-9][0-9]{3,23}$",
        trunks: ["sbc.one.domain.com"],
      },
      {
        name: "Second Route",
        description: "route's description",
        numberPattern: "^.*$",
        trunks: ["sbc.two.domain.com", "sbc.one.domain.com"],
      },
    ]);
  });

  it("SipRoutingClientRetrieveSingleTrunk", async () => {
    const credential = new DefaultAzureCredential();
    const client = new SipRoutingClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const trunk = await client.getTrunk("sbc.one.domain.com");
    if (trunk) {
      console.log(`Trunk ${trunk.fqdn}:${trunk.sipSignalingPort}`);
    } else {
      console.log("Trunk not found");
    }
  });

  it("SipRoutingClientSetSingleTrunk", async () => {
    const credential = new DefaultAzureCredential();
    const client = new SipRoutingClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    await client.setTrunk({
      fqdn: "sbc.one.domain.com",
      sipSignalingPort: 4321,
    });
  });

  it("SipRoutingClientDeleteSingleTrunk", async () => {
    const credential = new DefaultAzureCredential();
    const client = new SipRoutingClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    await client.deleteTrunk("sbc.one.domain.com");
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
