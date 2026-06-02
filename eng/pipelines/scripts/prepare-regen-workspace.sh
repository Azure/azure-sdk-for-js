#!/usr/bin/env bash
set -euo pipefail

sdk_root="$1"
spec_repo_root="$2"
spec_repo_branch="$3"
emitter_version="$4"

echo "===== Install tsp-client and pnpm ====="
npm install -g @azure-tools/typespec-client-generator-cli
npm install -g pnpm
npm config set legacy-peer-deps true

echo "===== Clone azure-rest-api-specs (local spec source) ====="
if [ -d "$spec_repo_root/.git" ]; then
  echo "Spec repo already exists at $spec_repo_root, pulling latest..."
  cd "$spec_repo_root"
  git fetch origin "$spec_repo_branch" --depth 1
  git checkout "$spec_repo_branch"
  git reset --hard "origin/$spec_repo_branch"
else
  echo "Cloning azure-rest-api-specs (branch $spec_repo_branch, shallow)..."
  git clone --depth 1 --branch "$spec_repo_branch" \
    https://github.com/Azure/azure-rest-api-specs.git "$spec_repo_root"
fi
echo "Spec repo ready at $spec_repo_root"
cd "$spec_repo_root" && git log -1 --oneline

echo "===== Update emitter + lock file ====="
cd "$sdk_root"
node - "$sdk_root" "$emitter_version" <<'NODE'
const fs = require("fs");
const path = require("path");

const sdkRoot = process.argv[2];
const emitterVersion = process.argv[3];
const emitterPackagePath = path.join(sdkRoot, "eng", "emitter-package.json");
const pkg = JSON.parse(fs.readFileSync(emitterPackagePath, "utf8"));
pkg.dependencies["@azure-tools/typespec-ts"] = emitterVersion;

// Keep the current workaround in place: some dev emitter builds rely on peer
// deps that main's emitter-package.json does not always list explicitly.
const tspVer = pkg.dependencies["@typespec/events"] || "0.82.0";
if (!pkg.dependencies["@typespec/xml"]) pkg.dependencies["@typespec/xml"] = tspVer;
if (!pkg.dependencies["@typespec/sse"]) pkg.dependencies["@typespec/sse"] = tspVer;

fs.writeFileSync(emitterPackagePath, JSON.stringify(pkg, null, 2) + "\n");
NODE

cd "$sdk_root/eng"
cp emitter-package.json package.json
npm install --package-lock-only --ignore-scripts 2>/dev/null
if [ -f package-lock.json ]; then
  cp package-lock.json emitter-package-lock.json
  rm -f package.json package-lock.json
  rm -rf node_modules
fi
