import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { load as parseYaml, dump as stringifyYaml } from "js-yaml";
import { ModularClientPackageOptions } from "../common/types.js";
import { getPackageNameFromTspConfig } from "../common/utils.js";
import { logger } from "../utils/logger.js";

export const provisioningEmitterName = "@azure-tools/typespec-ts-provisioning";

function toPosix(relativePath: string): string {
  return relativePath.replaceAll("\\", "/");
}

// ---------------------------------------------------------------------------
// emitter-package.json / emitter-package-lock.json resolution
// ---------------------------------------------------------------------------

export function getProvisioningEmitterVersion(
  emitterPackageJsonPath: string | undefined,
): string | undefined {
  if (!emitterPackageJsonPath) return undefined;
  const emitterPackage = JSON.parse(fs.readFileSync(emitterPackageJsonPath, "utf8"));
  const version =
    emitterPackage.dependencies?.[provisioningEmitterName] ??
    emitterPackage.devDependencies?.[provisioningEmitterName];
  if (!version) {
    throw new Error(
      `Emitter package manifest '${emitterPackageJsonPath}' must depend on '${provisioningEmitterName}'.`,
    );
  }
  return version;
}

/**
 * Mirrors tsp-client's own resolution order when it needs the emitter's
 * dependency manifest:
 *   1. try `<emitter-package>-lock.json` next to emitterPackageJsonPath
 *   2. fall back to `emitter-package.json` itself
 * Logs the same "Ran into the following error..." / "Will attempt look for
 * emitter-package.json..." / "Found emitter package ..." lines tsp-client emits.
 */
function resolveEmitterManifest(emitterPackageJsonPath: string): {
  manifestPath: string;
  emitterVersion: string;
} {
  const lockPath = emitterPackageJsonPath.replace(/\.json$/, "-lock.json");

  if (!fs.existsSync(lockPath)) {
    logger.info(
      `Ran into the following error when looking for emitter-package-lock.json: ` +
        `Error: ENOENT: no such file or directory, lstat '${lockPath}'`,
    );
    logger.info("Will attempt look for emitter-package.json...");
  }

  const manifestPath = fs.existsSync(lockPath) ? lockPath : emitterPackageJsonPath;
  const emitterVersion = getProvisioningEmitterVersion(manifestPath);
  logger.info(`Found emitter package ${provisioningEmitterName}@${emitterVersion}`);

  return { manifestPath, emitterVersion: emitterVersion! };
}

// ---------------------------------------------------------------------------
// tsp-client-config.yaml (optional, repo-level override of tsp-client behavior)
// ---------------------------------------------------------------------------

interface TspClientConfig {
  generateMetadata?: boolean;
  [key: string]: unknown;
}

function loadTspClientConfig(repoRoot: string): TspClientConfig | undefined {
  const configPath = path.join(repoRoot, "eng", "tsp-client-config.yaml");
  try {
    const raw = fs.readFileSync(configPath, "utf8");
    return (parseYaml(raw) as TspClientConfig) ?? {};
  } catch (err) {
    logger.info(
      `Did not find a tsp-client-config.yaml at ${toPosix(configPath)}. Error: Error: ${err}`,
    );
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// tsp-location.yaml read/update
// ---------------------------------------------------------------------------

interface TspLocation {
  directory: string;
  commit: string;
  repo: string;
  additionalDirectories?: string[];
  emitterPackageJsonPath?: string;
}

function readOrInitTspLocation(
  packageDirectory: string,
  options: ModularClientPackageOptions,
  specDirRelativeToRepoRoot: string,
  emitterPackageJsonPath: string | undefined,
): TspLocation {
  const tspLocationPath = path.join(packageDirectory, "tsp-location.yaml");
  logger.info(`Trying to read existing tsp-location.yaml at ${toPosix(packageDirectory)}`);

  let tspLocation: TspLocation;
  if (fs.existsSync(tspLocationPath)) {
    tspLocation = parseYaml(fs.readFileSync(tspLocationPath, "utf8")) as TspLocation;
  } else {
    tspLocation = {
      directory: specDirRelativeToRepoRoot,
      commit: options.gitCommitId,
      repo: options.repoUrl,
    };
  }

  // --update-if-exists semantics: only (re)write emitterPackageJsonPath when
  // one was explicitly provided for this generation.
  if (emitterPackageJsonPath) {
    logger.info(`Adding emitterPackageJsonPath ${emitterPackageJsonPath} to tsp-location.yaml`);
    tspLocation.emitterPackageJsonPath = toPosix(
      path.relative(packageDirectory, emitterPackageJsonPath) || emitterPackageJsonPath,
    );
  }

  fs.mkdirSync(packageDirectory, { recursive: true });
  fs.writeFileSync(tspLocationPath, stringifyYaml(tspLocation), "utf8");
  return tspLocation;
}

// ---------------------------------------------------------------------------
// TempTypeSpecFiles staging: create temp dir, copy local spec into it
// ---------------------------------------------------------------------------

function copyDirRecursive(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function stageLocalSpec(
  packageDirectory: string,
  options: ModularClientPackageOptions,
  projectName: string,
): { stagedSpecDir: string; tempDir: string } {
  const tempDir = path.join(packageDirectory, "TempTypeSpecFiles");
  fs.rmSync(tempDir, { recursive: true, force: true });
  fs.mkdirSync(tempDir, { recursive: true });
  logger.info(`Created temporary working directory ${toPosix(tempDir)}`);
  logger.info(`Repo root is ${toPosix(options.sdkRepoRoot)}`);
  logger.info(`Using project name: ${projectName}`);

  logger.info(
    "NOTE: A path to a local spec was provided, will generate based off of local files...",
  );
  logger.info(`Using local spec directory: ${toPosix(options.typeSpecDirectory)}`);
  logger.info(`Local spec repo root is ${toPosix(path.resolve(options.specRepoRoot))}`);

  const destDir = path.join(tempDir, projectName);
  copyDirRecursive(options.typeSpecDirectory, destDir);
  return { stagedSpecDir: destDir, tempDir };
}

// ---------------------------------------------------------------------------
// Entry file discovery: client.tsp takes precedence over main.tsp
// ---------------------------------------------------------------------------

function discoverEntryFile(specDir: string): string {
  logger.info(`Discovering entry file in ${toPosix(specDir)}`);
  for (const candidate of ["client.tsp", "main.tsp"]) {
    if (fs.existsSync(path.join(specDir, candidate))) {
      logger.info(`Found entry file: ${candidate}`);
      return candidate;
    }
  }
  throw new Error(`Could not find a client.tsp or main.tsp entry file in ${specDir}`);
}

// ---------------------------------------------------------------------------
// Optional: reuse an already-built local checkout of js-provisioning-lib
// (e.g. D:\GithubSource\tmpSource\js-provisioning-lib) instead of running a
// fresh `npm install` for every generation. This skips registry access
// entirely and reuses the compiler + emitter + TypeSpec libraries that were
// already resolved into that checkout's node_modules by `pnpm install` /
// `pnpm build`.
// ---------------------------------------------------------------------------

interface LocalEmitterBuild {
  /** PROVISIONING_LIB_ROOT itself — mirrors gen-lib.js's ROOT */
  root: string;
  /** .../packages/typespec-ts-provisioning */
  emitterPackageDir: string;
  /** .../packages/typespec-ts-provisioning/dist/src/cli.js — mirrors gen-lib.js's CLI_PATH */
  cliPath: string;
  /** .../packages/typespec-ts-provisioning/node_modules */
  nodeModulesDir: string;
}

function resolveLocalEmitterBuild(): LocalEmitterBuild | undefined {
  const root = process.env.PROVISIONING_LIB_ROOT;
  if (!root) return undefined;

  const resolvedRoot = path.resolve(root);
  const emitterPackageDir = path.join(resolvedRoot, "packages", "typespec-ts-provisioning");
  const cliPath = path.join(emitterPackageDir, "dist", "src", "cli.js");

  if (!fs.existsSync(cliPath)) {
    throw new Error(
      `PROVISIONING_LIB_ROOT is set to '${root}' but no built emitter was found there. ` +
        `Expected '${cliPath}' to exist. Run "pnpm install" and "pnpm build" in ` +
        `'${emitterPackageDir}' first.`,
    );
  }

  return {
    root: resolvedRoot,
    emitterPackageDir,
    cliPath,
    nodeModulesDir: path.join(emitterPackageDir, "node_modules"),
  };
}

// ---------------------------------------------------------------------------
// npm install of the emitter's pinned dependency set into the staged project
// (or, when PROVISIONING_LIB_ROOT is set, link the prebuilt node_modules
// instead of hitting the registry at all)
// ---------------------------------------------------------------------------

function installEmitterDependencies(
  stagedSpecDir: string,
  manifestPath: string,
  localBuild: LocalEmitterBuild | undefined,
): void {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (localBuild) {
    // The provisioning emitter (@azure-tools/typespec-ts-provisioning) is an
    // unpublished local-only package, so it will always 404 against any
    // registry (public or private feed). Strip it from the manifest before
    // `npm install` so npm doesn't even try to fetch it, then `npm link` it
    // in afterwards from the prebuilt local checkout. All other (public)
    // dependencies still get installed normally from the registry.
    const patchedManifest = { ...manifest };
    delete patchedManifest.dependencies?.[provisioningEmitterName];
    delete patchedManifest.devDependencies?.[provisioningEmitterName];

    const targetPackageJson = path.join(stagedSpecDir, "package.json");
    fs.writeFileSync(targetPackageJson, JSON.stringify(patchedManifest, null, 2), "utf8");

    logger.info(
      `Installing dependencies from npm (excluding ${provisioningEmitterName}, ` +
        `which will be linked from the local build)...`,
    );
    execFileSync("npm", ["install"], {
      cwd: stagedSpecDir,
      stdio: "inherit",
      shell: true,
    });

    logger.info(
      `Linking ${provisioningEmitterName} from prebuilt local checkout ` +
        `${toPosix(localBuild.emitterPackageDir)} (PROVISIONING_LIB_ROOT is set).`,
    );
    execFileSync("npm", ["link"], {
      cwd: localBuild.emitterPackageDir,
      stdio: "inherit",
      shell: true,
    });
    execFileSync("npm", ["link", provisioningEmitterName], {
      cwd: stagedSpecDir,
      stdio: "inherit",
      shell: true,
    });
    return;
  }

  // No local build available: install the emitter manifest as-is. This only
  // works if @azure-tools/typespec-ts-provisioning has actually been
  // published to the configured registry/feed.
  const targetPackageJson = path.join(stagedSpecDir, "package.json");
  fs.copyFileSync(manifestPath, targetPackageJson);

  const lockCandidate = manifestPath.replace(
    /\.json$/,
    manifestPath.endsWith("-lock.json") ? "" : "-lock.json",
  );
  if (manifestPath.endsWith("-lock.json") || fs.existsSync(lockCandidate)) {
    const targetLock = path.join(stagedSpecDir, "package-lock.json");
    fs.copyFileSync(manifestPath.endsWith("-lock.json") ? manifestPath : lockCandidate, targetLock);
  }

  logger.info("Installing dependencies from npm...");
  execFileSync("npm", ["install"], {
    cwd: stagedSpecDir,
    stdio: "inherit",
    shell: true,
  });
}

export function updateProvisioningMetadata(
  packageDirectory: string,
  specPathFromSpecRoot: string,
  emitterVersion: string,
  apiVersion?: string,
  packageName?: string,
  generateTest?: boolean,
): void {
  const configPath = path.join(packageDirectory, "provision.config.json");
  const config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, "utf8")) : {};
  const existingSpec =
    typeof config.spec === "object" && config.spec !== null ? config.spec : undefined;
  const namespaceVersions = existingSpec?.namespaceVersions;
  config.spec = namespaceVersions
    ? { ...existingSpec, path: toPosix(specPathFromSpecRoot) }
    : apiVersion
      ? { path: toPosix(specPathFromSpecRoot), defaultVersion: apiVersion }
      : toPosix(specPathFromSpecRoot);
  if (packageName) {
    config.packageName = packageName.replace(/^@azure\/provisioning-/, "");
  }
  if (generateTest !== undefined) {
    config["generate-test"] = generateTest;
  }
  fs.mkdirSync(packageDirectory, { recursive: true });
  fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");

  const metadata = {
    ...(namespaceVersions ? { apiVersions: namespaceVersions } : apiVersion ? { apiVersion } : {}),
    emitterVersion,
  };
  fs.writeFileSync(
    path.join(packageDirectory, "metadata.json"),
    `${JSON.stringify(metadata, null, 2)}\n`,
    "utf8",
  );
}

// ---------------------------------------------------------------------------
// Post-generation patch: rewrite workspace: deps that aren't real workspace
// members (e.g. the emitter's own unpublished @azure/provisioning-core) to
// link: protocol pointing at the local prebuilt checkout, so that
// `pnpm install` in the generated package doesn't fail with
// ERR_PNPM_WORKSPACE_PKG_NOT_FOUND.
// ---------------------------------------------------------------------------

export function patchWorkspaceDependencyToLink(
  packageDirectory: string,
  dependencyName: string,
  linkTargetPath: string,
): void {
  const packageJsonPath = path.join(packageDirectory, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    logger.info(
      `Skipping workspace->link patch: no package.json found at ${toPosix(packageJsonPath)}`,
    );
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const linkValue = `link:${toPosix(linkTargetPath)}`;
  let patched = false;

  for (const depField of ["dependencies", "devDependencies"] as const) {
    const currentValue = packageJson[depField]?.[dependencyName];
    if (typeof currentValue === "string" && currentValue.startsWith("workspace:")) {
      packageJson[depField][dependencyName] = linkValue;
      patched = true;
    }
  }

  if (!patched) {
    logger.info(
      `Skipping workspace->link patch: '${dependencyName}' not found with a workspace: protocol in ${toPosix(packageJsonPath)}`,
    );
    return;
  }

  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
  logger.info(`Patched '${dependencyName}' in ${toPosix(packageJsonPath)} to '${linkValue}'`);
}

// ---------------------------------------------------------------------------
// Main entry point: replaces shelling out to `tsp-client init`
// ---------------------------------------------------------------------------

export async function generateProvisioningCodeFromTypeSpec(
  options: ModularClientPackageOptions,
  packageDirectory: string,
): Promise<void> {
  const repoRoot = options.sdkRepoRoot;

  // Step 1: optional repo-level override file. Its only effect we honor here
  // is whether tsp-client-metadata.yaml generation is opted into.
  const tspClientConfig = loadTspClientConfig(repoRoot);

  // Step 2: resolve emitter version, preferring emitter-package-lock.json.
  // If the caller didn't provide an explicit emitterPackageJsonPath, fall back
  // to the repo-conventional default location, mirroring tsp-client's own
  // "Found emitter package ..." / "Adding emitterPackageJsonPath ..." behavior.
  const emitterPackageJsonPath =
    options.emitterPackageJsonPath ??
    path.join(repoRoot, "eng", "provisioning-emitter-package.json");

  if (!fs.existsSync(emitterPackageJsonPath)) {
    throw new Error(
      `Could not resolve the provisioning emitter version: no emitter-package.json found at ` +
        `'${emitterPackageJsonPath}'. Pass options.emitterPackageJsonPath explicitly, or add an ` +
        `emitter-package.json at eng/provisioning-emitter-package.json.`,
    );
  }

  const { manifestPath, emitterVersion } = resolveEmitterManifest(emitterPackageJsonPath);

  // Optional: reuse an already-built local js-provisioning-lib checkout
  // (set PROVISIONING_LIB_ROOT env var) instead of npm-installing a fresh
  // copy of the emitter + TypeSpec libraries for every generation.
  const localBuild = resolveLocalEmitterBuild();
  if (localBuild) {
    logger.info(
      `Using prebuilt provisioning emitter from ${toPosix(localBuild.emitterPackageDir)}`,
    );
  }

  logger.info(`The resolved package directory path is ${toPosix(packageDirectory)}`);

  const packageName = await getPackageNameFromTspConfig(
    options.typeSpecDirectory,
    provisioningEmitterName,
  );
  const projectName = (packageName ?? path.basename(packageDirectory)).replace(
    /^@azure\/provisioning-/,
    "",
  );

  const specPath = path
    .relative(options.specRepoRoot, path.join(options.typeSpecDirectory, "main.tsp"))
    .replaceAll("\\", "/");
  const specDirRelativeToRepoRoot = toPosix(path.dirname(specPath));

  // Step 3: write/update tsp-location.yaml with emitterPackageJsonPath.
  readOrInitTspLocation(
    packageDirectory,
    options,
    specDirRelativeToRepoRoot,
    options.emitterPackageJsonPath,
  );

  // Step 4: re-check tsp-client-config.yaml the same way tsp-client does a
  // second time right before deciding on metadata generation, then either
  // write tsp-client-metadata.yaml or skip it.
  loadTspClientConfig(repoRoot);
  if (tspClientConfig?.generateMetadata === true) {
    const metadataPath = path.join(packageDirectory, "tsp-client-metadata.yaml");
    fs.writeFileSync(
      metadataPath,
      stringifyYaml({
        tspClientVersion: "local",
        emitterPackage: manifestPath,
        created: new Date().toISOString(),
      }),
      "utf8",
    );
  } else {
    logger.info("Skipping creation of tsp-client-metadata.yaml file.");
  }

  // Step 5: stage the local TypeSpec spec into TempTypeSpecFiles/<project>.
  const { stagedSpecDir, tempDir } = stageLocalSpec(packageDirectory, options, projectName);

  // Step 6: discover the entry .tsp file (client.tsp preferred over main.tsp).
  const entryFile = discoverEntryFile(stagedSpecDir);

  // Step 7: install the emitter + its dependencies as pinned by
  // emitter-package(-lock).json, into the staged directory. Skipped in favor
  // of a prebuilt node_modules link when PROVISIONING_LIB_ROOT is set.
  installEmitterDependencies(stagedSpecDir, manifestPath, localBuild);

  // Step 8: write provision.config.json / metadata.json bookkeeping.
  updateProvisioningMetadata(
    packageDirectory,
    specPath,
    emitterVersion ?? "latest",
    options.apiVersion,
    packageName,
    true,
  );

  try {
    // Step 9: generate code via the emitter's own standalone `generate` CLI —
    // the exact same invocation gen-lib.js's getGenerateArgs builds for
    // non-`sql` services.
    const cliPath =
      localBuild?.cliPath ??
      path.join(
        stagedSpecDir,
        "node_modules",
        "@azure-tools",
        "typespec-ts-provisioning",
        "dist",
        "src",
        "cli.js",
      );

    const generateArgs = [
      "--max-old-space-size=8192",
      cliPath,
      "generate",
      "--output",
      packageDirectory,
    ];
    if (options.apiVersion) {
      generateArgs.push("--api-version", options.apiVersion);
    }
    generateArgs.push("--gen-schema");

    const generateCwd = localBuild ? localBuild.root : stagedSpecDir;

    logger.info(`generating provisioning code with generateArgs: ${generateArgs.join(" ")}`);
    execFileSync(process.execPath, generateArgs, {
      cwd: generateCwd,
      env: { ...process.env, SPECS_ROOT: path.resolve(options.specRepoRoot) },
      stdio: "inherit",
    });

    logger.info("Generated provisioning code successfully.");

    // Step 11: the generated package.json declares
    // "@azure/provisioning-core": "workspace:1.0.0-beta.1", but that package
    // lives in the separate js-provisioning-lib repo and is not a member of
    // this workspace, so `pnpm install` would fail with
    // ERR_PNPM_WORKSPACE_PKG_NOT_FOUND. Rewrite it to point at the local
    // prebuilt checkout via link: instead.
    if (localBuild) {
      patchWorkspaceDependencyToLink(
        packageDirectory,
        "@azure/provisioning-core",
        path.join(localBuild.root, "packages", "core"),
      );
    }
  } finally {
    // Step 10: clean up the temporary TypeSpec staging directory created in
    // Step 5, regardless of whether generation succeeded or failed.
    logger.info(`Cleaning up temp directory ${toPosix(tempDir)}`);
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}
