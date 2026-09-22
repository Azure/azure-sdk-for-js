// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext, ContentStoreClientOptionalParams } from "./api/index.js";
import { createContentStore } from "./api/index.js";
import type { CloudAccountsOperations } from "./classic/cloudAccounts/index.js";
import { _getCloudAccountsOperations } from "./classic/cloudAccounts/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PlansOperations } from "./classic/plans/index.js";
import { _getPlansOperations } from "./classic/plans/index.js";
import type { ProtectedItemsOperations } from "./classic/protectedItems/index.js";
import { _getProtectedItemsOperations } from "./classic/protectedItems/index.js";
import type { ProtectedItemsOperationGroupOperations } from "./classic/protectedItemsOperationGroup/index.js";
import { _getProtectedItemsOperationGroupOperations } from "./classic/protectedItemsOperationGroup/index.js";
import type { ProtectionGroupsOperations } from "./classic/protectionGroups/index.js";
import { _getProtectionGroupsOperations } from "./classic/protectionGroups/index.js";
import type { RoleMappingsOperations } from "./classic/roleMappings/index.js";
import { _getRoleMappingsOperations } from "./classic/roleMappings/index.js";
import type { SaaSOperationGroupOperations } from "./classic/saaSOperationGroup/index.js";
import { _getSaaSOperationGroupOperations } from "./classic/saaSOperationGroup/index.js";
import type { StoragesOperations } from "./classic/storages/index.js";
import { _getStoragesOperations } from "./classic/storages/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ContentStoreClientOptionalParams } from "./api/contentStoreContext.js";

export class ContentStoreClient {
  private _client: ContentStoreContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ContentStoreClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ContentStoreClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ContentStoreClientOptionalParams,
    options?: ContentStoreClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createContentStore(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.roleMappings = _getRoleMappingsOperations(this._client);
    this.protectedItemsOperationGroup = _getProtectedItemsOperationGroupOperations(this._client);
    this.protectedItems = _getProtectedItemsOperations(this._client);
    this.protectionGroups = _getProtectionGroupsOperations(this._client);
    this.plans = _getPlansOperations(this._client);
    this.storages = _getStoragesOperations(this._client);
    this.saaSOperationGroup = _getSaaSOperationGroupOperations(this._client);
    this.cloudAccounts = _getCloudAccountsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for roleMappings */
  public readonly roleMappings: RoleMappingsOperations;
  /** The operation groups for protectedItemsOperationGroup */
  public readonly protectedItemsOperationGroup: ProtectedItemsOperationGroupOperations;
  /** The operation groups for protectedItems */
  public readonly protectedItems: ProtectedItemsOperations;
  /** The operation groups for protectionGroups */
  public readonly protectionGroups: ProtectionGroupsOperations;
  /** The operation groups for plans */
  public readonly plans: PlansOperations;
  /** The operation groups for storages */
  public readonly storages: StoragesOperations;
  /** The operation groups for saaSOperationGroup */
  public readonly saaSOperationGroup: SaaSOperationGroupOperations;
  /** The operation groups for cloudAccounts */
  public readonly cloudAccounts: CloudAccountsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
