// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Client } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";
import type { AgentsOperations } from "./agents/index.js";
import { getAgentsOperations } from "./agents/index.js";
import type { ConnectionsOperations } from "./connections/index.js";
import { getConnectionsOperations } from "./connections/index.js";
import type { EvaluationsOperations } from "./evaluations/index.js";
import { getEvaluationsOperations } from "./evaluations/index.js";
import type { ProjectsClientOptions } from "./generated/src/projectsClient.js";
import createClient from "./generated/src/projectsClient.js";
import type { TelemetryOperations } from "./telemetry/index.js";
import { getTelemetryOperations } from "./telemetry/index.js";

/**
 * The options for the AIProjectsClient
 */
export interface AIProjectsClientOptions extends ProjectsClientOptions {}

/**
 * The Azure AI Projects client
 */
export class AIProjectsClient {
  private _client: Client;
  private _connectionClient: Client;
  private _evaluationsClient: Client;
  private _telemetryClient: Client;

  /*
   * @param endpointParam - The Azure AI Foundry project endpoint, in the form `https://<azure-region>.api.azureml.ms` or `https://<private-link-guid>.<azure-region>.api.azureml.ms`, where <azure-region> is the Azure region where the project is deployed (e.g. westus) and <private-link-guid> is the GUID of the Enterprise private link.
   * @param subscriptionId - The Azure subscription ID.
   * @param resourceGroupName - The name of the Azure Resource Group.
   * @param projectName - The Azure AI Foundry project name.
   * @param options - the parameter for all optional parameters
   */
  constructor(
    endpointParam: string,
    subscriptionId: string,
    resourceGroupName: string,
    projectName: string,
    credential: TokenCredential,
    options: AIProjectsClientOptions = {},
  ) {
    const connectionEndPoint = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/${projectName}`;
    this._client = createClient(
      endpointParam,
      subscriptionId,
      resourceGroupName,
      projectName,
      credential,
      options,
    );

    this._connectionClient = createClient(
      endpointParam,
      subscriptionId,
      resourceGroupName,
      projectName,
      credential,
      { ...options, endpoint: connectionEndPoint },
    );

    const evaluationsEndpoint = `${endpointParam}/raisvc/v1.0/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/${projectName}`
    this._evaluationsClient = createClient(endpointParam, subscriptionId, resourceGroupName, projectName, credential, { ...options, apiVersion: "2024-07-01-preview", endpoint: evaluationsEndpoint, credentials: { scopes: ["https://ml.azure.com/.default"] } });

    this._telemetryClient = createClient(
      endpointParam,
      subscriptionId,
      resourceGroupName,
      projectName,
      credential,
      { ...options, apiVersion: "2020-02-02", endpoint: "https://management.azure.com" },
    );

    this.agents = getAgentsOperations(this._client);
    this.connections = getConnectionsOperations(this._connectionClient);
    this.evaluations = getEvaluationsOperations(this._evaluationsClient);
    this.telemetry = getTelemetryOperations(this._telemetryClient, this.connections);
    this.scope = {
      "subscription_id": subscriptionId,
      "resource_group_name": resourceGroupName,
      "project_name": projectName,
    };
  }

  /**
   * Creates a new instance of AzureAIProjectsClient
   * @param connectionString - Connection string with the endpoint, subscriptionId, resourceGroupName, and projectName
   * @param credential - The credential to use
   * @param options - The parameter for all optional parameters
   */
  static fromConnectionString(
    connectionString: string,
    credential: TokenCredential,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options: AIProjectsClientOptions = {},
  ): AIProjectsClient {
    const { endpointParam, subscriptionId, resourceGroupName, projectName } =
      AIProjectsClient.praseConnectionString(connectionString);
    return new AIProjectsClient(
      endpointParam,
      subscriptionId,
      resourceGroupName,
      projectName,
      credential,
      options,
    );
  }

  private static praseConnectionString(connectionString: string): {
    endpointParam: string;
    subscriptionId: string;
    resourceGroupName: string;
    projectName: string;
  } {
    const parts = connectionString.split(";");
    return {
      endpointParam: `https://${parts[0]}`,
      subscriptionId: parts[1],
      resourceGroupName: parts[2],
      projectName: parts[3],
    };
  }

  /** The operation groups for Agents */
  public readonly agents: AgentsOperations;

  /** The operation groups for connections */
  public readonly connections: ConnectionsOperations;

  /** The operation groups for evaluations */
  public readonly evaluations: EvaluationsOperations;

  /** The operation groups for telemetry */
  public readonly telemetry: TelemetryOperations;

  public readonly scope: {
    "subscription_id": string;
    "resource_group_name": string;
    "project_name": string;
  };
}
