// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { PurchasedPhoneNumber } from "../../../src";

export const createMockHttpClient = <T = Record<string, unknown>>(
  status: number = 200,
  parsedBody?: T
): HttpClient => {
  return {
    async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      return {
        status,
        request,
        headers: request.headers,
        bodyAsText: JSON.stringify(parsedBody),
      };
    },
  };
};

export const getPhoneNumberHttpClient: HttpClient = createMockHttpClient<PurchasedPhoneNumber>(
  200,
  {
    id: "16155550100",
    phoneNumber: "+16155550100",
    countryCode: "US",
    phoneNumberType: "geographic",
    assignmentType: "person",
    purchaseDate: new Date(),
    capabilities: {
      sms: "inbound+outbound",
      calling: "none",
    },
    cost: {
      amount: 5,
      currencyCode: "USD",
      billingFrequency: "monthly",
    },
  }
);
