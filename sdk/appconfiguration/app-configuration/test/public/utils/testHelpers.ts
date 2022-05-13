// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AppConfigurationClient, AppConfigurationClientOptions } from "../../../src";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  ConfigurationSetting,
  ListConfigurationSettingPage,
  ListRevisionsPage,
} from "../../../src";
import {
  Recorder,
  RecorderEnvironmentSetup,
  env,
  isPlaybackMode,
  record,
} from "@azure-tools/test-recorder";
import { assert } from "chai";

import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { RestError } from "@azure/core-rest-pipeline";

let connectionStringNotPresentWarning = false;
let tokenCredentialsNotPresentWarning = false;

export interface CredsAndEndpoint {
  credential: TokenCredential;
  endpoint: string;
}

export function startRecorder(that: Mocha.Context): Recorder {
  const recorderEnvSetup: RecorderEnvironmentSetup = {
    replaceableVariables: {
      APPCONFIG_CONNECTION_STRING:
        "Endpoint=https://myappconfig.azconfig.io;Id=123456;Secret=123456",
      AZ_CONFIG_ENDPOINT: "https://myappconfig.azconfig.io",
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azuretenantid",
    },
    customizationsOnRecordings: [],
    queryParametersToSkip: [],
  };

  return record(that, recorderEnvSetup);
}

export function getTokenAuthenticationCredential(): CredsAndEndpoint | undefined {
  const requiredEnvironmentVariables = [
    "AZ_CONFIG_ENDPOINT",
    "AZURE_CLIENT_ID",
    "AZURE_TENANT_ID",
    "AZURE_CLIENT_SECRET",
  ];

  for (const name of requiredEnvironmentVariables) {
    const value = env[name];

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
    endpoint: env["AZ_CONFIG_ENDPOINT"]!,
  };
}

export function createAppConfigurationClientForTests<
  Options extends AppConfigurationClientOptions = AppConfigurationClientOptions
>(options?: Options): AppConfigurationClient | undefined {
  const connectionString = env["APPCONFIG_CONNECTION_STRING"];

  if (connectionString == null) {
    if (!connectionStringNotPresentWarning) {
      connectionStringNotPresentWarning = true;
      console.log(
        "Functional tests not running - set APPCONFIG_CONNECTION_STRING to a valid AppConfig connection string to activate"
      );
    }
    return undefined;
  }

  return new AppConfigurationClient(connectionString, options);
}

export async function deleteKeyCompletely(
  keys: string[],
  client: AppConfigurationClient
): Promise<void> {
  const settingsIterator = client.listConfigurationSettings({
    keyFilter: keys.join(","),
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
): void {
  actual = actual.map((setting) => {
    return {
      key: setting.key,
      label: setting.label || undefined,
      value: setting.value,
      isReadOnly: setting.isReadOnly,
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
  } catch (err: any) {
    if (!(err instanceof Error)) {
      throw new Error("Error is not recognized");
    }
    if (err.name === "RestError") {
      const restError = err as RestError;
      assert.equal(expectedStatusCode, restError.statusCode, message);
      return err;
    }

    assert.fail(`${message}: Caught error but wasn't a RestError: ${err}`);
  }

  return new Error("We won't reach this - both cases above throw because of assert.fail()");
}

export async function assertThrowsAbortError(
  testFunction: () => Promise<any>,
  message = ""
): Promise<Error> {
  try {
    await testFunction();
    assert.fail(`${message}: No error thrown`);
  } catch (e: any) {
    if (!(e instanceof Error)) {
      throw new Error("Error is not recognized");
    }
    if (isPlaybackMode() && (e.name === "FetchError" || e.name === "AbortError")) {
      return e;
    } else {
      assert.equal(e.name, "AbortError");
      return e;
    }
  }
}
