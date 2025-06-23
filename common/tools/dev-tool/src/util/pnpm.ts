// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getCatalogsFromWorkspaceManifest } from "@pnpm/catalogs.config";
import { resolveFromCatalog } from "@pnpm/catalogs.resolver";
import { type Catalogs } from "@pnpm/catalogs.types";
import { readWorkspaceManifest } from "@pnpm/workspace.read-manifest";
import { resolveRoot } from "./resolveProject";

let catalogs: Catalogs | undefined = undefined;

export async function loadPnpmWorkspaceCatalogs() {
  if (!catalogs) {
    const manifest = await readWorkspaceManifest(await resolveRoot());
    catalogs = getCatalogsFromWorkspaceManifest(manifest);
  }
}

export function resolveCatalogVersion(alias: string, bareSpecifier: string): string {
  if (!catalogs) {
    throw new Error("loadPnpmWorkspaceCatalogs() must be called first!");
  }
  const resolved = resolveFromCatalog(catalogs, { alias, bareSpecifier });
  if (resolved.type !== "found") {
    throw new Error(
      `Unexpected input when resolving from catalog. (alias: ${alias} bareSpecifier: ${bareSpecifier})`,
    );
  }

  return resolved.resolution.specifier;
}
