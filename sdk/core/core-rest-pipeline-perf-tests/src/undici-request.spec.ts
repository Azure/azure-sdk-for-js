// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BaseHttpTest } from "./baseHttpTest.js";
import { request } from "undici";

export class UndiciRequestTest extends BaseHttpTest {
  async run(): Promise<void> {
    const { body } = await request(this.url);
    console.log(await body.text()); // Hello World!
  }
}
