// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { updateBuiltPackageVersion } from "../BuiltVersionUtils.js";

const oldVersion = "1.2.3-beta.1";
const version = "1.2.3-alpha.20261119.1";
const source = `export const SDK_VERSION = "${oldVersion}";\nconst packageVersion = "${oldVersion}";\nconst dependency = "${oldVersion}";\n`;
const manifest = {
  version,
  dependencies: { "@azure/core-util": ">=1.14.0-alpha <1.14.0-alphb" },
  "//metadata": {
    constantPaths: [{ path: "src/internal/constants.ts", prefix: "SDK_VERSION" }],
  },
};

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "built-version-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  async function put(file, content) {
    await mkdir(path.dirname(path.join(root, file)), { recursive: true });
    await writeFile(path.join(root, file), content);
  }
  const get = (file) => readFile(path.join(root, file), "utf8");
  return { root, put, get };
}

test("patches runtime constants, declarations and embedded sources, without changing inputs or dependency literals", async (t) => {
  const { root, put, get } = await fixture(t);
  await put("src/internal/constants.ts", source);
  const expected = source.replace(`SDK_VERSION = "${oldVersion}"`, `SDK_VERSION = "${version}"`);
  const map = {
    sources: ["../../../src/internal/constants.ts"],
    sourcesContent: [source, null],
    mappings: "AAAA",
  };
  for (const runtime of ["esm", "commonjs", "browser", "react-native"]) {
    for (const extension of [".js", ".d.ts", ".js.map", ".d.ts.map"]) {
      await put(
        `dist/${runtime}/internal/constants${extension}`,
        extension.endsWith(".map") ? JSON.stringify(map) : source,
      );
    }
  }
  await put(
    "temp/pkg-node.api.json",
    JSON.stringify({
      metadata: { version: oldVersion, dependencies: { old: "1.0.0" }, schemaVersion: 1011 },
      members: [],
    }),
  );
  const runtimeManifest = (v) =>
    `{\n  "name": "pkg",\n  "version": "${v}",\n  "type": "module"\n}\n`;
  await put("dist/esm/package.json", runtimeManifest(oldVersion));
  await updateBuiltPackageVersion(root, { ...manifest, name: "pkg" }, oldVersion);
  assert.equal(await get("dist/esm/package.json"), runtimeManifest(version));
  assert.equal(await get("src/internal/constants.ts"), source);
  for (const runtime of ["esm", "commonjs", "browser", "react-native"]) {
    for (const extension of [".js", ".d.ts", ".js.map", ".d.ts.map"]) {
      const contents = await get(`dist/${runtime}/internal/constants${extension}`);
      if (extension.endsWith(".map")) {
        assert.deepEqual(JSON.parse(contents), { ...map, sourcesContent: [expected, null] });
      } else {
        assert.equal(contents, expected);
      }
    }
  }
  const api = JSON.parse(await get("temp/pkg-node.api.json"));
  assert.deepEqual(api.metadata, {
    version,
    dependencies: manifest.dependencies,
    schemaVersion: 1011,
  });
  assert.deepEqual(api.members, []);
  await updateBuiltPackageVersion(root, manifest, version);
});

test("skips missing outputs and non-compiled metadata paths", async (t) => {
  const { root, put, get } = await fixture(t);
  await updateBuiltPackageVersion(root, manifest, oldVersion);
  const contents = `const dependencyVersion = "${oldVersion}";`;
  await put("dist/esm/other.js", contents);
  await put("dist/esm/other.js.map", '{ "mappings": "AAAA", "sourcesContent": ["unchanged"] }\n');
  await updateBuiltPackageVersion(
    root,
    {
      version,
      "//metadata": { constantPaths: [{ path: "swagger/README.md", prefix: "package-version" }] },
    },
    oldVersion,
  );
  assert.equal(await get("dist/esm/other.js"), contents);
  assert.equal(
    await get("dist/esm/other.js.map"),
    '{ "mappings": "AAAA", "sourcesContent": ["unchanged"] }\n',
  );
});

test("leaves unlisted version constants and source maps unchanged", async (t) => {
  const { root, put, get } = await fixture(t);
  const unlisted = [
    `export const SDK_VERSION: string = "${oldVersion}";`,
    `const userAgentInfo = \`azsdk-js-pkg/${oldVersion}\`;`,
    `const packageVersion = "${oldVersion}";`,
    "",
  ].join("\n");
  await put("dist/esm/utils/constants.js", unlisted);
  const map = JSON.stringify({ sourcesContent: [unlisted] });
  await put("dist/esm/utils/constants.js.map", map);
  await updateBuiltPackageVersion(root, manifest, oldVersion);
  assert.equal(await get("dist/esm/utils/constants.js"), unlisted);
  assert.equal(await get("dist/esm/utils/constants.js.map"), map);
});

test("patches configured outputs without a runtime subdirectory", async (t) => {
  const { root, put, get } = await fixture(t);
  await put("dist/internal/constants.js", `const x = "v"; // SDK_VERSION ${oldVersion}\n`);
  await updateBuiltPackageVersion(root, manifest, oldVersion);
  assert.equal(
    await get("dist/internal/constants.js"),
    `const x = "v"; // SDK_VERSION ${version}\n`,
  );
});
