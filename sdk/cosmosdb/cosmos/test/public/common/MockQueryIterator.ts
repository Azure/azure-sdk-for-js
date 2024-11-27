// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class MockedQueryIterator {
  constructor(private results: unknown) {}
  public async fetchAll(): Promise<{
    resources: unknown;
  }> {
    return { resources: this.results };
  }
  public async fetchAllInternal(): Promise<{
    resources: unknown;
  }> {
    return { resources: this.results };
  }
}
