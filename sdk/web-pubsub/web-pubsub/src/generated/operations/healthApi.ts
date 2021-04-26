import * as coreHttp from "@azure/core-http";
import * as Parameters from "../models/parameters";
import { AzureWebPubSubServiceRestAPIContext } from "../azureWebPubSubServiceRestAPIContext";

/** Class representing a HealthApi. */
export class HealthApi {
  private readonly client: AzureWebPubSubServiceRestAPIContext;

  /**
   * Initialize a new instance of the class HealthApi class.
   * @param client Reference to the service client
   */
  constructor(client: AzureWebPubSubServiceRestAPIContext) {
    this.client = client;
  }

  /**
   * Get service health status.
   * @param options The options parameters.
   */
  getHealthStatus(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getHealthStatusOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer({}, /* isXml */ false);

const getHealthStatusOperationSpec: coreHttp.OperationSpec = {
  path: "/api/health",
  httpMethod: "HEAD",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  serializer
};
