// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type { PackageModel } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  packageModelSerializer,
  packageModelDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ContentPackageUninstallOptionalParams,
  ContentPackageInstallOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _uninstallSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  packageId: string,
  options: ContentPackageUninstallOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentPackages/{packageId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      packageId: packageId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _uninstallDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Uninstall a package from the workspace. */
export async function uninstall(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  packageId: string,
  options: ContentPackageUninstallOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _uninstallSend(
    context,
    resourceGroupName,
    workspaceName,
    packageId,
    options,
  );
  return _uninstallDeserialize(result);
}

export function _installSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  packageId: string,
  packageInstallationProperties: PackageModel,
  options: ContentPackageInstallOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentPackages/{packageId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      packageId: packageId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: packageModelSerializer(packageInstallationProperties),
  });
}

export async function _installDeserialize(result: PathUncheckedResponse): Promise<PackageModel> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return packageModelDeserializer(result.body);
}

/** Install a package to the workspace. */
export async function install(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  packageId: string,
  packageInstallationProperties: PackageModel,
  options: ContentPackageInstallOptionalParams = { requestOptions: {} },
): Promise<PackageModel> {
  const result = await _installSend(
    context,
    resourceGroupName,
    workspaceName,
    packageId,
    packageInstallationProperties,
    options,
  );
  return _installDeserialize(result);
}
