// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext } from "../../api/subscriptionContext.js";
import { list, $delete, create, get } from "../../api/alias/operations.js";
import type {
  AliasListOptionalParams,
  AliasDeleteOptionalParams,
  AliasCreateOptionalParams,
  AliasGetOptionalParams,
} from "../../api/alias/options.js";
import type { SubscriptionAliasResponse, PutAliasRequest } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Alias operations. */
export interface AliasOperations {
  /** List Alias Subscription. */
  list: (
    options?: AliasListOptionalParams,
  ) => PagedAsyncIterableIterator<SubscriptionAliasResponse>;
  /** Delete Alias. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (aliasName: string, options?: AliasDeleteOptionalParams) => Promise<void>;
  /** Create Alias Subscription. */
  create: (
    aliasName: string,
    body: PutAliasRequest,
    options?: AliasCreateOptionalParams,
  ) => PollerLike<OperationState<SubscriptionAliasResponse>, SubscriptionAliasResponse>;
  /** @deprecated use create instead */
  beginCreate: (
    aliasName: string,
    body: PutAliasRequest,
    options?: AliasCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<SubscriptionAliasResponse>, SubscriptionAliasResponse>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    aliasName: string,
    body: PutAliasRequest,
    options?: AliasCreateOptionalParams,
  ) => Promise<SubscriptionAliasResponse>;
  /** Get Alias Subscription. */
  get: (aliasName: string, options?: AliasGetOptionalParams) => Promise<SubscriptionAliasResponse>;
}

function _getAlias(context: SubscriptionContext) {
  return {
    list: (options?: AliasListOptionalParams) => list(context, options),
    delete: (aliasName: string, options?: AliasDeleteOptionalParams) =>
      $delete(context, aliasName, options),
    create: (aliasName: string, body: PutAliasRequest, options?: AliasCreateOptionalParams) =>
      create(context, aliasName, body, options),
    beginCreate: async (
      aliasName: string,
      body: PutAliasRequest,
      options?: AliasCreateOptionalParams,
    ) => {
      const poller = create(context, aliasName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      aliasName: string,
      body: PutAliasRequest,
      options?: AliasCreateOptionalParams,
    ) => {
      return await create(context, aliasName, body, options);
    },
    get: (aliasName: string, options?: AliasGetOptionalParams) => get(context, aliasName, options),
  };
}

export function _getAliasOperations(context: SubscriptionContext): AliasOperations {
  return {
    ..._getAlias(context),
  };
}
