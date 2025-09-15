// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ContainerRegistryManagementContext,
  ContainerRegistryManagementClientOptionalParams,
} from "./api/index.js";
import { createContainerRegistryManagement } from "./api/index.js";
import type { ArchiveVersionsOperations } from "./classic/archiveVersions/index.js";
import { _getArchiveVersionsOperations } from "./classic/archiveVersions/index.js";
import type { ArchivesOperations } from "./classic/archives/index.js";
import { _getArchivesOperations } from "./classic/archives/index.js";
import type { CacheRulesOperations } from "./classic/cacheRules/index.js";
import { _getCacheRulesOperations } from "./classic/cacheRules/index.js";
import type { ConnectedRegistriesOperations } from "./classic/connectedRegistries/index.js";
import { _getConnectedRegistriesOperations } from "./classic/connectedRegistries/index.js";
import type { CredentialSetsOperations } from "./classic/credentialSets/index.js";
import { _getCredentialSetsOperations } from "./classic/credentialSets/index.js";
import type { ExportPipelinesOperations } from "./classic/exportPipelines/index.js";
import { _getExportPipelinesOperations } from "./classic/exportPipelines/index.js";
import type { ImportPipelinesOperations } from "./classic/importPipelines/index.js";
import { _getImportPipelinesOperations } from "./classic/importPipelines/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PipelineRunsOperations } from "./classic/pipelineRuns/index.js";
import { _getPipelineRunsOperations } from "./classic/pipelineRuns/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { RegistriesOperations } from "./classic/registries/index.js";
import { _getRegistriesOperations } from "./classic/registries/index.js";
import type { ReplicationsOperations } from "./classic/replications/index.js";
import { _getReplicationsOperations } from "./classic/replications/index.js";
import type { ScopeMapsOperations } from "./classic/scopeMaps/index.js";
import { _getScopeMapsOperations } from "./classic/scopeMaps/index.js";
import type { TokensOperations } from "./classic/tokens/index.js";
import { _getTokensOperations } from "./classic/tokens/index.js";
import type { WebhooksOperations } from "./classic/webhooks/index.js";
import { _getWebhooksOperations } from "./classic/webhooks/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ContainerRegistryManagementClientOptionalParams } from "./api/containerRegistryManagementContext.js";

export class ContainerRegistryManagementClient {
  private _client: ContainerRegistryManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Microsoft Azure Container Registry management API provides create, read, update, and delete functionality for Azure Container Registry resources including registries, replications, webhooks, tasks, runs, and other registry components. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ContainerRegistryManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createContainerRegistryManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.webhooks = _getWebhooksOperations(this._client);
    this.tokens = _getTokensOperations(this._client);
    this.scopeMaps = _getScopeMapsOperations(this._client);
    this.replications = _getReplicationsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.pipelineRuns = _getPipelineRunsOperations(this._client);
    this.importPipelines = _getImportPipelinesOperations(this._client);
    this.exportPipelines = _getExportPipelinesOperations(this._client);
    this.credentialSets = _getCredentialSetsOperations(this._client);
    this.connectedRegistries = _getConnectedRegistriesOperations(this._client);
    this.cacheRules = _getCacheRulesOperations(this._client);
    this.archiveVersions = _getArchiveVersionsOperations(this._client);
    this.registries = _getRegistriesOperations(this._client);
    this.archives = _getArchivesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for webhooks */
  public readonly webhooks: WebhooksOperations;
  /** The operation groups for tokens */
  public readonly tokens: TokensOperations;
  /** The operation groups for scopeMaps */
  public readonly scopeMaps: ScopeMapsOperations;
  /** The operation groups for replications */
  public readonly replications: ReplicationsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for pipelineRuns */
  public readonly pipelineRuns: PipelineRunsOperations;
  /** The operation groups for importPipelines */
  public readonly importPipelines: ImportPipelinesOperations;
  /** The operation groups for exportPipelines */
  public readonly exportPipelines: ExportPipelinesOperations;
  /** The operation groups for credentialSets */
  public readonly credentialSets: CredentialSetsOperations;
  /** The operation groups for connectedRegistries */
  public readonly connectedRegistries: ConnectedRegistriesOperations;
  /** The operation groups for cacheRules */
  public readonly cacheRules: CacheRulesOperations;
  /** The operation groups for archiveVersions */
  public readonly archiveVersions: ArchiveVersionsOperations;
  /** The operation groups for registries */
  public readonly registries: RegistriesOperations;
  /** The operation groups for archives */
  public readonly archives: ArchivesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
