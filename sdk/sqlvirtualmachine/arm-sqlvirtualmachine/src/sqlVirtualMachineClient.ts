// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createSqlVirtualMachine,
  SqlVirtualMachineContext,
  SqlVirtualMachineClientOptionalParams,
} from "./api/index.js";
import {
  SqlVirtualMachineTroubleshootOperations,
  _getSqlVirtualMachineTroubleshootOperations,
} from "./classic/sqlVirtualMachineTroubleshoot/index.js";
import {
  SqlVirtualMachineGroupsOperations,
  _getSqlVirtualMachineGroupsOperations,
} from "./classic/sqlVirtualMachineGroups/index.js";
import {
  SqlVirtualMachinesOperations,
  _getSqlVirtualMachinesOperations,
} from "./classic/sqlVirtualMachines/index.js";
import {
  AvailabilityGroupListenersOperations,
  _getAvailabilityGroupListenersOperations,
} from "./classic/availabilityGroupListeners/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { SqlVirtualMachineClientOptionalParams } from "./api/sqlVirtualMachineContext.js";

export class SqlVirtualMachineClient {
  private _client: SqlVirtualMachineContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The SQL virtual machine management API provides a RESTful set of web APIs that interact with Azure Compute, Network & Storage services to manage your SQL Server virtual machine. The API enables users to create, delete and retrieve a SQL virtual machine, SQL virtual machine group or availability group listener. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: SqlVirtualMachineClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createSqlVirtualMachine(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.sqlVirtualMachineTroubleshoot = _getSqlVirtualMachineTroubleshootOperations(this._client);
    this.sqlVirtualMachineGroups = _getSqlVirtualMachineGroupsOperations(this._client);
    this.sqlVirtualMachines = _getSqlVirtualMachinesOperations(this._client);
    this.availabilityGroupListeners = _getAvailabilityGroupListenersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for sqlVirtualMachineTroubleshoot */
  public readonly sqlVirtualMachineTroubleshoot: SqlVirtualMachineTroubleshootOperations;
  /** The operation groups for sqlVirtualMachineGroups */
  public readonly sqlVirtualMachineGroups: SqlVirtualMachineGroupsOperations;
  /** The operation groups for sqlVirtualMachines */
  public readonly sqlVirtualMachines: SqlVirtualMachinesOperations;
  /** The operation groups for availabilityGroupListeners */
  public readonly availabilityGroupListeners: AvailabilityGroupListenersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
