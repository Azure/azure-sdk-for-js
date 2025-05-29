import type { GitHubAccessTokenRequest, WorkspaceGitRepoManagementGetGitHubAccessTokenOptionalParams, WorkspaceGitRepoManagementGetGitHubAccessTokenResponse } from "../models/index.js";
/** Interface representing a WorkspaceGitRepoManagement. */
export interface WorkspaceGitRepoManagement {
    /**
     * Get the GitHub access token.
     * @param gitHubAccessTokenRequest - The GitHub access token request
     * @param options - The options parameters.
     */
    getGitHubAccessToken(gitHubAccessTokenRequest: GitHubAccessTokenRequest, options?: WorkspaceGitRepoManagementGetGitHubAccessTokenOptionalParams): Promise<WorkspaceGitRepoManagementGetGitHubAccessTokenResponse>;
}
//# sourceMappingURL=workspaceGitRepoManagement.d.ts.map