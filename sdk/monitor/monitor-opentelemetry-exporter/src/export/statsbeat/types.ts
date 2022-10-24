export class NetworkStatsbeat {
  public time: number | undefined;

  public lastTime: number;

  public endpoint: string;

  public host: string;

  public totalRequestCount: number;

  public lastRequestCount: number;

  public totalSuccesfulRequestCount: number;

  public totalFailedRequestCount: { statusCode: number; count: number }[];

  public retryCount: { statusCode: number; count: number }[];

  public exceptionCount: { exceptionType: string; count: number }[];

  public throttleCount: { statusCode: number; count: number }[];

  public intervalRequestExecutionTime: number;

  public lastIntervalRequestExecutionTime: number;

  public averageRequestExecutionTime: number;

  constructor(endpoint: string, host: string) {
    this.endpoint = endpoint;
    this.host = host;
    this.totalRequestCount = 0;
    this.totalSuccesfulRequestCount = 0;
    this.totalFailedRequestCount = [];
    this.retryCount = [];
    this.exceptionCount = [];
    this.throttleCount = [];
    this.intervalRequestExecutionTime = 0;
    this.lastIntervalRequestExecutionTime = 0;
    this.lastTime = +new Date();
    this.lastRequestCount = 0;
    this.averageRequestExecutionTime = 0;
  }
}

export const STATSBEAT_LANGUAGE = "node";

export const MAX_STATSBEAT_FAILURES = 3;

export const StatsbeatResourceProvider = {
  appsvc: "appsvc",
  functions: "functions",
  vm: "vm",
  unknown: "unknown",
};

export enum StatsbeatCounter {
  SUCCESS_COUNT = "Request Success Count",
  FAILURE_COUNT = "Request Failure Count",
  RETRY_COUNT = "Retry Count",
  THROTTLE_COUNT = "Throttle Count",
  EXCEPTION_COUNT = "Exception Count",
  AVERAGE_DURATION = "Request Duration",
}

export const AIMS_URI = "http://169.254.169.254/metadata/instance/compute";
export const AIMS_API_VERSION = "api-version=2017-12-01";
export const AIMS_FORMAT = "format=json";
export const NON_EU_CONNECTION_STRING =
  "InstrumentationKey=c4a29126-a7cb-47e5-b348-11414998b11e;IngestionEndpoint=https://westus-0.in.applicationinsights.azure.com";
export const EU_CONNECTION_STRING =
  "InstrumentationKey=7dc56bab-3c0c-4e9f-9ebb-d1acadee8d0f;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com";
export const EU_ENDPOINTS = [
  "westeurope",
  "northeurope",
  "francecentral",
  "francesouth",
  "germanywestcentral",
  "norwayeast",
  "norwaywest",
  "swedencentral",
  "switzerlandnorth",
  "switzerlandwest",
];

export interface IVirtualMachineInfo {
  isVM?: boolean;
  id?: string;
  subscriptionId?: string;
  osType?: string;
}

export interface CommonStatsbeatProperties {
  os: string;
  rp: string;
  cikey: string;
  runtimeVersion: string;
  language: string;
  version: string;
  attach: string;
}

export interface NetworkStatsbeatProperties {
  endpoint: string;
  host: string;
}
