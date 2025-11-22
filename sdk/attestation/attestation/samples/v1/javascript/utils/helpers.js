// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

function writeBanner(banner) {
  const separator = "*".repeat(80);

  console.log("\n");
  console.log(separator);
  console.log(`        ${banner}`);
  console.log(separator);
}

module.exports = { writeBanner };
