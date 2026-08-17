// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Pipeline } from "@azure/core-rest-pipeline";
import {
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
} from "@azure/core-rest-pipeline";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";

import type { ClientOptions } from "./common.js";
import { apiVersionPolicy } from "./apiVersionPolicy.js";
import { keyCredentialAuthenticationPolicy } from "./keyCredentialAuthenticationPolicy.js";

/**
 * Optional parameters for adding a credential policy to the pipeline.
 */
export interface AddCredentialPipelinePolicyOptions {
  /**
   * Options related to the client.
   */
  clientOptions?: ClientOptions;
  /**
   * The credential to use.
   */
  credential?: TokenCredential | KeyCredential;
}

/**
 * Adds a credential policy to the pipeline if a credential is provided. If none is provided, no policy is added.
 */
export function addCredentialPipelinePolicy(
  pipeline: Pipeline,
  endpoint: string,
  options: AddCredentialPipelinePolicyOptions = {},
): void {
  const { credential, clientOptions } = options;
  if (!credential) {
    return;
  }

  if (isTokenCredential(credential)) {
    const compatibilityOptions = clientOptions as
      (ClientOptions & { credentialScopes?: string | string[] }) | undefined;
    const credentialScopes =
      clientOptions?.credentials?.scopes ??
      normalizeCredentialScopes(compatibilityOptions?.credentialScopes) ??
      `${endpoint}/.default`;
    const tokenPolicy = bearerTokenAuthenticationPolicy({
      credential,
      scopes: credentialScopes,
    });
    pipeline.addPolicy(tokenPolicy);
  } else if (isKeyCredential(credential)) {
    if (!clientOptions?.credentials?.apiKeyHeaderName) {
      throw new Error(`Missing API Key Header Name`);
    }
    const keyPolicy = keyCredentialAuthenticationPolicy(
      credential,
      clientOptions?.credentials?.apiKeyHeaderName,
    );
    pipeline.addPolicy(keyPolicy);
  }
}

/**
 * Creates a default rest pipeline to re-use accross Rest Level Clients
 */
export function createDefaultPipeline(
  endpoint: string,
  credential?: TokenCredential | KeyCredential,
  options: ClientOptions = {},
): Pipeline {
  const pipeline = createPipelineFromOptions(options);

  pipeline.addPolicy(apiVersionPolicy(options));

  addCredentialPipelinePolicy(pipeline, endpoint, { credential, clientOptions: options });
  return pipeline;
}

function normalizeCredentialScopes(scopes?: string | string[]): string[] | undefined {
  return typeof scopes === "string" ? [scopes] : scopes;
}

function isKeyCredential(credential: unknown): credential is KeyCredential {
  return (
    typeof credential === "object" &&
    credential !== null &&
    "key" in credential &&
    typeof credential.key === "string"
  );
}
