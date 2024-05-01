// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BaseHttpTest } from "./baseHttpTest";

export class FetchTest extends BaseHttpTest {
  constructor() {
    super();
  }

  async run(): Promise<void> {
    const response = await fetch(this.url, { keepalive: true });
    await response.text(); // Hello World!
  }
}
