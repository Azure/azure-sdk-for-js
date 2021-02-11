// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, WebResourceLike, HttpOperationResponse, HttpHeaders } from "@azure/core-http";
import {
  AcquiredPhoneNumber,
  AcquiredPhoneNumbers,
  AreaCodes,
  PhoneNumberCountries,
  PhoneNumberCountry,
  PhoneNumberEntities,
  PhoneNumberEntity,
  PhonePlan,
  PhonePlanGroup,
  PhonePlanGroups,
  PhonePlansResponse,
  UpdateNumberCapabilitiesResponse
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

const phoneNumbers: AcquiredPhoneNumber[] = [
  {
    phoneNumber: "+18005551234",
    acquiredCapabilities: ["Calling"],
    availableCapabilities: ["Calling"]
  },
  {
    phoneNumber: "+18005555555",
    acquiredCapabilities: ["Azure"],
    availableCapabilities: ["Premium"]
  },
  {
    phoneNumber: "+18005559876",
    acquiredCapabilities: ["Calling"],
    availableCapabilities: ["Azure"]
  }
];

export const listPhoneNumbersHttpClient: HttpClient = createMockHttpClient<AcquiredPhoneNumbers>(
  200,
  { phoneNumbers }
);

const countries: PhoneNumberCountry[] = [
  {
    localizedName: "France",
    countryCode: "FR"
  },
  {
    localizedName: "Canada",
    countryCode: "CA"
  }
];

export const listSupportedCountriesHttpClient: HttpClient = createMockHttpClient<
  PhoneNumberCountries
>(200, {
  countries
});

const phonePlanGroups: PhonePlanGroup[] = [
  {
    phonePlanGroupId: "1",
    localizedName: "France",
    localizedDescription: "The #1 plan."
  },
  {
    phonePlanGroupId: "2",
    localizedName: "France",
    localizedDescription: "The #2 plan."
  }
];

export const listPhonePlanGroupsHttpClient: HttpClient = createMockHttpClient<PhonePlanGroups>(
  200,
  { phonePlanGroups }
);

const phonePlans: PhonePlan[] = [
  {
    phonePlanId: "1",
    localizedName: "France",
    locationType: "NotRequired"
  },
  {
    phonePlanId: "2",
    localizedName: "France",
    locationType: "CivicAddress"
  }
];

export const listPhonePlansHttpClient: HttpClient = createMockHttpClient<PhonePlansResponse>(200, {
  phonePlans
});

const entities: PhoneNumberEntity[] = [{ id: "1" }, { id: "2" }, { id: "3" }];

export const listReleasesOrSearchesHttpClient: HttpClient = createMockHttpClient<
  PhoneNumberEntities
>(200, { entities });

export const phoneNumbersCapabilitiesHttpClient: HttpClient = createMockHttpClient<
  UpdateNumberCapabilitiesResponse
>(200, { capabilitiesUpdateId: "1" });

const areaCodes: AreaCodes = {
  primaryAreaCodes: ["555", "555"],
  secondaryAreaCodes: ["555"]
};

export const getAreaCodesHttpClient: HttpClient = createMockHttpClient<AreaCodes>(200, areaCodes);
