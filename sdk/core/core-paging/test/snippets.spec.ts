// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";

interface ListSecretsOptions {}
interface SecretAttributes {}
function listSecretsAll(options: ListSecretsOptions): AsyncIterableIterator<SecretAttributes> {
  throw "stub";
}
function listSecretsPage(
  pageSettings: PageSettings,
  options: ListSecretsOptions,
): AsyncIterableIterator<SecretAttributes[]> {
  throw "stub";
}

describe("snippets", () => {
  it("ReadmePagingSample", async () => {
    function listSecrets(
      options: ListSecretsOptions = {},
    ): PagedAsyncIterableIterator<SecretAttributes> {
      const iter = listSecretsAll(options);
      return {
        async next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: PageSettings = {}) => listSecretsPage(settings, options),
      };
    }
    // @ts-preserve-whitespace
    for await (const page of listSecrets().byPage({ maxPageSize: 2 })) {
      for (const secret of page) {
        console.log("secret: ", secret);
      }
    }
  });
});
