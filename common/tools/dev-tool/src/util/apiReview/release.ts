// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { existsSync, readFileSync, statSync } from "node:fs";
import { copyFile, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { extract } from "tar";
import { generateApiReview } from "../apiReview.ts";
import { resolveRoot } from "../resolveProject.ts";
import { resolveSpecifier } from "./buildReview.ts";

async function readManifest(
  packageRoot: string,
): Promise<Record<string, unknown> & { name: string; version: string }> {
  const manifest: unknown = JSON.parse(
    await readFile(path.join(packageRoot, "package.json"), "utf8"),
  );
  if (
    typeof manifest !== "object" ||
    manifest === null ||
    !("name" in manifest) ||
    typeof manifest.name !== "string" ||
    !manifest.name.trim() ||
    !("version" in manifest) ||
    typeof manifest.version !== "string" ||
    !manifest.version.trim()
  ) {
    throw new Error(`Package manifest in ${packageRoot} must contain a name and version.`);
  }
  return { ...manifest, name: manifest.name, version: manifest.version };
}

/**
 * Binds the review hash to the package archive that will actually be published.
 */
export async function generateReleaseApiReview(
  packageRoot: string,
  packageArchive: string,
  packageInfoFile: string,
): ReturnType<typeof generateApiReview> {
  const info: unknown = JSON.parse(await readFile(packageInfoFile, "utf8"));
  if (
    typeof info !== "object" ||
    info === null ||
    Array.isArray(info) ||
    !("Name" in info) ||
    typeof info.Name !== "string" ||
    !info.Name.trim() ||
    !("Version" in info) ||
    typeof info.Version !== "string" ||
    !info.Version.trim() ||
    !("DirectoryPath" in info) ||
    typeof info.DirectoryPath !== "string" ||
    !info.DirectoryPath.trim()
  ) {
    throw new Error("Package info must contain Name, Version, and DirectoryPath.");
  }
  if ("ReleaseStatus" in info && info.ReleaseStatus !== null) {
    if (typeof info.ReleaseStatus !== "string") {
      throw new Error("Package info ReleaseStatus must be a string.");
    }
    if (info.ReleaseStatus.trim().toLowerCase() === "unreleased") {
      throw new Error(`${info.Name} is marked Unreleased and cannot be published.`);
    }
  }

  const workspaceRoot = await resolveRoot(packageRoot);
  if (path.relative(packageRoot, path.resolve(workspaceRoot, info.DirectoryPath)) !== "") {
    throw new Error("Package info DirectoryPath does not match the reviewed package.");
  }
  const sourceManifest = await readManifest(packageRoot);
  if (sourceManifest.name !== info.Name || sourceManifest.version !== info.Version) {
    throw new Error("Package info name or version does not match the source package.");
  }

  const review = await generateApiReview(packageRoot, { requireCompleteResolution: true });
  const temporaryDirectory = await mkdtemp(path.join(tmpdir(), "api-review-release-"));
  try {
    const seenPaths = new Set<string>();
    let archiveError: Error | undefined;
    await extract({
      file: packageArchive,
      cwd: temporaryDirectory,
      strict: true,
      filter: (entryPath, entry) => {
        if (archiveError) {
          return false;
        }
        const normalized = entryPath.replaceAll("\\", "/").replace(/\/+$/, "");
        const parts = normalized.split("/");
        if (parts.includes("node_modules")) {
          archiveError = new Error(
            "Package archives containing node_modules are not supported for API review.",
          );
          return false;
        }
        if (
          parts[0] !== "package" ||
          parts.some((part) => !part || part === "." || part === "..") ||
          seenPaths.has(normalized)
        ) {
          archiveError = new Error(`Unexpected or duplicate path in package archive: ${entryPath}`);
          return false;
        }
        if ("type" in entry && (entry.type === "SymbolicLink" || entry.type === "Link")) {
          archiveError = new Error(`Links in package archives are not supported: ${entryPath}`);
          return false;
        }
        seenPaths.add(normalized);
        return true;
      },
    });
    if (archiveError) {
      throw archiveError;
    }
    await copyFile(
      path.join(workspaceRoot, "pnpm-workspace.yaml"),
      path.join(temporaryDirectory, "pnpm-workspace.yaml"),
    );
    const candidateRoot = path.join(temporaryDirectory, "package");
    const candidateManifest = await readManifest(candidateRoot);
    if (candidateManifest.name !== info.Name || candidateManifest.version !== info.Version) {
      throw new Error("Package archive name or version does not match package info.");
    }

    for (const field of ["dependencies", "optionalDependencies", "peerDependencies"]) {
      const source = sourceManifest[field] ?? {};
      const candidate = candidateManifest[field] ?? {};
      if (
        typeof source !== "object" ||
        source === null ||
        Array.isArray(source) ||
        typeof candidate !== "object" ||
        candidate === null ||
        Array.isArray(candidate)
      ) {
        throw new Error(`Invalid ${field} in package manifest.`);
      }
      const expected: Record<string, string> = {};
      for (const [name, specifier] of Object.entries(source)) {
        if (typeof specifier !== "string") {
          throw new Error(`Invalid ${field} specifier for ${name}.`);
        }
        expected[name] = await resolveSpecifier(packageRoot, name, specifier);
      }
      if (!isDeepStrictEqual(expected, candidate)) {
        throw new Error(`Package archive ${field} does not match packed source dependencies.`);
      }
    }
    for (const field of [
      "exports",
      "imports",
      "type",
      "main",
      "module",
      "browser",
      "react-native",
    ]) {
      const matches =
        field === "imports"
          ? JSON.stringify(sourceManifest[field]) === JSON.stringify(candidateManifest[field])
          : isDeepStrictEqual(sourceManifest[field], candidateManifest[field]);
      if (!matches) {
        throw new Error(`Package archive ${field} does not match source.`);
      }
    }
    const checkRuntimeTarget = (target: unknown): void => {
      if (typeof target !== "string" || !target.startsWith("./")) {
        throw new Error("Unsupported runtime entry point in package manifest.");
      }
      const file = path.resolve(candidateRoot, target);
      const relative = path.relative(candidateRoot, file);
      if (
        relative === ".." ||
        relative.startsWith(`..${path.sep}`) ||
        path.isAbsolute(relative) ||
        !existsSync(file) ||
        !statSync(file).isFile()
      ) {
        throw new Error(
          `Package archive runtime entry point is missing or outside the package: ${target}`,
        );
      }
      const nearestPackageType = (root: string): unknown => {
        const rootPath = path.resolve(root);
        let directory = path.dirname(path.join(rootPath, relative));
        while (directory !== rootPath) {
          const manifest = path.join(directory, "package.json");
          if (existsSync(manifest)) {
            return JSON.parse(readFileSync(manifest, "utf8")).type;
          }
          directory = path.dirname(directory);
        }
        return root === candidateRoot ? candidateManifest.type : sourceManifest.type;
      };
      if (!isDeepStrictEqual(nearestPackageType(packageRoot), nearestPackageType(candidateRoot))) {
        throw new Error(`Package archive runtime module type does not match source: ${target}`);
      }
    };
    for (const field of ["main", "module"]) {
      if (candidateManifest[field] !== undefined) {
        const target = candidateManifest[field];
        checkRuntimeTarget(
          typeof target === "string" && !target.startsWith("./") ? `./${target}` : target,
        );
      }
    }
    if (typeof candidateManifest.browser === "string") {
      checkRuntimeTarget(
        candidateManifest.browser.startsWith("./")
          ? candidateManifest.browser
          : `./${candidateManifest.browser}`,
      );
    } else if (
      typeof candidateManifest.browser === "object" &&
      candidateManifest.browser !== null
    ) {
      for (const target of Object.values(candidateManifest.browser)) {
        if (typeof target === "string" && target.startsWith("./")) {
          checkRuntimeTarget(target);
        }
      }
    }
    const exports = candidateManifest.exports;
    if (typeof exports === "object" && exports !== null) {
      for (const entry of Object.values(exports)) {
        if (typeof entry === "object" && entry !== null) {
          for (const condition of Object.values(entry)) {
            if (typeof condition === "object" && condition !== null && "default" in condition) {
              checkRuntimeTarget(condition.default);
            }
          }
        }
      }
    }

    const candidateModules = path.join(candidateRoot, "node_modules");
    if (existsSync(candidateModules)) {
      throw new Error("Package archives containing node_modules are not supported for API review.");
    }
    const sourceModules = path.join(packageRoot, "node_modules");
    if (existsSync(sourceModules)) {
      await symlink(sourceModules, candidateModules, "junction");
    }
    const candidateReview = await generateApiReview(candidateRoot, {
      requireCompleteResolution: true,
    });
    if (candidateReview.metadata.apiHash !== review.metadata.apiHash) {
      throw new Error("The published package API hash does not match the source review hash.");
    }

    await writeFile(
      packageInfoFile,
      `${JSON.stringify({ ...info, ApiHash: review.metadata.apiHash }, null, 2)}\n`,
    );
    return review;
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}
