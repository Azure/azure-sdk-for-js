import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  RequestRateByIntervalInput,
  LogAnalyticsExportRequestRateByIntervalResponse,
  ThrottledRequestsInput,
  LogAnalyticsExportThrottledRequestsResponse
} from "../models";

/** Class representing a LogAnalytics. */
export class LogAnalytics {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class LogAnalytics class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Export logs that show Api requests made by this subscription in the given time window to show
   * throttling activities.
   * @param location The location upon which virtual-machine-sizes is queried.
   * @param parameters Parameters supplied to the LogAnalytics getRequestRateByInterval Api.
   * @param options The options parameters.
   */
  async exportRequestRateByInterval(
    location: string,
    parameters: RequestRateByIntervalInput,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<LogAnalyticsExportRequestRateByIntervalResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      parameters,
      options: this.getOperationOptions(options, "azure-async-operation")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        LogAnalyticsExportRequestRateByIntervalResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      exportRequestRateByIntervalOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: exportRequestRateByIntervalOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "azure-async-operation"
    });
  }

  /**
   * Export logs that show total throttled Api requests for this subscription in the given time window.
   * @param location The location upon which virtual-machine-sizes is queried.
   * @param parameters Parameters supplied to the LogAnalytics getThrottledRequests Api.
   * @param options The options parameters.
   */
  async exportThrottledRequests(
    location: string,
    parameters: ThrottledRequestsInput,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<LogAnalyticsExportThrottledRequestsResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      parameters,
      options: this.getOperationOptions(options, "azure-async-operation")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        LogAnalyticsExportThrottledRequestsResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      exportThrottledRequestsOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: exportThrottledRequestsOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "azure-async-operation"
    });
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const exportRequestRateByIntervalOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getRequestRateByInterval",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.LogAnalyticsOperationResult
    },
    201: {
      bodyMapper: Mappers.LogAnalyticsOperationResult
    },
    202: {
      bodyMapper: Mappers.LogAnalyticsOperationResult
    },
    204: {
      bodyMapper: Mappers.LogAnalyticsOperationResult
    }
  },
  requestBody: Parameters.parameters22,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location1
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const exportThrottledRequestsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getThrottledRequests",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.LogAnalyticsOperationResult
    },
    201: {
      bodyMapper: Mappers.LogAnalyticsOperationResult
    },
    202: {
      bodyMapper: Mappers.LogAnalyticsOperationResult
    },
    204: {
      bodyMapper: Mappers.LogAnalyticsOperationResult
    }
  },
  requestBody: Parameters.parameters23,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location1
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
