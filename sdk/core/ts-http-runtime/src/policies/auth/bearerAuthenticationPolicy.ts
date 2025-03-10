import { BearerTokenCredential } from "../../auth/credentials.js";
import { AuthScheme } from "../../auth/schemes.js";
import { PipelineRequest, PipelineResponse, SendRequest } from "../../interfaces.js";
import { PipelinePolicy } from "../../pipeline.js";

export const bearerAuthenticationPolicyName = "bearerAuthenticationPolicy";

export interface BearerAuthenticationPolicyOptions {
  credential: BearerTokenCredential;
  authSchemes?: AuthScheme[];
}

export function bearerAuthenticationPolicy(
  options: BearerAuthenticationPolicyOptions,
): PipelinePolicy {
  return {
    name: bearerAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const scheme = (options.authSchemes ?? request.authSchemes)?.find(
        (x) => x.type === "http" && x.scheme === "bearer",
      );

      if (!scheme) {
        return next(request);
      }

      const token = await options.credential.getToken({
        abortSignal: request.abortSignal,
      });
      request.headers.set("Authorization", `Bearer ${token}`);
      return next(request);
    },
  };
}
