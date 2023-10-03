// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageFileShareTest } from "./storageTest.spec";
import { PerfOptionDictionary } from "@azure/test-utils-perf";

export class StorageDirGetPropertiesTest extends StorageFileShareTest<{}> {
  public options: PerfOptionDictionary<{}> = {};

  constructor() {
    super();
  }

  async run(): Promise<void> {
    await this.directoryClient.getProperties();
  }
}
