const fs = require("fs");
const path = require("path");

const { normalizePath } = require("./utils");

const nestedWorkspacePattern = /^sdk[/\\][^/\\]+[/\\][^/\\]+[/\\]sdk[/\\]/;

function findNestedWorkspacePackageJsons(root) {
  function findNested(dir, results) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return results;
    }
    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        findNested(full, results);
      } else if (entry.name === "package.json") {
        const rel = normalizePath(path.relative(root, full));
        if (nestedWorkspacePattern.test(rel)) results.push({ full, rel });
      }
    }
    return results;
  }

  return findNested(path.join(root, "sdk"), []);
}

// TEMP WORKAROUND (emitter bug): the generator sometimes misresolves
// emitter-output-dir and creates nested duplicate workspaces of the form
// sdk/X/Y/sdk/X/Y. Remove this helper once the emitter stops producing nested
// sdk/.../sdk/... output and the pipeline has been revalidated without it.
function cleanupNestedDuplicateWorkspaces(root) {
  const packageJsonPaths = findNestedWorkspacePackageJsons(root).map((item) => item.full);
  if (packageJsonPaths.length === 0) return 0;

  const innerSdkRoots = new Set();
  for (const pkgJson of packageJsonPaths) {
    const rel = normalizePath(path.relative(root, pkgJson));
    const segments = rel.split("/");
    const innerIndex = segments.indexOf("sdk", 1);
    if (innerIndex > 0) {
      const innerSdkRel = segments.slice(0, innerIndex + 1).join("/");
      innerSdkRoots.add(path.join(root, innerSdkRel));
    }
  }
  for (const innerSdk of innerSdkRoots) {
    try {
      fs.rmSync(innerSdk, { recursive: true, force: true });
      console.log(`  Removed nested duplicate workspace: ${path.relative(root, innerSdk)}`);
    } catch (err) {
      console.log(`  Warning: failed to remove ${innerSdk}: ${err.message}`);
    }
  }
  return innerSdkRoots.size;
}

// TEMP WORKAROUND (emitter bug): generated warp.config.yml references
// config/tsconfig.src.*.json files that the emitter does not generate. We
// scaffold the missing files here until the upstream generator owns them.
function scaffoldWarpConfigs(root) {
  const sdkDir = path.join(root, "sdk");
  let count = 0;
  function scan(dir, depth) {
    if (depth > 3) return;
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (!e.isDirectory() || e.name === "node_modules" || e.name === ".git") continue;
      const full = path.join(dir, e.name);
      const warpPath = path.join(full, "warp.config.yml");
      if (fs.existsSync(warpPath)) {
        const configDir = path.join(full, "config");
        const rel = path.relative(configDir, path.join(root, "eng", "tsconfigs")).replace(/\\/g, "/");
        const targets = {
          "tsconfig.src.browser.json": `${rel}/src.browser.json`,
          "tsconfig.src.cjs.json": `${rel}/src.cjs.json`,
          "tsconfig.src.esm.json": `${rel}/src.esm.json`,
          "tsconfig.src.react-native.json": `${rel}/src.react-native.json`,
        };
        let needed = false;
        for (const file of Object.keys(targets)) {
          if (!fs.existsSync(path.join(configDir, file))) {
            needed = true;
            break;
          }
        }
        if (needed) {
          fs.mkdirSync(configDir, { recursive: true });
          for (const [file, ext] of Object.entries(targets)) {
            const fp = path.join(configDir, file);
            if (!fs.existsSync(fp)) {
              fs.writeFileSync(fp, JSON.stringify({ extends: ext, include: ["../src/index.ts"] }, null, 2) + "\n");
            }
          }
          count++;
        }
      } else if (depth < 2) {
        scan(full, depth + 1);
      }
    }
  }
  scan(sdkDir, 0);
  if (count > 0) console.log(`  Scaffolded config/ for ${count} packages`);
}

// TEMP WORKAROUND (emitter bug): generated code may import @azure/* runtime
// packages without declaring them in package.json, and warp targets may miss
// required devDependencies. Remove this once the generator emits correct
// dependency metadata.
function patchMissingDependencies(root, successPkgs) {
  const knownVersions = {
    "@azure/logger": "^1.2.0",
    "@azure/core-util": "^1.12.0",
    "@azure/core-lro": "^3.1.0",
    "@azure/core-paging": "^1.6.2",
    "@azure/abort-controller": "^2.1.2",
  };
  const knownDevDeps = {
    "react-native": "catalog:testing",
  };
  let count = 0;

  for (const pkg of successPkgs) {
    const pkgDir = path.join(root, pkg.pkg);
    const pkgJsonPath = path.join(pkgDir, "package.json");
    if (!fs.existsSync(pkgJsonPath)) continue;

    const srcDir = path.join(pkgDir, "src");
    const imports = new Set();
    function scanTs(dir) {
      let entries;
      try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
      } catch {
        return;
      }
      for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
          scanTs(full);
          continue;
        }
        if (!e.name.endsWith(".ts")) continue;
        try {
          const content = fs.readFileSync(full, "utf8");
          const matches = content.matchAll(/from\s+"(@azure[^"]+)"/g);
          for (const m of matches) imports.add(m[1]);
        } catch {}
      }
    }
    scanTs(srcDir);

    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
    let patched = false;

    const deps = pkgJson.dependencies || {};
    for (const imp of imports) {
      if (!deps[imp] && knownVersions[imp]) {
        deps[imp] = knownVersions[imp];
        patched = true;
      }
    }
    pkgJson.dependencies = deps;

    const warpPath = path.join(pkgDir, "warp.config.yml");
    if (fs.existsSync(warpPath)) {
      const warpContent = fs.readFileSync(warpPath, "utf8");
      const devDeps = pkgJson.devDependencies || {};
      for (const [dep, ver] of Object.entries(knownDevDeps)) {
        if (warpContent.includes(dep) && !devDeps[dep]) {
          devDeps[dep] = ver;
          patched = true;
        }
      }
      pkgJson.devDependencies = devDeps;
    }

    if (patched) {
      fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n");
      count++;
    }
  }
  if (count > 0) console.log(`  Patched dependencies in ${count} packages`);
}

// TEMP WORKAROUND guardrail for the same nested-workspace emitter bug as
// cleanupNestedDuplicateWorkspaces(): fail fast if the repo already contains
// duplicated sdk/.../sdk/... workspaces before this shard starts work.
function detectNestedDuplicateWorkspaces(root) {
  const packageJsonPaths = findNestedWorkspacePackageJsons(root).map((item) => item.rel);

  if (packageJsonPaths.length === 0) {
    console.log("Pre-flight: no nested duplicate workspaces found.");
    return;
  }

  console.log("Pre-flight: nested duplicate workspace directories found:");
  for (const packageJsonPath of packageJsonPaths) {
    console.log(`  - ${path.dirname(packageJsonPath)}`);
  }
  throw new Error("Nested duplicate workspaces will make pnpm/turbo fail. Remove them before running the pipeline.");
}

module.exports = {
  cleanupNestedDuplicateWorkspaces,
  scaffoldWarpConfigs,
  patchMissingDependencies,
  detectNestedDuplicateWorkspaces,
};
