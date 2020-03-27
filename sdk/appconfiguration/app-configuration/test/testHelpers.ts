// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AppConfigurationClient, AppConfigurationClientOptions } from "../src";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ConfigurationSetting, ListConfigurationSettingPage, ListRevisionsPage } from "../src";
import * as assert from "assert";

// allow loading from a .env file as an alternative to defining the variable
// in the environment
import * as dotenv from "dotenv";
import { RestError } from "@azure/core-http";
import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { InternalAppConfigurationClientOptions } from "../src/appConfigurationClient";
dotenv.config();

let connectionStringNotPresentWarning = false;
let tokenCredentialsNotPresentWarning = false;

export interface CredsAndEndpoint {
  credential: TokenCredential;
  endpoint: string;
}

export function getTokenAuthenticationCredential(): CredsAndEndpoint | undefined {
  const requiredEnvironmentVariables = [
    "AZ_CONFIG_ENDPOINT",
    "AZURE_CLIENT_ID",
    "AZURE_TENANT_ID",
    "AZURE_CLIENT_SECRET"
  ];

  for (const name of requiredEnvironmentVariables) {
    const value = process.env[name];

    if (value == null) {
      if (tokenCredentialsNotPresentWarning) {
        tokenCredentialsNotPresentWarning = true;
        console.log("Functional tests not running - set client identity variables to activate");
      }

      return undefined;
    }
  }

  return {
    credential: new DefaultAzureCredential(),
    endpoint: process.env["AZ_CONFIG_ENDPOINT"]!
  };
}

export function createAppConfigurationClientForTests(
  options?: InternalAppConfigurationClientOptions
): AppConfigurationClient | undefined {
  const connectionString = process.env["AZ_CONFIG_CONNECTION"];

  if (connectionString == null) {
    if (!connectionStringNotPresentWarning) {
      connectionStringNotPresentWarning = true;
      console.log(
        "Functional tests not running - set AZ_CONFIG_CONNECTION to a valid AppConfig connection string to activate"
      );
    }
    return undefined;
  }

  return new AppConfigurationClient(connectionString, options);
}

export async function deleteKeyCompletely(keys: string[], client: AppConfigurationClient) {
  const settingsIterator = await client.listConfigurationSettings({
    keyFilter: keys.join(",")
  });

  for await (const setting of settingsIterator) {
    if (setting.isReadOnly) {
      await client.setReadOnly(setting, false);
    }

    await client.deleteConfigurationSetting({ key: setting.key, label: setting.label });
  }
}

export async function toSortedArray(
  pagedIterator: PagedAsyncIterableIterator<
    ConfigurationSetting,
    ListConfigurationSettingPage | ListRevisionsPage
  >,
  compareFn?: (a: ConfigurationSetting, b: ConfigurationSetting) => number
): Promise<ConfigurationSetting[]> {
  const settings: ConfigurationSetting[] = [];

  for await (const setting of pagedIterator) {
    settings.push(setting);
  }

  let settingsViaPageIterator: ConfigurationSetting[] = [];

  for await (const page of pagedIterator.byPage()) {
    settingsViaPageIterator = settingsViaPageIterator.concat(page.items);
  }

  // just a sanity-check
  assert.deepEqual(settings, settingsViaPageIterator);

  settings.sort((a, b) =>
    compareFn
      ? compareFn(a, b)
      : `${a.key}-${a.label}-${a.value}`.localeCompare(`${b.key}-${b.label}-${b.value}`)
  );

  return settings;
}

export function assertEqualSettings(
  expected: Pick<ConfigurationSetting, "key" | "value" | "label" | "isReadOnly">[],
  actual: ConfigurationSetting[]
) {
  actual = actual.map((setting) => {
    return {
      key: setting.key,
      label: setting.label,
      value: setting.value,
      isReadOnly: setting.isReadOnly
    };
  });

  assert.deepEqual(expected, actual);
}

export async function assertThrowsRestError(
  testFunction: () => Promise<any>,
  expectedStatusCode: number,
  message: string = ""
): Promise<Error> {
  try {
    await testFunction();
    assert.fail(`${message}: No error thrown`);
  } catch (err) {
    if (err instanceof RestError) {
      assert.equal(expectedStatusCode, err.statusCode, message);
      return err;
    }

    assert.fail(`${message}: Caught error but wasn't a RestError: ${err}`);
  }

  return new Error("We won't reach this - both cases above throw because of assert.fail()");
}

export async function assertThrowsAbortError(testFunction: () => Promise<any>, message = "") {
  try {
    await testFunction();
    assert.fail(`${message}: No error thrown`);
  } catch (e) {
    assert.equal(e.name, "AbortError");
    return e;
  }
}
