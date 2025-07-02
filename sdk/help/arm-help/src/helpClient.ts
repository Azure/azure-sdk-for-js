// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHelp, HelpContext, HelpClientOptionalParams } from "./api/index.js";
import {
  DiscoverySolutionNLPOperations,
  _getDiscoverySolutionNLPOperations,
} from "./classic/discoverySolutionNLP/index.js";
import {
  DiscoverySolutionOperations,
  _getDiscoverySolutionOperations,
} from "./classic/discoverySolution/index.js";
import {
  CheckNameAvailabilityOperations,
  _getCheckNameAvailabilityOperations,
} from "./classic/checkNameAvailability/index.js";
import {
  SolutionSelfHelpOperations,
  _getSolutionSelfHelpOperations,
} from "./classic/solutionSelfHelp/index.js";
import {
  TroubleshootersOperations,
  _getTroubleshootersOperations,
} from "./classic/troubleshooters/index.js";
import {
  SimplifiedSolutionsOperations,
  _getSimplifiedSolutionsOperations,
} from "./classic/simplifiedSolutions/index.js";
import { SolutionOperations, _getSolutionOperations } from "./classic/solution/index.js";
import { DiagnosticsOperations, _getDiagnosticsOperations } from "./classic/diagnostics/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { HelpClientOptionalParams } from "./api/helpContext.js";

export class HelpClient {
  private _client: HelpContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Help RP provider */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: HelpClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createHelp(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.discoverySolutionNLP = _getDiscoverySolutionNLPOperations(this._client);
    this.discoverySolution = _getDiscoverySolutionOperations(this._client);
    this.checkNameAvailability = _getCheckNameAvailabilityOperations(this._client);
    this.solutionSelfHelp = _getSolutionSelfHelpOperations(this._client);
    this.troubleshooters = _getTroubleshootersOperations(this._client);
    this.simplifiedSolutions = _getSimplifiedSolutionsOperations(this._client);
    this.solution = _getSolutionOperations(this._client);
    this.diagnostics = _getDiagnosticsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for discoverySolutionNLP */
  public readonly discoverySolutionNLP: DiscoverySolutionNLPOperations;
  /** The operation groups for discoverySolution */
  public readonly discoverySolution: DiscoverySolutionOperations;
  /** The operation groups for checkNameAvailability */
  public readonly checkNameAvailability: CheckNameAvailabilityOperations;
  /** The operation groups for solutionSelfHelp */
  public readonly solutionSelfHelp: SolutionSelfHelpOperations;
  /** The operation groups for troubleshooters */
  public readonly troubleshooters: TroubleshootersOperations;
  /** The operation groups for simplifiedSolutions */
  public readonly simplifiedSolutions: SimplifiedSolutionsOperations;
  /** The operation groups for solution */
  public readonly solution: SolutionOperations;
  /** The operation groups for diagnostics */
  public readonly diagnostics: DiagnosticsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
