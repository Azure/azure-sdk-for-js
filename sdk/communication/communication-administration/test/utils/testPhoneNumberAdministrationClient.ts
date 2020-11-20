// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  AcquiredPhoneNumber,
  ListPhoneNumbersOptions,
  ListPhonePlansOptions,
  ListPhonePlansRequest,
  ListPhonePlanGroupsOptions,
  ListSupportedCountriesOptions,
  PageableOptions,
  PhoneNumberAdministrationClient,
  PhoneNumberCountry,
  PhoneNumberEntity,
  PhonePlan,
  PhonePlanGroup,
  ConfigurePhoneNumberRequest,
  ConfigurePhoneNumberOptions,
  VoidResponse,
  PhoneNumberCapabilitiesUpdates,
  UpdateCapabilitiesOptions,
  UpdateNumbersCapabilitiesResponse,
  GetCapabilitiesUpdateResponse,
  GetAreaCodesRequest,
  GetAreaCodesOptions,
  GetAreaCodesResponse,
  GetCapabilitiesUpdateOptions,
  UnconfigurePhoneNumberOptions
} from "../../src";
import {
  baseHttpClient,
  getAreaCodesHttpClient,
  listPhoneNumbersHttpClient,
  listPhonePlanGroupsHttpClient,
  listPhonePlansHttpClient,
  listReleasesOrSearchesHttpClient,
  listSupportedCountriesHttpClient,
  phoneNumbersCapabilitiesHttpClient
} from "./mockHttpClients";

export class TestPhoneNumberAdministrationClient {
  private connectionString: string = "endpoint=https://contoso.spool.azure.local;accesskey=banana";

  public listPhoneNumbersTest(
    options: ListPhoneNumbersOptions = {}
  ): PagedAsyncIterableIterator<AcquiredPhoneNumber> {
    const client = new PhoneNumberAdministrationClient(this.connectionString, {
      httpClient: listPhoneNumbersHttpClient
    });

    return client.listPhoneNumbers(options);
  }

  public listSupportedCountriesTest(
    options: ListSupportedCountriesOptions = {}
  ): PagedAsyncIterableIterator<PhoneNumberCountry> {
    const client = new PhoneNumberAdministrationClient(this.connectionString, {
      httpClient: listSupportedCountriesHttpClient
    });

    return client.listSupportedCountries(options);
  }

  public listPhonePlanGroupsTest(
    countryCode: string,
    options: ListPhonePlanGroupsOptions = {}
  ): PagedAsyncIterableIterator<PhonePlanGroup> {
    const client = new PhoneNumberAdministrationClient(this.connectionString, {
      httpClient: listPhonePlanGroupsHttpClient
    });

    return client.listPhonePlanGroups(countryCode, options);
  }

  public listPhonePlansTest(
    planGroupInfo: ListPhonePlansRequest,
    options: ListPhonePlansOptions = {}
  ): PagedAsyncIterableIterator<PhonePlan> {
    const client = new PhoneNumberAdministrationClient(this.connectionString, {
      httpClient: listPhonePlansHttpClient
    });

    return client.listPhonePlans(planGroupInfo, options);
  }

  public listReleasesTest(
    options: PageableOptions = {}
  ): PagedAsyncIterableIterator<PhoneNumberEntity> {
    const client = new PhoneNumberAdministrationClient(this.connectionString, {
      httpClient: listReleasesOrSearchesHttpClient
    });

    return client.listReleases(options);
  }

  public listSearchesTest(
    options: PageableOptions = {}
  ): PagedAsyncIterableIterator<PhoneNumberEntity> {
    const client = new PhoneNumberAdministrationClient(this.connectionString, {
      httpClient: listReleasesOrSearchesHttpClient
    });

    return client.listSearches(options);
  }

  public async configurePhoneNumberTest(
    config: ConfigurePhoneNumberRequest,
    options: ConfigurePhoneNumberOptions = {}
  ): Promise<VoidResponse> {
    const client = new PhoneNumberAdministrationClient(this.connectionString, {
      httpClient: baseHttpClient
    });

    return client.configurePhoneNumber(config, options);
  }

  public async unconfigurePhoneNumberTest(
    phoneNumber: string,
    options: UnconfigurePhoneNumberOptions = {}
  ): Promise<VoidResponse> {
    const client = new PhoneNumberAdministrationClient(this.connectionString, {
      httpClient: baseHttpClient
    });

    return client.unconfigurePhoneNumber(phoneNumber, options);
  }

  public async updatePhoneNumberCapabilitiesTest(
    phoneNumberCapabilitiesUpdates: PhoneNumberCapabilitiesUpdates,
    options: UpdateCapabilitiesOptions = {}
  ): Promise<UpdateNumbersCapabilitiesResponse> {
    const client = new PhoneNumberAdministrationClient(this.connectionString, {
      httpClient: phoneNumbersCapabilitiesHttpClient
    });

    return client.updatePhoneNumbersCapabilities(phoneNumberCapabilitiesUpdates, options);
  }

  public async getCapabilitiesUpdateTest(
    capabilitiesUpdateId: string,
    options: GetCapabilitiesUpdateOptions = {}
  ): Promise<GetCapabilitiesUpdateResponse> {
    const client = new PhoneNumberAdministrationClient(this.connectionString, {
      httpClient: phoneNumbersCapabilitiesHttpClient
    });

    return client.getCapabilitiesUpdate(capabilitiesUpdateId, options);
  }

  public async getAreaCodesTest(
    request: GetAreaCodesRequest,
    options: GetAreaCodesOptions = {}
  ): Promise<GetAreaCodesResponse> {
    const client = new PhoneNumberAdministrationClient(this.connectionString, {
      httpClient: getAreaCodesHttpClient
    });

    return client.getAreaCodes(request, options);
  }
}
