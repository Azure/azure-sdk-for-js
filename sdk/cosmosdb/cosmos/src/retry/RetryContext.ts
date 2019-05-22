export interface RetryContext {
  retryCount?: number;
  retryRequestOnPreferredLocations?: boolean;
  clearSessionTokenNotAvailable?: boolean;
}
