// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createStorageActionsManagement,
  StorageActionsManagementContext,
  StorageActionsManagementClientOptionalParams,
} from "./api/index.js";
import {
  StorageTaskAssignmentOperations,
  _getStorageTaskAssignmentOperations,
} from "./classic/storageTaskAssignment/index.js";
import {
  StorageTasksReportOperations,
  _getStorageTasksReportOperations,
} from "./classic/storageTasksReport/index.js";
import {
  StorageTasksOperations,
  _getStorageTasksOperations,
} from "./classic/storageTasks/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { StorageActionsManagementClientOptionalParams } from "./api/storageActionsManagementContext.js";

export class StorageActionsManagementClient {
  private _client: StorageActionsManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Azure Storage Actions Management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: StorageActionsManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createStorageActionsManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.storageTaskAssignment = _getStorageTaskAssignmentOperations(this._client);
    this.storageTasksReport = _getStorageTasksReportOperations(this._client);
    this.storageTasks = _getStorageTasksOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for storageTaskAssignment */
  public readonly storageTaskAssignment: StorageTaskAssignmentOperations;
  /** The operation groups for storageTasksReport */
  public readonly storageTasksReport: StorageTasksReportOperations;
  /** The operation groups for storageTasks */
  public readonly storageTasks: StorageTasksOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
