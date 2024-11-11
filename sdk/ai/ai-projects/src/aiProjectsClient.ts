// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import createClient, { ProjectsClientOptions } from "./generated/src/projectsClient.js";
import { Client } from "@azure-rest/core-client";
import { AgentsOperations, getAgentsOperations } from "./agents/index.js";

export interface AIProjectsClientOptions extends ProjectsClientOptions{
}

export class AIProjectsClient {
  private _client: Client;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /*
   * @param endpointParam - The Azure AI Studio project endpoint, in the form `https://<azure-region>.api.azureml.ms` or `https://<private-link-guid>.<azure-region>.api.azureml.ms`, where <azure-region> is the Azure region where the project is deployed (e.g. westus) and <private-link-guid> is the GUID of the Enterprise private link.
   * @param subscriptionId - The Azure subscription ID.
   * @param resourceGroupName - The name of the Azure Resource Group.
   * @param projectName - The Azure AI Studio project name.
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
    this._client = createClient(
      endpointParam,
      subscriptionId,
      resourceGroupName,
      projectName,
      credential,
      options,
    );
    this.pipeline = this._client.pipeline;
    this.agents = getAgentsOperations(this._client);
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
}
