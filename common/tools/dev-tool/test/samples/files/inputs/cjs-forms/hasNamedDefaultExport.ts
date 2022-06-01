// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "./delay";

/**
 * This function is named, so it should be exported by name and not by value.
 */
export default async function named(value: string, waitForMilliseconds: number): Promise<void> {
  await delay(waitForMilliseconds);
  console.log(value);
}
