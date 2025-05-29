export interface RetryContext {
    retryCount: number;
    retryRequestOnPreferredLocations?: boolean;
    clearSessionTokenNotAvailable?: boolean;
    /**
     * This variable determines the index of specific server in the preferred location list
     * where subsequent retry requests should be directed.
     */
    retryLocationServerIndex?: number;
}
//# sourceMappingURL=RetryContext.d.ts.map