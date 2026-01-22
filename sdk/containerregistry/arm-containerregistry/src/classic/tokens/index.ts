// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import { list, $delete, update, create, get } from "../../api/tokens/operations.js";
import type {
  TokensListOptionalParams,
  TokensDeleteOptionalParams,
  TokensUpdateOptionalParams,
  TokensCreateOptionalParams,
  TokensGetOptionalParams,
} from "../../api/tokens/options.js";
import type { Token, TokenUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Tokens operations. */
export interface TokensOperations {
  /** Lists all the tokens for the specified container registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: TokensListOptionalParams,
  ) => PagedAsyncIterableIterator<Token>;
  /** Deletes a token from a container registry. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    tokenName: string,
    options?: TokensDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a token with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    tokenName: string,
    tokenUpdateParameters: TokenUpdateParameters,
    options?: TokensUpdateOptionalParams,
  ) => PollerLike<OperationState<Token>, Token>;
  /** Creates a token for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    tokenName: string,
    tokenCreateParameters: Token,
    options?: TokensCreateOptionalParams,
  ) => PollerLike<OperationState<Token>, Token>;
  /** Gets the properties of the specified token. */
  get: (
    resourceGroupName: string,
    registryName: string,
    tokenName: string,
    options?: TokensGetOptionalParams,
  ) => Promise<Token>;
}

function _getTokens(context: ContainerRegistryManagementContext) {
  return {
    list: (resourceGroupName: string, registryName: string, options?: TokensListOptionalParams) =>
      list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      tokenName: string,
      options?: TokensDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, tokenName, options),
    update: (
      resourceGroupName: string,
      registryName: string,
      tokenName: string,
      tokenUpdateParameters: TokenUpdateParameters,
      options?: TokensUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, registryName, tokenName, tokenUpdateParameters, options),
    create: (
      resourceGroupName: string,
      registryName: string,
      tokenName: string,
      tokenCreateParameters: Token,
      options?: TokensCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, registryName, tokenName, tokenCreateParameters, options),
    get: (
      resourceGroupName: string,
      registryName: string,
      tokenName: string,
      options?: TokensGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, tokenName, options),
  };
}

export function _getTokensOperations(
  context: ContainerRegistryManagementContext,
): TokensOperations {
  return {
    ..._getTokens(context),
  };
}
