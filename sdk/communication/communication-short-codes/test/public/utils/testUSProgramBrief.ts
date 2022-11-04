// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-rest-pipeline";
import {
  CompanyInformationMapper,
  MessageDetailsMapper,
  ProgramDetailsMapper,
  ShortCodesClient,
  TrafficDetailsMapper,
  USProgramBrief,
} from "../../../src";
import { assert } from "chai";
import { CompositeMapper } from "@azure/core-client";
import { isPlaybackMode } from "@azure-tools/test-recorder";

// We'd like to make sure that tests can safely run concurrently while avoiding
// generating a lot of leftovers.
const testProgramBriefIds = [
  "aaf617ef-4f1c-4910-b406-a0ec4eff5b8d",
  "453e2fde-ede2-4dbd-bcfb-e8d79bb1c958",
  "a3f5937b-5b70-49fe-9de2-6a7465568734",
  "736b678a-e356-4194-9a6a-e30d9e471d7b",
  "bbc06fea-73ea-4332-b934-4a72a3c36553",
  "c1d88c44-7981-48c6-824e-f12330eaefe5",
  "0722b4ea-7bb0-4e84-803d-a4dba7c920e5",
  "0f2e455c-1ad4-4411-8b16-631a3202d44c",
  "0257a0c6-5f86-4860-876b-581671748b40",
  "67a426b4-0459-435b-bc29-ca0e0c9e9102",
  "9d787bd6-07fc-4c7b-8e57-17f1fee41298",
  "6693970a-3acf-4676-bb73-ce093292e6ba",
  "2f9708ca-1390-48d9-9ed5-84c948b5d2f7",
  "8d8691b9-ec99-4738-ad5d-bd8c46a4cb13",
  "59c6feea-7ccf-42d3-8e01-72218d73f4b6",
  "36927137-86ff-4e70-a2bf-4d6fcac45aa7",
  "e2f9cd08-a4a0-4d2b-b6c4-1cfec2491b94",
  "8525cd73-a1c9-479e-b1b8-fa90e794ea9a",
  "5832ba0c-146b-4d21-8f84-861c3cab6228",
  "d8c5e51b-405e-4342-8a9f-d8eaf1eec4f7",
  "d37f4f57-05f0-4d2a-bfd9-56048dc98050",
  "e805485e-bd80-4c3c-900a-b2b941c61f5d",
  "18475e1e-f4da-4316-a803-d08a6d7adc6c",
  "25667567-e42c-4ff7-a1e7-de56058a9fce",
  "e0325a41-ae95-4df0-8905-91e727a83dcf",
  "e8f1aac8-0237-45f8-95cb-75a5fe90f12b",
  "46e217b6-1ca7-4c8f-946e-5ae28f7986df",
  "db5ad6d1-ae0d-40d4-b622-a105ec1a058a",
  "beab811a-a6c6-49f3-bf14-549657b14b24",
  "5b766f36-91e5-4beb-a05d-74ba8eb7b0bd",
];

export function getTestUSProgramBrief(): USProgramBrief {
  const randomTestId = testProgramBriefIds[Math.floor(Math.random() * testProgramBriefIds.length)];

  const testUSProgramBrief: USProgramBrief = {
    id: isPlaybackMode() ? "9d787bd6-07fc-4c7b-8e57-17f1fee41298" : randomTestId,
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
    [(x) => x.programDetails, ProgramDetailsMapper, "Program Details do not match"],
    [(x) => x.companyInformation, CompanyInformationMapper, "Company Information does not match"],
    [(x) => x.messageDetails, MessageDetailsMapper, "Message Details do not match"],
    [(x) => x.trafficDetails, TrafficDetailsMapper, "Traffic Details do not match"],
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
): void {
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
): void {
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
