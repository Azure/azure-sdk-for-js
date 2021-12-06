// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const b = "Hello world!";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function (value: string, waitForMilliseconds: number) {
  await delay(waitForMilliseconds);
  console.log(value);
}
