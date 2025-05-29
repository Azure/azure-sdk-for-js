import type { WorkspaceGitRepoManagement } from "../operationsInterfaces/index.js";
import type { ArtifactsClient } from "../artifactsClient.js";
import type { GitHubAccessTokenRequest, WorkspaceGitRepoManagementGetGitHubAccessTokenOptionalParams, WorkspaceGitRepoManagementGetGitHubAccessTokenResponse } from "../models/index.js";
/** Class containing WorkspaceGitRepoManagement operations. */
export declare class WorkspaceGitRepoManagementImpl implements WorkspaceGitRepoManagement {
    private readonly client;
    /**
     * Initialize a new instance of the class WorkspaceGitRepoManagement class.
     * @param client - Reference to the service client
     */
    constructor(client: ArtifactsClient);
    /**
     * Get the GitHub access token.
     * @param gitHubAccessTokenRequest - The GitHub access token request
     * @param options - The options parameters.
     */
    getGitHubAccessToken(gitHubAccessTokenRequest: GitHubAccessTokenRequest, options?: WorkspaceGitRepoManagementGetGitHubAccessTokenOptionalParams): Promise<WorkspaceGitRepoManagementGetGitHubAccessTokenResponse>;
}
//# sourceMappingURL=workspaceGitRepoManagement.d.ts.map