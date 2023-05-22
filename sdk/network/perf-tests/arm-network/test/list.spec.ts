// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfOptionDictionary, getEnvVar } from "@azure/test-utils-perf";
import { NetworkTest } from "./networkTest.spec";

export class ListTest extends NetworkTest<{}> {
  public options: PerfOptionDictionary<{}> = {};

  constructor() {
    super();
  }

  async run(): Promise<void> {
    let iterable = this.client.networkInterfaces.list(getEnvVar("RESOURCE_GROUP_NAME"));
    for await (const _element of iterable) {
      // console.log(element.id)
    }
  }
}
