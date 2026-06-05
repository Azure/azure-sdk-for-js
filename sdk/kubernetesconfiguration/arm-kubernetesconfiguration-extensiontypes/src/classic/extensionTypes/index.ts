// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExtensionTypesContext } from "../../api/extensionTypesContext.js";
import {
  listClusterListVersions,
  clusterGetVersion,
  listVersions,
  getVersion,
  list,
  get,
  listLocationList,
  locationGet,
} from "../../api/extensionTypes/operations.js";
import type {
  ExtensionTypesListClusterListVersionsOptionalParams,
  ExtensionTypesClusterGetVersionOptionalParams,
  ExtensionTypesListVersionsOptionalParams,
  ExtensionTypesGetVersionOptionalParams,
  ExtensionTypesListOptionalParams,
  ExtensionTypesGetOptionalParams,
  ExtensionTypesListLocationListOptionalParams,
  ExtensionTypesLocationGetOptionalParams,
} from "../../api/extensionTypes/options.js";
import type { ExtensionType, ExtensionTypeVersionForReleaseTrain } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ExtensionTypes operations. */
export interface ExtensionTypesOperations {
  /** List the version for an Extension Type installable to the cluster. */
  listClusterListVersions: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    extensionTypeName: string,
    options?: ExtensionTypesListClusterListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<ExtensionTypeVersionForReleaseTrain>;
  /** Get details of a version for an Extension Type installable to the cluster. */
  clusterGetVersion: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    extensionTypeName: string,
    versionNumber: string,
    options?: ExtensionTypesClusterGetVersionOptionalParams,
  ) => Promise<ExtensionTypeVersionForReleaseTrain>;
  /** List the versions for an extension type and location. */
  listVersions: (
    location: string,
    extensionTypeName: string,
    options?: ExtensionTypesListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<ExtensionTypeVersionForReleaseTrain>;
  /** Get details of a version for an extension type and location */
  getVersion: (
    location: string,
    extensionTypeName: string,
    versionNumber: string,
    options?: ExtensionTypesGetVersionOptionalParams,
  ) => Promise<ExtensionTypeVersionForReleaseTrain>;
  /** List installable Extension Types for the cluster based region and type for the cluster. */
  list: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    options?: ExtensionTypesListOptionalParams,
  ) => PagedAsyncIterableIterator<ExtensionType>;
  /** Get an Extension Type installable to the cluster based region and type for the cluster. */
  get: (
    resourceGroupName: string,
    clusterRp: string,
    clusterResourceName: string,
    clusterName: string,
    extensionTypeName: string,
    options?: ExtensionTypesGetOptionalParams,
  ) => Promise<ExtensionType>;
  /** List all Extension Types for the location. */
  listLocationList: (
    location: string,
    options?: ExtensionTypesListLocationListOptionalParams,
  ) => PagedAsyncIterableIterator<ExtensionType>;
  /** Get an extension type for the location. */
  locationGet: (
    location: string,
    extensionTypeName: string,
    options?: ExtensionTypesLocationGetOptionalParams,
  ) => Promise<ExtensionType>;
}

function _getExtensionTypes(context: ExtensionTypesContext) {
  return {
    listClusterListVersions: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      extensionTypeName: string,
      options?: ExtensionTypesListClusterListVersionsOptionalParams,
    ) =>
      listClusterListVersions(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionTypeName,
        options,
      ),
    clusterGetVersion: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      extensionTypeName: string,
      versionNumber: string,
      options?: ExtensionTypesClusterGetVersionOptionalParams,
    ) =>
      clusterGetVersion(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionTypeName,
        versionNumber,
        options,
      ),
    listVersions: (
      location: string,
      extensionTypeName: string,
      options?: ExtensionTypesListVersionsOptionalParams,
    ) => listVersions(context, location, extensionTypeName, options),
    getVersion: (
      location: string,
      extensionTypeName: string,
      versionNumber: string,
      options?: ExtensionTypesGetVersionOptionalParams,
    ) => getVersion(context, location, extensionTypeName, versionNumber, options),
    list: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      options?: ExtensionTypesListOptionalParams,
    ) => list(context, resourceGroupName, clusterRp, clusterResourceName, clusterName, options),
    get: (
      resourceGroupName: string,
      clusterRp: string,
      clusterResourceName: string,
      clusterName: string,
      extensionTypeName: string,
      options?: ExtensionTypesGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionTypeName,
        options,
      ),
    listLocationList: (location: string, options?: ExtensionTypesListLocationListOptionalParams) =>
      listLocationList(context, location, options),
    locationGet: (
      location: string,
      extensionTypeName: string,
      options?: ExtensionTypesLocationGetOptionalParams,
    ) => locationGet(context, location, extensionTypeName, options),
  };
}

export function _getExtensionTypesOperations(
  context: ExtensionTypesContext,
): ExtensionTypesOperations {
  return {
    ..._getExtensionTypes(context),
  };
}
