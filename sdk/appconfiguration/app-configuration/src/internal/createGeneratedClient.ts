// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import { bearerTokenAuthenticationPolicyName } from "@azure/core-rest-pipeline";
import type { AppConfigurationClientOptions } from "../models.js";
import {
  AppConfigurationClient as GeneratedAppConfigurationClient,
  type AppConfigurationClientOptionalParams as GeneratedAppConfigurationClientOptionalParams,
} from "../generated/appConfigurationClient.js";
import { appConfigKeyCredentialPolicy } from "../appConfigCredential.js";
import { audienceErrorHandlingPolicy } from "./audienceErrorHandlingPolicy.js";
import { SyncTokens, syncTokenPolicy } from "./syncTokenPolicy.js";
import { queryParamPolicy } from "./queryParamPolicy.js";
import { emptyBodyPolicy } from "./emptyBodyPolicy.js";
import { getScope } from "./helpers.js";
import { logger } from "../logger.js";
import { appConfigurationApiVersion, packageVersion } from "./constants.js";

const ConnectionStringRegex = /Endpoint=(.*);Id=(.*);Secret=(.*)/;

/**
 * Provides internal configuration options for the App Configuration clients.
 * @internal
 */
export interface InternalAppConfigurationClientOptions extends AppConfigurationClientOptions {
  /**
   * The sync token cache to use for this client.
   * NOTE: this is an internal option, not for general client usage.
   */
  syncTokens?: SyncTokens;
}

/**
 * The configured generated client along with the sync token cache it uses.
 * @internal
 */
export interface ConfiguredGeneratedClient {
  /** The configured generated client. */
  client: GeneratedAppConfigurationClient;
  /** The sync token cache shared with the pipeline. */
  syncTokens: SyncTokens;
}

/**
 * Builds and configures the generated App Configuration client, applying the
 * shared authentication and sync-token pipeline policies. This is used by both
 * `AppConfigurationClient` and `FeatureFlagClient` so they share identical
 * construction and authentication behavior.
 *
 * @internal
 */
export function createConfiguredGeneratedClient(
  connectionStringOrEndpoint: string,
  tokenCredentialOrOptions?: TokenCredential | AppConfigurationClientOptions,
  options?: AppConfigurationClientOptions,
): ConfiguredGeneratedClient {
  let appConfigOptions: InternalAppConfigurationClientOptions = {};
  let appConfigCredential: TokenCredential | undefined = undefined;
  let appConfigEndpoint: string;
  let authPolicy: PipelinePolicy | undefined;
  let authPolicyName: string;
  let scope: [string] | undefined;

  if (isTokenCredential(tokenCredentialOrOptions)) {
    appConfigOptions = (options as InternalAppConfigurationClientOptions) || {};
    appConfigCredential = tokenCredentialOrOptions;
    appConfigEndpoint = connectionStringOrEndpoint.endsWith("/")
      ? connectionStringOrEndpoint.slice(0, -1)
      : connectionStringOrEndpoint;
    scope = [getScope(appConfigEndpoint, appConfigOptions.audience)];
    authPolicyName = bearerTokenAuthenticationPolicyName;
  } else {
    appConfigOptions = (tokenCredentialOrOptions as InternalAppConfigurationClientOptions) || {};
    const regexMatch = connectionStringOrEndpoint?.match(ConnectionStringRegex);
    if (regexMatch) {
      appConfigEndpoint = regexMatch[1];
      authPolicy = appConfigKeyCredentialPolicy(regexMatch[2], regexMatch[3]);
      authPolicyName = authPolicy.name;
    } else {
      throw new Error(
        `Invalid connection string. Valid connection strings should match the regex '${ConnectionStringRegex.source}'.` +
          ` To mitigate the issue, please refer to the troubleshooting guide here at https://aka.ms/azsdk/js/app-configuration/troubleshoot.`,
      );
    }
  }

  const generatedClientOptions: GeneratedAppConfigurationClientOptionalParams = {
    ...appConfigOptions,
    userAgentOptions: {
      ...appConfigOptions.userAgentOptions,
      userAgentPrefix: `azsdk-js-app-configuration/${packageVersion}${
        appConfigOptions.userAgentOptions?.userAgentPrefix
          ? ` ${appConfigOptions.userAgentOptions.userAgentPrefix}`
          : ""
      }`,
    },
    loggingOptions: {
      logger: logger.info,
    },
    apiVersion: options?.apiVersion ?? appConfigurationApiVersion,
    credentials: {},
  };

  generatedClientOptions.credentials = {
    ...generatedClientOptions.credentials,
    scopes: scope,
  };

  const syncTokens = appConfigOptions.syncTokens || new SyncTokens();
  const client = new GeneratedAppConfigurationClient(
    appConfigEndpoint,
    // When a connection string is used, appConfigCredential is undefined here. We pass undefined to avoid @azure-rest/core-client's keyCredentialAuthenticationPolicy setting the apiKeyHeader on the request.
    // Connection strings are authenticated by HMAC (appConfigKeyCredentialPolicy) and the secret should never leave the client.
    // The `as TokenCredential` cast bridges a gap between the generated client and the core SDK: the generated constructor types `credential` as required (KeyCredential | TokenCredential),
    // but @azure-rest/core-client's addCredentialPipelinePolicy no-ops when no credential is passed, so handing it undefined is safe at runtime.
    appConfigCredential as TokenCredential,
    generatedClientOptions,
  );
  client.pipeline.addPolicy(audienceErrorHandlingPolicy(appConfigOptions?.audience !== undefined), {
    phase: "Sign",
    beforePolicies: [authPolicyName],
  });
  if (authPolicy) {
    client.pipeline.addPolicy(authPolicy, { phase: "Sign" });
  }

  client.pipeline.addPolicy(queryParamPolicy());
  client.pipeline.addPolicy(emptyBodyPolicy());
  client.pipeline.addPolicy(syncTokenPolicy(syncTokens), { afterPhase: "Retry" });

  return { client, syncTokens };
}
