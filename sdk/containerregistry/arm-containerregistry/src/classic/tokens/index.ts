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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    tokenName: string,
    options?: TokensDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    tokenName: string,
    options?: TokensDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a token with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    tokenName: string,
    tokenUpdateParameters: TokenUpdateParameters,
    options?: TokensUpdateOptionalParams,
  ) => PollerLike<OperationState<Token>, Token>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    registryName: string,
    tokenName: string,
    tokenUpdateParameters: TokenUpdateParameters,
    options?: TokensUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Token>, Token>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    tokenName: string,
    tokenUpdateParameters: TokenUpdateParameters,
    options?: TokensUpdateOptionalParams,
  ) => Promise<Token>;
  /** Creates a token for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    tokenName: string,
    tokenCreateParameters: Token,
    options?: TokensCreateOptionalParams,
  ) => PollerLike<OperationState<Token>, Token>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    registryName: string,
    tokenName: string,
    tokenCreateParameters: Token,
    options?: TokensCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Token>, Token>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    registryName: string,
    tokenName: string,
    tokenCreateParameters: Token,
    options?: TokensCreateOptionalParams,
  ) => Promise<Token>;
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
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      tokenName: string,
      options?: TokensDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, registryName, tokenName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      tokenName: string,
      options?: TokensDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, registryName, tokenName, options);
    },
    update: (
      resourceGroupName: string,
      registryName: string,
      tokenName: string,
      tokenUpdateParameters: TokenUpdateParameters,
      options?: TokensUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, registryName, tokenName, tokenUpdateParameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      registryName: string,
      tokenName: string,
      tokenUpdateParameters: TokenUpdateParameters,
      options?: TokensUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        registryName,
        tokenName,
        tokenUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      tokenName: string,
      tokenUpdateParameters: TokenUpdateParameters,
      options?: TokensUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        registryName,
        tokenName,
        tokenUpdateParameters,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      registryName: string,
      tokenName: string,
      tokenCreateParameters: Token,
      options?: TokensCreateOptionalParams,
    ) =>
      create(context, resourceGroupName, registryName, tokenName, tokenCreateParameters, options),
    beginCreate: async (
      resourceGroupName: string,
      registryName: string,
      tokenName: string,
      tokenCreateParameters: Token,
      options?: TokensCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        registryName,
        tokenName,
        tokenCreateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      tokenName: string,
      tokenCreateParameters: Token,
      options?: TokensCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        registryName,
        tokenName,
        tokenCreateParameters,
        options,
      );
    },
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
