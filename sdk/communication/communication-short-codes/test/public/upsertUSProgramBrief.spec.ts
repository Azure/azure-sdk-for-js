// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ShortCodesClient, ShortCodesUpsertUSProgramBriefOptionalParams } from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[true, false]], async function(useAad) {
  describe(`ShortCodesClient - upsert US Program Brief${useAad ? " [AAD]" : ""}`, function() {
    let recorder: Recorder;
    let client: ShortCodesClient;

    beforeEach(function(this: Context) {
      ({ client, recorder } = useAad
        ? createRecordedClientWithToken(this)!
        : createRecordedClient(this));
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("can upsert a US Program Brief", async function() {
      const programBriefId = "todo: generate guid";
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
            signUpTypes: ["sms", "website"],
            termsOfServiceUrl: "https://contoso.com/terms",
            url: "https://contoso.com/loyalty-program"
          },
          companyInformation: {
            address: "1 Contoso Way Redmond, WA 98052",
            name: "Contoso",
            url: "contoso.com",
            contactInformation: {
              email: "alex@contoso.com",
              name: "Alex",
              phone: "+14255551234"
            },
            customerCareInformation: {
              email: "customercare@contoso.com",
              tollFreeNumber: "+18005551234"
            }
          },
          messageDetails: {
            supportedProtocols: ["sms"],
            recurrence: "subscription",
            useCases: [
              {
                contentCategory: "coupons",
                examples: [{ messages: [{ direction: "fromUser", text: "txtMessage" }] }]
              },
              {
                contentCategory: "loyaltyProgram",
                examples: [{ messages: [{ direction: "toUser", text: "txtMessage" }] }]
              },
              {
                contentCategory: "loyaltyProgramPointsPrizes",
                examples: [{ messages: [{ direction: "toUser", text: "txtMessage" }] }]
              }
            ],
            optInMessage:
              "Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'",
            optInReply: "JOIN",
            confirmationMessage:
              "Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!",
            directionality: "twoWay"
          },
          trafficDetails: {
            totalMonthlyVolume: 10000,
            monthlyAverageMessagesFromUser: 1,
            monthlyAverageMessagesToUser: 3,
            isSpiky: true,
            spikeDetails:
              "Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day."
          }
        }
      };

      const submitRes = await client.upsertUSProgramBrief(programBriefId, programBriefRequest);
      assert.isOk(submitRes);
    }).timeout(60000);
  });
});
