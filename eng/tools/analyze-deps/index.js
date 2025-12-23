// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { Buffer } from "node:buffer";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import util from "node:util";
import { fileURLToPath } from "node:url";

import argparse from "argparse";
import Handlebars from "handlebars";
import json5 from "json5";
import tar from "tar";
import yaml from "js-yaml";
import { getPackageJsons } from "@azure-tools/eng-package-utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @typedef {Object} PackageJson
 * @property {string} name
 * @property {string} version
 * @property {Record<string, string>} [dependencies]
 * @property {Record<string, string>} [devDependencies]
 * @property {Record<string, string>} [peerDependencies]
 */

/**
 * @typedef {Object} RepoPackageInfo
 * @property {string} src
 * @property {string} ver
 * @property {Record<string, string>} [run]
 * @property {Record<string, string>} [dev]
 * @property {Record<string, string>} [peer]
 */

/**
 * @typedef {Object} DumpedPackageInfo
 * @property {string} name
 * @property {string} version
 * @property {string} type
 * @property {string} src - relative source path
 * @property {{name: string, version: string}[]} deps
 */

/**
 * @typedef {Object} RenderContext
 * @property {string} [repo_name]
 * @property {string} [branch]
 * @property {string} [build]
 * @property {string} [build_url]
 * @property {string} [commit]
 * @property {boolean} [isfork]
 * @property {boolean} [isrelease]
 * @property {string} [rel_url]
 * @property {string} [release]
 * @property {string} [repo]
 * @property {string} [curtime]
 * @property {string[]} inconsistent
 * @property {string[]} external
 * @property {Record<string, RepoPackageInfo>} packages
 */

/**
 * Appends package data to the given data object
 * @param {Record<string, RepoPackageInfo>} data
 * @param {string} pkgSrc
 * @param {PackageJson} pkgJson
 */
function appendPackageData(data, pkgSrc, pkgJson) {
  data[pkgJson.name] = {
    src: pkgSrc,
    ver: pkgJson.version,
    run: pkgJson.dependencies,
    dev: pkgJson.devDependencies,
    peer: pkgJson.peerDependencies,
  };
}

/**
 * Gets packages from a pnpm workspace
 * @param {string} workspaceDir
 * @returns {Promise<Record<string, RepoPackageInfo>>}
 */
async function getRepoPackages(workspaceDir) {
  const pkgs = await getPackageJsons(workspaceDir);
  /**
   * @type {Record<string, RepoPackageInfo>}
   */
  const packageData = {};

  for (const [projName, proj] of Object.entries(pkgs)) {
    if (["test", "management"].includes(proj.versionPolicy)) {
      // too many and similar Management packages to be useful
      continue;
    }
    const projDir = path.join(workspaceDir, proj.projectFolder);
    const packageJson = proj.json;
    appendPackageData(packageData, projDir, packageJson);
  }
  return packageData;
}

/**
 * Loads yaml data from a pnpm-lock.yaml file
 * @param {string} lockPath - path to pnpm-lock.yaml
 * @returns {Promise<any>} - the parsed yaml data
 */
async function readPnpmLock(lockPath) {
  const data = await readFile(lockPath, "utf8");
  return yaml.load(data);
}

/**
 * Reads a file from a compressed tarball
 * @param {string} archivePath - path to tarball file
 * @param {string} filePath - path to file inside the tarball
 * @param {BufferEncoding} encoding - encoding of the file content
 * @returns {Promise<string|undefined>} - content of the file or undefined if not found
 */
async function readCompressedFile(archivePath, filePath, encoding) {
  const data = [];
  let processed = false;

  await tar.t(
    {
      file: archivePath,
      onentry: (entry) => {
        if (!processed) {
          processed = true;
          entry.on("data", (c) => {
            data.push(c);
          });
        }
      },
    },
    [filePath],
  );

  if (data) {
    return Buffer.concat(data).toString(encoding);
  } else {
    return undefined;
  }
}

/**
 * Gets packages from tarball files in a directory
 * @param {string} tarballDir - directory containing tarball files
 * @returns {Promise<Record<string, RepoPackageInfo>>}
 */
async function getTarballPackages(tarballDir) {
  const files = await readdir(tarballDir);
  /**
   * @type {Record<string, RepoPackageInfo>}
   */
  const packageData = {};

  for (const file of files) {
    const filePath = path.join(tarballDir, file);
    if (path.extname(filePath).toLowerCase() === ".tgz") {
      const packageJson = json5.parse(
        await readCompressedFile(filePath, "package/package.json", "utf8"),
      );
      appendPackageData(packageData, filePath, packageJson);
    }
  }
  return packageData;
}

/**
 * Renders the HTML report
 * @param {RenderContext} context
 * @param {string} dest - destination file path to write the rendered HTML
 * @returns {Promise<void>}
 */
async function render(context, dest) {
  context.repo_name = "azure-sdk-for-js";
  context.branch =
    process.env.SYSTEM_PULLREQUEST_SOURCEBRANCH || process.env.BUILD_SOURCEBRANCHNAME;
  context.build = process.env.BUILD_BUILDNUMBER;
  context.build_url = `${process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI}${process.env.SYSTEM_TEAMPROJECT}/_build/results?buildId=${process.env.BUILD_BUILDID}`;
  context.commit = process.env.BUILD_SOURCEVERSION;
  context.isfork = process.env.SYSTEM_PULLREQUEST_ISFORK === "True";
  context.isrelease =
    process.env.SYSTEM_HOSTTYPE === "release" ||
    process.env.SYSTEM_HOSTTYPE === "deployment" ||
    process.env.RELEASE_RELEASENAME != null;
  context.rel_url = process.env.RELEASE_RELEASEWEBURL || context.build_url;
  context.release = process.env.RELEASE_RELEASENAME || context.build;
  context.repo = context.isfork ? process.env.BUILD_REPOSITORY_NAME : `Azure/${context.repo_name}`;
  context.curtime = new Date().toISOString();

  Handlebars.registerHelper({
    and: (a, b) => a && b,
    capitalize: (s) => new Handlebars.SafeString(s ? s.charAt(0).toUpperCase() + s.slice(1) : ""),
    contains: (c, i) => (typeof c.includes === "function" ? c.includes(i) : i in c),
    default: (s, def) => new Handlebars.SafeString(s ? s : def),
    dep_type: (p) => {
      const ret = [];
      if (context.inconsistent.includes(p)) {
        ret.push("inconsistent");
      }
      if (context.external.includes(p)) {
        ret.push("external");
      } else {
        ret.push("internal");
      }
      return ret.join(" ");
    },
    len: (c) => (typeof c.length === "number" ? c.length : Object.keys(c).length),
    ne: (a, b) => a !== b,
    or: (a, b) => a || b,
    pluralize: (num, singular, plural) => new Handlebars.SafeString(num === 1 ? singular : plural),
    sorted: (c) => (typeof c.sort === "function" ? c.sort() : Object.entries(c).sort()),
    sub: (a, b) => a - b,
    title: (s) => new Handlebars.SafeString(s ? s.replace(/\b\S/g, (t) => t.toUpperCase()) : ""),
    truncate: (s, len) => new Handlebars.SafeString(s.substr(0, len)),
  });

  const template = await readFile("deps.html.hbs", "utf8");
  return writeFile(dest, Handlebars.compile(template)(context));
}

/**
 * Appends dependency data to the given dependencies object
 * @param {Record<string, Record<string, [string, string][]>>} dependencies
 * @param {string} dep - dependency name
 * @param {string} spec - version specifier
 * @param {string} pkg - dependent package name
 * @param {"runtime" | "dev" | "peer"} depType
 * @returns {void}
 */
function appendDependencyData(dependencies, dep, spec, pkg, depType) {
  if (!dependencies[dep]) {
    dependencies[dep] = {};
  }
  if (!dependencies[dep][spec]) {
    dependencies[dep][spec] = [];
  }
  dependencies[dep][spec].push([pkg, depType]);
}

/**
 * Gets all dependencies with version specifiers and corresponding dependents. Example entries:
 *
 * ```json
 * {
 *   '@azure/schema-registry': {
 *      '^1.2.0': [ [ '@azure/schema-registry-avro', 'runtime' ] ],
 *      '^1.3.0': [ [ '@azure/schema-registry-json', 'runtime' ] ]
 *   },
 *   avsc: { '^5.5.1': [ [ '@azure/schema-registry-avro', 'runtime' ] ] },
 *   'lru-cache': {
 *     '^11.1.0': [
 *       [ '@azure/schema-registry-avro', 'runtime' ],
 *       [ '@azure/schema-registry-json', 'runtime' ]
 *     ]
 *   }
 * },
 * ```
 *
 * @param {Record<string, RepoPackageInfo>} pkgs
 * @returns {Record<string, Record<string, [string, string][]>>}
 */
function constructDeps(pkgs) {
  /** @type {Record<string, Record<string, [string, string][]>>} */
  const dependencies = {};

  for (const [name, data] of Object.entries(pkgs)) {
    for (const [dep, spec] of Object.entries(data.run || {})) {
      appendDependencyData(dependencies, dep, spec, name, "runtime");
    }
    for (const [dep, spec] of Object.entries(data.dev || {})) {
      appendDependencyData(dependencies, dep, spec, name, "dev");
    }
    for (const [dep, spec] of Object.entries(data.peer || {})) {
      appendDependencyData(dependencies, dep, spec, name, "peer");
    }
  }
  return dependencies;
}

/**
 * Dumps repository packages into a flattened structure
 * @param {Record<string, RepoPackageInfo>} repoPackages
 * @param {string[]} internalPackages - list of internal package names
 * @param {boolean} external - whether to include external dependencies
 * @param {string} workspaceDir - path to Pnpm workspace directory
 * @returns {Record<string, DumpedPackageInfo>}
 */
function dumpRepoPackages(repoPackages, internalPackages, external, workspaceDir) {
  /**
   * @type {Record<string, DumpedPackageInfo>}
   */
  const dumpedPackages = {};
  for (const [pkgName, pkgInfo] of Object.entries(repoPackages)) {
    let newDep = [];

    if (external) {
      newDep = Object.entries(pkgInfo.run || {}).map(([name, version]) => ({ name, version }));
    } else {
      for (const name in pkgInfo.run) {
        if (internalPackages.includes(name)) {
          const version = pkgInfo.run[name];
          newDep.push({ name, version });
        }
      }
    }
    dumpedPackages[`${pkgName}:${pkgInfo.ver}`] = {
      name: pkgName,
      version: pkgInfo.ver,
      type: "internal",
      src: pkgInfo.src.replace(workspaceDir + path.sep, "").replace(/\\/g, "/"),
      deps: newDep,
    };
  }
  return dumpedPackages;
}

/**
 * Resolves dependency versions for dumped packages using pnpm-lock.yaml data
 * @param {Record<string, RepoPackageInfo>} repoPackages
 * @param {Record<string, DumpedPackageInfo>} dumpedPackages
 * @param {object} pnpmLock - loaded yaml data from pnpm-lock.yaml
 * @param {boolean} external - whether to include external dependencies in the graph data
 */
function resolveRepoPackageDeps(repoPackages, dumpedPackages, pnpmLock, external) {
  const internalPackages = Object.keys(repoPackages);
  for (const [pkgId, dumpedPkg] of Object.entries(dumpedPackages)) {
    const packageDir = dumpedPkg?.src;
    /** @type {Record<string, string>} */
    const resolvedDeps = {};
    /** @type {Record<string, { specifier: string, version: string}>} */
    for (const [depName, v] of Object.entries(pnpmLock.importers[packageDir]?.dependencies || {})) {
      const resolvedVersion = v.version.startsWith("link:") ? repoPackages[depName].ver : v.version;
      resolvedDeps[depName] = resolvedVersion;
    }

    for (const dep of dumpedPackages[pkgId].deps) {
      if (resolvedDeps[dep.name]) {
        // Replace the version spec with the resolved version
        dep.version = resolvedDeps[dep.name];

        // Add the dependency to the top level of the packages list
        const depId = `${dep.name}:${dep.version}`;
        if (!dumpedPackages[depId]) {
          if (internalPackages.includes(dep.name)) {
            dumpedPackages[depId] = {
              name: dep.name,
              version: dep.version,
              type: "internalbinary",
              src: "",
              deps: [],
            };
          } else if (external) {
            dumpedPackages[depId] = {
              name: dep.name,
              version: dep.version,
              type: "external",
              src: "",
              deps: [],
            };
          }
        }
      }
    }
  }
}

async function main() {
  const parser = new argparse.ArgumentParser({
    prog: "analyze-deps",
    description: "Analyze dependencies in NodeJS packages.",
  });
  parser.add_argument("--verbose", { help: "verbose output", action: "store_true" });
  parser.add_argument("--external", {
    help: "include external dependencies in the graph data",
    action: "store_true",
  });
  parser.add_argument("--out", { metavar: "FILE", help: "write HTML-formatted report to FILE" });
  parser.add_argument("--dump", {
    metavar: "FILE",
    help: "write JSONP-formatted dependency data to FILE",
  });
  parser.add_argument("--packdir", {
    metavar: "DIR",
    help: "analyze packed tarballs in DIR rather than source packages in this repository",
  });

  const args = parser.parse_args();

  const context = {
    /** @type {Record<string, RepoPackageInfo>} */
    packages: {},
    /** @type {Record<string, Record<string, [string, string][]>>} */
    dependencies: {},
    /** @type {string[]} */
    external: [],
    /** @type {string[]} */
    inconsistent: [],
  };

  const workspaceDir = path.resolve(__dirname, "../../../");
  const repoPackages = await getRepoPackages(workspaceDir);
  context.packages = args.packdir
    ? await getTarballPackages(path.resolve(args.packdir))
    : repoPackages;
  context.dependencies = constructDeps(context.packages);
  context.external = Object.keys(context.dependencies).filter((p) => !(p in repoPackages));
  context.inconsistent = Object.keys(context.dependencies).filter(
    (p) => Object.keys(context.dependencies[p]).length > 1,
  );

  if (args.verbose) {
    console.log("Packages analyzed:");
    for (const pkg of Object.keys(context.packages).sort()) {
      const info = context.packages[pkg];
      console.log(`${pkg} ${info.ver}`);
      console.log(`  from ${info.src}`);
    }

    console.log("\nDependencies discovered:");
    for (const dep of Object.keys(context.dependencies).sort()) {
      const info = context.dependencies[dep];
      console.log(`${dep}`);
      for (const ver of Object.keys(info).sort()) {
        const pkgs = info[ver];
        console.log(`${ver}`);
        for (const pkg of pkgs.sort()) {
          console.log(`  * ${pkg[0]} (${pkg[1]})`);
        }
      }
      console.log("");
    }

    for (const inc of context.inconsistent) {
      const info = context.dependencies[inc];
      const vers = Object.keys(info).sort();
      console.log(`\nDependency '${inc}' has ${vers.length} unique specifiers:`);
      for (const ver of vers.sort()) {
        const pkgs = info[ver];
        console.log(`'${ver}'`);
        console.log(`${"-".repeat(ver.length + 2)}`);
        for (const pkg of pkgs.sort()) {
          console.log(`  * ${pkg[0]} (${pkg[1]})`);
        }
        console.log("");
      }
    }
  }

  if (context.inconsistent.length > 0) {
    if (!args.verbose) {
      console.log(
        "Incompatible dependency versions detected in libraries, run this script with --verbose for details",
      );
    }
  } else {
    console.log("All library dependencies verified, no incompatible versions detected");
  }

  if (args.out) {
    await render(context, args.out);
  }

  if (args.dump) {
    const internalPackages = Object.keys(repoPackages);
    const dumpedPackages = dumpRepoPackages(
      context.packages,
      internalPackages,
      args.external,
      workspaceDir,
    );

    const pnpmLock = await readPnpmLock(path.resolve(`${workspaceDir}/pnpm-lock.yaml`));
    resolveRepoPackageDeps(repoPackages, dumpedPackages, pnpmLock, args.external);
    await writeFile(`${args.dump}/data.js`, "const data = " + JSON.stringify(dumpedPackages) + ";");
    await writeFile(`${args.dump}/arcdata.json`, JSON.stringify(dumpedPackages));
  }
}

main().catch((err) => {
  console.error("Fatal error in analyze-deps:", err);
  process.exit(1);
});
