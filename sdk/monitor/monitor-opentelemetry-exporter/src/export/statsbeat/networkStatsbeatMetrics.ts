// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  diag,
  BatchObservableResult,
  Meter,
  ObservableGauge,
  ObservableResult,
} from "@opentelemetry/api";
import {
  MeterProvider,
  PeriodicExportingMetricReader,
  PeriodicExportingMetricReaderOptions,
} from "@opentelemetry/sdk-metrics";
import { AzureMonitorExporterOptions } from "../../index";
import * as ai from "../../utils/constants/applicationinsights";
import { StatsbeatMetrics } from "./statsbeatMetrics";
import {
  StatsbeatCounter,
  STATSBEAT_LANGUAGE,
  NetworkStatsbeat,
  CommonStatsbeatProperties,
  NetworkStatsbeatProperties,
  StatsbeatOptions,
} from "./types";
import { AzureMonitorStatsbeatExporter } from "./statsbeatExporter";

export class NetworkStatsbeatMetrics extends StatsbeatMetrics {
  private _commonProperties: CommonStatsbeatProperties;
  private _networkProperties: NetworkStatsbeatProperties;
  private _isInitialized: boolean = false;
  private _statsCollectionShortInterval: number = 900000; // 15 minutes

  private _networkStatsbeatCollection: Array<NetworkStatsbeat> = [];
  private _networkStatsbeatMeter: Meter;
  private _networkStatsbeatMeterProvider: MeterProvider;
  private _networkAzureExporter: AzureMonitorStatsbeatExporter;
  private _networkMetricReader: PeriodicExportingMetricReader;

  // Custom dimensions
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

  constructor(options: StatsbeatOptions) {
    super();
    this._connectionString = super._getConnectionString(options.endpointUrl);
    this._networkStatsbeatMeterProvider = new MeterProvider();

    const exporterConfig: AzureMonitorExporterOptions = {
      connectionString: this._connectionString,
    };

    this._networkAzureExporter = new AzureMonitorStatsbeatExporter(exporterConfig);

    // Exports Network Statsbeat every 15 minutes
    const networkMetricReaderOptions: PeriodicExportingMetricReaderOptions = {
      exporter: this._networkAzureExporter,
      exportIntervalMillis: options.networkCollectionInterval || this._statsCollectionShortInterval, // 15 minutes
    };

    this._networkMetricReader = new PeriodicExportingMetricReader(networkMetricReaderOptions);
    this._networkStatsbeatMeterProvider.addMetricReader(this._networkMetricReader);
    this._networkStatsbeatMeter = this._networkStatsbeatMeterProvider.getMeter(
      "Azure Monitor Network Statsbeat"
    );

    this._endpointUrl = options.endpointUrl;
    this._runtimeVersion = process.version;
    this._language = STATSBEAT_LANGUAGE;
    this._version = ai.packageVersion;
    this._host = this._getShortHost(options.endpointUrl);
    this._cikey = options.instrumentationKey;

    this._successCountGauge = this._networkStatsbeatMeter.createObservableGauge(
      StatsbeatCounter.SUCCESS_COUNT
    );
    this._failureCountGauge = this._networkStatsbeatMeter.createObservableGauge(
      StatsbeatCounter.FAILURE_COUNT
    );
    this._retryCountGauge = this._networkStatsbeatMeter.createObservableGauge(
      StatsbeatCounter.RETRY_COUNT
    );
    this._throttleCountGauge = this._networkStatsbeatMeter.createObservableGauge(
      StatsbeatCounter.THROTTLE_COUNT
    );
    this._exceptionCountGauge = this._networkStatsbeatMeter.createObservableGauge(
      StatsbeatCounter.EXCEPTION_COUNT
    );
    this._averageDurationGauge = this._networkStatsbeatMeter.createObservableGauge(
      StatsbeatCounter.AVERAGE_DURATION
    );

    this._commonProperties = {
      os: super._os,
      rp: super._resourceProvider,
      cikey: this._cikey,
      runtimeVersion: this._runtimeVersion,
      language: this._language,
      version: this._version,
      attach: this._attach,
    };

    this._networkProperties = {
      endpoint: this._endpointUrl,
      host: this._host,
    };

    this._isInitialized = true;
    this._initialize();
  }

  public isInitialized() {
    return this._isInitialized;
  }

  public shutdown() {
    this._networkStatsbeatMeterProvider.shutdown();
  }

  private async _initialize() {
    try {
      await super._getResourceProvider();

      // Add network observable callbacks
      this._successCountGauge.addCallback(this._successCallback.bind(this));
      this._networkStatsbeatMeter.addBatchObservableCallback(this._failureCallback.bind(this), [
        this._failureCountGauge,
      ]);
      this._networkStatsbeatMeter.addBatchObservableCallback(this._retryCallback.bind(this), [
        this._retryCountGauge,
      ]);
      this._networkStatsbeatMeter.addBatchObservableCallback(this._throttleCallback.bind(this), [
        this._throttleCountGauge,
      ]);
      this._networkStatsbeatMeter.addBatchObservableCallback(this._exceptionCallback.bind(this), [
        this._exceptionCountGauge,
      ]);
      this._averageDurationGauge.addCallback(this._durationCallback.bind(this));
    } catch (error) {
      diag.debug("Call to get the resource provider failed.");
    }
  }

  // Observable gauge callbacks
  private _successCallback(observableResult: ObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    let attributes = { ...this._commonProperties, ...this._networkProperties };
    observableResult.observe(counter.totalSuccesfulRequestCount, attributes);
    counter.totalSuccesfulRequestCount = 0;
  }

  private _failureCallback(observableResult: BatchObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);

    /*
      Takes the failureCountGauge, value (of the counter), and attributes
      create a unqiue counter based on statusCode as well
      append statusCode to attributes so the newly created attributes are unique.
    */
    let attributes = { ...this._networkProperties, ...this._commonProperties, statusCode: 0 };

    // For each { statusCode -> count } mapping, call observe, passing the count and attributes that include the statusCode
    for (let i = 0; i < counter.totalFailedRequestCount.length; i++) {
      attributes.statusCode = counter.totalFailedRequestCount[i].statusCode;
      observableResult.observe(this._failureCountGauge, counter.totalFailedRequestCount[i].count, {
        ...attributes,
      });
      counter.totalFailedRequestCount[i].count = 0;
    }
  }

  private _retryCallback(observableResult: BatchObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    let attributes = { ...this._networkProperties, ...this._commonProperties, statusCode: 0 };

    for (let i = 0; i < counter.retryCount.length; i++) {
      attributes.statusCode = counter.retryCount[i].statusCode;
      observableResult.observe(this._retryCountGauge, counter.retryCount[i].count, {
        ...attributes,
      });
      counter.retryCount[i].count = 0;
    }
  }

  private _throttleCallback(observableResult: BatchObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    let attributes = { ...this._networkProperties, ...this._commonProperties, statusCode: 0 };

    for (let i = 0; i < counter.throttleCount.length; i++) {
      attributes.statusCode = counter.throttleCount[i].statusCode;
      observableResult.observe(this._throttleCountGauge, counter.throttleCount[i].count, {
        ...attributes,
      });
      counter.throttleCount[i].count = 0;
    }
  }

  private _exceptionCallback(observableResult: BatchObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    let attributes = { ...this._networkProperties, ...this._commonProperties, exceptionType: "" };

    for (let i = 0; i < counter.exceptionCount.length; i++) {
      attributes.exceptionType = counter.exceptionCount[i].exceptionType;
      observableResult.observe(this._exceptionCountGauge, counter.exceptionCount[i].count, {
        ...attributes,
      });
      counter.exceptionCount[i].count = 0;
    }
  }

  private _durationCallback(observableResult: ObservableResult) {
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    let attributes = { ...this._networkProperties, ...this._commonProperties };
    for (let i = 0; i < this._networkStatsbeatCollection.length; i++) {
      let currentCounter = this._networkStatsbeatCollection[i];
      currentCounter.time = Number(new Date());
      let intervalRequests =
        currentCounter.totalRequestCount - currentCounter.lastRequestCount || 0;
      currentCounter.averageRequestExecutionTime =
        (currentCounter.intervalRequestExecutionTime -
          currentCounter.lastIntervalRequestExecutionTime) /
          intervalRequests || 0;
      currentCounter.lastIntervalRequestExecutionTime = currentCounter.intervalRequestExecutionTime; // reset

      currentCounter.lastRequestCount = currentCounter.totalRequestCount;
      currentCounter.lastTime = currentCounter.time;
    }
    observableResult.observe(counter.averageRequestExecutionTime, attributes);

    counter.averageRequestExecutionTime = 0;
  }

  // Public methods to increase counters
  public countSuccess(duration: number) {
    if (!this._isInitialized) {
      return;
    }
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    counter.totalRequestCount++;
    counter.totalSuccesfulRequestCount++;
    counter.intervalRequestExecutionTime += duration;
  }

  public countFailure(duration: number, statusCode: number) {
    if (!this._isInitialized) {
      return;
    }
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    let currentStatusCounter = counter.totalFailedRequestCount.find(
      (statusCounter) => statusCode === statusCounter.statusCode
    );

    if (currentStatusCounter) {
      currentStatusCounter.count++;
    } else {
      counter.totalFailedRequestCount.push({ statusCode: statusCode, count: 1 });
    }

    counter.totalRequestCount++;
    counter.intervalRequestExecutionTime += duration;
  }

  public countRetry(statusCode: number) {
    if (!this._isInitialized) {
      return;
    }
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    let currentStatusCounter = counter.retryCount.find(
      (statusCounter) => statusCode === statusCounter.statusCode
    );

    if (currentStatusCounter) {
      currentStatusCounter.count++;
    } else {
      counter.retryCount.push({ statusCode: statusCode, count: 1 });
    }
  }

  public countThrottle(statusCode: number) {
    if (!this._isInitialized) {
      return;
    }
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    let currentStatusCounter = counter.throttleCount.find(
      (statusCounter) => statusCode === statusCounter.statusCode
    );

    if (currentStatusCounter) {
      currentStatusCounter.count++;
    } else {
      counter.throttleCount.push({ statusCode: statusCode, count: 1 });
    }
  }

  public countException(exceptionType: Error) {
    if (!this._isInitialized) {
      return;
    }
    let counter: NetworkStatsbeat = this._getNetworkStatsbeatCounter(this._endpointUrl, this._host);
    let currentErrorCounter = counter.exceptionCount.find(
      (exceptionCounter) => exceptionType.name === exceptionCounter.exceptionType
    );
    if (currentErrorCounter) {
      currentErrorCounter.count++;
    } else {
      counter.exceptionCount.push({ exceptionType: exceptionType.name, count: 1 });
    }
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
      shortHost = shortHost.replace(".in.applicationinsights.azure.com", "");
    } catch (error) {
      diag.debug("Failed to get the short host name.");
    }
    return shortHost;
  }
}
