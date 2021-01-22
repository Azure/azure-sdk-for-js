// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, WebResourceLike, HttpOperationResponse, HttpHeaders } from "@azure/core-http";
import {
  AcquiredPhoneNumber,
} from "../../src";

export const createMockHttpClient = <T = {}>(status: number = 200, parsedBody?: T): HttpClient => {
  return {
    async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
      return {
        status,
        headers: new HttpHeaders(),
        request: httpRequest,
        parsedBody
      };
    }
  };
};

export const baseHttpClient: HttpClient = createMockHttpClient();

export const base202HttpClient: HttpClient = createMockHttpClient(202);

export const getPhoneNumberHttpClient: HttpClient = createMockHttpClient<AcquiredPhoneNumber>(200, {
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
    callbackUri: "http://calbackuri",
    applicationId: "phoneNumbersClient-test",
    cost: {
      amount: 5,
      currencyCode: "USD",
      billingFrequency: "monthly"
    }
});

const phoneNumbers: AcquiredPhoneNumber[] = [
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
    callbackUri: "http://calbackuri",
    applicationId: "phoneNumbersClient-test",
    cost: {
      amount: 5,
      currencyCode: "USD",
      billingFrequency: "monthly"
    }
  },
  {
    id: "+18005550101",
    phoneNumber: "+18005550101",
    countryCode: "US",
    phoneNumberType: "geographic",
    assignmentType: "person",
    purchaseDate: new Date(),
    capabilities: {
      sms: "inbound+outbound",
      calling: "none"
    },
    callbackUri: "http://calbackuri",
    applicationId: "phoneNumbersClient-test",
    cost: {
      amount: 5,
      currencyCode: "USD",
      billingFrequency: "monthly"
    }
  },
  {
    id: "+18005550102",
    phoneNumber: "+18005550102",
    countryCode: "US",
    phoneNumberType: "geographic",
    assignmentType: "person",
    purchaseDate: new Date(),
    capabilities: {
      sms: "inbound+outbound",
      calling: "none"
    },
    callbackUri: "http://calbackuri",
    applicationId: "phoneNumbersClient-test",
    cost: {
      amount: 5,
      currencyCode: "USD",
      billingFrequency: "monthly"
    }
  }
];

export const listPhoneNumbersHttpClient: HttpClient = createMockHttpClient<AcquiredPhoneNumber[]>(200, phoneNumbers);
