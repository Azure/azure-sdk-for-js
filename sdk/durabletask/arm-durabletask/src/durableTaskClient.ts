// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DurableTaskContext, DurableTaskClientOptionalParams } from "./api/index.js";
import { createDurableTask } from "./api/index.js";
import type { DetectorsOperations } from "./classic/detectors/index.js";
import { _getDetectorsOperations } from "./classic/detectors/index.js";
import type { FailoverInstancesOperations } from "./classic/failoverInstances/index.js";
import { _getFailoverInstancesOperations } from "./classic/failoverInstances/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { RetentionPoliciesOperations } from "./classic/retentionPolicies/index.js";
import { _getRetentionPoliciesOperations } from "./classic/retentionPolicies/index.js";
import type { SchedulersOperations } from "./classic/schedulers/index.js";
import { _getSchedulersOperations } from "./classic/schedulers/index.js";
import type { TaskHubsOperations } from "./classic/taskHubs/index.js";
import { _getTaskHubsOperations } from "./classic/taskHubs/index.js";
import type { TaskQueuesOperations } from "./classic/taskQueues/index.js";
import { _getTaskQueuesOperations } from "./classic/taskQueues/index.js";
import type { TransparentDataEncryptionsOperations } from "./classic/transparentDataEncryptions/index.js";
import { _getTransparentDataEncryptionsOperations } from "./classic/transparentDataEncryptions/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { DurableTaskClientOptionalParams } from "./api/durableTaskContext.js";

export class DurableTaskClient {
  private _client: DurableTaskContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DurableTaskClientOptionalParams = {},
  ) {
    this._client = createDurableTask(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.failoverInstances = _getFailoverInstancesOperations(this._client);
    this.transparentDataEncryptions = _getTransparentDataEncryptionsOperations(this._client);
    this.retentionPolicies = _getRetentionPoliciesOperations(this._client);
    this.taskQueues = _getTaskQueuesOperations(this._client);
    this.taskHubs = _getTaskHubsOperations(this._client);
    this.schedulers = _getSchedulersOperations(this._client);
    this.detectors = _getDetectorsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for failoverInstances */
  public readonly failoverInstances: FailoverInstancesOperations;
  /** The operation groups for transparentDataEncryptions */
  public readonly transparentDataEncryptions: TransparentDataEncryptionsOperations;
  /** The operation groups for retentionPolicies */
  public readonly retentionPolicies: RetentionPoliciesOperations;
  /** The operation groups for taskQueues */
  public readonly taskQueues: TaskQueuesOperations;
  /** The operation groups for taskHubs */
  public readonly taskHubs: TaskHubsOperations;
  /** The operation groups for schedulers */
  public readonly schedulers: SchedulersOperations;
  /** The operation groups for detectors */
  public readonly detectors: DetectorsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
