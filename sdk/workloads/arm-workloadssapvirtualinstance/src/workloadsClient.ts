// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  getOperationsOperations,
  OperationsOperations,
} from "./classic/operations/index.js";
import {
  getSAPVirtualInstancesOperations,
  SAPVirtualInstancesOperations,
} from "./classic/sAPVirtualInstances/index.js";
import {
  getSAPCentralServerInstancesOperations,
  SAPCentralServerInstancesOperations,
} from "./classic/sAPCentralServerInstances/index.js";
import {
  getSAPDatabaseInstancesOperations,
  SAPDatabaseInstancesOperations,
} from "./classic/sAPDatabaseInstances/index.js";
import {
  getSAPApplicationServerInstancesOperations,
  SAPApplicationServerInstancesOperations,
} from "./classic/sAPApplicationServerInstances/index.js";
import {
  createWorkloads,
  WorkloadsContext,
  WorkloadsClientOptionalParams,
} from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { WorkloadsClientOptionalParams } from "./api/workloadsContext.js";

export class WorkloadsClient {
  private _client: WorkloadsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Workloads client provides access to various workload operations. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: WorkloadsClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createWorkloads(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.sAPVirtualInstances = getSAPVirtualInstancesOperations(
      this._client,
      subscriptionId,
    );
    this.sAPCentralServerInstances = getSAPCentralServerInstancesOperations(
      this._client,
      subscriptionId,
    );
    this.sAPDatabaseInstances = getSAPDatabaseInstancesOperations(
      this._client,
      subscriptionId,
    );
    this.sAPApplicationServerInstances =
      getSAPApplicationServerInstancesOperations(this._client, subscriptionId);
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for SAPVirtualInstances */
  public readonly sAPVirtualInstances: SAPVirtualInstancesOperations;
  /** The operation groups for SAPCentralServerInstances */
  public readonly sAPCentralServerInstances: SAPCentralServerInstancesOperations;
  /** The operation groups for SAPDatabaseInstances */
  public readonly sAPDatabaseInstances: SAPDatabaseInstancesOperations;
  /** The operation groups for SAPApplicationServerInstances */
  public readonly sAPApplicationServerInstances: SAPApplicationServerInstancesOperations;
}
