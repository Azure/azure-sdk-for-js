// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ServiceClient } from "@azure/core-client";
import { createHttpHeaders, PipelineRequest } from "@azure/core-rest-pipeline";
import { ObservableGauge, ObservableResult } from "@opentelemetry/api-metrics";
import { Meter } from "@opentelemetry/api-metrics/build/src/types/Meter";
import { MeterProvider } from "@opentelemetry/sdk-metrics-base";
import { SDK_VERSION } from "../../../../../../sdk/template/template/src/constants";
import { StatsbeatCounter, StatsbeatResourceProvider, STATSBEAT_LANGUAGE } from "../constants";
import { NetworkStatsbeat } from "./types";

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

  private _commonProperties = {};
  private _meter: Meter;
  private _isEnabled: boolean = false;
  private _isInitialized: boolean = false;
  private _isVm: boolean = false;
  private _networkStatsbeatCollection: Array<NetworkStatsbeat> = [];

  // Custom dimensions
  private _resourceProvider: string = StatsbeatResourceProvider.unknown;
  private _os: string = os.type();
  private _cikey: string;
  private _runtimeVersion: string;
  private _language: string;
  private _version: string;
  private _attach: string = "sdk"; // Python verison lists "attach" as TODO

  // Observable Gauges
  private _successCountGauge: ObservableGauge;
  private _failureCountGauge: ObservableGauge;
  private _retryCountGauge: ObservableGauge;
  private _throttleCountGauge: ObservableGauge;
  private _exceptionCountGauge: ObservableGauge;
  private _averageDurationGauge: ObservableGauge;

  // Network attributes
  private _endpoint: string;
  private _host: string;

  constructor(meterProvider: MeterProvider, instrumentationKey: string, endpoint: string) {
    // TODO: Determine what value should be passed as the name parameter.
    this._meter = meterProvider.getMeter("new name");

    this._runtimeVersion = process.version;
    this._language = STATSBEAT_LANGUAGE;
    this._version = SDK_VERSION;
    this._host = this._getShortHost(endpoint);
    this._cikey = instrumentationKey;
    this._endpoint = endpoint;

    this._successCountGauge = this._meter.createObservableGauge(StatsbeatCounter.SUCCESS_COUNT);
    this._failureCountGauge = this._meter.createObservableGauge(StatsbeatCounter.FAILURE_COUNT);
    this._retryCountGauge = this._meter.createObservableGauge(StatsbeatCounter.RETRY_COUNT);
    this._throttleCountGauge = this._meter.createObservableGauge(StatsbeatCounter.THROTTLE_COUNT);
    this._exceptionCountGauge = this._meter.createObservableGauge(StatsbeatCounter.EXCEPTION_COUNT);
    this._averageDurationGauge = this._meter.createObservableGauge(StatsbeatCounter.AVERAGE_DURATION);
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

  public isInitialized() {
    return this._isInitialized;
  }

  public isEnabled() {
    return this._isEnabled;
  }

  // Start instance of metrics.
  public enable(isEnabled: boolean): void {
    this._isEnabled = isEnabled;

    // TODO: Determine if the emitter is relevant here and if we need to clean up the observable callbacks in any case.
    if (this._isEnabled && !this._isInitialized) {
      this._isInitialized = true;
    }
  }

  public async trackShortIntervalStatsbeats() {
    try {
      await this._getResourceProvider();
      this._commonProperties = {
        os: this._os,
        rp: this._resourceProvider,
        cikey: this._cikey,
        runtimeVersion: this._runtimeVersion,
        language: this._language,
        version: this._version,
        attach: this._attach
      };

      // Add observable callbacks
      this._successCountGauge.addCallback(this._getSuccessCount.bind(this));
      this._failureCountGauge.addCallback(this._getFailureCount.bind(this));
      this._retryCountGauge.addCallback(this._getRetryCount.bind(this));
      this._throttleCountGauge.addCallback(this._getThrottleCount.bind(this));
      this._exceptionCountGauge.addCallback(this._getExceptionCount.bind(this));
      this._averageDurationGauge.addCallback(this._getAverageDuration.bind(this));
    } catch (error) {
      // TODO: Should I use AzureLogger here to output the info about the statsbeat metrics failing?
    }
  }

  private _getSuccessCount(observableResult: ObservableResult) {
    // TODO: Track duration here?
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpoint, this._host);
    counter.totalSuccesfulRequestCount++;
    observableResult.observe(counter.totalSuccesfulRequestCount, this._commonProperties);
  }

  private _getFailureCount(observableResult: ObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpoint, this._host);
    counter.totalFailedRequestCount++;
    observableResult.observe(counter.totalFailedRequestCount, this._commonProperties);
  }

  private _getAverageDuration(observableResult: ObservableResult) {
    // TODO: Figure out how to manage duration since it's not managed in the success/failure count methods
    // TOOD: Determine how the averageRequestDuration gets reported from this method/observed.
    for (let i = 0; i < this._networkStatsbeatCollection.length; i++) {
      let currentCounter = this._networkStatsbeatCollection[i];
      currentCounter.time = Number(new Date);
      let intervalRequests = currentCounter.totalRequestCount - currentCounter.lastRequestCount || 0;
      let averageRequestExecutionTime = 
        (currentCounter.intervalRequestExecutionTime -
          currentCounter.lastIntervalRequestExecutionTime) /
        intervalRequests || 0;
      currentCounter.lastIntervalRequestExecutionTime = currentCounter.intervalRequestExecutionTime; // reset
      
      currentCounter.lastRequestCount = currentCounter.totalRequestCount;
      currentCounter.lastTime = currentCounter.time;
    }
  }

  private _getRetryCount(observableResult: ObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpoint, this._host);
    counter.retryCount++;
    observableResult.observe(counter.retryCount, this._commonProperties);
  }

  private _getThrottleCount(observableResult: ObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpoint, this._host);
    counter.throttleCount++;
    observableResult.observe(counter.throttleCount, this._commonProperties);
  }

  private _getExceptionCount(observableResult: ObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpoint, this._host);
    counter.exceptionCount++;
    observableResult.observe(counter.exceptionCount, this._commonProperties);
  }

  // Gets a networkStatsbeat counter if one exists for the given endpoint
  private _getNetworkStatsbeatCounter(endpoint: string, host: string): NetworkStatsbeat {
    // Check if the counter is available
    for (let i = 0; i < this._networkStatsbeatCollection.length; i++) {
      // Same object
      if (
        endpoint === this._networkStatsbeatCollection[i].endpoint &&
        host === this._networkStatsbeatCollection[i].host
        ) {
          return this._networkStatsbeatCollection[i];
        }
      }
      // Create a new counter if not found
      let newCounter = new NetworkStatsbeat(endpoint, host);
      this._networkStatsbeatCollection.push(newCounter);
      return newCounter;
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
