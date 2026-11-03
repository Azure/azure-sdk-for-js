// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  GuestConfigurationContext,
  GuestConfigurationClientOptionalParams,
  createGuestConfiguration,
} from "./api/index.js";
import {
  GuestConfigurationAssignmentReportsOperations,
  _getGuestConfigurationAssignmentReportsOperations,
} from "./classic/guestConfigurationAssignmentReports/index.js";
import {
  GuestConfigurationAssignmentReportsVmssOperations,
  _getGuestConfigurationAssignmentReportsVmssOperations,
} from "./classic/guestConfigurationAssignmentReportsVmss/index.js";
import {
  GuestConfigurationAssignmentsOperations,
  _getGuestConfigurationAssignmentsOperations,
} from "./classic/guestConfigurationAssignments/index.js";
import {
  GuestConfigurationAssignmentsVmssOperations,
  _getGuestConfigurationAssignmentsVmssOperations,
} from "./classic/guestConfigurationAssignmentsVmss/index.js";
import {
  GuestConfigurationConnectedVMwarevSphereAssignmentsOperations,
  _getGuestConfigurationConnectedVMwarevSphereAssignmentsOperations,
} from "./classic/guestConfigurationConnectedVMwarevSphereAssignments/index.js";
import {
  GuestConfigurationConnectedVMwarevSphereAssignmentsReportsOperations,
  _getGuestConfigurationConnectedVMwarevSphereAssignmentsReportsOperations,
} from "./classic/guestConfigurationConnectedVMwarevSphereAssignmentsReports/index.js";
import {
  GuestConfigurationHcrpAssignmentReportsOperations,
  _getGuestConfigurationHcrpAssignmentReportsOperations,
} from "./classic/guestConfigurationHcrpAssignmentReports/index.js";
import {
  GuestConfigurationHcrpAssignmentsOperations,
  _getGuestConfigurationHcrpAssignmentsOperations,
} from "./classic/guestConfigurationHcrpAssignments/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { GuestConfigurationClientOptionalParams } from "./api/guestConfigurationContext.js";

export class GuestConfigurationClient {
  private _client: GuestConfigurationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: GuestConfigurationClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: GuestConfigurationClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | GuestConfigurationClientOptionalParams,
    options?: GuestConfigurationClientOptionalParams,
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
    this._client = createGuestConfiguration(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.guestConfigurationConnectedVMwarevSphereAssignmentsReports =
      _getGuestConfigurationConnectedVMwarevSphereAssignmentsReportsOperations(this._client);
    this.guestConfigurationAssignmentReportsVmss =
      _getGuestConfigurationAssignmentReportsVmssOperations(this._client);
    this.guestConfigurationHcrpAssignmentReports =
      _getGuestConfigurationHcrpAssignmentReportsOperations(this._client);
    this.guestConfigurationAssignmentReports = _getGuestConfigurationAssignmentReportsOperations(
      this._client,
    );
    this.guestConfigurationConnectedVMwarevSphereAssignments =
      _getGuestConfigurationConnectedVMwarevSphereAssignmentsOperations(this._client);
    this.guestConfigurationAssignmentsVmss = _getGuestConfigurationAssignmentsVmssOperations(
      this._client,
    );
    this.guestConfigurationHcrpAssignments = _getGuestConfigurationHcrpAssignmentsOperations(
      this._client,
    );
    this.guestConfigurationAssignments = _getGuestConfigurationAssignmentsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for guestConfigurationConnectedVMwarevSphereAssignmentsReports */
  public readonly guestConfigurationConnectedVMwarevSphereAssignmentsReports: GuestConfigurationConnectedVMwarevSphereAssignmentsReportsOperations;
  /** The operation groups for guestConfigurationAssignmentReportsVmss */
  public readonly guestConfigurationAssignmentReportsVmss: GuestConfigurationAssignmentReportsVmssOperations;
  /** The operation groups for guestConfigurationHcrpAssignmentReports */
  public readonly guestConfigurationHcrpAssignmentReports: GuestConfigurationHcrpAssignmentReportsOperations;
  /** The operation groups for guestConfigurationAssignmentReports */
  public readonly guestConfigurationAssignmentReports: GuestConfigurationAssignmentReportsOperations;
  /** The operation groups for guestConfigurationConnectedVMwarevSphereAssignments */
  public readonly guestConfigurationConnectedVMwarevSphereAssignments: GuestConfigurationConnectedVMwarevSphereAssignmentsOperations;
  /** The operation groups for guestConfigurationAssignmentsVmss */
  public readonly guestConfigurationAssignmentsVmss: GuestConfigurationAssignmentsVmssOperations;
  /** The operation groups for guestConfigurationHcrpAssignments */
  public readonly guestConfigurationHcrpAssignments: GuestConfigurationHcrpAssignmentsOperations;
  /** The operation groups for guestConfigurationAssignments */
  public readonly guestConfigurationAssignments: GuestConfigurationAssignmentsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
