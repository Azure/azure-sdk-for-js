import { parseArgs } from "node:util";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { exit } from "node:process";

const UNBRANDED_TO_AZURE_MAPPINGS = {
  // Logger index file was renamed
  "src/logger/logger.ts": "../logger/src/index.ts",

  "src/logger": "../logger/src",
  "src/auth": "../core-auth/src",
  "src/abort-controller": "../abort-controller/src",
  "src/client": "../core-client-rest/src",
  "src/policies": "../core-rest-pipeline/src/policies",
  "src/retryStrategies": "../core-rest-pipeline/src/retryStrategies",
  "src/tracing": "../core-tracing/src",
  "src/util": "../core-util/src",

  src: "../core-rest-pipeline/src",
};

const {
  values: { update = false, "output-path": outputPath = "./review/azure-core-comparison.diff" },
} = parseArgs({
  options: {
    update: {
      type: "boolean",
    },
    "output-path": {
      type: "string",
      short: "o",
    },
  },
});

async function find(dir: string): Promise<string[]> {
  const files = await fs.readdir(dir);
  const allFiles: string[] = [];
  for (const filename of files) {
    const file = path.join(dir, filename);
    const stat = await fs.stat(file);
    if (stat.isDirectory()) {
      allFiles.push(...(await find(file)));
    } else {
      allFiles.push(file);
    }
  }

  return allFiles;
}

async function getFileMappings(): Promise<[string, string | undefined][]> {
  const result: [string, string | undefined][] = [];
  const files = await find("src");

  for (const unbrandedLocation of files) {
    const pathMatches = Object.keys(UNBRANDED_TO_AZURE_MAPPINGS).filter((x) =>
      unbrandedLocation.startsWith(x)
    );

    let found = false;
    for(const pathMatch of pathMatches) {
      const azureLocation =
        UNBRANDED_TO_AZURE_MAPPINGS[pathMatch] + unbrandedLocation.substring(pathMatch.length);

      let exists: boolean;
      try {
        await fs.access(azureLocation);
        exists = true;
      } catch {
        exists = false;
      }

      if(exists) {
        result.push([unbrandedLocation, azureLocation]);
        found = true;
        break;
      }
    }

    if(!found) {
      result.push([unbrandedLocation, undefined]);
    }
  }

  return result;
}

export interface RunResult {
  exitCode?: number;
  signal?: NodeJS.Signals;
  stdout: string;
}

async function run(command: string, ...args: string[]): Promise<RunResult> {
  let stdout = "";

  const proc = spawn(command, args);

  return new Promise((resolve, reject) => {
    proc.on("error", reject);
    proc.on("exit", (exitCode, signal) => {
      resolve({
        exitCode: exitCode ?? undefined,
        signal: signal ?? undefined,
        stdout,
      })
    });
    proc.stdout.on("data", data => {
      stdout += data.toString();
    });
  })
}

async function calculatePatchFileContents(): Promise<string> {
  const mappings = await getFileMappings();

  const patches: string[] = [];
  for(const [unbrandedFile, azureFile = "/dev/null"] of mappings) {
    const result = await run("git", "diff", "--no-index", azureFile, unbrandedFile);

    // Exit code 1 is expected as it indicates a difference
    if(result.exitCode !== 0 && result.exitCode !== 1) {
      throw new Error(`git diff exited with code ${result.exitCode} when comparing ${unbrandedFile} and ${azureFile}`);
    }

    patches.push(result.stdout);
  }

  return patches.join("");
}

async function main(): Promise<void> {
  const expectedContent = await calculatePatchFileContents();

  if(update) {
    await fs.writeFile(outputPath, expectedContent, "utf-8");
  } else {
    const content = await fs.readFile(outputPath, "utf-8");

    if(content === expectedContent) {
      console.log("✅ No changes to Azure to unbranded diff report");
    } else {
      console.log("❌ There have been changes to the Azure-unbranded diff report.");
      console.log("  This happens when you make a change to Azure Core without making the same change in the unbranded Core package.");
      console.log("  To fix:");
      console.log("  - Apply your Core changes to the ts-http-runtime package as appropriate.");
      console.log("  - Run `rushx lint:fix` in the ts-http-runtime package to update the diff report, and commit the changes.");
      exit(1);
    }
  }
}

main();
