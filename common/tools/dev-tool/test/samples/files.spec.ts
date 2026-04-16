// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { cp, mkdtemp, readdir, readFile, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { makeSamplesFactory } from "../../src/util/samples/generation";
import * as git from "../../src/util/git";
import { findMatchingFiles } from "../../src/util/findMatchingFiles";
import { METADATA_KEY } from "../../src/util/resolveProject";

// Please read: ./files/README.md

const INPUT_PATH = path.join(__dirname, "files", "inputs");
const EXPECT_PATH = path.join(__dirname, "files", "expectations");

describe("File content tests", { timeout: 50000 }, async function () {
  const shouldWriteExpectations = process.env.TEST_MODE === "record";

  if (shouldWriteExpectations) {
    // Test `expectations` to make sure it isn't dirty
    if (await git.hasDiff(EXPECT_PATH)) {
      throw new Error(
        [
          "TEST_MODE=record, but the sample expectations folder is dirty.",
          "Commit or stash your changes before creating new expectation files",
        ].join(" "),
      );
    }
  }

  const dirs = (await readdir(INPUT_PATH)).map((name) => path.join(INPUT_PATH, name));

  // For whatever reason, calling `stat` asynchronously makes mocha hang up the test context, so we intentionally use
  // `statSync` throughout this file.
  const areDirectories = await Promise.all(
    dirs.map(async (dir) => (await stat(dir)).isDirectory()),
  );
  const inputDirectories = dirs.filter((_, idx) => areDirectories[idx]);

  const ownPackageJson = await import("../../package.json");

  for (const dir of inputDirectories) {
    const name = path.basename(dir);

    it(name, { timeout: 50000 }, async function () {
      const tempOutputDir = await mkdtemp(path.join(os.tmpdir(), "devToolTest"));

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
              "sdk-type": "client",
              types: "",
              version,
              keywords: [name],
              [METADATA_KEY]: {
                constantPaths: [],
                sampleConfiguration: {
                  ...(await import(path.join(dir, "config.json"))),
                  disableDocsMs: true,
                  overridePublicationLinkFragment:
                    "common/tools/dev-tool/test/samples/files/expectations/" + name,
                },
              },
            },
            path: dir,
          },
          dir,
        );

        await writeSamples(tempOutputDir);

        const actualPath = path.join(tempOutputDir, (await readdir(tempOutputDir))[0]);
        const expectationPath = path.join(EXPECT_PATH, name);

        if (shouldWriteExpectations) {
          await rm(expectationPath, { recursive: true, force: true });
          await cp(actualPath, expectationPath, { recursive: true });
        } else {
          assert.ok(await stat(expectationPath));

          for await (const file of findMatchingFiles(expectationPath, () => true)) {
            const relativePath = path.relative(expectationPath, file);

            const actualFileName = path.join(actualPath, relativePath);
            const expectedFileName = path.join(expectationPath, relativePath);

            assert.ok(await stat(actualFileName));
            const actual = await readFile(actualFileName);
            const expected = await readFile(expectedFileName);

            assert.equal(actual.toString("utf8"), expected.toString("utf8"));
          }

          // Also need to check that there were no extra files generated
          for await (const file of findMatchingFiles(actualPath, () => true)) {
            const relativePath = path.relative(actualPath, file);

            assert.ok(
              await stat(path.join(expectationPath, relativePath)),
              `Extra file ${relativePath} was generated, but no expectation exists for it.`,
            );
          }
        }
      } finally {
        await rm(tempOutputDir, { recursive: true, force: true });
      }
    });
  }
});
