// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeveloperHubServiceContext,
  DeveloperHubServiceClientOptionalParams,
  createDeveloperHubService,
} from "./api/index.js";
import {
  gitHubOAuth,
  listGitHubOAuth,
  gitHubOAuthCallback,
  generatePreviewArtifacts,
} from "./api/operations.js";
import {
  GitHubOAuthOptionalParams,
  ListGitHubOAuthOptionalParams,
  GitHubOAuthCallbackOptionalParams,
  GeneratePreviewArtifactsOptionalParams,
} from "./api/options.js";
import { AdooAuthOperations, _getAdooAuthOperations } from "./classic/adooAuth/index.js";
import {
  AdooAuthResponsesOperations,
  _getAdooAuthResponsesOperations,
} from "./classic/adooAuthResponses/index.js";
import { IacProfilesOperations, _getIacProfilesOperations } from "./classic/iacProfiles/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { TemplateOperations, _getTemplateOperations } from "./classic/template/index.js";
import {
  VersionedTemplateOperations,
  _getVersionedTemplateOperations,
} from "./classic/versionedTemplate/index.js";
import { WorkflowOperations, _getWorkflowOperations } from "./classic/workflow/index.js";
import {
  ArtifactGenerationProperties,
  GitHubOAuthResponse,
  GitHubOAuthInfoResponse,
} from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DeveloperHubServiceClientOptionalParams } from "./api/developerHubServiceContext.js";

export class DeveloperHubServiceClient {
  private _client: DeveloperHubServiceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: DeveloperHubServiceClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: DeveloperHubServiceClientOptionalParams,
  );
  /** The AKS Developer Hub Service Client */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | DeveloperHubServiceClientOptionalParams,
    options?: DeveloperHubServiceClientOptionalParams,
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
    this._client = createDeveloperHubService(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.versionedTemplate = _getVersionedTemplateOperations(this._client);
    this.template = _getTemplateOperations(this._client);
    this.adooAuth = _getAdooAuthOperations(this._client);
    this.workflow = _getWorkflowOperations(this._client);
    this.adooAuthResponses = _getAdooAuthResponsesOperations(this._client);
    this.iacProfiles = _getIacProfilesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Gets GitHubOAuth info used to authenticate users with the Developer Hub GitHub App. */
  gitHubOAuth(
    location: string,
    options: GitHubOAuthOptionalParams = { requestOptions: {} },
  ): Promise<GitHubOAuthInfoResponse> {
    return gitHubOAuth(this._client, location, options);
  }

  /** Callback URL to hit once authenticated with GitHub App to have the service store the OAuth token. */
  listGitHubOAuth(
    location: string,
    options: ListGitHubOAuthOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<GitHubOAuthResponse> {
    return listGitHubOAuth(this._client, location, options);
  }

  /** Callback URL to hit once authenticated with GitHub App to have the service store the OAuth token. */
  gitHubOAuthCallback(
    location: string,
    code: string,
    state: string,
    options: GitHubOAuthCallbackOptionalParams = { requestOptions: {} },
  ): Promise<GitHubOAuthResponse> {
    return gitHubOAuthCallback(this._client, location, code, state, options);
  }

  /** Generate preview dockerfile and manifests. */
  generatePreviewArtifacts(
    location: string,
    parameters: ArtifactGenerationProperties,
    options: GeneratePreviewArtifactsOptionalParams = { requestOptions: {} },
  ): Promise<Record<string, string>> {
    return generatePreviewArtifacts(this._client, location, parameters, options);
  }

  /** The operation groups for versionedTemplate */
  public readonly versionedTemplate: VersionedTemplateOperations;
  /** The operation groups for template */
  public readonly template: TemplateOperations;
  /** The operation groups for adooAuth */
  public readonly adooAuth: AdooAuthOperations;
  /** The operation groups for workflow */
  public readonly workflow: WorkflowOperations;
  /** The operation groups for adooAuthResponses */
  public readonly adooAuthResponses: AdooAuthResponsesOperations;
  /** The operation groups for iacProfiles */
  public readonly iacProfiles: IacProfilesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
