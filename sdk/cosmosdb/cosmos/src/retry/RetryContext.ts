// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export interface RetryContext {
  retryCount?: number;
  retryRequestOnPreferredLocations?: boolean;
  clearSessionTokenNotAvailable?: boolean;
}
