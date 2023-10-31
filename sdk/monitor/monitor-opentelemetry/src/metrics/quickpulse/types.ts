// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { MonitoringDataPoint, PostResponse } from "../../generated";
import { DocumentIngress } from "../../generated";

/**
 * Quickpulse Exporter Options
 */
export interface QuickpulseExporterOptions {
  endpointUrl: string;

  instrumentationKey: string;

  aadAudience?: string;
  /**
   * Token Credential
   */
  credential?: TokenCredential;

  baseMonitoringDataPoint: MonitoringDataPoint;

  postCallback: (response: PostResponse | undefined) => void;

  getDocumentsFn: () => DocumentIngress[];
}
