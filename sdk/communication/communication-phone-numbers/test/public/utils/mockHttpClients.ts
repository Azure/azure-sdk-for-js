// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createHttpHeaders,
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
  }
);

function createMockSearchResponseHeaders(): HttpHeaders {
  const headers = createHttpHeaders();
  headers.set(
    "Operation-Location",
    "/phoneNumbers/operations/search_378ddf60-81be-452a-ba4f-613198ea6c28"
  );
  headers.set(
    "Location",
    "/availablePhoneNumbers/searchResults/378ddf60-81be-452a-ba4f-613198ea6c28"
  );
  headers.set("operation-id", "search_378ddf60-81be-452a-ba4f-613198ea6c28");
  headers.set("search-id", "378ddf60-81be-452a-ba4f-613198ea6c28");
  return headers;
}
export const mockSearchHttpClient = createMockHttpClient(
  202,
  null,
  createMockSearchResponseHeaders()
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
    },
  ],
  nextLink: "/phoneNumbers?api-version=2022-01-11-preview2&skip=1&top=1",
});
