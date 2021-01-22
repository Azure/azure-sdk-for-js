// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  AcquiredPhoneNumber,
  GetPhoneNumberOptions,
  ListPhoneNumbersOptions,
  PhoneNumbersClient
} from "../../src";
import {
  getPhoneNumberHttpClient,
  listPhoneNumbersHttpClient,
} from "./mockHttpClients";

export class TestPhoneNumbersClient {
  private connectionString: string = "endpoint=https://contoso.spool.azure.local;accesskey=banana";

  public getPhoneNumber(
    phoneNumber: string,
    options: GetPhoneNumberOptions = {}
  ): Promise<AcquiredPhoneNumber> {
    const client = new PhoneNumbersClient(this.connectionString, {
      httpClient: getPhoneNumberHttpClient
    });

    return client.getPhoneNumber(phoneNumber, options);
  }

  public listPhoneNumbersTest(
    options: ListPhoneNumbersOptions = {}
  ): PagedAsyncIterableIterator<AcquiredPhoneNumber> {
    const client = new PhoneNumbersClient(this.connectionString, {
      httpClient: listPhoneNumbersHttpClient
    });

    return client.listPhoneNumbers(options);
  }
}
