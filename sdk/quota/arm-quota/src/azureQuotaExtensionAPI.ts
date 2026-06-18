// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureQuotaExtensionAPIContext,
  AzureQuotaExtensionAPIOptionalParams,
  createAzureQuotaExtensionAPI,
} from "./api/index.js";
import {
  GroupQuotaLimitsOperations,
  _getGroupQuotaLimitsOperations,
} from "./classic/groupQuotaLimits/index.js";
import {
  GroupQuotaLimitsRequestOperations,
  _getGroupQuotaLimitsRequestOperations,
} from "./classic/groupQuotaLimitsRequest/index.js";
import {
  GroupQuotaLocationSettingsOperations,
  _getGroupQuotaLocationSettingsOperations,
} from "./classic/groupQuotaLocationSettings/index.js";
import {
  GroupQuotaSubscriptionAllocationOperations,
  _getGroupQuotaSubscriptionAllocationOperations,
} from "./classic/groupQuotaSubscriptionAllocation/index.js";
import {
  GroupQuotaSubscriptionAllocationRequestOperations,
  _getGroupQuotaSubscriptionAllocationRequestOperations,
} from "./classic/groupQuotaSubscriptionAllocationRequest/index.js";
import {
  GroupQuotaSubscriptionRequestsOperations,
  _getGroupQuotaSubscriptionRequestsOperations,
} from "./classic/groupQuotaSubscriptionRequests/index.js";
import {
  GroupQuotaSubscriptionsOperations,
  _getGroupQuotaSubscriptionsOperations,
} from "./classic/groupQuotaSubscriptions/index.js";
import {
  GroupQuotaUsagesOperations,
  _getGroupQuotaUsagesOperations,
} from "./classic/groupQuotaUsages/index.js";
import { GroupQuotasOperations, _getGroupQuotasOperations } from "./classic/groupQuotas/index.js";
import { QuotaOperations, _getQuotaOperations } from "./classic/quota/index.js";
import {
  QuotaOperationOperations,
  _getQuotaOperationOperations,
} from "./classic/quotaOperation/index.js";
import {
  QuotaRequestStatusOperations,
  _getQuotaRequestStatusOperations,
} from "./classic/quotaRequestStatus/index.js";
import { UsagesOperations, _getUsagesOperations } from "./classic/usages/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureQuotaExtensionAPIOptionalParams } from "./api/azureQuotaExtensionAPIContext.js";

export class AzureQuotaExtensionAPI {
  private _client: AzureQuotaExtensionAPIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: AzureQuotaExtensionAPIOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AzureQuotaExtensionAPIOptionalParams,
  );
  /** Microsoft Azure Quota Resource Provider */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AzureQuotaExtensionAPIOptionalParams,
    options?: AzureQuotaExtensionAPIOptionalParams,
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
    this._client = createAzureQuotaExtensionAPI(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.quota = _getQuotaOperations(this._client);
    this.usages = _getUsagesOperations(this._client);
    this.groupQuotaLocationSettings = _getGroupQuotaLocationSettingsOperations(this._client);
    this.groupQuotaSubscriptionAllocationRequest =
      _getGroupQuotaSubscriptionAllocationRequestOperations(this._client);
    this.groupQuotaSubscriptionAllocation = _getGroupQuotaSubscriptionAllocationOperations(
      this._client,
    );
    this.groupQuotaLimits = _getGroupQuotaLimitsOperations(this._client);
    this.groupQuotaSubscriptionRequests = _getGroupQuotaSubscriptionRequestsOperations(
      this._client,
    );
    this.groupQuotaSubscriptions = _getGroupQuotaSubscriptionsOperations(this._client);
    this.groupQuotaUsages = _getGroupQuotaUsagesOperations(this._client);
    this.groupQuotaLimitsRequest = _getGroupQuotaLimitsRequestOperations(this._client);
    this.groupQuotas = _getGroupQuotasOperations(this._client);
    this.quotaRequestStatus = _getQuotaRequestStatusOperations(this._client);
    this.quotaOperation = _getQuotaOperationOperations(this._client);
  }

  /** The operation groups for quota */
  public readonly quota: QuotaOperations;
  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for groupQuotaLocationSettings */
  public readonly groupQuotaLocationSettings: GroupQuotaLocationSettingsOperations;
  /** The operation groups for groupQuotaSubscriptionAllocationRequest */
  public readonly groupQuotaSubscriptionAllocationRequest: GroupQuotaSubscriptionAllocationRequestOperations;
  /** The operation groups for groupQuotaSubscriptionAllocation */
  public readonly groupQuotaSubscriptionAllocation: GroupQuotaSubscriptionAllocationOperations;
  /** The operation groups for groupQuotaLimits */
  public readonly groupQuotaLimits: GroupQuotaLimitsOperations;
  /** The operation groups for groupQuotaSubscriptionRequests */
  public readonly groupQuotaSubscriptionRequests: GroupQuotaSubscriptionRequestsOperations;
  /** The operation groups for groupQuotaSubscriptions */
  public readonly groupQuotaSubscriptions: GroupQuotaSubscriptionsOperations;
  /** The operation groups for groupQuotaUsages */
  public readonly groupQuotaUsages: GroupQuotaUsagesOperations;
  /** The operation groups for groupQuotaLimitsRequest */
  public readonly groupQuotaLimitsRequest: GroupQuotaLimitsRequestOperations;
  /** The operation groups for groupQuotas */
  public readonly groupQuotas: GroupQuotasOperations;
  /** The operation groups for quotaRequestStatus */
  public readonly quotaRequestStatus: QuotaRequestStatusOperations;
  /** The operation groups for quotaOperation */
  public readonly quotaOperation: QuotaOperationOperations;
}
