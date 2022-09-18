import { MeterProvider } from "@opentelemetry/sdk-metrics-base";

var os = require("os");

class StatsbeatMetrics {

  public static NON_EU_CONNECTION_STRING = "InstrumentationKey=c4a29126-a7cb-47e5-b348-11414998b11e;IngestionEndpoint=https://westus-0.in.applicationinsights.azure.com";
  public static EU_CONNECTION_STRING = "InstrumentationKey=7dc56bab-3c0c-4e9f-9ebb-d1acadee8d0f;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com";
  public static STATS_COLLECTION_SHORT_INTERVAL: number = 900000; // 15 minutes

  // Common attributes
  private _resourceProvider: string;
  private _os: string = os.type();
  private _cikey: string;
  private _runtimeVersion: string;
  private _language: string;
  private _version: string;
  private _attach: string;

  // Network attributes
  private _endpoint: string;
  private _host: string;

  constructor(meterProvider: MeterProvider, instrumentationKey: string, endpoint: string) {
    this._cikey = instrumentationKey;
    this._endpoint = endpoint;
  }
}
