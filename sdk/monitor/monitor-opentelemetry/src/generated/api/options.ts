// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitoringDataPoint } from "../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PublishOptionalParams extends OperationOptions {
  /** An encoded string that indicates whether the collection configuration is changed. */
  configurationEtag?: string;
  /** Timestamp when the client transmits the metrics and documents to Live Metrics. A 8-byte long type of ticks. */
  transmissionTime?: number;
  /** Data contract between the client and Live Metrics. /QuickPulseService.svc/ping uses this as a backup source of machine name, instance name and invariant version. */
  monitoringDataPoints?: MonitoringDataPoint[];
}

/** Optional parameters. */
export interface IsSubscribedOptionalParams extends OperationOptions {
  /** Timestamp when the client transmits the metrics and documents to Live Metrics. A 8-byte long type of ticks. */
  transmissionTime?: number;
  /** Computer name where Application Insights SDK lives. Live Metrics uses machine name with instance name as a backup. */
  machineName?: string;
  /** Service instance name where Application Insights SDK lives. Live Metrics uses machine name with instance name as a backup. */
  instanceName?: string;
  /** Identifies an Application Insights SDK as trusted agent to report metrics and documents. */
  streamId?: string;
  /** Cloud role name of the service. */
  roleName?: string;
  /** Version/generation of the data contract (MonitoringDataPoint) between the client and Live Metrics. */
  invariantVersion?: string;
  /** An encoded string that indicates whether the collection configuration is changed. */
  configurationEtag?: string;
  /** Data contract between Application Insights client SDK and Live Metrics. /QuickPulseService.svc/ping uses this as a backup source of machine name, instance name and invariant version. */
  monitoringDataPoint?: MonitoringDataPoint;
}
