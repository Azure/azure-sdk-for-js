// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ContainerRegistryManagementContext,
  ContainerRegistryManagementClientOptionalParams,
  createContainerRegistryManagement,
} from "./api/index.js";
import {
  ArchiveVersionsOperations,
  _getArchiveVersionsOperations,
} from "./classic/archiveVersions/index.js";
import { ArchivesOperations, _getArchivesOperations } from "./classic/archives/index.js";
import { CacheRulesOperations, _getCacheRulesOperations } from "./classic/cacheRules/index.js";
import {
  ConnectedRegistriesOperations,
  _getConnectedRegistriesOperations,
} from "./classic/connectedRegistries/index.js";
import {
  CredentialSetsOperations,
  _getCredentialSetsOperations,
} from "./classic/credentialSets/index.js";
import {
  ExportPipelinesOperations,
  _getExportPipelinesOperations,
} from "./classic/exportPipelines/index.js";
import {
  ImportPipelinesOperations,
  _getImportPipelinesOperations,
} from "./classic/importPipelines/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PipelineRunsOperations,
  _getPipelineRunsOperations,
} from "./classic/pipelineRuns/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import { RegistriesOperations, _getRegistriesOperations } from "./classic/registries/index.js";
import {
  ReplicationsOperations,
  _getReplicationsOperations,
} from "./classic/replications/index.js";
import { ScopeMapsOperations, _getScopeMapsOperations } from "./classic/scopeMaps/index.js";
import { TokensOperations, _getTokensOperations } from "./classic/tokens/index.js";
import { WebhooksOperations, _getWebhooksOperations } from "./classic/webhooks/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ContainerRegistryManagementClientOptionalParams } from "./api/containerRegistryManagementContext.js";

export class ContainerRegistryManagementClient {
  private _client: ContainerRegistryManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    options?: ContainerRegistryManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ContainerRegistryManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ContainerRegistryManagementClientOptionalParams,
    options?: ContainerRegistryManagementClientOptionalParams,
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
    this._client = createContainerRegistryManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.webhooks = _getWebhooksOperations(this._client);
    this.pipelineRuns = _getPipelineRunsOperations(this._client);
    this.importPipelines = _getImportPipelinesOperations(this._client);
    this.exportPipelines = _getExportPipelinesOperations(this._client);
    this.tokens = _getTokensOperations(this._client);
    this.scopeMaps = _getScopeMapsOperations(this._client);
    this.replications = _getReplicationsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.connectedRegistries = _getConnectedRegistriesOperations(this._client);
    this.credentialSets = _getCredentialSetsOperations(this._client);
    this.cacheRules = _getCacheRulesOperations(this._client);
    this.archiveVersions = _getArchiveVersionsOperations(this._client);
    this.archives = _getArchivesOperations(this._client);
    this.registries = _getRegistriesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for webhooks */
  public readonly webhooks: WebhooksOperations;
  /** The operation groups for pipelineRuns */
  public readonly pipelineRuns: PipelineRunsOperations;
  /** The operation groups for importPipelines */
  public readonly importPipelines: ImportPipelinesOperations;
  /** The operation groups for exportPipelines */
  public readonly exportPipelines: ExportPipelinesOperations;
  /** The operation groups for tokens */
  public readonly tokens: TokensOperations;
  /** The operation groups for scopeMaps */
  public readonly scopeMaps: ScopeMapsOperations;
  /** The operation groups for replications */
  public readonly replications: ReplicationsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for connectedRegistries */
  public readonly connectedRegistries: ConnectedRegistriesOperations;
  /** The operation groups for credentialSets */
  public readonly credentialSets: CredentialSetsOperations;
  /** The operation groups for cacheRules */
  public readonly cacheRules: CacheRulesOperations;
  /** The operation groups for archiveVersions */
  public readonly archiveVersions: ArchiveVersionsOperations;
  /** The operation groups for archives */
  public readonly archives: ArchivesOperations;
  /** The operation groups for registries */
  public readonly registries: RegistriesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
