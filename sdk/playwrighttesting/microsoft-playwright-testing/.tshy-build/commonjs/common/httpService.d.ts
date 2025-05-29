import type { PipelineResponse, HttpMethods } from "@azure/core-rest-pipeline";
export declare class HttpService {
    callAPI(method: HttpMethods, url: string, data: any | null, token: string, contentType: string, correlationId: string): Promise<PipelineResponse>;
}
//# sourceMappingURL=httpService.d.ts.map