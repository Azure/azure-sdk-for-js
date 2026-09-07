// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyContext, PolicyClientOptionalParams } from "./api/index.js";
import { createPolicy } from "./api/index.js";
import type { DataPolicyManifestsOperations } from "./classic/dataPolicyManifests/index.js";
import { _getDataPolicyManifestsOperations } from "./classic/dataPolicyManifests/index.js";
import type { PolicyAssignmentsOperations } from "./classic/policyAssignments/index.js";
import { _getPolicyAssignmentsOperations } from "./classic/policyAssignments/index.js";
import type { PolicyDefinitionVersionsOperations } from "./classic/policyDefinitionVersions/index.js";
import { _getPolicyDefinitionVersionsOperations } from "./classic/policyDefinitionVersions/index.js";
import type { PolicyDefinitionsOperations } from "./classic/policyDefinitions/index.js";
import { _getPolicyDefinitionsOperations } from "./classic/policyDefinitions/index.js";
import type { PolicyEnrollmentsOperations } from "./classic/policyEnrollments/index.js";
import { _getPolicyEnrollmentsOperations } from "./classic/policyEnrollments/index.js";
import type { PolicyExemptionsOperations } from "./classic/policyExemptions/index.js";
import { _getPolicyExemptionsOperations } from "./classic/policyExemptions/index.js";
import type { PolicySetDefinitionVersionsOperations } from "./classic/policySetDefinitionVersions/index.js";
import { _getPolicySetDefinitionVersionsOperations } from "./classic/policySetDefinitionVersions/index.js";
import type { PolicySetDefinitionsOperations } from "./classic/policySetDefinitions/index.js";
import { _getPolicySetDefinitionsOperations } from "./classic/policySetDefinitions/index.js";
import type { PolicyTokensOperations } from "./classic/policyTokens/index.js";
import { _getPolicyTokensOperations } from "./classic/policyTokens/index.js";
import type { VariableValuesOperations } from "./classic/variableValues/index.js";
import { _getVariableValuesOperations } from "./classic/variableValues/index.js";
import type { VariablesOperations } from "./classic/variables/index.js";
import { _getVariablesOperations } from "./classic/variables/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { PolicyClientOptionalParams } from "./api/policyContext.js";

export class PolicyClient {
  private _client: PolicyContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: PolicyClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: PolicyClientOptionalParams,
  );
  /** To manage and control access to your resources, you can define customized policies and assign them at a scope. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | PolicyClientOptionalParams,
    options?: PolicyClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    this._client = createPolicy(credential, subscriptionId ?? "", options);
    this.pipeline = this._client.pipeline;
    this.policyTokens = _getPolicyTokensOperations(this._client);
    this.variableValues = _getVariableValuesOperations(this._client);
    this.variables = _getVariablesOperations(this._client);
    this.policySetDefinitionVersions = _getPolicySetDefinitionVersionsOperations(this._client);
    this.policySetDefinitions = _getPolicySetDefinitionsOperations(this._client);
    this.policyExemptions = _getPolicyExemptionsOperations(this._client);
    this.policyEnrollments = _getPolicyEnrollmentsOperations(this._client);
    this.policyDefinitionVersions = _getPolicyDefinitionVersionsOperations(this._client);
    this.policyDefinitions = _getPolicyDefinitionsOperations(this._client);
    this.dataPolicyManifests = _getDataPolicyManifestsOperations(this._client);
    this.policyAssignments = _getPolicyAssignmentsOperations(this._client);
  }

  /** The operation groups for policyTokens */
  public readonly policyTokens: PolicyTokensOperations;
  /** The operation groups for variableValues */
  public readonly variableValues: VariableValuesOperations;
  /** The operation groups for variables */
  public readonly variables: VariablesOperations;
  /** The operation groups for policySetDefinitionVersions */
  public readonly policySetDefinitionVersions: PolicySetDefinitionVersionsOperations;
  /** The operation groups for policySetDefinitions */
  public readonly policySetDefinitions: PolicySetDefinitionsOperations;
  /** The operation groups for policyExemptions */
  public readonly policyExemptions: PolicyExemptionsOperations;
  /** The operation groups for policyEnrollments */
  public readonly policyEnrollments: PolicyEnrollmentsOperations;
  /** The operation groups for policyDefinitionVersions */
  public readonly policyDefinitionVersions: PolicyDefinitionVersionsOperations;
  /** The operation groups for policyDefinitions */
  public readonly policyDefinitions: PolicyDefinitionsOperations;
  /** The operation groups for dataPolicyManifests */
  public readonly dataPolicyManifests: DataPolicyManifestsOperations;
  /** The operation groups for policyAssignments */
  public readonly policyAssignments: PolicyAssignmentsOperations;
}
