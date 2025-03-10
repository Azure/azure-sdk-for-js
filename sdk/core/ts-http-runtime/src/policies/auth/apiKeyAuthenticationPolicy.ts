import { ApiKeyCredential } from "../../auth/credentials.js";
import { AuthScheme } from "../../auth/schemes.js";
import { PipelineRequest, PipelineResponse, SendRequest } from "../../interfaces.js";
import { PipelinePolicy } from "../../pipeline.js";

export const apiKeyAuthenticationPolicyName = "apiKeyAuthenticationPolicy";

export interface ApiKeyAuthenticationPolicyOptions {
  credential: ApiKeyCredential;
  authSchemes?: AuthScheme[];
}

export function apiKeyAuthenticationPolicy(
  options: ApiKeyAuthenticationPolicyOptions,
): PipelinePolicy {
  return {
    name: apiKeyAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const scheme = (options.authSchemes ?? request.authSchemes)?.find((x) => x.type === "apiKey");

      if (!scheme) {
        return next(request);
      }

      if (scheme.apiKeyLocation !== "header") {
        throw new Error(`Unsupported API key location: ${scheme.apiKeyLocation}`);
      }

      request.headers.set(scheme.name, options.credential.key);
      return next(request);
    },
  };
}
