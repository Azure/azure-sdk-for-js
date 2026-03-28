// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext, SubscriptionClientOptionalParams } from "./api/index.js";
import { createSubscription } from "./api/index.js";
import type { AliasOperations } from "./classic/alias/index.js";
import { _getAliasOperations } from "./classic/alias/index.js";
import type { BillingAccountOperations } from "./classic/billingAccount/index.js";
import { _getBillingAccountOperations } from "./classic/billingAccount/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SubscriptionOperations } from "./classic/subscription/index.js";
import { _getSubscriptionOperations } from "./classic/subscription/index.js";
import type { SubscriptionOperationOperations } from "./classic/subscriptionOperation/index.js";
import { _getSubscriptionOperationOperations } from "./classic/subscriptionOperation/index.js";
import type { SubscriptionPolicyOperations } from "./classic/subscriptionPolicy/index.js";
import { _getSubscriptionPolicyOperations } from "./classic/subscriptionPolicy/index.js";
import type { SubscriptionsOperations } from "./classic/subscriptions/index.js";
import { _getSubscriptionsOperations } from "./classic/subscriptions/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { SubscriptionClientOptionalParams } from "./api/subscriptionContext.js";

export class SubscriptionClient {
  private _client: SubscriptionContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options: SubscriptionClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createSubscription(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.subscriptionOperation = _getSubscriptionOperationOperations(this._client);
    this.subscription = _getSubscriptionOperations(this._client);
    this.billingAccount = _getBillingAccountOperations(this._client);
    this.subscriptionPolicy = _getSubscriptionPolicyOperations(this._client);
    this.alias = _getAliasOperations(this._client);
    this.subscriptions = _getSubscriptionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for subscriptionOperation */
  public readonly subscriptionOperation: SubscriptionOperationOperations;
  /** The operation groups for subscription */
  public readonly subscription: SubscriptionOperations;
  /** The operation groups for billingAccount */
  public readonly billingAccount: BillingAccountOperations;
  /** The operation groups for subscriptionPolicy */
  public readonly subscriptionPolicy: SubscriptionPolicyOperations;
  /** The operation groups for alias */
  public readonly alias: AliasOperations;
  /** The operation groups for subscriptions */
  public readonly subscriptions: SubscriptionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
