import { EventEmitter } from "node:events";
import { mkdir, mkdtemp, realpath, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, test, vi } from "vitest";
import {
  POST_EMITTER_SCRIPT_NAME,
  POST_EMITTER_TIMEOUT_MS,
  createPostEmitterEnvironment,
  findPowerShellExecutable,
  preparePackageForBuild,
  runPostEmitter,
  runProcess,
  terminateProcessTree,
} from "../../common/postEmitter.js";
import { RunMode } from "../../common/types.js";

const tempDirectories: string[] = [];

async function createPackage(withScript = true) {
  const repoRoot = await mkdtemp(path.join(tmpdir(), "js-post-emitter-"));
  tempDirectories.push(repoRoot);
  const packageRoot = path.join(repoRoot, "sdk", "test", "package");
  await mkdir(packageRoot, { recursive: true });
  if (withScript) {
    await writeFile(path.join(packageRoot, POST_EMITTER_SCRIPT_NAME), "Write-Output 'done'\n");
  }
  return { packageRoot, repoRoot };
}

afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(
    tempDirectories.splice(0).map((directory) => rm(directory, { recursive: true })),
  );
});

describe("runPostEmitter", () => {
  test("returns false when the package has no script", async () => {
    const { packageRoot, repoRoot } = await createPackage(false);
    const run = vi.fn();

    await expect(
      runPostEmitter(packageRoot, repoRoot, RunMode.Batch, undefined, {
        findPowerShellExecutable: () => "pwsh",
        runProcess: run,
      }),
    ).resolves.toBe(false);
    expect(run).not.toHaveBeenCalled();
  });

  test("runs a direct package-root script with the expected contract", async () => {
    const { packageRoot, repoRoot } = await createPackage();
    const run = vi.fn().mockResolvedValue(undefined);

    await expect(
      runPostEmitter(packageRoot, repoRoot, RunMode.SpecPullRequest, undefined, {
        findPowerShellExecutable: () => "/usr/bin/pwsh",
        runProcess: run,
        now: vi.fn().mockReturnValueOnce(100).mockReturnValueOnce(125),
      }),
    ).resolves.toBe(true);

    const resolvedPackageRoot = await realpath(packageRoot);
    const resolvedRepoRoot = await realpath(repoRoot);
    expect(run).toHaveBeenCalledWith(
      "/usr/bin/pwsh",
      [
        "-NonInteractive",
        "-NoProfile",
        "-ExecutionPolicy",
        "Bypass",
        "-File",
        path.join(resolvedPackageRoot, POST_EMITTER_SCRIPT_NAME),
      ],
      expect.objectContaining({
        cwd: resolvedPackageRoot,
        timeoutMs: POST_EMITTER_TIMEOUT_MS,
        env: expect.objectContaining({
          AZSDK_POST_EMITTER_PACKAGE_ROOT: resolvedPackageRoot,
          AZSDK_POST_EMITTER_REPO_ROOT: resolvedRepoRoot,
          AZSDK_POST_EMITTER_BASE_REF: "HEAD",
          AZSDK_POST_EMITTER_RUN_MODE: RunMode.SpecPullRequest,
        }),
      }),
    );
  });

  test("fails when PowerShell is unavailable", async () => {
    const { packageRoot, repoRoot } = await createPackage();

    await expect(
      runPostEmitter(packageRoot, repoRoot, RunMode.Batch, undefined, {
        findPowerShellExecutable: () => undefined,
      }),
    ).rejects.toThrow("neither pwsh nor powershell is available");
  });

  test("rejects a package outside the SDK repository root", async () => {
    const { packageRoot } = await createPackage();
    const otherRepoRoot = await mkdtemp(path.join(tmpdir(), "js-post-emitter-other-repo-"));
    tempDirectories.push(otherRepoRoot);

    await expect(runPostEmitter(packageRoot, otherRepoRoot, RunMode.Batch)).rejects.toThrow(
      "Package directory must be a child of the SDK repository",
    );
  });

  test("wraps a nonzero process failure with package context", async () => {
    const { packageRoot, repoRoot } = await createPackage();

    await expect(
      runPostEmitter(packageRoot, repoRoot, RunMode.Batch, undefined, {
        findPowerShellExecutable: () => "pwsh",
        runProcess: vi.fn().mockRejectedValue(new Error("exit code 7")),
      }),
    ).rejects.toThrow(/Post-emitter script failed for sdk.*test.*package: exit code 7/);
  });

  test.runIf(process.platform !== "win32")("rejects a symlinked script", async () => {
    const { packageRoot, repoRoot } = await createPackage(false);
    const externalScript = path.join(repoRoot, "external.ps1");
    await writeFile(externalScript, "Write-Output 'outside'\n");
    await symlink(externalScript, path.join(packageRoot, POST_EMITTER_SCRIPT_NAME));

    await expect(runPostEmitter(packageRoot, repoRoot, RunMode.Batch)).rejects.toThrow(
      "must be a regular file, not a symlink",
    );
  });
});

describe("findPowerShellExecutable", () => {
  test("prefers pwsh and falls back to Windows PowerShell", () => {
    expect(
      findPowerShellExecutable((command) => (command === "pwsh" ? "/bin/pwsh" : undefined)),
    ).toBe("/bin/pwsh");
    expect(
      findPowerShellExecutable((command) =>
        command === "powershell" ? "C:\\Windows\\powershell.exe" : undefined,
      ),
    ).toBe("C:\\Windows\\powershell.exe");
  });
});

describe("createPostEmitterEnvironment", () => {
  test("keeps process essentials without forwarding unrelated values", () => {
    const environment = createPostEmitterEnvironment({
      PATH: "/usr/bin",
      HOME: "/home/agent",
      SECRET_TOKEN: "do-not-forward",
    });

    expect(environment).toEqual({ PATH: "/usr/bin", HOME: "/home/agent" });
  });
});

describe("preparePackageForBuild", () => {
  test("runs customization before the post-emitter hook exactly once", async () => {
    const calls: string[] = [];
    const customize = vi.fn(async () => {
      calls.push("customize");
    });
    const postEmitter = vi.fn(async () => {
      calls.push("post-emitter");
      return true;
    });

    await preparePackageForBuild(
      "/repo/sdk/package",
      "/repo",
      RunMode.Batch,
      customize,
      postEmitter,
    );

    expect(calls).toEqual(["customize", "post-emitter"]);
    expect(customize).toHaveBeenCalledOnce();
    expect(postEmitter).toHaveBeenCalledOnce();
  });

  test("runs only the hook for packages without customization", async () => {
    const postEmitter = vi.fn().mockResolvedValue(false);

    await preparePackageForBuild(
      "/repo/sdk/package",
      "/repo",
      RunMode.Release,
      undefined,
      postEmitter,
    );

    expect(postEmitter).toHaveBeenCalledOnce();
  });
});

describe("runProcess", () => {
  function createChild() {
    const child = new EventEmitter() as EventEmitter & {
      kill: ReturnType<typeof vi.fn>;
      once: EventEmitter["once"];
    };
    child.kill = vi.fn();
    return child;
  }

  test("uses shell-free inherited output and resolves on exit zero", async () => {
    const child = createChild();
    const spawnProcess = vi.fn().mockReturnValue(child);
    const result = runProcess(
      "pwsh",
      ["-File", "PostEmitter.ps1"],
      {
        cwd: "/repo/sdk/package",
        env: {},
        timeoutMs: 1_000,
      },
      spawnProcess,
    );

    child.emit("close", 0, null);
    await expect(result).resolves.toBeUndefined();
    expect(spawnProcess).toHaveBeenCalledWith(
      "pwsh",
      ["-File", "PostEmitter.ps1"],
      expect.objectContaining({ shell: false, stdio: "inherit", windowsHide: true }),
    );
  });

  test("rejects a nonzero process exit", async () => {
    const child = createChild();
    const result = runProcess(
      "pwsh",
      ["-File", "PostEmitter.ps1"],
      { cwd: "/repo/sdk/package", env: {}, timeoutMs: 1_000 },
      vi.fn().mockReturnValue(child),
    );
    const rejection = expect(result).rejects.toThrow("failed with exit code 7");

    child.emit("close", 7, null);
    await rejection;
  });

  test("kills and rejects a timed-out process", async () => {
    vi.useFakeTimers();
    const child = createChild();
    const terminate = vi.fn(async (target) => {
      target.kill();
    });
    const result = runProcess(
      "pwsh",
      ["-File", "PostEmitter.ps1"],
      { cwd: "/repo/sdk/package", env: {}, timeoutMs: 10, terminateProcessTree: terminate },
      vi.fn().mockReturnValue(child),
    );
    const rejection = expect(result).rejects.toThrow("timed out after 0.01 seconds");

    await vi.advanceTimersByTimeAsync(10);
    await rejection;
    expect(child.kill).toHaveBeenCalledOnce();
    expect(terminate).toHaveBeenCalledWith(child);
    vi.useRealTimers();
  });

  test("does not reject until process-tree termination is confirmed", async () => {
    vi.useFakeTimers();
    const child = createChild();
    let confirmTermination!: () => void;
    const terminate = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          confirmTermination = resolve;
        }),
    );
    let rejected = false;
    const result = runProcess(
      "pwsh",
      ["-File", "PostEmitter.ps1"],
      { cwd: "/repo/sdk/package", env: {}, timeoutMs: 10, terminateProcessTree: terminate },
      vi.fn().mockReturnValue(child),
    );
    const rejection = result.catch((error) => {
      rejected = true;
      throw error;
    });

    await vi.advanceTimersByTimeAsync(10);
    expect(rejected).toBe(false);
    confirmTermination();
    await expect(rejection).rejects.toThrow("timed out after 0.01 seconds");
    vi.useRealTimers();
  });

  test("kills and rejects a cancelled process", async () => {
    const child = createChild();
    const controller = new AbortController();
    const terminate = vi.fn(async (target) => {
      target.kill();
    });
    const result = runProcess(
      "pwsh",
      ["-File", "PostEmitter.ps1"],
      {
        cwd: "/repo/sdk/package",
        env: {},
        timeoutMs: 1_000,
        signal: controller.signal,
        terminateProcessTree: terminate,
      },
      vi.fn().mockReturnValue(child),
    );

    controller.abort();
    await expect(result).rejects.toThrow("was cancelled");
    expect(child.kill).toHaveBeenCalledOnce();
    expect(terminate).toHaveBeenCalledWith(child);
  });

  test("handles a signal that was already aborted before listener registration", async () => {
    const child = createChild();
    const controller = new AbortController();
    controller.abort();
    const terminate = vi.fn(async () => undefined);
    const result = runProcess(
      "pwsh",
      ["-File", "PostEmitter.ps1"],
      {
        cwd: "/repo/sdk/package",
        env: {},
        timeoutMs: 1_000,
        signal: controller.signal,
        terminateProcessTree: terminate,
      },
      vi.fn().mockReturnValue(child),
    );

    await expect(result).rejects.toThrow("was cancelled");
    expect(terminate).toHaveBeenCalledWith(child);
    expect(() => child.emit("error", new Error("late spawn error"))).not.toThrow();
  });
});

describe.runIf(process.platform !== "win32")("terminateProcessTree", () => {
  test("escalates when the parent closes but its process group remains", async () => {
    const child = {
      pid: 123,
      exitCode: 0,
      signalCode: null,
      kill: vi.fn(),
    } as never;
    const kill = vi.spyOn(process, "kill").mockImplementation((_pid, signal) => {
      if (signal === 0 && kill.mock.calls.length === 4) {
        throw Object.assign(new Error("process group not found"), { code: "ESRCH" });
      }
      return true;
    });

    await terminateProcessTree(child, process.platform);

    expect(kill.mock.calls).toEqual([
      [-123, "SIGTERM"],
      [-123, 0],
      [-123, "SIGKILL"],
      [-123, 0],
    ]);
  });
});
