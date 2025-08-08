// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { assert, describe, expect, it } from "vitest";
import { parseArgs } from "../src/args.js";

describe("parseArgs", () => {
  it("parse -packages", () => {
    const argv = [
      "node",
      "ci-runner.js",
      "build",
      "identity",
      "template",
      "-packages",
      `"azure-arm-resources,azure-identity"`,
    ];
    const { action, serviceDirs, artifactNames } = parseArgs(argv);
    assert.equal(action, "build");
    expect(serviceDirs).toMatchObject(["identity", "template"]);
    assert.equal(artifactNames, `"azure-arm-resources,azure-identity"`);
  });

  it("parse -packageInfo", () => {
    const argv = [
      "node",
      "ci-runner.js",
      "build",
      "template",
      "-packageInfo",
      `"/mnt/vss/_work/1/a/PackageInfo"`,
    ];
    const { packageInfoPath } = parseArgs(argv);
    assert.equal(packageInfoPath, `"/mnt/vss/_work/1/a/PackageInfo"`);
  });

  it("parse -changeInfo", () => {
    const argv = [
      "node",
      "ci-runner.js",
      "build",
      "template",
      "-changeInfo",
      `"/mnt/vss/_work/1/a/diff/diff.json"`,
    ];
    const { changeInfoPath } = parseArgs(argv);
    assert.equal(changeInfoPath, `"/mnt/vss/_work/1/a/diff/diff.json"`);
  });
});
