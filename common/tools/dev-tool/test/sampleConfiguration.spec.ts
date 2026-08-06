// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect } from "vitest";
import { sampleConfiguration } from "../src/checks/sampleConfiguration.ts";
import { validateSampleConfiguration } from "../src/util/samples/configuration.ts";
import { isCheckFailedError } from "../src/framework/check.ts";
import type { ProjectInfo } from "../src/util/resolveProject.ts";

function makeProject(packageJson: Partial<PackageJson>): ProjectInfo {
  const fullPackageJson = {
    name: "@azure/test-package",
    version: "1.0.0",
    ...packageJson,
  } as PackageJson;
  return {
    name: fullPackageJson.name,
    version: fullPackageJson.version,
    path: "/virtual/sdk/test/test-package",
    packageJson: fullPackageJson,
  };
}

async function runCheck(packageJson: Partial<PackageJson>): Promise<void> {
  await sampleConfiguration.check({
    fix: false,
    verbose: false,
    project: makeProject(packageJson),
  });
}

describe("validateSampleConfiguration", () => {
  it("accepts an empty configuration", () => {
    assert.deepEqual(validateSampleConfiguration({}), []);
  });

  it("accepts a fully-populated valid configuration", () => {
    const problems = validateSampleConfiguration({
      skipFolder: false,
      skip: ["sampleA", "sampleB"],
      productName: "Azure Test",
      productSlugs: ["azure", "azure-test"],
      disableDocsMs: true,
      apiRefLink: "https://learn.microsoft.com/javascript/api/@azure/test",
      dependencyOverrides: { "@azure/identity": "^4.0.0" },
      requiredResources: { "Azure Test Instance": "https://example.com/docs" },
      customSnippets: { header: "./header.md", footer: "./footer.md" },
      extraFiles: { "./assets": ["typescript/assets", "javascript/assets"] },
      overridePublicationLinkFragment: "test",
    });
    assert.deepEqual(problems, []);
  });

  it("rejects an unknown property (typo)", () => {
    const problems = validateSampleConfiguration({ skipFolders: true });
    assert.equal(problems.length, 1);
    assert.equal(problems[0].path, "skipFolders");
    assert.match(problems[0].message, /unknown property "skipFolders"/);
  });

  it("rejects a property with the wrong type", () => {
    const problems = validateSampleConfiguration({ skipFolder: "true" });
    assert.equal(problems.length, 1);
    assert.equal(problems[0].path, "skipFolder");
    assert.match(problems[0].message, /must be a boolean/);
  });

  it("rejects skip when it is not an array of strings", () => {
    const problems = validateSampleConfiguration({ skip: "sampleA" });
    assert.equal(problems.length, 1);
    assert.match(problems[0].message, /must be an array of strings/);
  });

  it("rejects an unknown customSnippets property", () => {
    const problems = validateSampleConfiguration({ customSnippets: { middle: "./middle.md" } });
    assert.equal(problems.length, 1);
    assert.equal(problems[0].path, "customSnippets");
    assert.match(problems[0].message, /unknown property "middle"/);
  });

  it("rejects a non-object configuration", () => {
    const problems = validateSampleConfiguration("nope");
    assert.equal(problems.length, 1);
    assert.equal(problems[0].path, ".");
    assert.match(problems[0].message, /must be a JSON object/);
  });

  it("reports every problem at once", () => {
    const problems = validateSampleConfiguration({
      skipFolder: "true",
      bogus: 1,
      skip: 5,
    });
    assert.equal(problems.length, 3);
  });
});

describe("sampleConfiguration check", () => {
  it("passes when there is no sample configuration", async () => {
    await expect(runCheck({})).resolves.toBeUndefined();
  });

  it("passes for a valid configuration in the metadata location", async () => {
    await expect(
      runCheck({
        "//metadata": { sampleConfiguration: { skipFolder: true, skip: ["a"] } },
      }),
    ).resolves.toBeUndefined();
  });

  it("tolerates the deprecated top-level location when valid", async () => {
    // Using the deprecated `//sampleConfiguration` location is intentionally
    // allowed; the check only validates shape, it does not force a migration.
    await expect(
      runCheck({
        "//sampleConfiguration": { disableDocsMs: true },
      }),
    ).resolves.toBeUndefined();
  });

  it("fails for an invalid configuration in the metadata location", async () => {
    await expect(
      runCheck({
        "//metadata": { sampleConfiguration: { skipFolders: true } as never },
      }),
    ).rejects.toThrow(/schema/);
  });

  it("fails for an invalid configuration in the deprecated location", async () => {
    let caught: unknown;
    try {
      await runCheck({ "//sampleConfiguration": { skip: "a" } as never });
    } catch (e) {
      caught = e;
    }
    assert.isTrue(isCheckFailedError(caught), "expected a CheckFailedError");
  });

  it("validates both locations and includes each label in the detail", async () => {
    let caught: unknown;
    try {
      await runCheck({
        "//metadata": { sampleConfiguration: { badMeta: 1 } as never },
        "//sampleConfiguration": { badLegacy: 1 } as never,
      });
    } catch (e) {
      caught = e;
    }
    assert.isTrue(isCheckFailedError(caught), "expected a CheckFailedError");
    if (isCheckFailedError(caught)) {
      assert.match(caught.detail ?? "", /\/\/metadata\.sampleConfiguration\.badMeta/);
      assert.match(caught.detail ?? "", /\/\/sampleConfiguration\.badLegacy/);
    }
  });
});
