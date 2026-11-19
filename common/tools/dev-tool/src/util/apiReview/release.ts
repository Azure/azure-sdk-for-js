// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { existsSync } from "node:fs";
import { copyFile, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { extract } from "tar";
import { generateApiReview } from "../apiReview.ts";
import { resolveRoot } from "../resolveProject.ts";

async function readManifest(packageRoot: string): Promise<{ name: string; version: string }> {
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
  return { name: manifest.name, version: manifest.version };
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
