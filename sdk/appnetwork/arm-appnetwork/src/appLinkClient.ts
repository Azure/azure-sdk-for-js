// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppLinkContext, AppLinkClientOptionalParams } from "./api/index.js";
import { createAppLink } from "./api/index.js";
import type { AppLinkMembersOperations } from "./classic/appLinkMembers/index.js";
import { _getAppLinkMembersOperations } from "./classic/appLinkMembers/index.js";
import type { AppLinksOperations } from "./classic/appLinks/index.js";
import { _getAppLinksOperations } from "./classic/appLinks/index.js";
import type { AvailableVersionsOperations } from "./classic/availableVersions/index.js";
import { _getAvailableVersionsOperations } from "./classic/availableVersions/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { UpgradeHistoriesOperations } from "./classic/upgradeHistories/index.js";
import { _getUpgradeHistoriesOperations } from "./classic/upgradeHistories/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AppLinkClientOptionalParams } from "./api/appLinkContext.js";

export class AppLinkClient {
  private _client: AppLinkContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AppLinkClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAppLink(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.availableVersions = _getAvailableVersionsOperations(this._client);
    this.upgradeHistories = _getUpgradeHistoriesOperations(this._client);
    this.appLinkMembers = _getAppLinkMembersOperations(this._client);
    this.appLinks = _getAppLinksOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for availableVersions */
  public readonly availableVersions: AvailableVersionsOperations;
  /** The operation groups for upgradeHistories */
  public readonly upgradeHistories: UpgradeHistoriesOperations;
  /** The operation groups for appLinkMembers */
  public readonly appLinkMembers: AppLinkMembersOperations;
  /** The operation groups for appLinks */
  public readonly appLinks: AppLinksOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
