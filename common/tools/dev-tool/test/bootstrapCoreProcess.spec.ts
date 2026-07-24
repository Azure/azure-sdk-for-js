// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { ensureCoreProcessBuilt } from "../src/bootstrapCoreProcess.ts";

const temporaryDirectories: string[] = [];

async function createTemporaryDirectory(): Promise<string> {
  const directory = await mkdtemp(path.join(tmpdir(), "dev-tool-core-process-"));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe("ensureCoreProcessBuilt", () => {
  it("does not build when the entrypoint exists", async () => {
    const directory = await createTemporaryDirectory();
    const entrypoint = path.join(directory, "index.js");
    await writeFile(entrypoint, "");
    let buildCalls = 0;

    await ensureCoreProcessBuilt(entrypoint, directory, async () => {
      buildCalls++;
      return { success: true };
    });

    expect(buildCalls).toBe(0);
  });

  it("builds a missing entrypoint", async () => {
    const directory = await createTemporaryDirectory();
    const entrypoint = path.join(directory, "index.js");
    let receivedRoot: string | undefined;

    await ensureCoreProcessBuilt(entrypoint, directory, async (packageRoot) => {
      receivedRoot = packageRoot;
      await writeFile(entrypoint, "");
      return { success: true };
    });

    expect(receivedRoot).toBe(directory);
  });

  it("rejects an unsuccessful build", async () => {
    const directory = await createTemporaryDirectory();
    const entrypoint = path.join(directory, "index.js");

    await expect(
      ensureCoreProcessBuilt(entrypoint, directory, async () => ({ success: false })),
    ).rejects.toThrow("Failed to bootstrap @azure/core-process.");
  });

  it("rejects a build that does not produce the entrypoint", async () => {
    const directory = await createTemporaryDirectory();
    const entrypoint = path.join(directory, "index.js");

    await expect(
      ensureCoreProcessBuilt(entrypoint, directory, async () => ({ success: true })),
    ).rejects.toThrow("Failed to bootstrap @azure/core-process.");
  });
});
