// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Page } from "@playwright/test";

export async function preparePage(page: Page): Promise<void> {
  // Log and continue all network requests
  await page.route("**", (route) => {
    console.log("PLAYWRIGHT PAGE ROUTE:", route.request().url());
    route.continue();
  });

  // Logging the page's console.logs
  page.on("console", async (msg) => {
    const values = [];
    for (const arg of msg.args()) {
      values.push(await arg.jsonValue());
    }
    console.log(...values);
  });
}
