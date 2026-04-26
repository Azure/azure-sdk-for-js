// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Integration tests for compileSampleTests — the discovery, compilation, and
 * staging layer that bridges sample-test files to the samples publish pipeline.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { compileSampleTests } from "../../src/util/samples/compileSampleTests.js";

describe("compileSampleTests", () => {
  let projectDir: string;

  beforeEach(() => {
    // Create a temporary project directory for each test
    projectDir = mkdtempSync(path.join(tmpdir(), "sample-tests-integration-"));
    // Create basic directory structure
    mkdirSync(path.join(projectDir, "test", "public", "samples", "node"), { recursive: true });
  });

  afterEach(async () => {
    // Clean up temporary directory
    await rm(projectDir, { recursive: true, force: true });
  });

  // Helper to write a sample test file
  function writeSample(relativePath: string, content: string): void {
    const fullPath = path.join(projectDir, "test", "public", relativePath);
    mkdirSync(path.dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, content, "utf-8");
  }

  // Helper to write a helper file
  function writeHelper(relativePath: string, content: string): void {
    const fullPath = path.join(projectDir, "test", "public", relativePath);
    mkdirSync(path.dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, content, "utf-8");
  }

  describe("path preservation", () => {
    it("preserves samples/node/ subdirectory in output", async () => {
      writeSample(
        "samples/node/helloWorld.spec.ts",
        `\
/** @summary say hello */
import { describe, it } from "vitest";

describe("hello", () => {
  it("test", async () => {
    console.log("hello");
  });
});
`,
      );

      const result = await compileSampleTests(projectDir, "@azure/test");

      expect(result).not.toBeNull();
      expect(result!.compiledCount).toBe(1);

      // Verify the file is in node/ subdirectory
      const outputPath = path.join(result!.stagingDir, "node", "helloWorld.ts");
      expect(existsSync(outputPath)).toBe(true);

      const content = readFileSync(outputPath, "utf-8");
      expect(content).toContain("export async function main()");

      await result!.cleanup();
    });

    it("preserves samples/browser/ subdirectory in output", async () => {
      writeSample(
        "samples/browser/browserSample.spec.ts",
        `\
/** @summary browser sample */
import { describe, it } from "vitest";

describe("browser", () => {
  it("test", async () => {
    console.log("browser");
  });
});
`,
      );

      const result = await compileSampleTests(projectDir, "@azure/test");

      expect(result).not.toBeNull();
      const outputPath = path.join(result!.stagingDir, "browser", "browserSample.ts");
      expect(existsSync(outputPath)).toBe(true);

      await result!.cleanup();
    });
  });

  describe("helper resolution", () => {
    it("resolves helpers with absolute fileName and preserves structure", async () => {
      writeHelper(
        "samples/node/utils.ts",
        `\
export function getEndpoint(): string {
  return process.env.ENDPOINT || "";
}
`,
      );

      writeSample(
        "samples/node/sample.spec.ts",
        `\
/** @summary sample with helper */
import { describe, it } from "vitest";
import { getEndpoint } from "./utils.js";

describe("sample", () => {
  it("test", async () => {
    const endpoint = getEndpoint();
    console.log(endpoint);
  });
});
`,
      );

      const result = await compileSampleTests(projectDir, "@azure/test");

      expect(result).not.toBeNull();

      // Main sample should exist
      const samplePath = path.join(result!.stagingDir, "node", "sample.ts");
      expect(existsSync(samplePath)).toBe(true);

      // Helper should exist in same directory
      const helperPath = path.join(result!.stagingDir, "node", "utils.ts");
      expect(existsSync(helperPath)).toBe(true);

      // Helper should have proper content
      const helperContent = readFileSync(helperPath, "utf-8");
      expect(helperContent).toContain("export function getEndpoint()");

      await result!.cleanup();
    });
  });

  describe("sample.env generation", () => {
    it("generates sample.env from discovered environment variables", async () => {
      writeSample(
        "samples/node/envSample.spec.ts",
        `\
/** @summary env sample */
import { describe, it } from "vitest";

describe("env", () => {
  it("test", async () => {
    const endpoint = process.env.ENDPOINT;
    const key = process.env.API_KEY;
    console.log(endpoint, key);
  });
});
`,
      );

      const result = await compileSampleTests(projectDir, "@azure/test");

      expect(result).not.toBeNull();
      expect(result!.sampleEnvPath).toBeDefined();

      const envContent = readFileSync(result!.sampleEnvPath!, "utf-8");
      expect(envContent).toContain("API_KEY=");
      expect(envContent).toContain("ENDPOINT=");

      await result!.cleanup();
    });

    it("merges with existing sample.env", async () => {
      // Create existing sample.env
      writeFileSync(
        path.join(projectDir, "sample.env"),
        "# Existing config\nEXISTING_VAR=value\n",
        "utf-8",
      );

      writeSample(
        "samples/node/sample.spec.ts",
        `\
/** @summary sample */
import { describe, it } from "vitest";

describe("sample", () => {
  it("test", async () => {
    const x = process.env.NEW_VAR;
    console.log(x);
  });
});
`,
      );

      const result = await compileSampleTests(projectDir, "@azure/test");

      expect(result).not.toBeNull();
      const envContent = readFileSync(result!.sampleEnvPath!, "utf-8");
      expect(envContent).toContain("EXISTING_VAR=value");
      expect(envContent).toContain("NEW_VAR=");

      await result!.cleanup();
    });
  });

  describe("browser platform handling", () => {
    it("omits process.exit(1) for browser samples", async () => {
      writeSample(
        "samples/browser/browserTest.spec.ts",
        `\
/** @summary browser test */
import { describe, it } from "vitest";

describe("browser", () => {
  it("test", async () => {
    console.log("browser");
  });
});
`,
      );

      const result = await compileSampleTests(projectDir, "@azure/test");

      expect(result).not.toBeNull();
      const outputPath = path.join(result!.stagingDir, "browser", "browserTest.ts");
      const content = readFileSync(outputPath, "utf-8");

      expect(content).not.toContain("process.exit(1)");
      expect(content).toContain("main().catch");
      expect(content).toContain("console.error(error)");

      await result!.cleanup();
    });

    it("includes process.exit(1) for node samples", async () => {
      writeSample(
        "samples/node/nodeTest.spec.ts",
        `\
/** @summary node test */
import { describe, it } from "vitest";

describe("node", () => {
  it("test", async () => {
    console.log("node");
  });
});
`,
      );

      const result = await compileSampleTests(projectDir, "@azure/test");

      expect(result).not.toBeNull();
      const outputPath = path.join(result!.stagingDir, "node", "nodeTest.ts");
      const content = readFileSync(outputPath, "utf-8");

      expect(content).toContain("process.exit(1)");

      await result!.cleanup();
    });
  });

  describe("returns null for no sample tests", () => {
    it("returns null when no sample-test files found", async () => {
      // Empty samples directory
      const result = await compileSampleTests(projectDir, "@azure/test");
      expect(result).toBeNull();
    });
  });

  describe("strict mode errors", () => {
    it("throws on unresolved helper imports", async () => {
      writeSample(
        "samples/node/withMissingHelper.spec.ts",
        `\
/** @summary missing helper */
import { describe, it } from "vitest";
import { helper } from "./missing.js";

describe("test", () => {
  it("test", async () => {
    helper();
  });
});
`,
      );

      await expect(compileSampleTests(projectDir, "@azure/test")).rejects.toThrow(
        /Unresolved local helper import.*missing\.js/,
      );
    });
  });
});
