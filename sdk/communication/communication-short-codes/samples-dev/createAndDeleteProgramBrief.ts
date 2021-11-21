// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Create and Submit a Program Brief (application for a short code)
 */

import {
  ShortCodesClient,
  ShortCodesUpsertUSProgramBriefOptionalParams
} from "@azure-tools/communication-short-codes";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Create and Submit Program Brief Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new ShortCodesClient(connectionString);

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
        signUpTypes: ["sms", "website"],
        termsOfServiceUrl: "https://contoso.com/terms",
        url: "https://contoso.com/loyalty-program",
        signUpUrl: "https://contoso.com/sign-up"
      },
      companyInformation: {
        address: "1 Contoso Way Redmond, WA 98052",
        name: "Contoso",
        url: "https://contoso.com",
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
        estimatedRampUpTimeInDays: 50,
        isSpiky: true,
        spikeDetails:
          "Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day."
      }
    }
  };

  // create program brief
  var createResponse = await client.upsertUSProgramBrief(programBriefId, programBriefRequest);
  if (createResponse._response.status != 201) {
    throw new Error(`Program brief creation failed.
    Status code: ${createResponse._response.status}; Error: ${
      createResponse._response.bodyAsText
    }; CV: ${createResponse._response.headers.get("MS-CV")}`);
  } else {
    console.log(`Successfully created a new program brief with Id ${programBriefId}.`);
  }

  // delete program brief
  var deleteResponse = await client.deleteUSProgramBrief(programBriefId);
  if (deleteResponse._response.status == 204) {
    console.log(`Successfully deleted draft program brief with Id ${programBriefId}`);
  } else {
    console.log(`Failed to delete draft program brief with Id ${programBriefId}.
          Status code: ${deleteResponse._response.status}; Error: ${
      deleteResponse._response.bodyAsText
    }; CV: ${deleteResponse._response.headers.get("MS-CV")}`);
  }
}

main().catch((error) => {
  console.log("The sample createAndDeleteProgramBrief encountered an error:", error);
  process.exit(1);
});
