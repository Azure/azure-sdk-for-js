// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

export const minLeaseDurationInSeconds = 15;
export const maxLeaseDurationInSeconds = 60;
export const defaultLeaseDurationInSeconds = 30;
export const defaultLeaseRenewIntervalInSeconds = 10;
export const defaultMaximumExecutionTimeInMs = 120000;
export const maximumExecutionTimeInMsForLeaseRenewal = 60000;
export const defaultCheckpointTimeoutInSeconds = 120;
export const defaultStartupScanDelayInSeconds = 30;
export const defaultFastScanIntervalInSeconds = 3;
export const defaultSlowScanIntervalInSeconds = 5;
export const metadataOwnerName = "owninghost";
export const leaseLost = "leaselost";
export const leaseIdMismatchWithLeaseOperation = "leaseidmismatchwithleaseoperation";
export const leaseIdMismatchWithBlobOperation = "leaseidmismatchwithbloboperation";
export const userAgentPrefix = "/js-event-processor-host";
export const packageInfo = {
  name: "@azure/event-processor-host",
  version: "1.0.5"
};
