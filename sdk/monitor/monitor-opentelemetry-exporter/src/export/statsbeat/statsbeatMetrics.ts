// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ServiceClient } from "@azure/core-client";
import { createHttpHeaders, PipelineRequest } from "@azure/core-rest-pipeline";
import { Meter } from "@opentelemetry/api-metrics/build/src/types/Meter";
import { MeterProvider } from "@opentelemetry/sdk-metrics-base";
import { SDK_VERSION } from "../../../../../../sdk/template/template/src/constants";
import { StatsbeatResourceProvider, STATSBEAT_LANGUAGE } from "../constants";

var os = require("os");
const AIMS_URI = "http://169.254.169.254/metadata/instance/compute";
const AIMS_API_VERSION = "api-version=2017-12-01";
const AIMS_FORMAT = "format=json";

export interface IVirtualMachineInfo {
    isVM?: boolean;
    id?: string;
    subscriptionId?: string;
    osType?: string;
}

class StatsbeatMetrics {

  public static NON_EU_CONNECTION_STRING = "InstrumentationKey=c4a29126-a7cb-47e5-b348-11414998b11e;IngestionEndpoint=https://westus-0.in.applicationinsights.azure.com";
  public static EU_CONNECTION_STRING = "InstrumentationKey=7dc56bab-3c0c-4e9f-9ebb-d1acadee8d0f;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com";
  public static STATS_COLLECTION_SHORT_INTERVAL: number = 900000; // 15 minutes

  private _meter: Meter;
  private _isVm: boolean|undefined;

  // Custom dimensions
  private _resourceProvider: string = StatsbeatResourceProvider.unknown;
  private _os: string = os.type();
  private _cikey: string;
  private _runtimeVersion: string;
  private _language: string;
  private _version: string;
  private _attach: string = "sdk"; // Python verison lists "attach" as TODO

  // Network attributes
  private _endpoint: string;
  private _host: string;

  constructor(meterProvider: MeterProvider, instrumentationKey: string, endpoint: string) {
    // Need to determine what should populate the resourceProvider attribute.
    this._runtimeVersion = process.version;
    this._language = STATSBEAT_LANGUAGE;
    this._version = SDK_VERSION;
    this._host = this._getShortHost(endpoint);
    this._cikey = instrumentationKey;
    this._endpoint = endpoint;

    // TODO: Determine what value should be passed as the name parameter.
    this._meter = meterProvider.getMeter("new name");
  }

  private async _getResourceProvider(): Promise<void> {
      // Check resource provider
      this._resourceProvider = StatsbeatResourceProvider.unknown;
      if (process.env.WEBSITE_SITE_NAME) {
          // Web apps
          this._resourceProvider = StatsbeatResourceProvider.appsvc;
      } else if (process.env.FUNCTIONS_WORKER_RUNTIME) {
          // Function apps
          this._resourceProvider = StatsbeatResourceProvider.functions;
      } else if (this._getAzureComputeMetadata()) {
        this._resourceProvider = StatsbeatResourceProvider.vm;
      } else {
        this._resourceProvider = StatsbeatResourceProvider.unknown;
      }
  }

  // TOOD: Revisit this logic to ensure it's correct
  private _getAzureComputeMetadata(): boolean {
      const serviceClient = new ServiceClient;
      const headers = createHttpHeaders({"MetaData": "True"});

      const request: PipelineRequest = {
        url: `${AIMS_URI}?${AIMS_API_VERSION}&${AIMS_FORMAT}`,
        headers: headers,
        timeout: 5000, // 5 seconds
        method: "GET",
        withCredentials: false,
        requestId: "azure-metadata-request"
      };

      serviceClient.sendRequest(request)
        .then((res) => {
          if (res.status === 200) {
            this._isVm = true;
            return true;
          } else {
            this._isVm = false;
            return false;
          }
        }).catch(() => {
          this._isVm = false;
          return false;
        });

      this._isVm = false;
      return false;
  }

  // Create metrics related to the request calls to ingestion service
  public initializeNetworkMetrics() {

  }

  private _getSuccessCount() {

  }

  private _getFailureCount() {

  }

  private _getAverageDuration() {

  }

  private _getRetryCount() {

  }

  private _getThrottleCount() {

  }

  private getExceptionCount() {

  }

  private _getShortHost(originalHost: string) {
    let shortHost = originalHost;
    try {
        let hostRegex = new RegExp(/^https?:\/\/(?:www\.)?([^\/.-]+)/);
        let res = hostRegex.exec(originalHost);
        if (res != null && res.length > 1) {
            shortHost = res[1];
        }
    }
    catch (error) {
        // Ignore error
    }
    return shortHost;
  }
}
