// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Export SmsClient and its specific types
export { SmsClient } from "./smsClient.js";
export type {
  SmsClientOptions,
  SmsSendRequest,
  SmsSendOptions,
  SmsSendResult,
  SmsDeliveryReportResult,
  GetDeliveryReportOptions,
  MessagingConnectOptions,
} from "./smsClient.js";

// Export OptOutsClient sub-client and its types
export type { OptOutsClient } from "./optOutsClient.js";
export type {
  OptOutCheckResult,
  OptOutOperationResult,
  CheckOptions,
  AddOptions,
  RemoveOptions,
} from "./optOutsClient.js";

// Export ServiceVersion enum for API versioning
export { ServiceVersion } from "./constants.js";

// Re-export generated types that are used in the public API
export type { DeliveryReportDeliveryStatus, DeliveryAttempt } from "./generated/src/index.js";
