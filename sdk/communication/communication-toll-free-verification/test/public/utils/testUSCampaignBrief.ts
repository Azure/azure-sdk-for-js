// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "@azure/core-rest-pipeline";
import {
  BusinessInformationMapper,
  BusinessPointOfContactMapper,
  CampaignBrief,
  CampaignBriefSummary,
  TollFreeVerificationClient,
} from "../../../src";
import { assert } from "chai";
import { CompositeMapper } from "@azure/core-client";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { randomUUID } from "@azure/core-util";

export function getTestUSCampaignBrief(): {
  campaignBrief: CampaignBrief;
  campaignBriefSummary: CampaignBriefSummary;
} {
  let campaignBriefId = randomUUID();

  if (isPlaybackMode()) {
    campaignBriefId = "00000000-0000-0000-0000-000000000000";
  }

  const testUSCampaignBrief: CampaignBrief = {
    id: campaignBriefId,
    countryCode: "US",
    businessPointOfContact: {
      firstName: "poc",
      email: "poc@poc.com",
    },
    businessInformation: {
      companyName: "Contoso",
      companyUrl: "https://company.com",
      address: {
        addressLine1: "address1",
        addressLine2: "address2",
        locality: "citt",
        administrativeDivision: "Nevada",
        postalCode: "Company name",
        country: "US",
      },
    },
    useCaseInfo: {
      sampleMessages: ["message1", "message2", "message3"],
      useCase: "AppNotifications",
      useCaseSummary: "description",
    },
    phoneNumbers: ["+123456789", "+987654321", "+123321123"],
    additionalInformation: "additional information",
    optInDetails: {
      description: "opt in descrition",
      options: [
        {
          type: "keywordSMS",
          imageUrls: ["http://smsurl.com"],
        },
      ],
    },
  };

  const testUSCampaignBriefSummary: CampaignBriefSummary = {
    id: campaignBriefId,
    countryCode: "US",
    phoneNumbers: ["+123456789", "+987654321", "+123321123"],
    briefType: "tollfreeVerification",
    status: "draft",
  };

  return { campaignBrief: testUSCampaignBrief, campaignBriefSummary: testUSCampaignBriefSummary };
}

export function assertEditableFieldsAreEqual(
  expected: CampaignBrief,
  actual: CampaignBrief,
  messageContext: string,
): void {
  assert.equal(expected.id, actual.id, `Campaign brief Id is incorrect - ${messageContext}`);

  assertDeepEqualKnownFields(actual, expected, messageContext, [
    [(x) => x.businessInformation, BusinessInformationMapper, "Business Information do not match"],
    [
      (x) => x.businessPointOfContact,
      BusinessPointOfContactMapper,
      "Business Point of Contact does not match",
    ],
  ]);
}

export function assertCampaignBriefSummaryEditableFieldsAreEqual(
  expected: CampaignBriefSummary,
  actual: CampaignBriefSummary,
  messageContext: string,
): void {
  assert.equal(expected.id, actual.id, `Campaign brief Id is incorrect - ${messageContext}`);

  assertDeepEqualKnownFields(actual, expected, messageContext, []);
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

export async function doesCampaignBriefExist(
  client: TollFreeVerificationClient,
  id: string,
): Promise<boolean> {
  try {
    const campaignBrief = await client.getCampaignBrief(id, "US");
    if (campaignBrief.id === id) {
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
