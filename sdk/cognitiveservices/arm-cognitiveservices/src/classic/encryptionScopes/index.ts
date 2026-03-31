// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/encryptionScopes/operations.js";
import type {
  EncryptionScopesListOptionalParams,
  EncryptionScopesDeleteOptionalParams,
  EncryptionScopesCreateOrUpdateOptionalParams,
  EncryptionScopesGetOptionalParams,
} from "../../api/encryptionScopes/options.js";
import type { EncryptionScope } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EncryptionScopes operations. */
export interface EncryptionScopesOperations {
  /** Gets the content filters associated with the Azure OpenAI account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: EncryptionScopesListOptionalParams,
  ) => PagedAsyncIterableIterator<EncryptionScope>;
  /** Deletes the specified encryptionScope associated with the Cognitive Services account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    encryptionScopeName: string,
    options?: EncryptionScopesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    encryptionScopeName: string,
    options?: EncryptionScopesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    encryptionScopeName: string,
    options?: EncryptionScopesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the state of specified encryptionScope associated with the Cognitive Services account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    encryptionScopeName: string,
    encryptionScope: EncryptionScope,
    options?: EncryptionScopesCreateOrUpdateOptionalParams,
  ) => Promise<EncryptionScope>;
  /** Gets the specified EncryptionScope associated with the Cognitive Services account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    encryptionScopeName: string,
    options?: EncryptionScopesGetOptionalParams,
  ) => Promise<EncryptionScope>;
}

function _getEncryptionScopes(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: EncryptionScopesListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      encryptionScopeName: string,
      options?: EncryptionScopesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, encryptionScopeName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      encryptionScopeName: string,
      options?: EncryptionScopesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, encryptionScopeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      encryptionScopeName: string,
      options?: EncryptionScopesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, encryptionScopeName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      encryptionScopeName: string,
      encryptionScope: EncryptionScope,
      options?: EncryptionScopesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        encryptionScopeName,
        encryptionScope,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      encryptionScopeName: string,
      options?: EncryptionScopesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, encryptionScopeName, options),
  };
}

export function _getEncryptionScopesOperations(
  context: CognitiveServicesManagementContext,
): EncryptionScopesOperations {
  return {
    ..._getEncryptionScopes(context),
  };
}
