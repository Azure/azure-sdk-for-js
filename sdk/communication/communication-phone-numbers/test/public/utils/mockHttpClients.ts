// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpClient,
  HttpHeaders,
  PipelineRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";
import { PurchasedPhoneNumber } from "../../../src";
import { PurchasedPhoneNumbers } from "../../../src/generated/src/models";

export const createMockHttpClient = <T = Record<string, unknown>>(
  status: number = 200,
  parsedBody?: T,
  headers?: HttpHeaders
): HttpClient => {
  return {
    async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      return {
        status,
        request,
        headers: headers ?? request.headers,
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
    operatorId: "1",
    operatorName: "Microsoft",
    phoneNumberSource: "operatorConnect",
  }
);

export const mockListPhoneNumbersHttpClient = createMockHttpClient<PurchasedPhoneNumbers>(200, {
  phoneNumbers: [
    {
      id: "16155550100",
      phoneNumber: "+16155550100",
      countryCode: "US",
      assignmentType: "application",
      phoneNumberType: "tollFree",
      capabilities: {
        calling: "inbound+outbound",
        sms: "inbound",
      },
      purchaseDate: new Date(),
      cost: {
        amount: 0.8,
        currencyCode: "USD",
        billingFrequency: "monthly",
      },
      operatorId: "1",
      operatorName: "Microsoft",
      phoneNumberSource: "operatorConnect",
    },
  ],
  nextLink: "/phoneNumbers?api-version=2022-06-01-preview&skip=1&top=1",
});
