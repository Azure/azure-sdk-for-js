// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AppConfigurationClient } from "../src";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ConfigurationSetting, ListConfigurationSettingPage, ListRevisionsPage } from "../src";
import * as assert from "assert";

// allow loading from a .env file as an alternative to defining the variable
// in the environment
import * as dotenv from "dotenv";
import { RestError } from '@azure/core-http';
dotenv.config();

export function getConnectionStringFromEnvironment(): string {
  const connectionString = process.env["AZ_CONFIG_CONNECTION"]!;

  if (connectionString == null) {
    throw Error(
      `No connection string in environment - set AZ_CONFIG_CONNECTION with a connection string for your AppConfiguration instance.`
    );
  }

  return connectionString;
}

export async function deleteKeyCompletely(keys: string[], client: AppConfigurationClient) {
  const settingsIterator = await client.listConfigurationSettings({
    keys: keys
  });

  for await (const setting of settingsIterator) {
    if (setting.locked) {
      await client.clearReadOnly(setting);
    }

    await client.deleteConfigurationSetting(setting.key, { label: setting.label });
  }
}

export async function toSortedArray(
  pagedIterator: PagedAsyncIterableIterator<
    ConfigurationSetting,
    ListConfigurationSettingPage | ListRevisionsPage
  >
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
    `${a.key}-${a.label}-${a.value}`.localeCompare(`${b.key}-${b.label}-${b.value}`)
  );

  return settings;
}

export function assertEqualSettings(
  expected: Pick<ConfigurationSetting, "key" | "value" | "label">[],
  actual: ConfigurationSetting[]
) {
  actual = actual.map((setting) => {
    return { key: setting.key, label: setting.label, value: setting.value };
  });
  assert.deepEqual(expected, actual);
}

export async function assertThrowsRestError(testFunction: () => Promise<any>, expectedStatusCode: number, message: string) : Promise<void> {
  try {
    await testFunction();
    assert.fail("No error thrown");
  } catch (err) {
    if (err instanceof RestError) {
      assert.equal(expectedStatusCode, err.statusCode);
      return;
    }

    assert.fail(`${message}: Caught error: ${err}`);
  }
}
