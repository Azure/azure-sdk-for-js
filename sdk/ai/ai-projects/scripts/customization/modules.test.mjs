// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import { exportEntries, parse, renderExports, renderImports } from "./modules.mjs";

test("round-trips local type exports without adding a module clause", () => {
  const entries = exportEntries(parse("export type { PageSettings, Local as Public };"));
  assert.equal(renderExports(entries), "export type { PageSettings, Local as Public };");
});

test("keeps imports used by local type exports", () => {
  const output = renderImports("index.ts", "export type { PageSettings };", [
    {
      module: "@azure/core-paging",
      imported: "PageSettings",
      local: "PageSettings",
    },
  ]);
  assert.equal(output, 'import type { PageSettings } from "@azure/core-paging";');
});

test("does not mistake external re-exports for uses of local imports", () => {
  const output = renderImports(
    "index.ts",
    'export type { FileContents } from "./models/index.js";',
    [
      {
        module: "./static-helpers/multipartHelpers.js",
        imported: "FileContents",
        local: "FileContents",
      },
    ],
  );
  assert.equal(output, "");
});
