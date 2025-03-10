import { OAuth2TokenCredential } from "../../auth/credentials.js";
import { AuthScheme, OAuth2Flow } from "../../auth/schemes.js";
import { PipelineRequest, PipelineResponse, SendRequest } from "../../interfaces.js";
import { PipelinePolicy } from "../../pipeline.js";

export const oauth2AuthenticationPolicyName = "oauth2AuthenticationPolicy";

export interface OAuth2AuthenticationPolicyOptions<TFlows extends OAuth2Flow> {
  credential: OAuth2TokenCredential<TFlows>;
  authSchemes?: AuthScheme[];
}

export function oauth2AuthenticationPolicy<TFlows extends OAuth2Flow>(
  options: OAuth2AuthenticationPolicyOptions<TFlows>,
): PipelinePolicy {
  return {
    name: oauth2AuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const scheme = (options.authSchemes ?? request.authSchemes)?.find((x) => x.type === "oauth2");

      if (!scheme) {
        return next(request);
      }

      const token = await options.credential.getToken(scheme.flows as TFlows[], {
        abortSignal: request.abortSignal,
      });
      request.headers.set("Authorization", `Bearer ${token}`);
      return next(request);
    },
  };
}
