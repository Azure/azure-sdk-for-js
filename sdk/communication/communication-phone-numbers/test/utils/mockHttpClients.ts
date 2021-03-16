// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, WebResourceLike, HttpOperationResponse } from "@azure/core-http";
import { PurchasedPhoneNumber } from "../../src";

export const createMockHttpClient = <T = {}>(status: number = 200, parsedBody?: T): HttpClient => {
  return {
    async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
      return {
        status,
        request,
        headers: request.headers,
        parsedBody
      };
    }
  };
};

export const getPhoneNumberHttpClient: HttpClient = createMockHttpClient<PurchasedPhoneNumber>(
  200,
  {
    id: "+18005550100",
    phoneNumber: "+18005550100",
    countryCode: "US",
    phoneNumberType: "geographic",
    assignmentType: "person",
    purchaseDate: new Date(),
    capabilities: {
      sms: "inbound+outbound",
      calling: "none"
    },
    cost: {
      amount: 5,
      currencyCode: "USD",
      billingFrequency: "monthly"
    }
  }
);
