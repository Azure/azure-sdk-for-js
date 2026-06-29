// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DynatraceObservabilityContext,
  DynatraceObservabilityOptionalParams,
} from "./api/index.js";
import { createDynatraceObservability } from "./api/index.js";
import type { CreationSupportedOperations } from "./classic/creationSupported/index.js";
import { _getCreationSupportedOperations } from "./classic/creationSupported/index.js";
import type { MonitoredSubscriptionsOperations } from "./classic/monitoredSubscriptions/index.js";
import { _getMonitoredSubscriptionsOperations } from "./classic/monitoredSubscriptions/index.js";
import type { MonitorsOperations } from "./classic/monitors/index.js";
import { _getMonitorsOperations } from "./classic/monitors/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SingleSignOnOperations } from "./classic/singleSignOn/index.js";
import { _getSingleSignOnOperations } from "./classic/singleSignOn/index.js";
import type { TagRulesOperations } from "./classic/tagRules/index.js";
import { _getTagRulesOperations } from "./classic/tagRules/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { DynatraceObservabilityOptionalParams } from "./api/dynatraceObservabilityContext.js";

export class DynatraceObservability {
  private _client: DynatraceObservabilityContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DynatraceObservabilityOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDynatraceObservability(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.creationSupported = _getCreationSupportedOperations(this._client);
    this.singleSignOn = _getSingleSignOnOperations(this._client);
    this.monitors = _getMonitorsOperations(this._client);
    this.tagRules = _getTagRulesOperations(this._client);
    this.monitoredSubscriptions = _getMonitoredSubscriptionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for creationSupported */
  public readonly creationSupported: CreationSupportedOperations;
  /** The operation groups for singleSignOn */
  public readonly singleSignOn: SingleSignOnOperations;
  /** The operation groups for monitors */
  public readonly monitors: MonitorsOperations;
  /** The operation groups for tagRules */
  public readonly tagRules: TagRulesOperations;
  /** The operation groups for monitoredSubscriptions */
  public readonly monitoredSubscriptions: MonitoredSubscriptionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
