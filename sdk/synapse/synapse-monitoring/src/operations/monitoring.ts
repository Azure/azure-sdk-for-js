import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { MonitoringClient } from "../monitoringClient";
import {
  MonitoringGetSparkJobListOptionalParams,
  MonitoringGetSparkJobListResponse,
  MonitoringGetSqlJobQueryStringOptionalParams,
  MonitoringGetSqlJobQueryStringResponse
} from "../models";

/**
 * Class representing a Monitoring.
 */
export class Monitoring {
  private readonly client: MonitoringClient;

  /**
   * Initialize a new instance of the class Monitoring class.
   * @param client Reference to the service client
   */
  constructor(client: MonitoringClient) {
    this.client = client;
  }

  /**
   * Get list of spark applications for the workspace.
   * @param options The options parameters.
   */
  getSparkJobList(
    options?: MonitoringGetSparkJobListOptionalParams
  ): Promise<MonitoringGetSparkJobListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getSparkJobListOperationSpec
    ) as Promise<MonitoringGetSparkJobListResponse>;
  }

  /**
   * Get SQL OD/DW Query for the workspace.
   * @param options The options parameters.
   */
  getSqlJobQueryString(
    options?: MonitoringGetSqlJobQueryStringOptionalParams
  ): Promise<MonitoringGetSqlJobQueryStringResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getSqlJobQueryStringOperationSpec
    ) as Promise<MonitoringGetSqlJobQueryStringResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getSparkJobListOperationSpec: coreHttp.OperationSpec = {
  path: "/monitoring/workloadTypes/spark/Applications",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkJobListViewResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept, Parameters.xMsClientRequestId],
  serializer
};
const getSqlJobQueryStringOperationSpec: coreHttp.OperationSpec = {
  path: "/monitoring/workloadTypes/sql/querystring",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SqlQueryStringDataModel
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.orderby,
    Parameters.skip
  ],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept, Parameters.xMsClientRequestId],
  serializer
};
