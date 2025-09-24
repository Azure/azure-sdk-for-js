// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AzureQuotaExtensionAPIContext,
  AzureQuotaExtensionAPIOptionalParams,
} from "./api/index.js";
import { createAzureQuotaExtensionAPI } from "./api/index.js";
import type { GroupQuotaLimitsOperations } from "./classic/groupQuotaLimits/index.js";
import { _getGroupQuotaLimitsOperations } from "./classic/groupQuotaLimits/index.js";
import type { GroupQuotaLimitsRequestOperations } from "./classic/groupQuotaLimitsRequest/index.js";
import { _getGroupQuotaLimitsRequestOperations } from "./classic/groupQuotaLimitsRequest/index.js";
import type { GroupQuotaLocationSettingsOperations } from "./classic/groupQuotaLocationSettings/index.js";
import { _getGroupQuotaLocationSettingsOperations } from "./classic/groupQuotaLocationSettings/index.js";
import type { GroupQuotaSubscriptionAllocationOperations } from "./classic/groupQuotaSubscriptionAllocation/index.js";
import { _getGroupQuotaSubscriptionAllocationOperations } from "./classic/groupQuotaSubscriptionAllocation/index.js";
import type { GroupQuotaSubscriptionAllocationRequestOperations } from "./classic/groupQuotaSubscriptionAllocationRequest/index.js";
import { _getGroupQuotaSubscriptionAllocationRequestOperations } from "./classic/groupQuotaSubscriptionAllocationRequest/index.js";
import type { GroupQuotaSubscriptionRequestsOperations } from "./classic/groupQuotaSubscriptionRequests/index.js";
import { _getGroupQuotaSubscriptionRequestsOperations } from "./classic/groupQuotaSubscriptionRequests/index.js";
import type { GroupQuotaSubscriptionsOperations } from "./classic/groupQuotaSubscriptions/index.js";
import { _getGroupQuotaSubscriptionsOperations } from "./classic/groupQuotaSubscriptions/index.js";
import type { GroupQuotaUsagesOperations } from "./classic/groupQuotaUsages/index.js";
import { _getGroupQuotaUsagesOperations } from "./classic/groupQuotaUsages/index.js";
import type { GroupQuotasOperations } from "./classic/groupQuotas/index.js";
import { _getGroupQuotasOperations } from "./classic/groupQuotas/index.js";
import type { QuotaOperations } from "./classic/quota/index.js";
import { _getQuotaOperations } from "./classic/quota/index.js";
import type { QuotaOperationOperations } from "./classic/quotaOperation/index.js";
import { _getQuotaOperationOperations } from "./classic/quotaOperation/index.js";
import type { QuotaRequestStatusOperations } from "./classic/quotaRequestStatus/index.js";
import { _getQuotaRequestStatusOperations } from "./classic/quotaRequestStatus/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { AzureQuotaExtensionAPIOptionalParams } from "./api/azureQuotaExtensionAPIContext.js";

export class AzureQuotaExtensionAPI {
  private _client: AzureQuotaExtensionAPIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft Azure Quota Resource Provider */
  constructor(credential: TokenCredential, options?: AzureQuotaExtensionAPIOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AzureQuotaExtensionAPIOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AzureQuotaExtensionAPIOptionalParams,
    options?: AzureQuotaExtensionAPIOptionalParams,
  ) {
    let subscriptionId: string | undefined;
    let mergedOptions: AzureQuotaExtensionAPIOptionalParams | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
      mergedOptions = options;
    } else {
      subscriptionId = undefined;
      mergedOptions = subscriptionIdOrOptions;
    }

    const prefixFromOptions = mergedOptions?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureQuotaExtensionAPI(credential, subscriptionId ?? "", {
      ...mergedOptions,
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
