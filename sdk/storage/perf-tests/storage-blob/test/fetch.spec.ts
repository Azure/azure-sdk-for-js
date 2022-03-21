// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import { drainReadableStream } from "@azure/test-utils-perf";
export class FetchDownloadWithSASTest extends StorageBlobDownloadWithSASTest {
  constructor() {
    super();
  }

  async run(): Promise<void> {
    const response = await fetch(this.sasUrl, { keepalive: false });
    await drainReadableStream(response.body!);
  }
}
