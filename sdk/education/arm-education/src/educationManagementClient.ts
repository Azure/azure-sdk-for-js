// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  EducationManagementContext,
  EducationManagementClientOptionalParams,
  createEducationManagement,
} from "./api/index.js";
import { redeemInvitationCode } from "./api/operations.js";
import { RedeemInvitationCodeOptionalParams } from "./api/options.js";
import { GrantsOperations, _getGrantsOperations } from "./classic/grants/index.js";
import {
  JoinRequestsOperations,
  _getJoinRequestsOperations,
} from "./classic/joinRequests/index.js";
import { LabsOperations, _getLabsOperations } from "./classic/labs/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { StudentLabsOperations, _getStudentLabsOperations } from "./classic/studentLabs/index.js";
import { StudentsOperations, _getStudentsOperations } from "./classic/students/index.js";
import { RedeemRequest } from "./models/models.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { EducationManagementClientOptionalParams } from "./api/educationManagementContext.js";

export class EducationManagementClient {
  private _client: EducationManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Education client provides access to education resources for Azure subscriptions. */
  constructor(credential: TokenCredential, options: EducationManagementClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createEducationManagement(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.studentLabs = _getStudentLabsOperations(this._client);
    this.students = _getStudentsOperations(this._client);
    this.joinRequests = _getJoinRequestsOperations(this._client);
    this.labs = _getLabsOperations(this._client);
    this.grants = _getGrantsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Redeem invite code to join a redeemable lab */
  redeemInvitationCode(
    parameters: RedeemRequest,
    options: RedeemInvitationCodeOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return redeemInvitationCode(this._client, parameters, options);
  }

  /** The operation groups for studentLabs */
  public readonly studentLabs: StudentLabsOperations;
  /** The operation groups for students */
  public readonly students: StudentsOperations;
  /** The operation groups for joinRequests */
  public readonly joinRequests: JoinRequestsOperations;
  /** The operation groups for labs */
  public readonly labs: LabsOperations;
  /** The operation groups for grants */
  public readonly grants: GrantsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
