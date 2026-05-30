// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ProgramEnrollmentContext,
  ProgramEnrollmentClientOptionalParams,
  createProgramEnrollment,
} from "./api/index.js";
import {
  EduEnrollmentsOperations,
  _getEduEnrollmentsOperations,
} from "./classic/eduEnrollments/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ProgramEnrollmentClientOptionalParams } from "./api/programEnrollmentContext.js";

export class ProgramEnrollmentClient {
  private _client: ProgramEnrollmentContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ProgramEnrollmentClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createProgramEnrollment(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.eduEnrollments = _getEduEnrollmentsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for eduEnrollments */
  public readonly eduEnrollments: EduEnrollmentsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
