#!/usr/bin/env node

// created by copilot agent Claude Sonnet 4

// @ts-check

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname, join as pathJoin, normalize } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getLatestStableVersion(packageName) {
  try {
    console.error(`  Checking ${packageName}...`);
    const output = execSync(`npm view "${packageName}" version`, {
      encoding: "utf8",
      stdio: "pipe",
    });
    const version = output.trim();
    console.error(`    found ${version}`);
    return version;
  } catch {
    console.error(`    not found on npm`);
    return null;
  }
}

async function getAzureLkgPackagesFromWorkspace() {
  console.error("Reading azurelkg catalog from pnpm-workspace.yaml...");

  try {
    const workspaceYamlPath = resolve(__dirname, "../../../pnpm-workspace.yaml");
    const normalized = normalize(pathJoin(__dirname, "../../../pnpm-workspace.yaml"));
    console.dir({ workspaceYamlPath, normalized });
    const content = readFileSync(workspaceYamlPath, "utf8");

    // Find the azurelkg section and extract package names
    const azurelkgRegex = /azurelkg:\s*\n([\s\S]*?)(?:\n {2}\w+:|$)/;
    const match = content.match(azurelkgRegex);

    if (!match) {
      throw new Error("azurelkg catalog not found in pnpm-workspace.yaml");
    }

    const azurelkgSection = match[1];

    // Extract package names from lines like "    '@azure/package-name': version"
    const packageRegex = /^\s{4,}'([^']+)':\s*.+$/gm;
    const packages = [];
    let packageMatch;

    while ((packageMatch = packageRegex.exec(azurelkgSection)) !== null) {
      packages.push(packageMatch[1]);
    }

    packages.sort();
    console.error(`Found ${packages.length} packages in azurelkg catalog`);

    return packages;
  } catch (error) {
    console.error("Error reading pnpm-workspace.yaml:", error.message);
    throw error;
  }
}
async function updatePnpmWorkspaceYaml(packages) {
  const workspaceYamlPath = resolve(__dirname, "../../../pnpm-workspace.yaml");
  const normalized = normalize(pathJoin(__dirname, "../../../pnpm-workspace.yaml"));
  console.dir({ workspaceYamlPath, normalized });
  let content = readFileSync(workspaceYamlPath, "utf8");

  // Build the azurelkg catalog section
  let azurelkgSection = "";
  for (const [packageName, version] of Object.entries(packages)) {
    azurelkgSection += `    '${packageName}': ${version}\n`;
  }

  // Replace the azurelkg section - find from "  azurelkg:" to the next section at the same indentation level
  const azurelkgRegex = /( {2}azurelkg:\s*\n)([\s\S]*?)(\n {2}\w+:|$)/;
  const match = content.match(azurelkgRegex);

  if (match) {
    const beforeSection = content.substring(0, match.index + match[1].length);
    const afterMatch = match.index + match[1].length + match[2].length;
    const afterSection = content.substring(afterMatch);
    content = beforeSection + azurelkgSection + afterSection;
  } else {
    console.error("Could not find azurelkg section in pnpm-workspace.yaml");
    console.error("Looking for pattern:", azurelkgRegex);
    return;
  }

  writeFileSync(workspaceYamlPath, content, "utf8");
  console.log("Updated pnpm-workspace.yaml with latest versions");
}

async function main() {
  try {
    console.error("Getting Azure SDK Core and Identity packages from azurelkg catalog...");
    const packageNames = await getAzureLkgPackagesFromWorkspace();

    console.log("# Azure SDK Core and Identity packages with latest stable versions");
    console.log("azurelkg:");

    const packages = {};

    for (const packageName of packageNames) {
      const version = await getLatestStableVersion(packageName);
      if (version) {
        packages[packageName] = version;
        console.log(`  '${packageName}': ${version}`);
      }
    }

    console.error("\nUpdating pnpm-workspace.yaml...");
    await updatePnpmWorkspaceYaml(packages);

    console.error(`\nProcessed ${Object.keys(packages).length} packages successfully!`);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
