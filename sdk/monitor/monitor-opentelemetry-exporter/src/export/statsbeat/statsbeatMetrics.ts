// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClient } from "@azure/core-client";
import { createHttpHeaders, PipelineRequest } from "@azure/core-rest-pipeline";
import { AzureExporterConfig, AzureMonitorMetricExporter } from "@azure/monitor-opentelemetry-exporter";
import { diag } from "@opentelemetry/api";
import { ObservableGauge, ObservableResult } from "@opentelemetry/api-metrics";
import { Meter } from "@opentelemetry/api-metrics/build/src/types/Meter";
import { MeterProvider, MeterProviderOptions, PeriodicExportingMetricReader, PeriodicExportingMetricReaderOptions } from "@opentelemetry/sdk-metrics-base";
import { SDK_VERSION } from "../../../../../../sdk/template/template/src/constants";
import { StatsbeatCounter, StatsbeatResourceProvider, STATSBEAT_LANGUAGE } from "../constants";
import { NetworkStatsbeat } from "./types";

var os = require("os");
const AIMS_URI = "http://169.254.169.254/metadata/instance/compute";
const AIMS_API_VERSION = "api-version=2017-12-01";
const AIMS_FORMAT = "format=json";
const NON_EU_CONNECTION_STRING = "InstrumentationKey=c4a29126-a7cb-47e5-b348-11414998b11e;IngestionEndpoint=https://westus-0.in.applicationinsights.azure.com";
const EU_CONNECTION_STRING = "InstrumentationKey=7dc56bab-3c0c-4e9f-9ebb-d1acadee8d0f;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com";
const STATS_COLLECTION_SHORT_INTERVAL: number = 900000; // 15 minutes
const EU_ENDPOINTS = [
  "westeurope",
  "northeurope",
  "francecentral",
  "francesouth",
  "germanywestcentral",
  "norwayeast",
  "norwaywest",
  "swedencentral",
  "switzerlandnorth",
  "switzerlandwest"
];

export interface IVirtualMachineInfo {
    isVM?: boolean;
    id?: string;
    subscriptionId?: string;
    osType?: string;
}

export class StatsbeatMetrics {
  private _commonProperties = {};
  private _meter: Meter;
  private _isEnabled: boolean = false;
  private _isInitialized: boolean = false;
  private _networkStatsbeatCollection: Array<NetworkStatsbeat> = [];
  private _meterProvider: MeterProvider;
  private _azureExporter: AzureMonitorMetricExporter;
  private _metricReader: PeriodicExportingMetricReader;

  // Custom dimensions
  private _resourceProvider: string = StatsbeatResourceProvider.unknown;
  private _os: string = os.type();
  private _cikey: string;
  private _runtimeVersion: string;
  private _language: string;
  private _version: string;
  private _attach: string = "sdk";

  // Observable Gauges
  private _successCountGauge: ObservableGauge;
  private _failureCountGauge: ObservableGauge;
  private _retryCountGauge: ObservableGauge;
  private _throttleCountGauge: ObservableGauge;
  private _exceptionCountGauge: ObservableGauge;
  private _averageDurationGauge: ObservableGauge;

  // Network attributes
  private _connectionString: string;
  private _endpointUrl: string;
  private _host: string;

  constructor(instrumentationKey: string, endpointUrl: string) {
    this._connectionString = this._getConnectionString(endpointUrl);
    this._meterProvider = new MeterProvider();

    const exporterConfig: AzureExporterConfig = {
      connectionString: this._connectionString,
      isStatsbeat: true
    };

    this._azureExporter = new AzureMonitorMetricExporter(exporterConfig);
    
    const metricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this._azureExporter as any,
      exportIntervalMillis: STATS_COLLECTION_SHORT_INTERVAL // 15 minutes
    };

    // Exports Network Statsbeat every 15 minutes
    this._metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
    this._meterProvider.addMetricReader(this._metricReader);
    this._meter = this._meterProvider.getMeter("NetworkStatsbeat");

    this._endpointUrl = endpointUrl;
    this._runtimeVersion = process.version;
    this._language = STATSBEAT_LANGUAGE;
    this._version = SDK_VERSION;
    this._host = this._getShortHost(endpointUrl);
    this._cikey = instrumentationKey;

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
            return true;
          } else {
            return false;
          }
        }).catch(() => {
          return false;
        });
      return false;
  }

  public isInitialized() {
    return this._isInitialized;
  }

  public isEnabled() {
    return this._isEnabled;
  }

  public shutdown() {
    this._meterProvider.shutdown();
  }

  // Start instance of metrics.
  public enable(isEnabled: boolean): void {
    this._isEnabled = isEnabled;

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
      this._successCountGauge.addCallback(this._successCallback.bind(this));
      this._failureCountGauge.addCallback(this._failureCallback.bind(this));
      this._retryCountGauge.addCallback(this._retryCallback.bind(this));
      this._throttleCountGauge.addCallback(this._throttleCallback.bind(this));
      this._exceptionCountGauge.addCallback(this._exceptionCallback.bind(this));
      this._averageDurationGauge.addCallback(this._durationCallback.bind(this));
    } catch (error) {
      diag.debug("Call to get the resource provider failed.");
    }
  }

  // Observable gauge callbacks
  private _successCallback(observableResult: ObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    observableResult.observe(counter.totalSuccesfulRequestCount, this._commonProperties);
    // Clear counter after observing
    counter.totalSuccesfulRequestCount = 0;
  }

  private _failureCallback(observableResult: ObservableResult) {
    // TODO: Include statusCode - can I call observe on the counter for each unique statusCode?
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    observableResult.observe(counter.totalFailedRequestCount, this._commonProperties);
    counter.totalFailedRequestCount = 0;
  }

  private _retryCallback(observableResult: ObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    observableResult.observe(counter.retryCount, this._commonProperties);
    counter.retryCount = 0;
  }

  private _throttleCallback(observableResult: ObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    observableResult.observe(counter.throttleCount, this._commonProperties);
    counter.throttleCount = 0;
  }

  private _exceptionCallback(observableResult: ObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    observableResult.observe(counter.exceptionCount, this._commonProperties);
    counter.exceptionCount = 0;
  }

  private _durationCallback(observableResult: ObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    observableResult.observe(counter.averageRequestExecutionTime, this._commonProperties);
    counter.averageRequestExecutionTime = 0;
  }

  // Public methods to increase counters
  public countSuccess(duration: number) {
    if (!this.isEnabled()) {
      return;
    }
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    counter.totalRequestCount++;
    counter.totalSuccesfulRequestCount++;
    counter.intervalRequestExecutionTime += duration;
  }

  public countFailure(duration: number) {
    if (!this.isEnabled) {
      return;
    }
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    counter.totalRequestCount++;
    counter.totalFailedRequestCount++;
    counter.intervalRequestExecutionTime += duration;

  }

  public countRetry() {
    if (!this.isEnabled) {
      return;
    }
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    counter.retryCount++;
  }

  public countThrottle() {
    if (!this.isEnabled) {
      return;
    }
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    counter.throttleCount++;
  }

  public countException() {
    if (!this.isEnabled) {
      return;
    }
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    counter.exceptionCount++;
  }

  public countAverageDuration() {
    for (let i = 0; i < this._networkStatsbeatCollection.length; i++) {
      let currentCounter = this._networkStatsbeatCollection[i];
      currentCounter.time = Number(new Date);
      let intervalRequests = currentCounter.totalRequestCount - currentCounter.lastRequestCount || 0;
      currentCounter.averageRequestExecutionTime = 
        (currentCounter.intervalRequestExecutionTime -
          currentCounter.lastIntervalRequestExecutionTime) /
        intervalRequests || 0;
      currentCounter.lastIntervalRequestExecutionTime = currentCounter.intervalRequestExecutionTime; // reset
      
      currentCounter.lastRequestCount = currentCounter.totalRequestCount;
      currentCounter.lastTime = currentCounter.time;
    }
  }

  // Gets a networkStatsbeat counter if one exists for the given endpoint
  private _getNetworkStatsbeatCounter(endpoint: string, host: string): NetworkStatsbeat {
    // TODO: Managing the number of gauges.
    // If creating a new one create a new gauge. Counter -> Gauge
    // Network statsbeat should have a gauge.
    // Need to check with Leighton how his implementation manages this, otherwise dynamically create a new gauge every time a new counter is created.

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
      diag.debug("Failed to get the short host name.");
    }
    return shortHost;
  }

  private _getConnectionString(endpointUrl: string) {
    let currentEndpoint = endpointUrl;
    for(let i = 0; i < EU_ENDPOINTS.length; i++) {
      if (currentEndpoint.indexOf(EU_ENDPOINTS[i]) > -1) {
        return EU_CONNECTION_STRING;
      }
    }
    return NON_EU_CONNECTION_STRING;
  }
}
