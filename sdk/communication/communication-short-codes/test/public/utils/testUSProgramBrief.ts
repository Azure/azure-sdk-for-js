// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-rest-pipeline";
import { ShortCodesClient } from "../../../src";
import { USProgramBrief } from "../../../src";
import { assert } from "chai";

export function getTestUSProgramBrief(): USProgramBrief {
  const testUSProgramBrief: USProgramBrief = {
    id: "00000000-0000-0000-0000-000000000000",
    programDetails: {
      description:
        "TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.",
      isPoliticalCampaign: false,
      isVanity: false,
      name: "Contoso Loyalty Program",
      numberType: "shortCode",
      privacyPolicyUrl: "https://contoso.com/privacy",
      signUpTypes: ["sms", "website"],
      termsOfServiceUrl: "https://contoso.com/terms",
      url: "https://endpoint/loyalty-program",
      signUpUrl: "https://contoso.com/sign-up",
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
      supportedProtocols: ["sms"],
      recurrence: "subscription",
      useCases: [
        {
          contentCategory: "coupons",
          examples: [{ messages: [{ direction: "fromUser", text: "txtMessage" }] }],
        },
        {
          contentCategory: "loyaltyProgram",
          examples: [{ messages: [{ direction: "toUser", text: "txtMessage" }] }],
        },
        {
          contentCategory: "loyaltyProgramPointsPrizes",
          examples: [{ messages: [{ direction: "toUser", text: "txtMessage" }] }],
        },
      ],
      optInMessage:
        "Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'",
      optInReply: "JOIN",
      confirmationMessage:
        "Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!",
      directionality: "twoWay",
      helpMessage: "Send 'Stop' to unsubscribe, send 'Start' to resubscribe.",
      optOutMessage:
        "You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.",
    },
    trafficDetails: {
      estimatedRampUpTimeInDays: 0,
      totalMonthlyVolume: 10000,
      monthlyAverageMessagesFromUser: 1,
      monthlyAverageMessagesToUser: 3,
      isSpiky: true,
      spikeDetails:
        "Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.",
    },
  };

  return testUSProgramBrief;
}

export function assertEditableFieldsAreEqual(
  expected: USProgramBrief,
  actual: USProgramBrief,
  messageContext: string
): void {
  assert.equal(expected.id, actual.id, `Program brief Id is incorrect - ${messageContext}`);
  assert.deepEqual(
    expected.programDetails,
    actual.programDetails,
    `Program Details do not match - ${messageContext}`
  );
  assert.deepEqual(
    expected.companyInformation,
    actual.companyInformation,
    `Company Information does not match - ${messageContext}`
  );
  assert.deepEqual(
    expected.messageDetails,
    actual.messageDetails,
    `Message Details do not match - ${messageContext}`
  );
  assert.deepEqual(
    expected.trafficDetails,
    actual.trafficDetails,
    `Traffic Details do not match - ${messageContext}`
  );
}

export async function doesProgramBriefExist(
  client: ShortCodesClient,
  id: string
): Promise<boolean> {
  try {
    const programBrief = await client.getUSProgramBrief(id);
    if (programBrief.id === id) {
      return true;
    } else {
      return false;
    }
  } catch (e: any) {
    const error = e as RestError;
    if (error.statusCode === 404) {
      return false;
    }
    throw e;
  }
}
