// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
import { v4 as uuid } from "uuid";

const TestCompanyName: string = "Contoso";
const TestProgramBriefName: string = "Contoso Loyalty Program";

export function getTestUSProgramBrief(): USProgramBrief {
  const programBriefId = uuid();

  const testUSProgramBrief: USProgramBrief = {
    id: programBriefId,
    programDetails: {
      description:
        "TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.",
      isPoliticalCampaign: false,
      isVanity: false,
      name: TestProgramBriefName,
      numberType: "shortCode",
      privacyPolicyUrl: "https://contoso.com/privacy",
      callToActionTypes: ["sms", "website"],
      termsOfServiceUrl: "https://contoso.com/terms",
      url: "https://endpoint/loyalty-program",
      callToActionUrl: "https://contoso.com/sign-up",
    },
    companyInformation: {
      address: "1 Contoso Way Redmond, WA 98052",
      name: TestCompanyName,
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
  messageContext: string,
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
    errorMessage: string,
  ][],
): void {
  for (const comparison of comparisons) {
    assertDeepEqualKnownFieldsInternal(
      actual,
      expected,
      comparison[1],
      comparison[0],
      comparison[2],
      messageContext,
    );
  }
}

function assertDeepEqualKnownFieldsInternal(
  actual: any,
  expected: any,
  mapper: CompositeMapper,
  propertyToCompareExtractor: (object: any) => any,
  errorMessage: string,
  messageContext: string,
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
  id: string,
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

export async function runTestCleaningLeftovers(
  testProgramBriefIds: string[],
  client: ShortCodesClient,
  testLogic: () => Promise<void>,
): Promise<void> {
  try {
    await tryDeleteLeftOversFromPreviousTests(client);
    await testLogic();
  } catch (error) {
    for (let i = 0; i < testProgramBriefIds.length; i++) {
      await tryDeleteProgramBrief(testProgramBriefIds[i], client);
    }
    throw error;
  }
}

async function tryDeleteLeftOversFromPreviousTests(client: ShortCodesClient): Promise<void> {
  try {
    for await (const programBrief of client.listUSProgramBriefs()) {
      if (isLeftOver(programBrief) && isOldEnoughToDelete(programBrief)) {
        await tryDeleteProgramBrief(programBrief.id, client);
      }
    }
  } catch (error) {
    console.warn("Failed to delete left overs from previous tests", error);
  }
}

function isLeftOver(programBrief: USProgramBrief): boolean {
  return (
    programBrief.programDetails?.name?.toLowerCase() === TestProgramBriefName.toLocaleLowerCase() &&
    programBrief.companyInformation?.name?.toLowerCase() === TestCompanyName.toLowerCase()
  );
}

function isOldEnoughToDelete(programBrief: USProgramBrief): boolean {
  // Recording files are meant to be reused for a long time, which means that they will eventually
  // get desynchronized. In those cases, we don't want to try to delete anything.
  if (isPlaybackMode()) {
    return false;
  }

  if (!programBrief.statusUpdatedDate) {
    return false;
  }

  const howManyDaysSinceLastUpdate = getDateDifferenceInDays(programBrief.statusUpdatedDate);

  return howManyDaysSinceLastUpdate >= 1;
}

function getDateDifferenceInDays(date: Date): number {
  const now = new Date();

  const utcThis = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds(),
  );
  const utcOther = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );

  return (utcThis - utcOther) / 86400000;
}

async function tryDeleteProgramBrief(id: string, client: ShortCodesClient): Promise<void> {
  try {
    await client.deleteUSProgramBrief(id);
  } catch (error) {
    console.warn("Failed to delete program brief", error);
  }
}
