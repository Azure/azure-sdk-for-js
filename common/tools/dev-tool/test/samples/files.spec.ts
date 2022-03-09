// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import os from "os";
import path from "path";
import { makeSamplesFactory } from "../../src/util/samples/generation";

import * as git from "../../src/util/git";

import { assert } from "chai";
import { findMatchingFiles } from "../../src/util/findMatchingFiles";

// Please read: ./files/README.md

const INPUT_PATH = path.join(__dirname, "files", "inputs");
const EXPECT_PATH = path.join(__dirname, "files", "expectations");

describe("File content tests", async function () {
  const shouldWriteExpectations = process.env.TEST_MODE === "record";

  if (shouldWriteExpectations) {
    // Test `expectations` to make sure it isn't dirty
    if (await git.hasDiff(EXPECT_PATH)) {
      throw new Error(
        [
          "TEST_MODE=record, but the sample expectations folder is dirty.",
          "Commit or stash your changes before creating new expectation files",
        ].join(" ")
      );
    }
  }

  const dirs = (await fs.readdir(INPUT_PATH)).map((name) => path.join(INPUT_PATH, name));

  // For whatever reason, calling `stat` asynchronously makes mocha hang up the test context, so we intentionally use
  // `statSync` throughout this file.
  const areDirectories = dirs.map((dir) => fs.statSync(dir));
  const inputDirectories = dirs.filter((_, idx) => areDirectories[idx].isDirectory());

  const ownPackageJson = await import("../../package.json");

  for (const dir of inputDirectories) {
    const name = path.basename(dir);

    it(name, async function () {
      const tempOutputDir = await fs.mkdtemp(path.join(os.tmpdir(), "devToolTest"));

      const version = name.includes("@") ? name.split("@")[1] : "1.0.0";

      try {
        const writeSamples = await makeSamplesFactory(
          {
            name,
            version,
            packageJson: {
              ...ownPackageJson,
              // Required by the PackageJson definition type, but not required for this test
              main: "",
              version,
              keywords: [name],
              "//sampleConfiguration": {
                ...(await import(path.join(dir, "config.json"))),
                disableDocsMs: true,
                overridePublicationLinkFragment:
                  "common/tools/dev-tool/test/samples/files/expectations/" + name,
              },
            },
            path: dir,
          },
          dir
        );

        await writeSamples(tempOutputDir);

        const actualPath = path.join(tempOutputDir, (await fs.readdir(tempOutputDir))[0]);
        const expectationPath = path.join(EXPECT_PATH, name);

        if (shouldWriteExpectations) {
          await fs.remove(expectationPath);
          await fs.copy(actualPath, expectationPath);
        } else {
          assert.ok(fs.statSync(expectationPath));

          for await (const file of findMatchingFiles(expectationPath, () => true)) {
            const relativePath = path.relative(expectationPath, file);

            const actualFileName = path.join(actualPath, relativePath);
            const expectedFileName = path.join(expectationPath, relativePath);

            assert.ok(fs.statSync(actualFileName));
            const actual = await fs.readFile(actualFileName);
            const expected = await fs.readFile(expectedFileName);

            assert.equal(actual.toString("utf8"), expected.toString("utf8"));
          }

          // Also need to check that there were no extra files generated
          for await (const file of findMatchingFiles(actualPath, () => true)) {
            const relativePath = path.relative(actualPath, file);

            assert.ok(
              fs.statSync(path.join(expectationPath, relativePath)),
              `Extra file ${relativePath} was generated, but no expectation exists for it.`
            );
          }
        }
      } finally {
        await fs.emptyDir(tempOutputDir);
        await fs.rmdir(tempOutputDir);
      }
    }).timeout(50000);
  }
}).timeout(50000);
