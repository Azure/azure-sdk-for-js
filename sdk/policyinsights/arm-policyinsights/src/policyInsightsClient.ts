// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext, PolicyInsightsClientOptionalParams } from "./api/index.js";
import { createPolicyInsights } from "./api/index.js";
import type { AttestationsOperations } from "./classic/attestations/index.js";
import { _getAttestationsOperations } from "./classic/attestations/index.js";
import type { ComponentPolicyStatesOperations } from "./classic/componentPolicyStates/index.js";
import { _getComponentPolicyStatesOperations } from "./classic/componentPolicyStates/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PolicyEventsOperations } from "./classic/policyEvents/index.js";
import { _getPolicyEventsOperations } from "./classic/policyEvents/index.js";
import type { PolicyMetadataOperations } from "./classic/policyMetadata/index.js";
import { _getPolicyMetadataOperations } from "./classic/policyMetadata/index.js";
import type { PolicyRestrictionsOperations } from "./classic/policyRestrictions/index.js";
import { _getPolicyRestrictionsOperations } from "./classic/policyRestrictions/index.js";
import type { PolicyStatesOperations } from "./classic/policyStates/index.js";
import { _getPolicyStatesOperations } from "./classic/policyStates/index.js";
import type { PolicyTrackedResourcesOperations } from "./classic/policyTrackedResources/index.js";
import { _getPolicyTrackedResourcesOperations } from "./classic/policyTrackedResources/index.js";
import type { RemediationsOperations } from "./classic/remediations/index.js";
import { _getRemediationsOperations } from "./classic/remediations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { PolicyInsightsClientOptionalParams } from "./api/policyInsightsContext.js";

export class PolicyInsightsClient {
  private _client: PolicyInsightsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: PolicyInsightsClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: PolicyInsightsClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | PolicyInsightsClientOptionalParams,
    options?: PolicyInsightsClientOptionalParams,
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
    this._client = createPolicyInsights(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.policyTrackedResources = _getPolicyTrackedResourcesOperations(this._client);
    this.componentPolicyStates = _getComponentPolicyStatesOperations(this._client);
    this.policyRestrictions = _getPolicyRestrictionsOperations(this._client);
    this.policyStates = _getPolicyStatesOperations(this._client);
    this.policyEvents = _getPolicyEventsOperations(this._client);
    this.policyMetadata = _getPolicyMetadataOperations(this._client);
    this.attestations = _getAttestationsOperations(this._client);
    this.remediations = _getRemediationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for policyTrackedResources */
  public readonly policyTrackedResources: PolicyTrackedResourcesOperations;
  /** The operation groups for componentPolicyStates */
  public readonly componentPolicyStates: ComponentPolicyStatesOperations;
  /** The operation groups for policyRestrictions */
  public readonly policyRestrictions: PolicyRestrictionsOperations;
  /** The operation groups for policyStates */
  public readonly policyStates: PolicyStatesOperations;
  /** The operation groups for policyEvents */
  public readonly policyEvents: PolicyEventsOperations;
  /** The operation groups for policyMetadata */
  public readonly policyMetadata: PolicyMetadataOperations;
  /** The operation groups for attestations */
  public readonly attestations: AttestationsOperations;
  /** The operation groups for remediations */
  public readonly remediations: RemediationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
