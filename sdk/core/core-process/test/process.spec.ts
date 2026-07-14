// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { once } from "node:events";
import { access, chmod, copyFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  execFile,
  isProcessError,
  ProcessError,
  spawn,
  spawnSync,
  type ExecFileOptions,
  type SpawnOptions,
  type SpawnSyncOptions,
} from "@azure/core-process";

const echoArgumentsScript = "process.stdout.write(JSON.stringify(process.argv.slice(1)))";
const fixtureDirectory = fileURLToPath(new URL("./fixtures", import.meta.url));
const batchFixture = path.join(fixtureDirectory, "echo-args.cmd");
const posixFixture = path.join(fixtureDirectory, "echo-args");

describe("process execution", () => {
  it("round-trips native executable arguments without shell parsing", async () => {
    const args = [
      "",
      "plain",
      "with spaces",
      "\t",
      '"quoted"',
      "trailing\\",
      "%PATH%",
      "!value!",
      "& | < > ^ ( )",
      "$() `command` ; * ?",
      "snowman-\u2603",
    ];

    const result = await execFile(process.execPath, ["-e", echoArgumentsScript, "--", ...args], {
      encoding: "utf8",
    });
    expect(JSON.parse(result.stdout)).toEqual(args);
  });

  it("supports streaming output", async () => {
    const child = spawn(process.execPath, ["-e", "process.stdout.write('streamed')"]);
    let stdout = "";
    child.stdout?.setEncoding("utf8");
    child.stdout?.on("data", (chunk: string) => {
      stdout += chunk;
    });

    const [exitCode] = await once(child, "close");
    expect(exitCode).toBe(0);
    expect(stdout).toBe("streamed");
  });

  it("supports synchronous string output", () => {
    const result = spawnSync(process.execPath, ["-e", "process.stdout.write('sync')"], {
      encoding: "utf8",
    });

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(0);
    expect(result.stdout).toBe("sync");
  });

  it("returns sanitized, non-enumerable captured output on failure", async () => {
    const promise = execFile(
      process.execPath,
      [
        "-e",
        "process.stdout.write('secret-token'); process.stderr.write('diagnostic'); process.exit(7)",
      ],
      { encoding: "utf8" },
    );

    await expect(promise).rejects.toMatchObject({
      code: 7,
      message: "The process exited with code 7.",
      stdout: "secret-token",
      stderr: "diagnostic",
    });

    try {
      await promise;
    } catch (error: unknown) {
      expect(isProcessError(error)).toBe(true);
      expect((error as ProcessError).cause).toBeInstanceOf(Error);
      expect(JSON.stringify(error)).not.toContain("secret-token");
      expect(JSON.stringify(error)).not.toContain("diagnostic");
      expect(String(error)).not.toContain("secret-token");
      expect(Object.keys(error as object)).not.toContain("stdout");
      expect(Object.keys(error as object)).not.toContain("stderr");
    }
  });

  it("returns a rejected promise when command preparation fails", async () => {
    let preparationPromise: Promise<unknown> = Promise.resolve();
    expect(() => {
      preparationPromise = execFile("core-process-command-that-does-not-exist");
    }).not.toThrow();
    await expect(preparationPromise).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("recognizes a ProcessError created by another package copy", () => {
    const brandedError = {
      [Symbol.for("@azure/core-process.ProcessError")]: true,
      code: "ENOENT",
      killed: false,
      name: "ProcessError",
      signal: null,
    };
    expect(isProcessError(brandedError)).toBe(true);
  });

  it("supports dynamically selected output encodings", async () => {
    const execOptions: ExecFileOptions = { encoding: null };
    const execResult = await execFile(
      process.execPath,
      ["-e", "process.stdout.write('buffer')"],
      execOptions,
    );
    expect(Buffer.isBuffer(execResult.stdout)).toBe(true);

    const syncOptions: SpawnSyncOptions = { encoding: "utf8" };
    const syncResult = spawnSync(
      process.execPath,
      ["-e", "process.stdout.write('string')"],
      syncOptions,
    );
    expect(syncResult.stdout.toString()).toBe("string");

    const omittedArgs = spawnSync("whoami", undefined, { encoding: "utf8" });
    expect(typeof omittedArgs.stdout).toBe("string");
    const omittedExecArgs = await execFile("whoami", undefined, { encoding: "utf8" });
    expect(typeof omittedExecArgs.stdout).toBe("string");
  });

  it("rejects shell options at runtime", () => {
    const inheritedShellOptions = Object.create({ shell: true }) as SpawnOptions;
    expect(() => spawn(process.execPath, [], inheritedShellOptions)).toThrow(
      /Shell-related process options are not supported/,
    );
  });

  it("allows explicitly undefined shell options", () => {
    expect(() =>
      spawnSync(process.execPath, [], {
        shell: undefined,
        windowsVerbatimArguments: undefined,
      }),
    ).not.toThrow();
  });

  it("rejects a non-boolean Windows batch option", () => {
    expect(() =>
      spawn(process.execPath, [], {
        allowWindowsBatchFiles: "false" as unknown as boolean,
      }),
    ).toThrow(/batch option must be a boolean/i);
  });

  it("rejects unsupported runtime options", () => {
    expect(() =>
      spawn(process.execPath, [], {
        futureShellOption: true,
      } as unknown as SpawnOptions),
    ).toThrow(/unsupported property/i);
  });

  it("enforces maxBuffer", async () => {
    await expect(
      execFile(process.execPath, ["-e", "process.stdout.write('x'.repeat(1024))"], {
        encoding: "utf8",
        maxBuffer: 16,
      }),
    ).rejects.toBeInstanceOf(ProcessError);
  });

  it("enforces timeout", async () => {
    await expect(
      execFile(process.execPath, ["-e", "setInterval(() => {}, 1000)"], {
        encoding: "utf8",
        timeout: 50,
      }),
    ).rejects.toMatchObject({ killed: true });
  });

  it("rejects argv0 for both asynchronous and synchronous batch execution", async () => {
    const marker = path.join(fixtureDirectory, "argv0-injection-marker");
    const argv0 = `cmd.exe /c echo injected > "${marker}"`;
    const spawnOptions = {
      allowWindowsBatchFiles: true,
      argv0,
    };
    const syncOptions = { ...spawnOptions, encoding: "utf8" as const };

    expect(() => spawn(batchFixture, [], spawnOptions)).toThrow(/argv0 option is not supported/i);
    expect(() => spawnSync(batchFixture, [], syncOptions)).toThrow(
      /argv0 option is not supported/i,
    );
    await expect(access(marker)).rejects.toThrow();
  });
});

describe.runIf(process.platform !== "win32")("POSIX executable scripts", () => {
  it("executes a shebang script directly", async () => {
    await chmod(posixFixture, 0o755);
    const result = await execFile(posixFixture, ["one", "two words"], { encoding: "utf8" });
    expect(JSON.parse(result.stdout)).toEqual(["one", "two words"]);
  });
});

describe.runIf(process.platform === "win32")("Windows batch execution", () => {
  it("round-trips the accepted argument subset through a forwarding shim", async () => {
    const args = ["", "plain", "with spaces", '"quoted"', "trailing\\", "[]{}:;,.?"];
    const result = await execFile(batchFixture, args, {
      allowWindowsBatchFiles: true,
      encoding: "utf8",
    });

    expect(JSON.parse(result.stdout)).toEqual(args);
  });

  it("supports a batch path containing spaces and parentheses", async () => {
    const directory = await mkdtemp(path.join(tmpdir(), "core process (safe)-"));
    try {
      const copiedBatch = path.join(directory, "echo args.cmd");
      await Promise.all([
        copyFile(batchFixture, copiedBatch),
        copyFile(path.join(fixtureDirectory, "echoArgs.cjs"), path.join(directory, "echoArgs.cjs")),
      ]);

      const result = await execFile(copiedBatch, ["safe value"], {
        allowWindowsBatchFiles: true,
        encoding: "utf8",
      });
      expect(JSON.parse(result.stdout)).toEqual(["safe value"]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("is disabled by default", () => {
    expect(() => spawnSync(batchFixture, [], { encoding: "utf8" })).toThrow(
      /executable could not be found/i,
    );
  });

  it.each([
    ['"&calc', "cross-spawn #171 command chaining"],
    ["%path%", "cross-spawn #171 variable expansion"],
    ["!path!", "delayed variable expansion"],
    ["innocent\r\necho PWNED", "cross-spawn #179 CRLF"],
    ["innocent\recho PWNED", "cross-spawn #179 CR"],
    ["innocent\necho PWNED", "cross-spawn #179 LF"],
    ["%CMDCMDLINE:~-1%&calc", "BatBadBut quote extraction"],
    ["value^&calc", "caret escaping"],
    ["value|calc", "pipeline"],
    ["value>output", "redirection"],
    ["value(calc)", "grouping"],
    ['a\\\\" --danger', "backslashes before a quote"],
    ["trailing\\\\", "multiple trailing backslashes"],
  ])("rejects %s (%s) before process creation", (argument) => {
    expect(() =>
      spawnSync(batchFixture, [argument], {
        allowWindowsBatchFiles: true,
        encoding: "utf8",
      }),
    ).toThrow(/batch argument 0 is unsafe/i);
  });

  it("does not create an injection side effect", async () => {
    const marker = path.join(fixtureDirectory, "injection-marker");
    const payload = `"&"${process.execPath}" -e "require('fs').writeFileSync('${marker}', 'x')"`;

    expect(() =>
      spawnSync(batchFixture, [payload], {
        allowWindowsBatchFiles: true,
        encoding: "utf8",
      }),
    ).toThrow(/batch argument 0 is unsafe/i);
    await expect(access(marker)).rejects.toThrow();
  });
});
