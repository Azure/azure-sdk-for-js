// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BaseHttpTest } from "./baseHttpTest.js";
import { request } from "undici";
import { writeStdout } from "./stdio.js";

export class UndiciRequestTest extends BaseHttpTest {
  async run(): Promise<void> {
    const { body } = await request(this.url);
    writeStdout(await body.text()); // Hello World!
  }
}
