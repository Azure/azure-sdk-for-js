import * as http from "http";
import * as https from "https";
import { DEFAULT_EXPORTER_CONFIG, AzureExporterConfig } from "../config";

/**
 * Node.js and platform specific
 */
export interface NodejsPlatformConfig extends AzureExporterConfig {
  proxyHttpsUrl?: string;
  proxyHttpUrl?: string;
  httpAgent?: http.Agent;
  httpsAgent?: https.Agent;
}

// Noop for now until sender requires
export const DEFAULT_SENDER_OPTIONS: NodejsPlatformConfig = {
  ...DEFAULT_EXPORTER_CONFIG,
};
