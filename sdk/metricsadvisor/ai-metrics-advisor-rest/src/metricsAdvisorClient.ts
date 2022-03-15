import { ClientOptions } from "@azure-rest/core-client";
import { isTokenCredential, TokenCredential } from "@azure/core-auth";
import { OperationOptions } from "@azure/core-client";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { GeneratedClientLike } from "./generated/clientDefinitions";
import GeneratedClient from "./generated/generatedClient";
import { AlertingResultQuery } from "./generated/models";
import { AlertResultOutput } from "./generated/outputModels";
import { AlertQueryTimeMode, AlertsPageResponse, AnomalyAlert } from "./models";
import { paginate } from "./paginateHelper";
import {
  createMetricsAdvisorKeyCredentialPolicy,
  MetricsAdvisorKeyCredential,
  X_API_KEY_HEADER_NAME,
} from "./metricsAdvisorKeyCredentialPolicy";
/**
 * Options for listing alerts
 */
export interface ListAlertsOptions extends OperationOptions {
  /** Number of items to skip */
  skip?: number;
}

export class MetricsAdvisorClient {
  /**
   * Url to service endpoint
   */
  public readonly endpointUrl: string;

  /**
   * A reference to the auto-generated MetricsAdvisor HTTP client.
   */
  private readonly client: GeneratedClientLike;

  constructor(
    endpointUrl: string,
    credential: TokenCredential | MetricsAdvisorKeyCredential,
    options: ClientOptions = {}
  ) {
    this.endpointUrl = endpointUrl;
    this.client = GeneratedClient(endpointUrl, credential, {
      ...options,
      credentials: {
        scopes: ["https://cognitiveservices.azure.com/.default"],
        apiKeyHeaderName: X_API_KEY_HEADER_NAME
      }
    });
    if (!isTokenCredential(credential)) {
      this.client.pipeline.addPolicy(createMetricsAdvisorKeyCredentialPolicy(credential));
    }
  }

  public listAlerts(
    alertConfigId: string,
    startTime: Date | string,
    endTime: Date | string,
    timeMode: AlertQueryTimeMode,
    options: ListAlertsOptions = {}
  ): PagedAsyncIterableIterator<AnomalyAlert, AlertsPageResponse> {
    const iter = this.listItemsOfAlerts(
      alertConfigId,
      typeof startTime === "string" ? new Date(startTime) : startTime,
      typeof endTime === "string" ? new Date(endTime) : endTime,
      timeMode,
      options
    );
    
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @returns an AsyncIterableIterator that works a page at a time
       */
      // TODO: How to customise our pagination e.g feeding maxPageSize
      byPage: (settings: PageSettings = {}) => {
        return undefined;
      },
    };
  }

  /**
   * List alert items for alerting configuration
   */
  private async *listItemsOfAlerts(
    alertConfigId: string,
    startTime: Date,
    endTime: Date,
    timeMode: AlertQueryTimeMode,
    options: ListAlertsOptions
  ): AsyncIterableIterator<AnomalyAlert> {
    const body: AlertingResultQuery = {
      startTime, endTime, timeMode
    };
    const initResponse = await this.client.getAlertsByAnomalyAlertingConfiguration(
      alertConfigId, { body }
    );

    if (initResponse.status !== "200") {
      throw initResponse.body.message || new Error(`Unexpected status code ${initResponse.status}`);
    }

    // Directly use the helper function to get the elements
    const iter = paginate(this.client, initResponse);
    for await (const page of iter) {
      yield this.transformToAlertsPageResponse(alertConfigId, page);
    }
  }

  /**
   * Transform from AlertResultOutput to user-friendly model
   * @param alertConfigId  config id 
   * @param alertItem genereated model
   * @returns 
   */
  private transformToAlertsPageResponse(alertConfigId: string, alertItem: AlertResultOutput):AnomalyAlert{
    return {
      id: alertItem.alertId!,
      alertConfigId: alertConfigId,
      // TODO: Investigate why the model is not Date
      createdOn: new Date(alertItem.createdTime),
      modifiedOn: new Date(alertItem.modifiedTime),
      timestamp: new Date(alertItem.timestamp).getTime(),
    } as AnomalyAlert
  }

  public async getActiveSeriesCount() {
    const resp = await this.client.getActiveSeriesCount();
    if (resp.status != "200") {
      throw Error(resp.status);
    }
    return resp.body;
  }

}
