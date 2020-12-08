import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import {
  GitHubAccessTokenRequest,
  WorkspaceGitRepoManagementGetGitHubAccessTokenOptionalParams,
  WorkspaceGitRepoManagementGetGitHubAccessTokenResponse
} from "../models";

/**
 * Class representing a WorkspaceGitRepoManagement.
 */
export class WorkspaceGitRepoManagement {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class WorkspaceGitRepoManagement class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * Get the GitHub access token.
   * @param gitHubAccessTokenRequest
   * @param options The options parameters.
   */
  getGitHubAccessToken(
    gitHubAccessTokenRequest: GitHubAccessTokenRequest,
    options?: WorkspaceGitRepoManagementGetGitHubAccessTokenOptionalParams
  ): Promise<WorkspaceGitRepoManagementGetGitHubAccessTokenResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      gitHubAccessTokenRequest,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getGitHubAccessTokenOperationSpec
    ) as Promise<WorkspaceGitRepoManagementGetGitHubAccessTokenResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getGitHubAccessTokenOperationSpec: coreHttp.OperationSpec = {
  path: "/getGitHubAccessToken",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.GitHubAccessTokenResponse
    }
  },
  requestBody: Parameters.gitHubAccessTokenRequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.clientRequestId
  ],
  mediaType: "json",
  serializer
};
