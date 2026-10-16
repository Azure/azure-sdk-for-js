// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { fileURLToPath } from "node:url";
import { planCustomization } from "./customization/planner.mjs";
import { validateCustomization } from "./customization/guards.mjs";
import { changedFiles, readBaseline, readTree, writeTree } from "./customization/trees.mjs";

function argumentsFor(args) {
  const options = {
    check: false,
    dryRun: false,
    baseRef: "HEAD",
    packageRoot: path.resolve(fileURLToPath(new URL("..", import.meta.url))),
  };
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (argument === "--check") options.check = true;
    else if (argument === "--dry-run") options.dryRun = true;
    else if (["--base-ref", "--generated-dir", "--package-root"].includes(argument)) {
      const value = args[++index];
      if (!value || value.startsWith("--")) throw new Error(`Missing value for ${argument}`);
      if (argument === "--base-ref") options.baseRef = value;
      else if (argument === "--generated-dir") options.generatedRoot = path.resolve(value);
      else options.packageRoot = path.resolve(value);
    } else throw new Error(`Unknown customization argument: ${argument}`);
  }
  options.generatedRoot ??= path.join(options.packageRoot, "generated");
  return options;
}

function main() {
  const options = argumentsFor(process.argv.slice(2));
  const baseline = readBaseline(options.packageRoot, options.baseRef);
  const generated = readTree(options.generatedRoot);
  const sourceRoot = path.join(options.packageRoot, "src");
  const current = readTree(sourceRoot);
  const changed = changedFiles(baseline.generated, generated);
  const inputs = { baseGenerated: baseline.generated, baseSource: baseline.source, generated };
  const plan = planCustomization(inputs);
  const proposed = options.check || changed.length === 0 ? current : plan.source;
  const diagnostics = plan.diagnostics.length
    ? plan.diagnostics
    : validateCustomization({
        ...inputs,
        source: proposed,
        matches: plan.matches,
        modelRenames: plan.modelRenames,
      });
  if (diagnostics.length) {
    for (const diagnostic of diagnostics) {
      console.error(
        `[ERROR] ${diagnostic.file}::${diagnostic.declaration}${diagnostic.member ? `.${diagnostic.member}` : ""}: ${diagnostic.message}`,
      );
    }
    throw new Error(
      `Customization rejected ${diagnostics.length} unresolved or unsafe change(s). No resolved files were written; extend the package policy or review the emitted change.`,
    );
  }
  if (!options.check && !options.dryRun && changed.length) writeTree(sourceRoot, current, proposed);
  console.log(
    `[customize] ${options.check ? "Guards passed" : options.dryRun ? "Resolution dry run passed" : "Resolution and guards passed"}: ${changed.length} changed generated file(s), ${proposed.size} source file(s); baseline ${baseline.commit}.`,
  );
}

try {
  main();
} catch (error) {
  console.error(`[ERROR] ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
