// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-rest-pipeline";
import { ShortCodesClient } from "../../../src";
import { USProgramBrief } from "../../../src";
import { assert } from "chai";
import {
  CompanyInformation,
  MessageDetails,
  ProgramDetails,
  TrafficDetails,
} from "../../../src/generated/src/models/mappers";
import { CompositeMapper } from "@azure/core-client";

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
      callToActionTypes: ["sms", "website"],
      termsOfServiceUrl: "https://contoso.com/terms",
      url: "https://endpoint/loyalty-program",
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
      directionality: "twoWay",
      helpAnswerToUser: "Send 'Stop' to unsubscribe, send 'Start' to resubscribe.",
      optOutAnswerToUser:
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

  assertDeepEqualKnownFields(actual, expected, messageContext, [
    [(x) => x.programDetails, ProgramDetails, "Program Details do not match"],
    [(x) => x.companyInformation, CompanyInformation, "Company Information does not match"],
    [(x) => x.messageDetails, MessageDetails, "Message Details do not match"],
    [(x) => x.trafficDetails, TrafficDetails, "Traffic Details do not match"],
  ]);
}

/**
 * The API may return additional fields, other than the ones present in the swagger file.
 * This leads the call to assert.deepEqual to fail, since the two objects aren't the same
 * (one will have more properties than the other). This method ensures that, when comparing
 * two objects, only the fields present in BOTH objects are used for the comparison.
 */
function assertDeepEqualKnownFields(
  actual: any,
  expected: any,
  messageContext: string,
  comparisons: [
    propertyToCompareExtractor: (object: any) => any,
    mapper: CompositeMapper,
    errorMessage: string
  ][]
) {
  for (const comparison of comparisons) {
    assertDeepEqualKnownFieldsInternal(
      actual,
      expected,
      comparison[1],
      comparison[0],
      comparison[2],
      messageContext
    );
  }
}

function assertDeepEqualKnownFieldsInternal(
  actual: any,
  expected: any,
  mapper: CompositeMapper,
  propertyToCompareExtractor: (object: any) => any,
  errorMessage: string,
  messageContext: string
) {
  const mappedActual = mapKnownFields(propertyToCompareExtractor(actual), mapper);
  const mappedExpected = mapKnownFields(propertyToCompareExtractor(expected), mapper);

  assert.deepEqual(mappedActual, mappedExpected, `${errorMessage} - ${messageContext}`);
}

function mapKnownFields<TMapper extends CompositeMapper>(object: any, mapper: TMapper): any {
  const mapped: any = {};
  const keys = Object.keys(<any>mapper.type.modelProperties);

  for (const modelPropertyName of keys) {
    mapped[modelPropertyName] = object[modelPropertyName];
  }

  return mapped;
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
