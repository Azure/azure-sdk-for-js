// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay } from "./delay";

export const b = "Hello world!";

export default async function (value: string, waitForMilliseconds: number): Promise<void> {
  await delay(waitForMilliseconds);
  console.log(value);
}
