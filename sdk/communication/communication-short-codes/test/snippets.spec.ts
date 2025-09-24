// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { ShortCodesClient, ShortCodesUpsertUSProgramBriefOptionalParams } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
    const client = new ShortCodesClient(connectionString);
  });

  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const credential = new AzureKeyCredential("<key-from-resource>");
    const client = new ShortCodesClient("<endpoint-from-resource>", credential);
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    const client = new ShortCodesClient("<endpoint-from-resource>", credential);
  });

  it("ReadmeSampleCreateProgramBrief", async () => {
    const credential = new DefaultAzureCredential();
    const client = new ShortCodesClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    // create a new program brief request
    const programBriefId = "1b4411b7-edb0-44e7-9eca-dc7208b8d88c";
    const programBriefRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
      body: {
        id: programBriefId,
        programDetails: {
          description:
            "Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.",
          expectedDateOfService: new Date(2022, 1, 25),
          isPoliticalCampaign: false,
          isVanity: false,
          name: "Contoso Loyalty Program",
          numberType: "shortCode",
          privacyPolicyUrl: "https://contoso.com/privacy",
          callToActionTypes: ["sms", "website"],
          termsOfServiceUrl: "https://contoso.com/terms",
          url: "https://contoso.com/loyalty-program",
          callToActionUrl: "https://contoso.com/sign-up",
        },
        companyInformation: {
          address: "1 Contoso Way Redmond, WA 98052",
          name: "Contoso",
          url: "https://contoso.com",
          contactInformation: {
            email: "alex@contoso.com",
            name: "Alex",
            phone: "+14255551234",
          },
          customerCareInformation: {
            email: "customercare@contoso.com",
            tollFreeNumber: "+18005551234",
          },
        },
        messageDetails: {
          supportedProtocol: "sms",
          recurrence: "subscription",
          useCases: [
            {
              contentType: "marketingAndPromotion",
              examples: [{ messages: [{ direction: "fromUser", text: "txtMessage" }] }],
            },
            {
              contentType: "loyaltyProgram",
              examples: [{ messages: [{ direction: "toUser", text: "txtMessage" }] }],
            },
            {
              contentType: "sweepstakesOrContest",
              examples: [{ messages: [{ direction: "toUser", text: "txtMessage" }] }],
            },
          ],
          optInMessageToUser:
            "Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'",
          optInAnswerFromUser: "JOIN",
          optInConfirmationMessageToUser:
            "Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!",
          optOutAnswerToUser: "Reply STOP to unsubscribe.",
          helpAnswerToUser: "Reply HELP for help. Msg&Data rates may apply.",
          directionality: "twoWay",
        },
        trafficDetails: {
          totalMonthlyVolume: 10000,
          monthlyAverageMessagesFromUser: 1,
          monthlyAverageMessagesToUser: 3,
          estimatedRampUpTimeInDays: 50,
          isSpiky: true,
          spikeDetails:
            "Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.",
        },
      },
    };
    // @ts-preserve-whitespace
    // create program brief
    const createResponse = await client.upsertUSProgramBrief(programBriefId, programBriefRequest);
    // @ts-preserve-whitespace
    // submit program brief
    const submittedProgramBrief = await client.submitUSProgramBrief(programBriefId);
  });

  it("ReadmeSampleGetAndDeleteProgramBriefs", async () => {
    const credential = new DefaultAzureCredential();
    const client = new ShortCodesClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    // get all program briefs for a resource
    const programBriefs = client.listUSProgramBriefs();
    // @ts-preserve-whitespace
    // find draft program briefs, and delete them
    for await (const programBrief of programBriefs) {
      console.log(`Program Brief with Id ${programBrief.id} has status ${programBrief.status}`);
      // @ts-preserve-whitespace
      // identify drafts
      if (programBrief.status === "draft") {
        const unsubmittedProgramBriefId = programBrief.id;
        // @ts-preserve-whitespace
        // delete draft program brief
        const deleteResponse = await client.deleteUSProgramBrief(unsubmittedProgramBriefId);
      }
    }
  });

  it("ReadmeSampleGetAndUpdateProgramBrief", async () => {
    const credential = new DefaultAzureCredential();
    const client = new ShortCodesClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    // get a program briefs for a resource
    const programBriefId = "1b4411b7-edb0-44e7-9eca-dc7208b8d88c";
    const programBrief = await client.getUSProgramBrief(programBriefId);
    console.log(
      `Program brief with Id ${programBrief.id} has status ${programBrief.status} which was last updated ${programBrief.statusUpdatedDate}`,
    );
    // @ts-preserve-whitespace
    // update the program brief
    const updateRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
      body: {
        id: programBriefId,
        programDetails: {
          privacyPolicyUrl: "https://contoso.com/updated-privacy",
          termsOfServiceUrl: "https://contoso.com/updated-terms-of-service",
        },
      },
    };
    const upsertResponse = await client.upsertUSProgramBrief(programBriefId, updateRequest);
  });

  it("ReadmeSampleGetShortCodes", async () => {
    const credential = new DefaultAzureCredential();
    const client = new ShortCodesClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    // get all short codes for a resource
    const shortCodes = client.listShortCodes();
    // @ts-preserve-whitespace
    // print all short codes
    for await (const shortCode of shortCodes) {
      console.log(`${shortCode}`);
    }
  });

  it("ReadmeSampleGetShortCodeCosts", async () => {
    const credential = new DefaultAzureCredential();
    const client = new ShortCodesClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    // get all eligible short code costs for a resource
    const shortCodeCosts = client.listShortCodeCosts();
    // @ts-preserve-whitespace
    // print all short code costs
    for await (const shortCodeCost of shortCodeCosts) {
      console.log(`${shortCodeCost}`);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
