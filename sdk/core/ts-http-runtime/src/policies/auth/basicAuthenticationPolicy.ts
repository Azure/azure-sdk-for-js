import { BasicCredential } from "../../auth/credentials.js";
import { AuthScheme } from "../../auth/schemes.js";
import { PipelineRequest, PipelineResponse, SendRequest } from "../../interfaces.js";
import { PipelinePolicy } from "../../pipeline.js";
import { stringToUint8Array, uint8ArrayToString } from "../../util/bytesEncoding.js";

export const basicAuthenticationPolicyName = "bearerAuthenticationPolicy";

export interface BasicAuthenticationPolicyOptions {
  credential: BasicCredential;
  authSchemes?: AuthScheme[];
}

export function basicAuthenticationPolicy(
  options: BasicAuthenticationPolicyOptions,
): PipelinePolicy {
  return {
    name: basicAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const scheme = (options.authSchemes ?? request.authSchemes)?.find(
        (x) => x.type === "http" && x.scheme === "basic",
      );

      if (!scheme) {
        return next(request);
      }

      const { username, password } = options.credential;
      const headerValue = uint8ArrayToString(
        stringToUint8Array(`${username}:${password}`, "utf-8"),
        "base64",
      );
      request.headers.set("Authorization", `Basic ${headerValue}`);
      return next(request);
    },
  };
}
