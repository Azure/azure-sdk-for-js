// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { USProgramBrief } from "../../../src";

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
      directionality: "twoWay",
      helpMessage: "Help Message",
      optOutMessage: "OUT"
    },
    trafficDetails: {
      totalMonthlyVolume: 10000,
      monthlyAverageMessagesFromUser: 1,
      monthlyAverageMessagesToUser: 3,
      isSpiky: true,
      spikeDetails:
        "Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day."
    }
  };

  return testUSProgramBrief;
}
