export interface OfferDefinition {
    id?: string;
    offerType?: string;
    offerVersion?: string;
    resource?: string;
    offerResourceId?: string;
    content?: {
        offerThroughput: number;
        offerIsRUPerMinuteThroughputEnabled: boolean;
        offerMinimumThroughputParameters?: {
            maxThroughputEverProvisioned: number;
            maxConsumedStorageEverInKB: number;
        };
        offerAutopilotSettings?: {
            tier: number;
            maximumTierThroughput: number;
            autoUpgrade: boolean;
            maxThroughput: number;
        };
    };
}
//# sourceMappingURL=OfferDefinition.d.ts.map