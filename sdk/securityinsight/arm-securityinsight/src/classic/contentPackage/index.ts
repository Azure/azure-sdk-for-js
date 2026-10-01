// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { uninstall, install } from "../../api/contentPackage/operations.js";
import type {
  ContentPackageUninstallOptionalParams,
  ContentPackageInstallOptionalParams,
} from "../../api/contentPackage/options.js";
import type { PackageModel } from "../../models/models.js";

/** Interface representing a ContentPackage operations. */
export interface ContentPackageOperations {
  /** Uninstall a package from the workspace. */
  uninstall: (
    resourceGroupName: string,
    workspaceName: string,
    packageId: string,
    options?: ContentPackageUninstallOptionalParams,
  ) => Promise<void>;
  /** Install a package to the workspace. */
  install: (
    resourceGroupName: string,
    workspaceName: string,
    packageId: string,
    packageInstallationProperties: PackageModel,
    options?: ContentPackageInstallOptionalParams,
  ) => Promise<PackageModel>;
}

function _getContentPackage(context: SecurityInsightsContext) {
  return {
    uninstall: (
      resourceGroupName: string,
      workspaceName: string,
      packageId: string,
      options?: ContentPackageUninstallOptionalParams,
    ) => uninstall(context, resourceGroupName, workspaceName, packageId, options),
    install: (
      resourceGroupName: string,
      workspaceName: string,
      packageId: string,
      packageInstallationProperties: PackageModel,
      options?: ContentPackageInstallOptionalParams,
    ) =>
      install(
        context,
        resourceGroupName,
        workspaceName,
        packageId,
        packageInstallationProperties,
        options,
      ),
  };
}

export function _getContentPackageOperations(
  context: SecurityInsightsContext,
): ContentPackageOperations {
  return {
    ..._getContentPackage(context),
  };
}
