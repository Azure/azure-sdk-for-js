// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PlatformValidationContext,
  PlatformValidationClientOptionalParams,
  createPlatformValidation,
} from "./api/index.js";
import {
  CloudValidationsOperations,
  _getCloudValidationsOperations,
} from "./classic/cloudValidations/index.js";
import {
  ExecutionPlanRunsOperations,
  _getExecutionPlanRunsOperations,
} from "./classic/executionPlanRuns/index.js";
import {
  OperationStatusOperations,
  _getOperationStatusOperations,
} from "./classic/operationStatus/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  ValidationExecutionPlansOperations,
  _getValidationExecutionPlansOperations,
} from "./classic/validationExecutionPlans/index.js";
import {
  ValidationTestCategoriesOperations,
  _getValidationTestCategoriesOperations,
} from "./classic/validationTestCategories/index.js";
import {
  ValidationTestRunsOperations,
  _getValidationTestRunsOperations,
} from "./classic/validationTestRuns/index.js";
import {
  ValidationTestVersionsOperations,
  _getValidationTestVersionsOperations,
} from "./classic/validationTestVersions/index.js";
import {
  ValidationTestsOperations,
  _getValidationTestsOperations,
} from "./classic/validationTests/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { PlatformValidationClientOptionalParams } from "./api/platformValidationContext.js";

export class PlatformValidationClient {
  private _client: PlatformValidationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.PlatformValidation Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: PlatformValidationClientOptionalParams = {},
  ) {
    this._client = createPlatformValidation(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.validationTestCategories = _getValidationTestCategoriesOperations(this._client);
    this.validationTestVersions = _getValidationTestVersionsOperations(this._client);
    this.validationTests = _getValidationTestsOperations(this._client);
    this.validationTestRuns = _getValidationTestRunsOperations(this._client);
    this.executionPlanRuns = _getExecutionPlanRunsOperations(this._client);
    this.validationExecutionPlans = _getValidationExecutionPlansOperations(this._client);
    this.cloudValidations = _getCloudValidationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.operationStatus = _getOperationStatusOperations(this._client);
  }

  /** The operation groups for validationTestCategories */
  public readonly validationTestCategories: ValidationTestCategoriesOperations;
  /** The operation groups for validationTestVersions */
  public readonly validationTestVersions: ValidationTestVersionsOperations;
  /** The operation groups for validationTests */
  public readonly validationTests: ValidationTestsOperations;
  /** The operation groups for validationTestRuns */
  public readonly validationTestRuns: ValidationTestRunsOperations;
  /** The operation groups for executionPlanRuns */
  public readonly executionPlanRuns: ExecutionPlanRunsOperations;
  /** The operation groups for validationExecutionPlans */
  public readonly validationExecutionPlans: ValidationExecutionPlansOperations;
  /** The operation groups for cloudValidations */
  public readonly cloudValidations: CloudValidationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for operationStatus */
  public readonly operationStatus: OperationStatusOperations;
}
