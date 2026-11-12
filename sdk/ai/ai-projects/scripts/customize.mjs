// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { retainCustomizedOnConflict } from "./customization/ast-merge.mjs";
import { planCustomization } from "./customization/planner.mjs";
import { validateCustomization } from "./customization/guards.mjs";
import { changedFiles, readBaseline, readTree, writeTree } from "./customization/trees.mjs";
import { key, renderWorklist } from "./customization/worklist.mjs";

function argumentsFor(args, environment = process.env) {
  const options = {
    check: false,
    dryRun: false,
    recover: environment.CUSTOMIZE_RECOVER === "1",
    baseRef: "HEAD",
    packageRoot: path.resolve(fileURLToPath(new URL("..", import.meta.url))),
  };
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (argument === "--check") options.check = true;
    else if (argument === "--dry-run") options.dryRun = true;
    else if (argument === "--recover") options.recover = true;
    else if (["--base-ref", "--generated-dir", "--package-root", "--worklist"].includes(argument)) {
      const value = args[++index];
      if (!value || value.startsWith("--")) throw new Error(`Missing value for ${argument}`);
      if (argument === "--base-ref") options.baseRef = value;
      else if (argument === "--generated-dir") options.generatedRoot = path.resolve(value);
      else if (argument === "--worklist") options.worklist = path.resolve(value);
      else options.packageRoot = path.resolve(value);
    } else throw new Error(`Unknown customization argument: ${argument}`);
  }
  options.generatedRoot ??= path.join(options.packageRoot, "generated");
  options.worklist ??= path.join(options.packageRoot, "temp", "customization-worklist.md");
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
  const retained = [];
  if (options.recover) retainCustomizedOnConflict(retained);
  const plan = planCustomization(inputs);
  const proposed = options.check || changed.length === 0 ? current : plan.source;
  // A kept declaration deliberately lacks the emitted change, so the guards route the
  // emitted additions it is missing into `unapplied` rather than failing the run.
  const unapplied = [];
  const diagnostics = plan.diagnostics.length
    ? plan.diagnostics
    : validateCustomization({
        ...inputs,
        source: proposed,
        matches: plan.matches,
        modelRenames: plan.modelRenames,
        ...(options.recover ? { retained: new Set(retained.map(key)), unapplied } : {}),
      });
  if (diagnostics.length) {
    for (const diagnostic of diagnostics) {
      console.error(
        `[ERROR] ${diagnostic.file}::${diagnostic.declaration}${diagnostic.member ? `.${diagnostic.member}` : ""}: ${diagnostic.message}`,
      );
    }
    throw new Error(
      `Customization rejected ${diagnostics.length} unresolved or unsafe change(s). No resolved files were written. ${
        options.recover
          ? "Recovery mode could not keep the customized code for these; resolve them in src/ or extend the package policy."
          : "Run `node scripts/customize.mjs --recover` to keep the customized code for each change that cannot be merged and continue from a worklist, or extend the package policy."
      }`,
    );
  }
  if (!options.check && !options.dryRun && changed.length) writeTree(sourceRoot, current, proposed);
  console.log(
    `[customize] ${options.check ? "Guards passed" : options.dryRun ? "Resolution dry run passed" : "Resolution and guards passed"}: ${changed.length} changed generated file(s), ${proposed.size} source file(s); baseline ${baseline.commit}.`,
  );
  if (retained.length) reportRetained(options, retained, baseline.commit, unapplied);
}

function reportRetained(options, retained, commit, unapplied) {
  if (!options.check) {
    mkdirSync(path.dirname(options.worklist), { recursive: true });
    writeFileSync(
      options.worklist,
      renderWorklist(retained, { baseline: commit, unapplied }),
      "utf8",
    );
  }
  console.warn(
    `[customize] Recovery mode kept the customized code for ${retained.length} change(s) it could not merge; the emitted change was NOT applied:`,
  );
  for (const entry of retained) console.warn(`  ${key(entry)}`);
  if (unapplied.length) {
    console.warn(
      `[customize] ${unapplied.length} emitted addition(s) in those declarations are not in src/ yet:`,
    );
    for (const addition of unapplied)
      console.warn(`  ${key(addition)}.${addition.member ?? "?"} (${addition.kind})`);
  }
  console.warn(
    options.check
      ? "[customize] Review the worklist written by the resolving run before finishing."
      : `[customize] Worklist: ${options.worklist}`,
  );
}

try {
  main();
} catch (error) {
  console.error(`[ERROR] ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
