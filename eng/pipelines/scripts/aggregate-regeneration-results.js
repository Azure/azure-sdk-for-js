const fs = require("fs");
const path = require("path");

const root = process.env.PIPELINE_WORKSPACE;
const resultFiles = [];

(function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name === "result.json") {
      resultFiles.push(full);
    }
  }
})(root);

const totals = {
  packages: 0,
  regen: { total: 0, success: 0, failed: 0, failures: [] },
  build: { total: 0, success: 0, failed: 0, failures: [] },
  changelog: {
    total: 0,
    generated: 0,
    failed: 0,
    withChanges: 0,
    withBreaking: 0,
    breakingPackages: [],
    failedPackages: [],
  },
  skippedNoTspLocation: [],
};

const addNums = (dst, src, keys) => {
  if (!src) return;
  for (const key of keys) dst[key] += src[key] ?? 0;
};

for (const file of resultFiles) {
  const result = JSON.parse(fs.readFileSync(file, "utf8"));
  totals.packages += result.packages?.length ?? 0;
  addNums(totals.regen, result.regeneration, ["total", "success", "failed"]);
  addNums(totals.build, result.build, ["total", "success", "failed"]);
  addNums(totals.changelog, result.changelog, ["total", "generated", "failed", "withChanges", "withBreaking"]);
  totals.regen.failures.push(...(result.regeneration?.failures ?? []));
  totals.build.failures.push(...(result.build?.failures ?? []));
  totals.changelog.breakingPackages.push(...(result.changelog?.breakingPackages ?? []));
  totals.changelog.failedPackages.push(...(result.changelog?.failedPackages ?? []));
  if (Array.isArray(result.skippedNoTspLocation)) {
    totals.skippedNoTspLocation.push(...result.skippedNoTspLocation);
  }
}

const setupSkipped = path.join(root, "matrix_artifacts", "skipped-no-tsp-location.json");
if (fs.existsSync(setupSkipped)) {
  try {
    const skipped = JSON.parse(fs.readFileSync(setupSkipped, "utf8"));
    if (Array.isArray(skipped)) totals.skippedNoTspLocation.push(...skipped);
  } catch (err) {
    console.log(`Warning: ${err.message}`);
  }
}

const skipMap = new Map();
for (const item of totals.skippedNoTspLocation) {
  if (!skipMap.has(item.name)) skipMap.set(item.name, item.reason);
}

const skipped = [...skipMap.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, reason]) => ({ name, reason }));
const breaking = [...new Set(totals.changelog.breakingPackages)].sort();
const changelogFailed = [...new Set(totals.changelog.failedPackages)].sort();
const pct = (n, d) => (d === 0 ? "0.0" : ((n * 100) / d).toFixed(1));

console.log("========== MATRIX SUMMARY ==========");
console.log(`Result files: ${resultFiles.length} | Packages: ${totals.packages}`);
console.log(`Regen:     ${totals.regen.success}/${totals.regen.total} OK (${pct(totals.regen.success, totals.regen.total)}%) | Failed: ${totals.regen.failed}`);
console.log(`Build:     ${totals.build.success}/${totals.build.total} OK (${pct(totals.build.success, totals.build.total)}%) | Failed: ${totals.build.failed}`);
console.log(`Changelog: ${totals.changelog.generated}/${totals.changelog.total} OK | Changes: ${totals.changelog.withChanges} | Breaking: ${totals.changelog.withBreaking} | Failed: ${totals.changelog.failed}`);

const printList = (title, items, format = (value) => value) => {
  if (!items.length) return;
  console.log(`\n${title} (${items.length}):`);
  for (const item of items) console.log(`  - ${format(item)}`);
};

printList("Breaking changes (see CHANGELOG.md in PR diff)", breaking);
printList("Changelog tool failures (see logs/changelog/<pkg>.log)", changelogFailed);
printList("Skipped — no tsp-location.yaml (filtered by matrix gen)", skipped, ({ name, reason }) => `${name} (${reason})`);
printList("Regen failures", totals.regen.failures, (failure) => `${failure.pkg}: ${failure.error}`);
printList("Build failures", totals.build.failures, (failure) => `${failure.pkg} (${failure.phase}): ${failure.error}`);
console.log("====================================");

const aggregated = {
  emitterVersion: process.env.EMITTER_VERSION || null,
  regeneration: {
    total: totals.regen.total,
    success: totals.regen.success,
    failed: totals.regen.failed,
  },
  build: {
    total: totals.build.total,
    success: totals.build.success,
    failed: totals.build.failed,
  },
  changelog: {
    total: totals.changelog.total,
    generated: totals.changelog.generated,
    failed: totals.changelog.failed,
    withChanges: totals.changelog.withChanges,
    withBreaking: totals.changelog.withBreaking,
    breakingPackages: breaking,
    failedPackages: changelogFailed,
  },
  skippedNoTspLocation: skipped,
};

const outDir = path.join(process.env.BUILD_ARTIFACTSTAGINGDIRECTORY || ".", "summary");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "aggregated-results.json"), JSON.stringify(aggregated, null, 2));
console.log(`Wrote aggregated-results.json (${skipped.length} skipped, ${breaking.length} breaking)`);

if (resultFiles.length === 0 || totals.regen.failed > 0 || totals.build.failed > 0) {
  process.exit(1);
}
