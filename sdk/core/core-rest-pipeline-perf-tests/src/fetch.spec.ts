// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BaseHttpTest } from "./baseHttpTest.js";
import { writeStdout } from "./stdio.js";

export class FetchTest extends BaseHttpTest {
  async run(): Promise<void> {
    const response = await fetch(this.url, { keepalive: true });
    writeStdout(await response.text()); // Hello World!
  }
}
