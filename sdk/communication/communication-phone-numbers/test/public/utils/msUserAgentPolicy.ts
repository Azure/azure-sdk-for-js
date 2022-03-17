import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { env } from "@azure-tools/test-recorder";

export function createMSUserAgentPolicy(): PipelinePolicy {
  return {
    name: "msUserAgentPolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      let useragent = env.AZURE_USERAGENT_OVERRIDE;
      if (useragent){
        request.headers.set("x-ms-useragent", useragent);
      }

      return await next(request);
    },
  };
}
