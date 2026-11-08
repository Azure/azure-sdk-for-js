// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getCatalogsFromWorkspaceManifest } from "@pnpm/catalogs.config";
import { resolveFromCatalog } from "@pnpm/catalogs.resolver";
import { type Catalogs } from "@pnpm/catalogs.types";
import { readWorkspaceManifest, type WorkspaceManifest } from "@pnpm/workspace.read-manifest";
import { resolveRoot } from "./resolveProject.ts";

let catalogs: Catalogs | undefined = undefined;
const catalogsByRoot = new Map<string, Catalogs>();

export async function loadPnpmWorkspaceCatalogs(start?: string): Promise<Catalogs> {
  const workspaceRoot = await resolveRoot(start);
  let workspaceCatalogs = catalogsByRoot.get(workspaceRoot);
  if (!workspaceCatalogs) {
    const manifest = await readWorkspaceManifest(workspaceRoot);
    if (!manifest || (!manifest.catalog && !manifest.catalogs)) {
      throw new Error("No catalog or catalogs found in the workspace manifest!");
    }
    workspaceCatalogs = getCatalogsFromWorkspaceManifest(
      manifest as Pick<WorkspaceManifest, "catalog" | "catalogs">,
    );
    catalogsByRoot.set(workspaceRoot, workspaceCatalogs);
  }
  catalogs = workspaceCatalogs;
  return workspaceCatalogs;
}

export function resolveCatalogVersion(
  alias: string,
  bareSpecifier: string,
  workspaceCatalogs: Catalogs | undefined = catalogs,
): string {
  if (!workspaceCatalogs) {
    throw new Error("loadPnpmWorkspaceCatalogs() must be called first!");
  }
  const resolved = resolveFromCatalog(workspaceCatalogs, { alias, bareSpecifier });
  if (resolved.type !== "found") {
    throw new Error(
      `Unexpected input when resolving from catalog. (alias: ${alias} bareSpecifier: ${bareSpecifier})`,
    );
  }

  return resolved.resolution.specifier;
}
