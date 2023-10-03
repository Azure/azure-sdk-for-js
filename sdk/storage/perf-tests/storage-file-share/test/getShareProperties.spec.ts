// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { StorageFileShareTest } from "./storageTest.spec";

export class StorageShareGetPropertiesTest extends StorageFileShareTest<{}> {
  public options: PerfOptionDictionary<{}> = {};

  async run(): Promise<void> {
    await this.shareClient.getProperties();
  }
}
