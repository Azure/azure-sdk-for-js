// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChildProcess, exec, spawn, SpawnOptions } from "node:child_process";
import { checkWithTimeout } from "./checkWithTimeout";
import { createPrinter } from "./printer";
import { ProjectInfo, resolveProject, resolveRoot } from "./resolveProject";
import {
  access,
  chmod,
  constants,
  lstat,
  mkdir,
  readdir,
  readFile,
  rm,
  symlink,
  unlink,
} from "node:fs/promises";
import { createWriteStream, existsSync } from "node:fs";
import path from "node:path";
import { extract } from "tar";
import * as unzipper from "unzipper";
import { promisify } from "node:util";
import { PassThrough } from "node:stream";
import { pipeline } from "node:stream/promises";
import { delay } from "./checkWithTimeout";
import process from "node:process";
import os from "node:os";

const log = createPrinter("test-proxy");
const downloadLocation = getTestProxyDownloadLocation();

export function getTestProxyDownloadLocation(): string {
  const homedir = os.homedir();
  const downloadPath = "azsdk-dev-tool";
  switch (process.platform) {
    case "win32":
      return path.join(
        process.env["LOCALAPPDATA"] || path.join(homedir, "AppData", "Local"),
        downloadPath,
        "Cache",
      );
    case "darwin":
      return path.join(path.join(homedir, "Library"), "Caches", downloadPath);
    default:
      // Assume Linux
      return path.join(process.env["XDG_CACHE_HOME"] || path.join(homedir, ".cache"), downloadPath);
  }
}

/**
 * Represents a test proxy binary artifact archive that is built against a specific platform and architecture.
 */
interface TestProxyBinary {
  /**
   * The platform targeted by this artifact. For example, "win32", "darwin" (macOS), "linux".
   */
  platform: string;

  /**
   * The architecture supported by this artifact. For example, "x64" or "arm64".
   */
  architecture: string;

  /**
   * File name of the binary archive to download.
   */
  fileName: string;

  /**
   * Location of the executable inside the downloaded archive.
   */
  executableLocation: string;
}

/**
 * Set of available test proxy artifact bundles for download.
 */
const AVAILABLE_TEST_PROXY_BINARIES: TestProxyBinary[] = [
  {
    platform: "win32",
    architecture: "x64",
    fileName: "test-proxy-standalone-win-x64.zip",
    executableLocation: "Azure.Sdk.Tools.TestProxy.exe",
  },
  {
    platform: "linux",
    architecture: "x64",
    fileName: "test-proxy-standalone-linux-x64.tar.gz",
    executableLocation: "Azure.Sdk.Tools.TestProxy",
  },
  {
    platform: "linux",
    architecture: "arm64",
    fileName: "test-proxy-standalone-linux-arm64.tar.gz",
    executableLocation: "Azure.Sdk.Tools.TestProxy",
  },
  {
    platform: "darwin",
    architecture: "x64",
    fileName: "test-proxy-standalone-osx-x64.zip",
    executableLocation: "Azure.Sdk.Tools.TestProxy",
  },
  {
    platform: "darwin",
    architecture: "arm64",
    fileName: "test-proxy-standalone-osx-arm64.zip",
    executableLocation: "Azure.Sdk.Tools.TestProxy",
  },
];

/**
 * Gets a test proxy artifact supported by the current environment.
 */
function getTestProxyBinary(): TestProxyBinary {
  const result = AVAILABLE_TEST_PROXY_BINARIES.find(
    ({ platform, architecture }) => platform === process.platform && architecture === process.arch,
  );

  if (!result) {
    throw new Error(
      `Unsupported platform/architecture combination: ${process.platform}/${process.arch}`,
    );
  }

  return result;
}

/**
 * Gets the download URL for a specific binary and version.
 */
function getDownloadUrl(binary: TestProxyBinary, version: string): string {
  return `https://github.com/Azure/azure-sdk-tools/releases/download/Azure.Sdk.Tools.TestProxy_${version}/${binary.fileName}`;
}

async function downloadTestProxy(downloadLocation: string, downloadUrl: string): Promise<void> {
  log(`Downloading test proxy binary from ${downloadUrl}`);
  const response = await fetch(downloadUrl);
  const data = await response.arrayBuffer();
  log(`Extracting test proxy binary to ${downloadLocation}`);
  if (downloadUrl.endsWith(".tar.gz")) {
    const stream = new PassThrough();
    stream.write(Buffer.from(data));
    stream.end();
    await pipeline(stream, extract({ cwd: downloadLocation }));
  } else {
    const stream = await unzipper.Open.buffer(Buffer.from(data));
    await stream.extract({ path: downloadLocation });
  }
}

let cachedTestProxyExecutableLocation: string | undefined;

/**
 * Gets the path to the test-proxy executable. If the test-proxy executable has not been downloaded already, it will first be downloaded.
 */
export async function getTestProxyExecutable(): Promise<string> {
  if (cachedTestProxyExecutableLocation) {
    return cachedTestProxyExecutableLocation;
  }

  const targetVersion = await getTargetVersion();
  const binary = getTestProxyBinary();

  // The artifact is downloaded and extracted to <sdk root>/.test-proxy/<version>/.
  const downloadLocationWithVersion = path.join(downloadLocation, targetVersion);
  const executableLocation = path.join(downloadLocationWithVersion, binary.executableLocation);

  // Check the executable is already downloaded and is, in fact, executable. If it's not, download it.
  try {
    await access(executableLocation, constants.X_OK);
    log(`Test proxy executable already exists at ${executableLocation}, not downloading it.`);
  } catch {
    // Nuking the root .test-proxy folder, without the version, ensures that older versions of the test proxy
    // get cleaned up, so we don't end up with a ton of different test proxy versions using up disk space.
    await rm(downloadLocation, { recursive: true, force: true });

    await mkdir(downloadLocationWithVersion, { recursive: true });
    await downloadTestProxy(downloadLocationWithVersion, getDownloadUrl(binary, targetVersion));

    // Mark the executable as executable by all
    await chmod(executableLocation, 0o755);
  }

  cachedTestProxyExecutableLocation = executableLocation;
  return executableLocation;
}

interface CommandRun {
  result: Promise<void>;
  command: ChildProcess;
}

function runCommand(executable: string, argv: string[], options: SpawnOptions = {}): CommandRun {
  // TODO: this crashes the _whole_ program if the executable isn't on the system.
  const command = spawn(executable, argv, options);

  // Stop on exit
  process.on("exit", () => {
    command.kill("SIGINT");
  });

  return {
    command,
    result: new Promise<void>((resolve, reject) => {
      command.on("exit", (exitCode, signal) => {
        if (exitCode === 0) {
          resolve();
        } else if (!signal) {
          reject(new Error(`${executable} exited with code ${exitCode}`));
        }
      });
    }),
  };
}

export async function runTestProxyCommand(argv: string[]): Promise<void> {
  const executable = await getTestProxyExecutable();
  await delay(1000);
  await runCommand(executable, argv, {
    stdio: "inherit",
    env: { ...process.env },
  }).result;
  if (existsSync("assets.json")) {
    await linkRecordingsDirectory();
  }
}

export function createAssetsJson(project: ProjectInfo): Promise<void> {
  return runMigrationScript(project, false);
}

const execPromise = promisify(exec);

async function getRecordingsDirectory(project: ProjectInfo): Promise<string> {
  const { stdout } = await execPromise(
    `${await getTestProxyExecutable()} config locate -a assets.json`,
    { cwd: project.path },
  );
  const lines = stdout.split("\n");

  // the directory is the second-to-last line of output (there's some other log output that comes out from the test proxy first, and the last line is empty)
  return lines[lines.length - 2].trim();
}

export async function linkRecordingsDirectory() {
  const project = await resolveProject();
  const root = await resolveRoot();
  const recordingsDirectory = await getRecordingsDirectory(project);
  const projectRelativeToRoot = path.relative(root, project.path);

  const trueRecordingsDirectory = path.join(
    recordingsDirectory,
    projectRelativeToRoot,
    "recordings/",
  );
  const relativeRecordingsDirectory = path.relative(project.path, trueRecordingsDirectory);

  const symlinkLocation = path.join(project.path, "_recordings");

  if (existsSync(symlinkLocation)) {
    const stat = await lstat(symlinkLocation);
    if (stat.isSymbolicLink()) {
      await unlink(symlinkLocation);
    } else {
      log.warn(
        "Could not create symbolic link to recordings directory: a file exists at _recordings already.",
      );
      return;
    }
  }

  // Try and create a symlink but fail gracefully if it doesn't work
  try {
    await symlink(relativeRecordingsDirectory, symlinkLocation);
  } catch (e) {
    log.warn("Could not create symbolic link to recordings directory");
    log.warn(e);
  }
}

export interface DiffOptions {
  stat?: boolean;
}

/**
 * Locates the asset-sync clone directory for a given package by reading
 * the `.assets/breadcrumb/` entries. Returns the clone root path, or
 * undefined if no clone is found.
 */
async function findAssetCloneDirectory(
  repoRoot: string,
  projectRelativeToRoot: string,
): Promise<string | undefined> {
  const breadcrumbDir = path.join(repoRoot, ".assets", "breadcrumb");
  if (!existsSync(breadcrumbDir)) {
    return undefined;
  }

  const files = await readdir(breadcrumbDir);

  for (const file of files) {
    if (!file.endsWith(".breadcrumb")) continue;
    const content = (await readFile(path.join(breadcrumbDir, file), "utf-8")).trim();
    // Format: <assetsJsonRelPath>;<cloneDirName>;<tag>
    const parts = content.split(";");
    if (parts[0] === path.join(projectRelativeToRoot, "assets.json")) {
      return path.join(repoRoot, ".assets", parts[1]);
    }
  }

  return undefined;
}

/**
 * Shows what test recordings have changed since the last push or restore.
 * Runs `git status` and optionally `git diff` inside the asset-sync clone
 * scoped to the current package's recording subtree.
 */
export async function getRecordingsDiff(
  project: ProjectInfo,
  options: DiffOptions = {},
): Promise<void> {
  const assetsJsonPath = path.join(project.path, "assets.json");
  if (!existsSync(assetsJsonPath)) {
    log.error("No assets.json found in the current package — is asset sync set up?");
    return;
  }

  const root = await resolveRoot();
  const projectRelativeToRoot = path.relative(root, project.path);

  // Locate the asset clone directory via breadcrumb (no test-proxy binary needed)
  const cloneDir = await findAssetCloneDirectory(root, projectRelativeToRoot);
  if (!cloneDir || !existsSync(cloneDir)) {
    log.error(
      "Could not locate the recordings directory. Have you run `dev-tool test-proxy restore`?",
    );
    return;
  }

  // Read AssetsRepoPrefixPath from assets.json to build the correct subtree path
  const assetsJson = JSON.parse(await readFile(assetsJsonPath, "utf-8"));
  const prefix: string = assetsJson.AssetsRepoPrefixPath ?? "";
  const recordingsSubtree = prefix
    ? path.join(prefix, projectRelativeToRoot, "recordings")
    : path.join(projectRelativeToRoot, "recordings");

  // Check for any changes (staged, unstaged, or untracked)
  const { stdout: statusOutput } = await execPromise(
    `git status --porcelain -- "${recordingsSubtree}"`,
    { cwd: cloneDir },
  );

  if (!statusOutput.trim()) {
    log.success("No recording changes detected — recordings are clean.");
    return;
  }

  // Show summary header
  const lines = statusOutput.trim().split("\n");
  const added = lines.filter((l) => l.startsWith("?") || l.startsWith("A")).length;
  const modified = lines.filter((l) => l.startsWith(" M") || l.startsWith("M")).length;
  const deleted = lines.filter((l) => l.startsWith(" D") || l.startsWith("D")).length;

  log.info(`\nRecording changes for ${project.name}:`);
  log.info(
    `  ${lines.length} file(s) changed: +${added} added, ~${modified} modified, -${deleted} deleted\n`,
  );

  // Always show the file list
  for (const line of lines) {
    const status = line.substring(0, 2).trim();
    const file = line.substring(3);
    const label =
      status === "??" ? "new" : status === "M" ? "modified" : status === "D" ? "deleted" : status;
    log(`  [${label}] ${file}`);
  }

  // Show full diff unless --stat
  if (options.stat) {
    log.info("\n(Use without --stat to see full diffs)");
  } else {
    log.info(""); // blank line before diffs

    // Diff for tracked modified files
    if (modified > 0 || deleted > 0) {
      const { stdout: diffOutput } = await execPromise(
        `git diff --no-color -- "${recordingsSubtree}"`,
        { cwd: cloneDir, maxBuffer: 10 * 1024 * 1024 },
      );
      if (diffOutput.trim()) {
        process.stdout.write(diffOutput);
      }
    }

    // Show content of new untracked files (truncated)
    const untrackedFiles = lines.filter((l) => l.startsWith("??")).map((l) => l.substring(3));

    for (const file of untrackedFiles) {
      const filePath = path.join(cloneDir, file);
      try {
        const content = await readFile(filePath, "utf-8");
        const preview =
          content.length > 2000 ? content.substring(0, 2000) + "\n... (truncated)" : content;
        log.info(`\n--- new file: ${file} ---`);
        process.stdout.write(preview + "\n");
      } catch {
        // Skip files that can't be read
      }
    }
  }
}

export async function runMigrationScript(
  project: ProjectInfo,
  initialPush: boolean,
): Promise<void> {
  const migrationScriptLocation = path.join(
    await resolveRoot(),
    "eng/common/testproxy/onboarding/generate-assets-json.ps1",
  );

  const argv = [migrationScriptLocation, "-TestProxyExe", await getTestProxyExecutable()];
  if (initialPush) {
    argv.push("-InitialPush");
  }

  await runCommand("pwsh", argv, { stdio: "inherit", cwd: project.path }).result;
}

export interface TestProxy {
  stop(): Promise<void>;
}

export async function startTestProxy(): Promise<TestProxy> {
  const testProxy = runCommand(await getTestProxyExecutable(), [
    "start",
    "--storage-location",
    await resolveRoot(),
    "--",
    `http://0.0.0.0:${process.env.TEST_PROXY_HTTP_PORT ?? 5000}/`,
    `https://0.0.0.0:${process.env.TEST_PROXY_HTTPS_PORT ?? 5001}/`,
  ]);

  const logFile = createWriteStream("./testProxyOutput.log", { flags: "a" });
  testProxy.command.stdout?.pipe(logFile);
  testProxy.command.stderr?.pipe(logFile);

  // Wait for the proxy to be ready before allowing tests to run.
  // If readiness fails, clean up the spawned process to avoid orphans.
  const ready = await checkWithTimeout(isProxyToolActive, 500, 30000);
  if (!ready) {
    logFile.end();
    testProxy.command.kill("SIGKILL");
    try {
      await testProxy.result;
    } catch {
      // Ignore errors from the killed process.
    }
    throw new Error(
      `Test proxy did not become ready within 30s at http://localhost:${process.env.TEST_PROXY_HTTP_PORT ?? 5000}`,
    );
  }

  return {
    async stop() {
      testProxy.command.kill("SIGKILL");
      await testProxy.result;
    },
  };
}

export async function isProxyToolActive(): Promise<boolean> {
  try {
    const response = await fetch(
      `http://localhost:${process.env.TEST_PROXY_HTTP_PORT ?? 5000}/info/available`,
    );

    await response.text();

    if (!response.ok) {
      return false;
    }

    log.info(
      `Proxy tool seems to be active at http://localhost:${
        process.env.TEST_PROXY_HTTP_PORT ?? 5000
      }\n`,
    );
    return true;
  } catch (error: unknown) {
    return false;
  }
}

async function getTargetVersion() {
  // Grab the tag from the `/eng/common/testproxy/target_version.txt` file [..is used to control the default version]
  //
  // In times of longer lived version override, the file eng/target_proxy_version.txt can be used to override this version
  // in both CI and local development.
  // Example content:
  //
  // 1.0.0-dev.20220224.2
  // (Bot regularly updates the tag in the file above.)
  try {
    let contentInVersionFile: string;
    const overrideFile = `${path.join(await resolveRoot(), "eng/target_proxy_version.txt")}`;
    const overrideExists = existsSync(overrideFile);

    if (overrideExists) {
      contentInVersionFile = await readFile(overrideFile, "utf-8");
    } else {
      contentInVersionFile = await readFile(
        `${path.join(await resolveRoot(), "eng/common/testproxy/target_version.txt")}`,
        "utf-8",
      );
    }

    const tag = contentInVersionFile.trim();

    log.info(`Image tag obtained from the powershell script => ${tag}\n`);
    return tag;
  } catch (_: unknown) {
    log.warn(
      `Unable to get the image tag from the powershell script, trying "latest" tag instead\n`,
    );
    return "latest";
  }
}
