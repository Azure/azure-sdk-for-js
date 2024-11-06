import { parseArgs } from "node:util";
import fs from "node:fs/promises";
import { spawn, SpawnOptions } from "node:child_process";
import { exit } from "node:process";
import path from "node:path";

/**
 * Mapping of locations of Azure source files to their location in the unbranded package.
 */
const AZURE_SOURCES = {
  // core-rest-pipeline is placed at the root of the unbranded package; this also covers subfolders of
  // core-rest-pipeline including policies/ and retryStrategies/.
  "../core-rest-pipeline/src/": "./src/",
  "../core-util/src/": "./src/util/",
  "../core-auth/src/": "./src/auth/",
  "../abort-controller/src/": "./src/abort-controller/",
  "../core-client-rest/src/": "./src/client/",
  "../core-tracing/src/": "./src/tracing/",
  "../logger/src/": "./src/logger/",
};

const {
  values: {
    update = false,
    "output-path": outputPath = "./review/azure-core-comparison.diff",
    verbose = false,
  },
} = parseArgs({
  options: {
    update: {
      type: "boolean",
    },
    "output-path": {
      type: "string",
      short: "o",
    },
    verbose: {
      type: "boolean",
      short: "v",
    },
  },
});

interface RunResult {
  exitCode?: number;
  signal?: NodeJS.Signals;
  stdout: string;
}

/**
 * Runs the given CLI command and captures the output
 */
async function run(
  commandAndArgs: [string, ...string[]],
  options: SpawnOptions = {},
): Promise<RunResult> {
  let stdout = "";
  const [command, ...args] = commandAndArgs;

  const proc = spawn(command, args, options);

  return new Promise((resolve, reject) => {
    proc.on("error", reject);
    proc.on("exit", (exitCode, signal) => {
      resolve({
        exitCode: exitCode ?? undefined,
        signal: signal ?? undefined,
        stdout,
      });
    });
    proc.stdout?.on("data", (data) => {
      stdout += data.toString();
      if (verbose) {
        process.stdout.write(data);
      }
    });

    if (verbose) {
      proc.stderr?.on("data", (data) => process.stderr.write(data));
    }
  });
}

/**
 * Creates a diff representing code changes between the Azure core packages and the unbranded package.
 *
 * This is done by using a temp folder/git repo. The Azure core files are copied into the temp folder following
 * the mappings defined in AZURE_SOURCES. This is then committed, and then the temp folder is cleaned out and the unbranded
 * Core is copied in. The diff (as reported by `git diff`) between the committed Azure core files and the unbranded replacement
 * is returned.
 */
async function calculatePatchFileContents(): Promise<string> {
  const tmpDir = await fs.mkdtemp(".azure-diff-tool");

  try {
    // Initialize temp git repo
    await run(["git", "init"], { cwd: tmpDir });

    // Copy over the Azure Core files to where are expected to be in the unbranded Core package
    for (const [azurePath, newLocation] of Object.entries(AZURE_SOURCES)) {
      await fs.cp(azurePath, path.join(tmpDir, newLocation), { recursive: true });
    }

    // Commit the Azure files, then remove everything so that they can be replaced by the unbranded files
    await run(["git", "add", "."], { cwd: tmpDir });
    await run(["git", "commit", "-m", "Placeholder commit"], { cwd: tmpDir });
    await fs.rm(path.join(tmpDir, "src"), { recursive: true, force: true });

    // Copy the unbranded files into the temp repo
    await fs.cp("./src/", path.join(tmpDir, "src"), { recursive: true });

    // Staging the unbranded files and using `git diff --staged` means that the diff will also show files
    // that have been removed and moved.
    await run(["git", "add", "."], { cwd: tmpDir });
    const { stdout } = await run(
      ["git", "diff", "--ignore-all-space", "--staged", "--find-renames"],
      { cwd: tmpDir },
    );
    return stdout;
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
}

async function main(): Promise<void> {
  const expectedContent = await calculatePatchFileContents();

  if (update) {
    await fs.writeFile(outputPath, expectedContent, "utf-8");
  } else {
    const content = await fs.readFile(outputPath, "utf-8");

    if (content === expectedContent) {
      console.log("✅ No changes to Azure to unbranded diff report");
    } else {
      console.error("❌ There have been changes to the Azure-unbranded diff report.");
      console.error(
        "  This happens when you make a change to Azure Core without making the same change in the unbranded Core package.",
      );
      console.error("  To fix:");
      console.error(
        "  - Run `rushx lint:fix` in the ts-http-runtime package to update review/azure-core-comparison.diff, then have a look and see what's changed.",
      );
      console.error("  - Apply your Core changes to the ts-http-runtime package as appropriate.");
      console.error(
        "  - Run `rushx lint:fix` again package to update the diff report, and commit the changes.",
      );
      exit(1);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
