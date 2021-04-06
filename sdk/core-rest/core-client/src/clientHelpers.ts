import {
  createPipelineFromOptions,
  bearerTokenAuthenticationPolicy,
  Pipeline,
  createDefaultHttpClient,
  HttpClient,
  PipelinePolicy,
  PipelineRequest,
  SendRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";
import { TokenCredential, KeyCredential, isTokenCredential } from "@azure/core-auth";
import { ClientOptions } from "./common";

let cachedHttpsClient: HttpClient | undefined;
const API_KEY_HEADER_NAME = "Ocp-Apim-Subscription-Key";

/**
 * Creates a default rest pipeline to re-use accross Rest Level Clients
 */
export function createDefaultPipeline(
  baseUrl: string,
  credential?: TokenCredential | KeyCredential,
  options: ClientOptions = {}
): Pipeline {
  const pipeline = createPipelineFromOptions(options);

  if (credential) {
    const credentialPolicy = isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy({
          credential,
          scopes: options.credentials?.scopes || `${baseUrl}/.default`,
        })
      : keyCredentialAuthenticationPolicy(
          credential,
          options.credentials?.apiKeyHeaderName || API_KEY_HEADER_NAME
        );

    pipeline.addPolicy(credentialPolicy);
  }

  return pipeline;
}

export function getCachedDefaultHttpsClient(): HttpClient {
  if (!cachedHttpsClient) {
    cachedHttpsClient = createDefaultHttpClient();
  }

  return cachedHttpsClient;
}

/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
export const keyCredentialAuthenticationPolicyName = "keyCredentialAuthenticationPolicy";

export function keyCredentialAuthenticationPolicy(
  credential: KeyCredential,
  apiKeyHeaderName: string
): PipelinePolicy {
  return {
    name: keyCredentialAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      request.headers.set(apiKeyHeaderName, credential.key);
      return next(request);
    },
  };
}
