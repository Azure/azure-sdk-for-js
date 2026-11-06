// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext, PlatformClientOptionalParams } from "./api/index.js";
import { createPlatform } from "./api/index.js";
import type { AgreementsOperations } from "./classic/agreements/index.js";
import { _getAgreementsOperations } from "./classic/agreements/index.js";
import type { CloudResourcesOperations } from "./classic/cloudResources/index.js";
import { _getCloudResourcesOperations } from "./classic/cloudResources/index.js";
import type { CloudsOperations } from "./classic/clouds/index.js";
import { _getCloudsOperations } from "./classic/clouds/index.js";
import type { ComputeConfigsOperations } from "./classic/computeConfigs/index.js";
import { _getComputeConfigsOperations } from "./classic/computeConfigs/index.js";
import type { ContainerImagesOperations } from "./classic/containerImages/index.js";
import { _getContainerImagesOperations } from "./classic/containerImages/index.js";
import type { JobsOperations } from "./classic/jobs/index.js";
import { _getJobsOperations } from "./classic/jobs/index.js";
import type { OperationStatusesOperations } from "./classic/operationStatuses/index.js";
import { _getOperationStatusesOperations } from "./classic/operationStatuses/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ProjectsOperations } from "./classic/projects/index.js";
import { _getProjectsOperations } from "./classic/projects/index.js";
import type { ServicesOperations } from "./classic/services/index.js";
import { _getServicesOperations } from "./classic/services/index.js";
import type { WorkspacesOperations } from "./classic/workspaces/index.js";
import { _getWorkspacesOperations } from "./classic/workspaces/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { PlatformClientOptionalParams } from "./api/platformContext.js";

export class PlatformClient {
  private _client: PlatformContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Anyscale.Platform Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: PlatformClientOptionalParams = {},
  ) {
    this._client = createPlatform(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.workspaces = _getWorkspacesOperations(this._client);
    this.services = _getServicesOperations(this._client);
    this.projects = _getProjectsOperations(this._client);
    this.jobs = _getJobsOperations(this._client);
    this.containerImages = _getContainerImagesOperations(this._client);
    this.computeConfigs = _getComputeConfigsOperations(this._client);
    this.cloudResources = _getCloudResourcesOperations(this._client);
    this.clouds = _getCloudsOperations(this._client);
    this.agreements = _getAgreementsOperations(this._client);
    this.operationStatuses = _getOperationStatusesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for workspaces */
  public readonly workspaces: WorkspacesOperations;
  /** The operation groups for services */
  public readonly services: ServicesOperations;
  /** The operation groups for projects */
  public readonly projects: ProjectsOperations;
  /** The operation groups for jobs */
  public readonly jobs: JobsOperations;
  /** The operation groups for containerImages */
  public readonly containerImages: ContainerImagesOperations;
  /** The operation groups for computeConfigs */
  public readonly computeConfigs: ComputeConfigsOperations;
  /** The operation groups for cloudResources */
  public readonly cloudResources: CloudResourcesOperations;
  /** The operation groups for clouds */
  public readonly clouds: CloudsOperations;
  /** The operation groups for agreements */
  public readonly agreements: AgreementsOperations;
  /** The operation groups for operationStatuses */
  public readonly operationStatuses: OperationStatusesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
