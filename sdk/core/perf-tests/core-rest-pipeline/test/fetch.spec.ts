// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BaseHttpTest } from "./baseHttpTest.js";

export class FetchTest extends BaseHttpTest {
  constructor() {
    super();
  }

  async run(): Promise<void> {
    const response = await fetch(this.url, { keepalive: true });
    await response.text(); // Hello World!
  }
}
