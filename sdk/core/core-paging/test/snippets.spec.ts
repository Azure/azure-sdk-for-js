// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";

describe("snippets", () => {
  it("paging_example", () => {
    function listSecrets(
      options: ListSecretsOptions = {},
    ): PagedAsyncIterableIterator<SecretAttributes> {
      const iter = this.listSecretsAll(options);
      return {
        async next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: PageSettings = {}) => this.listSecretsPage(settings, options),
      };
    }

    for await (const page of listSecrets().byPage({ maxPageSize: 2 })) {
      for (const secret of page) {
        console.log("secret: ", secret);
      }
    }
  });
});
