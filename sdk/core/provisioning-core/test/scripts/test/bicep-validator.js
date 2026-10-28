import { execFileSync } from "node:child_process";
import {
  globSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { homedir, tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

const BICEP_CLI_CANDIDATES = [
  {
    command: join(homedir(), ".azure", "bin", "bicep.exe"),
    versionArgs: ["--version"],
    buildArgs: (filePath) => ["build", filePath, "--stdout"],
    buildPatternArgs: (pattern) => ["build", "--pattern", pattern],
  },
  {
    command: join(homedir(), ".azure", "bin", "bicep"),
    versionArgs: ["--version"],
    buildArgs: (filePath) => ["build", filePath, "--stdout"],
    buildPatternArgs: (pattern) => ["build", "--pattern", pattern],
  },
  {
    command: "bicep",
    versionArgs: ["--version"],
    buildArgs: (filePath) => ["build", filePath, "--stdout"],
    buildPatternArgs: (pattern) => ["build", "--pattern", pattern],
  },
  {
    command: "az",
    versionArgs: ["bicep", "version"],
    buildArgs: (filePath) => ["bicep", "build", "--file", filePath, "--stdout"],
    buildPatternArgs: (pattern) => ["bicep", "build", "--pattern", pattern],
  },
];

function errorText(error) {
  if (!(error instanceof Error)) {
    return String(error);
  }

  const stderr = error.stderr;

  if (Buffer.isBuffer(stderr)) {
    return stderr.toString("utf8").trim();
  }

  if (typeof stderr === "string") {
    return stderr.trim();
  }

  return error.message;
}

// Resolve the first working Bicep entrypoint, preferring standalone binaries
// and falling back to `az bicep` when necessary.
export function resolveBicepCli() {
  for (const candidate of BICEP_CLI_CANDIDATES) {
    try {
      execFileSync(candidate.command, candidate.versionArgs, {
        stdio: ["ignore", "ignore", "ignore"],
      });
      return candidate;
    } catch {
      continue;
    }
  }

  throw new Error(
    "Bicep CLI is required for validation but was not found. Install it with 'az bicep install' or put 'bicep' on PATH.",
  );
}

// Probe for a usable Bicep CLI without throwing, so callers can decide whether
// validation should be required or skipped.
export function tryResolveBicepCli() {
  try {
    return resolveBicepCli();
  } catch {
    return undefined;
  }
}

// Walk a directory recursively and collect every `.bicep` file underneath it.
function bicepFilesInDirectory(directoryPath) {
  const filePaths = [];

  for (const entry of readdirSync(directoryPath, { withFileTypes: true })) {
    const entryPath = resolve(directoryPath, entry.name);

    if (entry.isDirectory()) {
      filePaths.push(...bicepFilesInDirectory(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".bicep")) {
      filePaths.push(entryPath);
    }
  }

  return filePaths;
}

// Expand input targets into concrete Bicep files, allowing callers to pass
// either individual files or directories containing generated output.
function normalizeTargets(targets) {
  const filePaths = [];

  // Expand glob patterns (needed on Windows where the shell doesn't expand them).
  const expandedTargets = targets.flatMap((t) =>
    t.includes("*") ? globSync(t) : [t],
  );

  for (const target of expandedTargets) {
    const resolvedTarget = resolve(target);
    const targetStat = statSync(resolvedTarget, { throwIfNoEntry: false });

    if (!targetStat) {
      throw new Error(`Bicep validation target not found: '${target}'.`);
    }

    if (targetStat.isDirectory()) {
      const entryFiles = bicepFilesInDirectory(resolvedTarget);

      if (entryFiles.length === 0) {
        throw new Error(
          `No .bicep files found in directory '${resolvedTarget}'.`,
        );
      }

      filePaths.push(...entryFiles);
      continue;
    }

    if (!resolvedTarget.endsWith(".bicep")) {
      throw new Error(`Expected a .bicep file or directory, got '${target}'.`);
    }

    filePaths.push(resolvedTarget);
  }

  return filePaths;
}

// Validate one or more concrete Bicep entry files with the real Bicep CLI and
// surface compiler stderr directly when compilation fails.
export function validateBicepEntryFiles(filePaths) {
  const bicepCli = resolveBicepCli();

  for (const filePath of filePaths) {
    runBicepBuild(bicepCli, bicepCli.buildArgs(filePath), filePath);
  }
}

function runBicepBuild(bicepCli, args, target) {
  try {
    execFileSync(bicepCli.command, args, {
      stdio: ["ignore", "ignore", "pipe"],
    });
  } catch (error) {
    throw new Error(
      `Bicep compilation failed for '${target}'.\n${errorText(error)}`,
      { cause: error },
    );
  }
}

// Validate a mixed set of files and directories by first normalizing them into
// concrete `.bicep` entry files.
export function validateBicepTargets(targets) {
  validateBicepEntryFiles(normalizeTargets(targets));
}

// Materialize rendered Bicep files into a temporary directory and validate the
// generated output in one compiler process, including nested module files.
export function validateRenderedBicepFiles(renderedFiles) {
  const tempDir = mkdtempSync(join(tmpdir(), "js-provisioning-bicep-"));

  try {
    for (const renderedFile of renderedFiles) {
      const filePath = join(tempDir, renderedFile.path);
      mkdirSync(dirname(filePath), { recursive: true });
      writeFileSync(filePath, renderedFile.contents);
    }

    if (bicepFilesInDirectory(tempDir).length === 0) {
      throw new Error(`No .bicep files found in directory '${tempDir}'.`);
    }

    const bicepCli = resolveBicepCli();
    const pattern = `${tempDir.replaceAll("\\", "/")}/**/*.bicep`;
    runBicepBuild(bicepCli, bicepCli.buildPatternArgs(pattern), tempDir);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}
