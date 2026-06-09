// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import { post } from "../../api/networkManagerCommits/operations.js";
import { NetworkManagerCommitsPostOptionalParams } from "../../api/networkManagerCommits/options.js";
import { NetworkManagerCommit } from "../../models/microsoft/network/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NetworkManagerCommits operations. */
export interface NetworkManagerCommitsOperations {
  /** Post a Network Manager Commit. */
  post: (
    resourceGroupName: string,
    networkManagerName: string,
    parameters: NetworkManagerCommit,
    options?: NetworkManagerCommitsPostOptionalParams,
  ) => PollerLike<OperationState<NetworkManagerCommit>, NetworkManagerCommit>;
  /** @deprecated use post instead */
  beginPost: (
    resourceGroupName: string,
    networkManagerName: string,
    parameters: NetworkManagerCommit,
    options?: NetworkManagerCommitsPostOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NetworkManagerCommit>, NetworkManagerCommit>>;
  /** @deprecated use post instead */
  beginPostAndWait: (
    resourceGroupName: string,
    networkManagerName: string,
    parameters: NetworkManagerCommit,
    options?: NetworkManagerCommitsPostOptionalParams,
  ) => Promise<NetworkManagerCommit>;
}

function _getNetworkManagerCommits(context: NetworkManagementContext) {
  return {
    post: (
      resourceGroupName: string,
      networkManagerName: string,
      parameters: NetworkManagerCommit,
      options?: NetworkManagerCommitsPostOptionalParams,
    ) => post(context, resourceGroupName, networkManagerName, parameters, options),
    beginPost: async (
      resourceGroupName: string,
      networkManagerName: string,
      parameters: NetworkManagerCommit,
      options?: NetworkManagerCommitsPostOptionalParams,
    ) => {
      const poller = post(context, resourceGroupName, networkManagerName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPostAndWait: async (
      resourceGroupName: string,
      networkManagerName: string,
      parameters: NetworkManagerCommit,
      options?: NetworkManagerCommitsPostOptionalParams,
    ) => {
      return await post(context, resourceGroupName, networkManagerName, parameters, options);
    },
  };
}

export function _getNetworkManagerCommitsOperations(
  context: NetworkManagementContext,
): NetworkManagerCommitsOperations {
  return {
    ..._getNetworkManagerCommits(context),
  };
}
