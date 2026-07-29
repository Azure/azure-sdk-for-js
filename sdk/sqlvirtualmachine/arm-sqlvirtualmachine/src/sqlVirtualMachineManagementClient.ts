// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SqlVirtualMachineManagementContext,
  SqlVirtualMachineManagementClientOptionalParams,
} from "./api/index.js";
import { createSqlVirtualMachineManagement } from "./api/index.js";
import type { AvailabilityGroupListenersOperations } from "./classic/availabilityGroupListeners/index.js";
import { _getAvailabilityGroupListenersOperations } from "./classic/availabilityGroupListeners/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SqlVirtualMachineGroupsOperations } from "./classic/sqlVirtualMachineGroups/index.js";
import { _getSqlVirtualMachineGroupsOperations } from "./classic/sqlVirtualMachineGroups/index.js";
import type { SqlVirtualMachineTroubleshootOperations } from "./classic/sqlVirtualMachineTroubleshoot/index.js";
import { _getSqlVirtualMachineTroubleshootOperations } from "./classic/sqlVirtualMachineTroubleshoot/index.js";
import type { SqlVirtualMachinesOperations } from "./classic/sqlVirtualMachines/index.js";
import { _getSqlVirtualMachinesOperations } from "./classic/sqlVirtualMachines/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { SqlVirtualMachineManagementClientOptionalParams } from "./api/sqlVirtualMachineManagementContext.js";

export class SqlVirtualMachineManagementClient {
  private _client: SqlVirtualMachineManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    options?: SqlVirtualMachineManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: SqlVirtualMachineManagementClientOptionalParams,
  );
  /** The SQL virtual machine management API provides a RESTful set of web APIs that interact with Azure Compute, Network & Storage services to manage your SQL Server virtual machine. The API enables users to create, delete and retrieve a SQL virtual machine, SQL virtual machine group or availability group listener. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | SqlVirtualMachineManagementClientOptionalParams,
    options?: SqlVirtualMachineManagementClientOptionalParams,
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
    this._client = createSqlVirtualMachineManagement(credential, subscriptionId ?? "", {
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
