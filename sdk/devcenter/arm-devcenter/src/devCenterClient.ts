// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext, DevCenterClientOptionalParams } from "./api/index.js";
import { createDevCenter } from "./api/index.js";
import type { AttachedNetworksOperations } from "./classic/attachedNetworks/index.js";
import { _getAttachedNetworksOperations } from "./classic/attachedNetworks/index.js";
import type { CatalogsOperations } from "./classic/catalogs/index.js";
import { _getCatalogsOperations } from "./classic/catalogs/index.js";
import type { CheckNameAvailabilityOperations } from "./classic/checkNameAvailability/index.js";
import { _getCheckNameAvailabilityOperations } from "./classic/checkNameAvailability/index.js";
import type { CheckScopedNameAvailabilityOperations } from "./classic/checkScopedNameAvailability/index.js";
import { _getCheckScopedNameAvailabilityOperations } from "./classic/checkScopedNameAvailability/index.js";
import type { CustomizationTasksOperations } from "./classic/customizationTasks/index.js";
import { _getCustomizationTasksOperations } from "./classic/customizationTasks/index.js";
import type { DevBoxDefinitionsOperations } from "./classic/devBoxDefinitions/index.js";
import { _getDevBoxDefinitionsOperations } from "./classic/devBoxDefinitions/index.js";
import type { DevCenterCatalogImageDefinitionBuildOperations } from "./classic/devCenterCatalogImageDefinitionBuild/index.js";
import { _getDevCenterCatalogImageDefinitionBuildOperations } from "./classic/devCenterCatalogImageDefinitionBuild/index.js";
import type { DevCenterCatalogImageDefinitionBuildsOperations } from "./classic/devCenterCatalogImageDefinitionBuilds/index.js";
import { _getDevCenterCatalogImageDefinitionBuildsOperations } from "./classic/devCenterCatalogImageDefinitionBuilds/index.js";
import type { DevCenterCatalogImageDefinitionsOperations } from "./classic/devCenterCatalogImageDefinitions/index.js";
import { _getDevCenterCatalogImageDefinitionsOperations } from "./classic/devCenterCatalogImageDefinitions/index.js";
import type { DevCentersOperations } from "./classic/devCenters/index.js";
import { _getDevCentersOperations } from "./classic/devCenters/index.js";
import type { EncryptionSetsOperations } from "./classic/encryptionSets/index.js";
import { _getEncryptionSetsOperations } from "./classic/encryptionSets/index.js";
import type { EnvironmentDefinitionsOperations } from "./classic/environmentDefinitions/index.js";
import { _getEnvironmentDefinitionsOperations } from "./classic/environmentDefinitions/index.js";
import type { EnvironmentTypesOperations } from "./classic/environmentTypes/index.js";
import { _getEnvironmentTypesOperations } from "./classic/environmentTypes/index.js";
import type { GalleriesOperations } from "./classic/galleries/index.js";
import { _getGalleriesOperations } from "./classic/galleries/index.js";
import type { ImageVersionsOperations } from "./classic/imageVersions/index.js";
import { _getImageVersionsOperations } from "./classic/imageVersions/index.js";
import type { ImagesOperations } from "./classic/images/index.js";
import { _getImagesOperations } from "./classic/images/index.js";
import type { NetworkConnectionsOperations } from "./classic/networkConnections/index.js";
import { _getNetworkConnectionsOperations } from "./classic/networkConnections/index.js";
import type { OperationStatusesOperations } from "./classic/operationStatuses/index.js";
import { _getOperationStatusesOperations } from "./classic/operationStatuses/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PoolsOperations } from "./classic/pools/index.js";
import { _getPoolsOperations } from "./classic/pools/index.js";
import type { ProjectAllowedEnvironmentTypesOperations } from "./classic/projectAllowedEnvironmentTypes/index.js";
import { _getProjectAllowedEnvironmentTypesOperations } from "./classic/projectAllowedEnvironmentTypes/index.js";
import type { ProjectCatalogEnvironmentDefinitionsOperations } from "./classic/projectCatalogEnvironmentDefinitions/index.js";
import { _getProjectCatalogEnvironmentDefinitionsOperations } from "./classic/projectCatalogEnvironmentDefinitions/index.js";
import type { ProjectCatalogImageDefinitionBuildOperations } from "./classic/projectCatalogImageDefinitionBuild/index.js";
import { _getProjectCatalogImageDefinitionBuildOperations } from "./classic/projectCatalogImageDefinitionBuild/index.js";
import type { ProjectCatalogImageDefinitionBuildsOperations } from "./classic/projectCatalogImageDefinitionBuilds/index.js";
import { _getProjectCatalogImageDefinitionBuildsOperations } from "./classic/projectCatalogImageDefinitionBuilds/index.js";
import type { ProjectCatalogImageDefinitionsOperations } from "./classic/projectCatalogImageDefinitions/index.js";
import { _getProjectCatalogImageDefinitionsOperations } from "./classic/projectCatalogImageDefinitions/index.js";
import type { ProjectCatalogsOperations } from "./classic/projectCatalogs/index.js";
import { _getProjectCatalogsOperations } from "./classic/projectCatalogs/index.js";
import type { ProjectEnvironmentTypesOperations } from "./classic/projectEnvironmentTypes/index.js";
import { _getProjectEnvironmentTypesOperations } from "./classic/projectEnvironmentTypes/index.js";
import type { ProjectPoliciesOperations } from "./classic/projectPolicies/index.js";
import { _getProjectPoliciesOperations } from "./classic/projectPolicies/index.js";
import type { ProjectsOperations } from "./classic/projects/index.js";
import { _getProjectsOperations } from "./classic/projects/index.js";
import type { SchedulesOperations } from "./classic/schedules/index.js";
import { _getSchedulesOperations } from "./classic/schedules/index.js";
import type { SkusOperations } from "./classic/skus/index.js";
import { _getSkusOperations } from "./classic/skus/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { DevCenterClientOptionalParams } from "./api/devCenterContext.js";

export class DevCenterClient {
  private _client: DevCenterContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** DevCenter Management API */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DevCenterClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDevCenter(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.checkScopedNameAvailability = _getCheckScopedNameAvailabilityOperations(this._client);
    this.checkNameAvailability = _getCheckNameAvailabilityOperations(this._client);
    this.usages = _getUsagesOperations(this._client);
    this.operationStatuses = _getOperationStatusesOperations(this._client);
    this.projectCatalogImageDefinitionBuilds = _getProjectCatalogImageDefinitionBuildsOperations(
      this._client,
    );
    this.devCenterCatalogImageDefinitionBuilds =
      _getDevCenterCatalogImageDefinitionBuildsOperations(this._client);
    this.devCenterCatalogImageDefinitionBuild = _getDevCenterCatalogImageDefinitionBuildOperations(
      this._client,
    );
    this.devCenterCatalogImageDefinitions = _getDevCenterCatalogImageDefinitionsOperations(
      this._client,
    );
    this.projectAllowedEnvironmentTypes = _getProjectAllowedEnvironmentTypesOperations(
      this._client,
    );
    this.projectCatalogEnvironmentDefinitions = _getProjectCatalogEnvironmentDefinitionsOperations(
      this._client,
    );
    this.projectCatalogs = _getProjectCatalogsOperations(this._client);
    this.skus = _getSkusOperations(this._client);
    this.encryptionSets = _getEncryptionSetsOperations(this._client);
    this.networkConnections = _getNetworkConnectionsOperations(this._client);
    this.schedules = _getSchedulesOperations(this._client);
    this.pools = _getPoolsOperations(this._client);
    this.projectCatalogImageDefinitionBuild = _getProjectCatalogImageDefinitionBuildOperations(
      this._client,
    );
    this.projectCatalogImageDefinitions = _getProjectCatalogImageDefinitionsOperations(
      this._client,
    );
    this.customizationTasks = _getCustomizationTasksOperations(this._client);
    this.devBoxDefinitions = _getDevBoxDefinitionsOperations(this._client);
    this.projectEnvironmentTypes = _getProjectEnvironmentTypesOperations(this._client);
    this.environmentTypes = _getEnvironmentTypesOperations(this._client);
    this.imageVersions = _getImageVersionsOperations(this._client);
    this.galleries = _getGalleriesOperations(this._client);
    this.environmentDefinitions = _getEnvironmentDefinitionsOperations(this._client);
    this.catalogs = _getCatalogsOperations(this._client);
    this.attachedNetworks = _getAttachedNetworksOperations(this._client);
    this.projects = _getProjectsOperations(this._client);
    this.projectPolicies = _getProjectPoliciesOperations(this._client);
    this.devCenters = _getDevCentersOperations(this._client);
    this.images = _getImagesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for checkScopedNameAvailability */
  public readonly checkScopedNameAvailability: CheckScopedNameAvailabilityOperations;
  /** The operation groups for checkNameAvailability */
  public readonly checkNameAvailability: CheckNameAvailabilityOperations;
  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for operationStatuses */
  public readonly operationStatuses: OperationStatusesOperations;
  /** The operation groups for projectCatalogImageDefinitionBuilds */
  public readonly projectCatalogImageDefinitionBuilds: ProjectCatalogImageDefinitionBuildsOperations;
  /** The operation groups for devCenterCatalogImageDefinitionBuilds */
  public readonly devCenterCatalogImageDefinitionBuilds: DevCenterCatalogImageDefinitionBuildsOperations;
  /** The operation groups for devCenterCatalogImageDefinitionBuild */
  public readonly devCenterCatalogImageDefinitionBuild: DevCenterCatalogImageDefinitionBuildOperations;
  /** The operation groups for devCenterCatalogImageDefinitions */
  public readonly devCenterCatalogImageDefinitions: DevCenterCatalogImageDefinitionsOperations;
  /** The operation groups for projectAllowedEnvironmentTypes */
  public readonly projectAllowedEnvironmentTypes: ProjectAllowedEnvironmentTypesOperations;
  /** The operation groups for projectCatalogEnvironmentDefinitions */
  public readonly projectCatalogEnvironmentDefinitions: ProjectCatalogEnvironmentDefinitionsOperations;
  /** The operation groups for projectCatalogs */
  public readonly projectCatalogs: ProjectCatalogsOperations;
  /** The operation groups for skus */
  public readonly skus: SkusOperations;
  /** The operation groups for encryptionSets */
  public readonly encryptionSets: EncryptionSetsOperations;
  /** The operation groups for networkConnections */
  public readonly networkConnections: NetworkConnectionsOperations;
  /** The operation groups for schedules */
  public readonly schedules: SchedulesOperations;
  /** The operation groups for pools */
  public readonly pools: PoolsOperations;
  /** The operation groups for projectCatalogImageDefinitionBuild */
  public readonly projectCatalogImageDefinitionBuild: ProjectCatalogImageDefinitionBuildOperations;
  /** The operation groups for projectCatalogImageDefinitions */
  public readonly projectCatalogImageDefinitions: ProjectCatalogImageDefinitionsOperations;
  /** The operation groups for customizationTasks */
  public readonly customizationTasks: CustomizationTasksOperations;
  /** The operation groups for devBoxDefinitions */
  public readonly devBoxDefinitions: DevBoxDefinitionsOperations;
  /** The operation groups for projectEnvironmentTypes */
  public readonly projectEnvironmentTypes: ProjectEnvironmentTypesOperations;
  /** The operation groups for environmentTypes */
  public readonly environmentTypes: EnvironmentTypesOperations;
  /** The operation groups for imageVersions */
  public readonly imageVersions: ImageVersionsOperations;
  /** The operation groups for galleries */
  public readonly galleries: GalleriesOperations;
  /** The operation groups for environmentDefinitions */
  public readonly environmentDefinitions: EnvironmentDefinitionsOperations;
  /** The operation groups for catalogs */
  public readonly catalogs: CatalogsOperations;
  /** The operation groups for attachedNetworks */
  public readonly attachedNetworks: AttachedNetworksOperations;
  /** The operation groups for projects */
  public readonly projects: ProjectsOperations;
  /** The operation groups for projectPolicies */
  public readonly projectPolicies: ProjectPoliciesOperations;
  /** The operation groups for devCenters */
  public readonly devCenters: DevCentersOperations;
  /** The operation groups for images */
  public readonly images: ImagesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
