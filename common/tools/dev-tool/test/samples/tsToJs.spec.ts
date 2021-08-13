// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import { convert } from "../../src/commands/samples/tsToJs";

import { assert } from "chai";
import fs from "fs-extra";
import path from "path";

const TEMPLATE_SAMPLES_PATH = path.resolve(
  __dirname,
  path.join("..", "..", "..", "..", "..", "sdk", "template", "template", "samples", "v1")
);

describe("ts-to-js", async () => {
  const basePath = path.join(TEMPLATE_SAMPLES_PATH, "typescript", "src");
  const jsPath = path.join(TEMPLATE_SAMPLES_PATH, "javascript");

  for (const file of await fs.readdir(basePath)) {
    it(`transpile  ${file}`, async () => {
      const contents = await fs.readFile(path.join(basePath, file));
      const transpiled = convert(contents.toString("utf8"));
      const expected = (
        await fs.readFile(path.join(jsPath, file.replace(/\.ts$/, ".js")))
      ).toString("utf8");

      assert.strictEqual(transpiled, expected);
    });
  }
});
