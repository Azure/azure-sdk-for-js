// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { chmod, copyFile, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { resolveExecutable } from "@azure/core-process";

const temporaryDirectories: string[] = [];

async function createTemporaryDirectory(): Promise<string> {
  const directory = await mkdtemp(path.join(tmpdir(), "core-process-"));
  temporaryDirectories.push(directory);
  return directory;
}

async function createNativeExecutable(directory: string, name: string): Promise<string> {
  const executablePath = path.join(directory, process.platform === "win32" ? `${name}.exe` : name);
  await copyFile(process.execPath, executablePath);
  if (process.platform !== "win32") {
    await chmod(executablePath, 0o755);
  }
  return executablePath;
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe("resolveExecutable", () => {
  it("resolves an explicit executable path", () => {
    expect(resolveExecutable(process.execPath)).toBe(path.resolve(process.execPath));
  });

  it("searches absolute PATH entries", async () => {
    const directory = await createTemporaryDirectory();
    const executablePath = await createNativeExecutable(directory, "resolve-me");

    expect(
      resolveExecutable("resolve-me", {
        env: { ...process.env, PATH: directory },
      }),
    ).toBe(executablePath);
  });

  it("does not search the current directory implicitly", async () => {
    const directory = await createTemporaryDirectory();
    await createNativeExecutable(directory, "cwd-only");

    expect(
      resolveExecutable("cwd-only", {
        cwd: directory,
        env: { ...process.env, PATH: "" },
      }),
    ).toBeUndefined();
  });

  it("ignores relative PATH entries", async () => {
    const directory = await createTemporaryDirectory();
    await createNativeExecutable(directory, "relative-only");

    expect(
      resolveExecutable("relative-only", {
        cwd: path.dirname(directory),
        env: { ...process.env, PATH: path.basename(directory) },
      }),
    ).toBeUndefined();
  });

  it.runIf(process.platform !== "win32")("requires POSIX execute permission", async () => {
    const directory = await createTemporaryDirectory();
    const executablePath = path.join(directory, "not-executable");
    await writeFile(executablePath, "#!/usr/bin/env node\n");
    await chmod(executablePath, 0o644);

    expect(
      resolveExecutable("not-executable", {
        env: { ...process.env, PATH: directory },
      }),
    ).toBeUndefined();
  });

  it.runIf(process.platform === "win32")("requires explicit batch opt-in", async () => {
    const directory = await createTemporaryDirectory();
    const batchPath = path.join(directory, "batch-only.cmd");
    await writeFile(batchPath, "@echo off\n");

    const options = { env: { ...process.env, PATH: directory } };
    expect(resolveExecutable("batch-only", options)).toBeUndefined();
    expect(resolveExecutable("batch-only", { ...options, allowWindowsBatchFiles: true })).toBe(
      batchPath,
    );
  });

  it.runIf(process.platform === "win32")(
    "prefers a native executable over an earlier batch shim",
    async () => {
      const batchDirectory = await createTemporaryDirectory();
      const nativeDirectory = await createTemporaryDirectory();
      await writeFile(path.join(batchDirectory, "preferred.cmd"), "@echo off\n");
      const nativePath = await createNativeExecutable(nativeDirectory, "preferred");

      expect(
        resolveExecutable("preferred", {
          allowWindowsBatchFiles: true,
          env: {
            ...process.env,
            PATH: [batchDirectory, nativeDirectory].join(path.delimiter),
            PATHEXT: ".CMD;.EXE",
          },
        }),
      ).toBe(nativePath);
    },
  );

  it.runIf(process.platform === "win32")(
    "rejects duplicate case-insensitive environment keys",
    () => {
      expect(() =>
        resolveExecutable("node", {
          env: { Path: "one", PATH: "two" },
        }),
      ).toThrow(/duplicate case-insensitive/i);
    },
  );

  it.runIf(process.platform === "win32")("rejects unsupported executable types", async () => {
    const directory = await createTemporaryDirectory();
    const scriptPath = path.join(directory, "script.ps1");
    await writeFile(scriptPath, "Write-Output 'unsafe'\n");

    expect(
      resolveExecutable(scriptPath, {
        allowWindowsBatchFiles: true,
      }),
    ).toBeUndefined();
  });
});
