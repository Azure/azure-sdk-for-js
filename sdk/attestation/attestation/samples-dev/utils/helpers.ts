// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function writeBanner(banner: string): void {
  const separator = "*".repeat(80);

  console.log("\n");
  console.log(separator);
  console.log(`        ${banner}`);
  console.log(separator);
}
