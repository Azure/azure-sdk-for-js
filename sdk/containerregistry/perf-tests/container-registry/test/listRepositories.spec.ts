// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { MetricsAdvisorTest } from "./client.spec";
type MetricsAdvisorTestOptions = Record<string, unknown>;

export class RepositoryListTest extends MetricsAdvisorTest<MetricsAdvisorTestOptions> {
  public options: PerfStressOptionDictionary<MetricsAdvisorTestOptions> = {};
  constructor() {
    super();
  }

  async runAsync(): Promise<void> {
    const listIterator = this.client.listRepositoryNames();

    // eslint-disable-next-line no-empty
    for await (const _anomaly of listIterator) {
    }
  }
}
