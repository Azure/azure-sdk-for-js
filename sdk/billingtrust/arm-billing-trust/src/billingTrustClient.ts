// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingTrustContext, BillingTrustClientOptionalParams } from "./api/index.js";
import { createBillingTrust } from "./api/index.js";
import type { AssessmentsOperations } from "./classic/assessments/index.js";
import { _getAssessmentsOperations } from "./classic/assessments/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { RulesOperations } from "./classic/rules/index.js";
import { _getRulesOperations } from "./classic/rules/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { BillingTrustClientOptionalParams } from "./api/billingTrustContext.js";

export class BillingTrustClient {
  private _client: BillingTrustContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.BillingTrust resource provider. Provides Assessment and Rule resources used to evaluate trust attributes (such as education-domain qualification and business verification) of a billing account. */
  constructor(credential: TokenCredential, options: BillingTrustClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createBillingTrust(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.rules = _getRulesOperations(this._client);
    this.assessments = _getAssessmentsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for rules */
  public readonly rules: RulesOperations;
  /** The operation groups for assessments */
  public readonly assessments: AssessmentsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
