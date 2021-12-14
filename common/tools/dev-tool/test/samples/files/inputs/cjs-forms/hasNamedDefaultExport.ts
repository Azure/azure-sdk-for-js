// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "./delay";

export default async function named(value: string, waitForMilliseconds: number) {
  await delay(waitForMilliseconds);
  console.log(value);
}
