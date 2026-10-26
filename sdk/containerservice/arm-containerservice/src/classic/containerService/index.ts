// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import { listNodeImageVersions } from "../../api/containerService/operations.js";
import type { ContainerServiceListNodeImageVersionsOptionalParams } from "../../api/containerService/options.js";
import type { NodeImageVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerService operations. */
export interface ContainerServiceOperations {
  /** Only returns the latest version of each node image. For example there may be an AKSUbuntu-1804gen2containerd-2024.01.26, but only AKSUbuntu-1804gen2containerd-2024.02.02 is visible in this list. */
  listNodeImageVersions: (
    location: string,
    options?: ContainerServiceListNodeImageVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<NodeImageVersion>;
}

function _getContainerService(context: ContainerServiceContext) {
  return {
    listNodeImageVersions: (
      location: string,
      options?: ContainerServiceListNodeImageVersionsOptionalParams,
    ) => listNodeImageVersions(context, location, options),
  };
}

export function _getContainerServiceOperations(
  context: ContainerServiceContext,
): ContainerServiceOperations {
  return {
    ..._getContainerService(context),
  };
}
