import { execFile, spawn, type ChildProcess } from "node:child_process";
import { lstat, realpath } from "node:fs/promises";
import path from "node:path";
import shell from "shelljs";
import { logger } from "../utils/logger.js";
import { RunMode } from "./types.js";

export const POST_EMITTER_SCRIPT_NAME = "PostEmitter.ps1";
export const POST_EMITTER_TIMEOUT_MS = 10 * 60 * 1000;
const PROCESS_TERMINATION_GRACE_MS = 5_000;
const POST_EMITTER_ENVIRONMENT_KEYS = new Set(
  [
    "CI",
    "COMSPEC",
    "HOME",
    "HOMEDRIVE",
    "HOMEPATH",
    "LANG",
    "LC_ALL",
    "PATH",
    "PATHEXT",
    "PSMODULEPATH",
    "SYSTEMROOT",
    "TEMP",
    "TERM",
    "TF_BUILD",
    "TMP",
    "TMPDIR",
    "USERPROFILE",
    "WINDIR",
  ].map((key) => key.toUpperCase()),
);

export type PostEmitterRunMode = RunMode | "unspecified";

interface RunProcessOptions {
  cwd: string;
  env: NodeJS.ProcessEnv;
  timeoutMs: number;
  signal?: AbortSignal;
  terminateProcessTree?: (child: ChildProcess) => Promise<void>;
}

type SpawnProcess = (
  executable: string,
  args: readonly string[],
  options: {
    cwd: string;
    env: NodeJS.ProcessEnv;
    shell: false;
    stdio: "inherit";
    windowsHide: true;
    detached: boolean;
  },
) => ChildProcess;

export interface PostEmitterDependencies {
  findPowerShellExecutable?: () => string | undefined;
  lstat?: typeof lstat;
  realpath?: typeof realpath;
  runProcess?: typeof runProcess;
  now?: () => number;
}

export function findPowerShellExecutable(
  which: (command: string) => string | undefined = (command) => shell.which(command)?.toString(),
): string | undefined {
  return which("pwsh") ?? which("powershell");
}

export function createPostEmitterEnvironment(source: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  return Object.fromEntries(
    Object.entries(source).filter(([key, value]) => {
      return value !== undefined && POST_EMITTER_ENVIRONMENT_KEYS.has(key.toUpperCase());
    }),
  );
}

async function waitForChildClose(child: ChildProcess, timeoutMs: number): Promise<boolean> {
  if (child.exitCode !== null || child.signalCode !== null) return true;

  return new Promise<boolean>((resolve) => {
    let settled = false;
    const finish = (closed: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      child.removeListener("close", close);
      resolve(closed);
    };
    const close = () => finish(true);
    const timeout = setTimeout(() => finish(false), timeoutMs);
    child.once("close", close);

    if (child.exitCode !== null || child.signalCode !== null) finish(true);
  });
}

async function runTaskkill(pid: number): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    execFile("taskkill", ["/PID", String(pid), "/T", "/F"], { windowsHide: true }, (error) =>
      error ? reject(error) : resolve(),
    );
  });
}

function isProcessGroupRunning(pid: number): boolean {
  try {
    process.kill(-pid, 0);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ESRCH") return false;
    throw error;
  }
}

async function waitForProcessGroupExit(pid: number, timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (isProcessGroupRunning(pid)) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) return false;
    await new Promise((resolve) => setTimeout(resolve, Math.min(50, remaining)));
  }
  return true;
}

export async function terminateProcessTree(
  child: ChildProcess,
  platform: NodeJS.Platform = process.platform,
): Promise<void> {
  if (!child.pid) {
    child.kill("SIGKILL");
    if (!(await waitForChildClose(child, PROCESS_TERMINATION_GRACE_MS))) {
      throw new Error("Failed to confirm post-emitter process termination.");
    }
    return;
  }

  if (platform === "win32") {
    try {
      await runTaskkill(child.pid);
    } catch (error) {
      if (child.exitCode === null && child.signalCode === null) throw error;
    }
    if (!(await waitForChildClose(child, PROCESS_TERMINATION_GRACE_MS))) {
      throw new Error("Failed to confirm post-emitter process-tree termination.");
    }
    return;
  }

  try {
    process.kill(-child.pid, "SIGTERM");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ESRCH") throw error;
  }
  await waitForChildClose(child, PROCESS_TERMINATION_GRACE_MS);
  if (!isProcessGroupRunning(child.pid)) return;

  try {
    process.kill(-child.pid, "SIGKILL");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ESRCH") throw error;
  }
  if (!(await waitForProcessGroupExit(child.pid, PROCESS_TERMINATION_GRACE_MS))) {
    throw new Error("Failed to confirm post-emitter process-tree termination.");
  }
}

export async function runProcess(
  executable: string,
  args: readonly string[],
  options: RunProcessOptions,
  spawnProcess: SpawnProcess = spawn,
): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    let settled = false;
    const child = spawnProcess(executable, args, {
      cwd: options.cwd,
      env: options.env,
      shell: false,
      stdio: "inherit",
      windowsHide: true,
      detached: process.platform !== "win32",
    });

    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      options.signal?.removeEventListener("abort", abort);
      error ? reject(error) : resolve();
    };
    let terminating = false;
    const terminate = async (message: string) => {
      if (settled || terminating) return;
      terminating = true;
      clearTimeout(timeout);
      options.signal?.removeEventListener("abort", abort);
      try {
        await (options.terminateProcessTree ?? terminateProcessTree)(child);
        finish(new Error(message));
      } catch (error) {
        finish(
          new Error(
            `${message} Failed to terminate the process tree: ${(error as Error).message}`,
            {
              cause: error,
            },
          ),
        );
      }
    };
    const abort = () => void terminate(`Post-emitter script was cancelled.`);
    const timeout = setTimeout(
      () =>
        void terminate(`Post-emitter script timed out after ${options.timeoutMs / 1000} seconds.`),
      options.timeoutMs,
    );

    child.once("error", (error) => {
      if (!terminating) finish(error);
    });
    child.once("close", (code, signal) => {
      if (terminating) return;
      if (code === 0) {
        finish();
        return;
      }
      const detail = signal ? `signal ${signal}` : `exit code ${code ?? "unknown"}`;
      finish(new Error(`Post-emitter script failed with ${detail}.`));
    });
    options.signal?.addEventListener("abort", abort, { once: true });

    if (options.signal?.aborted) {
      abort();
    }
  });
}

export async function runPostEmitter(
  packageDirectory: string,
  sdkRepoRoot: string,
  runMode: PostEmitterRunMode,
  signal?: AbortSignal,
  dependencies: PostEmitterDependencies = {},
): Promise<boolean> {
  const getLstat = dependencies.lstat ?? lstat;
  const getRealpath = dependencies.realpath ?? realpath;
  const getPowerShell = dependencies.findPowerShellExecutable ?? findPowerShellExecutable;
  const execute = dependencies.runProcess ?? runProcess;
  const now = dependencies.now ?? Date.now;

  const packageRoot = await getRealpath(path.resolve(packageDirectory));
  const repoRoot = await getRealpath(path.resolve(sdkRepoRoot));
  const relativePackagePath = path.relative(repoRoot, packageRoot);
  if (
    relativePackagePath === "" ||
    relativePackagePath === ".." ||
    relativePackagePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePackagePath)
  ) {
    throw new Error(`Package directory must be a child of the SDK repository: ${packageRoot}`);
  }

  const scriptPath = path.join(packageRoot, POST_EMITTER_SCRIPT_NAME);
  let scriptStats;
  try {
    scriptStats = await getLstat(scriptPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      logger.info(`[POST-EMITTER] Skipping ${relativePackagePath}: ${scriptPath} was not found.`);
      return false;
    }
    throw error;
  }

  if (!scriptStats.isFile() || scriptStats.isSymbolicLink()) {
    throw new Error(`Post-emitter script must be a regular file, not a symlink: ${scriptPath}`);
  }

  const resolvedScriptPath = await getRealpath(scriptPath);
  if (path.dirname(resolvedScriptPath) !== packageRoot) {
    throw new Error(
      `Post-emitter script must resolve directly inside the package root: ${scriptPath}`,
    );
  }

  const powerShell = getPowerShell();
  if (!powerShell) {
    throw new Error(`Found ${scriptPath}, but neither pwsh nor powershell is available.`);
  }

  const startedAt = now();
  logger.info(`[POST-EMITTER] Running ${resolvedScriptPath} for ${relativePackagePath}.`);
  try {
    await execute(
      powerShell,
      ["-NonInteractive", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", resolvedScriptPath],
      {
        cwd: packageRoot,
        env: {
          ...createPostEmitterEnvironment(process.env),
          AZSDK_POST_EMITTER_PACKAGE_ROOT: packageRoot,
          AZSDK_POST_EMITTER_REPO_ROOT: repoRoot,
          AZSDK_POST_EMITTER_BASE_REF: "HEAD",
          AZSDK_POST_EMITTER_RUN_MODE: runMode,
        },
        timeoutMs: POST_EMITTER_TIMEOUT_MS,
        signal,
      },
    );
  } catch (error) {
    throw new Error(
      `Post-emitter script failed for ${relativePackagePath}: ${(error as Error).message}`,
      {
        cause: error,
      },
    );
  } finally {
    logger.info(`[POST-EMITTER] Finished ${relativePackagePath} in ${now() - startedAt}ms.`);
  }

  logger.info(`[POST-EMITTER] Completed ${relativePackagePath} successfully.`);
  return true;
}

export async function preparePackageForBuild(
  packageDirectory: string,
  sdkRepoRoot: string,
  runMode: PostEmitterRunMode,
  applyCustomizations?: () => Promise<void>,
  postEmitter: typeof runPostEmitter = runPostEmitter,
): Promise<void> {
  await applyCustomizations?.();
  await postEmitter(packageDirectory, sdkRepoRoot, runMode);
}
