// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export class MockedQueryIterator {
  constructor(private results: unknown) {}
  public async fetchAll(): Promise<{
    resources: unknown;
  }> {
    return { resources: this.results };
  }
}
