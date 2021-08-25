import { HealthApi } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { AzureWebPubSubServiceRestAPIContext } from "../azureWebPubSubServiceRestAPIContext";
import { HealthApiGetServiceStatusOptionalParams } from "../models";

/** Class containing HealthApi operations. */
export class HealthApiImpl implements HealthApi {
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
  getServiceStatus(
    options?: HealthApiGetServiceStatusOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { options },
      getServiceStatusOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getServiceStatusOperationSpec: coreClient.OperationSpec = {
  path: "/api/health",
  httpMethod: "HEAD",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  serializer
};
