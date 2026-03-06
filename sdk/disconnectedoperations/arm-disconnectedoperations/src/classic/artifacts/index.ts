// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DisconnectedOperationsManagementContext } from "../../api/disconnectedOperationsManagementContext.js";
import { listDownloadUri, get, listByParent } from "../../api/artifacts/operations.js";
import type {
  ArtifactsListDownloadUriOptionalParams,
  ArtifactsGetOptionalParams,
  ArtifactsListByParentOptionalParams,
} from "../../api/artifacts/options.js";
import type { Artifact, ArtifactDownloadResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Artifacts operations. */
export interface ArtifactsOperations {
  /** Get artifact download link. */
  listDownloadUri: (
    resourceGroupName: string,
    name: string,
    imageName: string,
    artifactName: string,
    options?: ArtifactsListDownloadUriOptionalParams,
  ) => Promise<ArtifactDownloadResult>;
  /** Get the resource */
  get: (
    resourceGroupName: string,
    name: string,
    imageName: string,
    artifactName: string,
    options?: ArtifactsGetOptionalParams,
  ) => Promise<Artifact>;
  /** List by parent */
  listByParent: (
    resourceGroupName: string,
    name: string,
    imageName: string,
    options?: ArtifactsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<Artifact>;
}

function _getArtifacts(context: DisconnectedOperationsManagementContext) {
  return {
    listDownloadUri: (
      resourceGroupName: string,
      name: string,
      imageName: string,
      artifactName: string,
      options?: ArtifactsListDownloadUriOptionalParams,
    ) => listDownloadUri(context, resourceGroupName, name, imageName, artifactName, options),
    get: (
      resourceGroupName: string,
      name: string,
      imageName: string,
      artifactName: string,
      options?: ArtifactsGetOptionalParams,
    ) => get(context, resourceGroupName, name, imageName, artifactName, options),
    listByParent: (
      resourceGroupName: string,
      name: string,
      imageName: string,
      options?: ArtifactsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, name, imageName, options),
  };
}

export function _getArtifactsOperations(
  context: DisconnectedOperationsManagementContext,
): ArtifactsOperations {
  return {
    ..._getArtifacts(context),
  };
}
