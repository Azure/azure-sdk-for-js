// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export interface OfferDefinition {
  id?: string;
  offerType?: string; // TODO: enum?
  offerVersion?: string; // TODO: enum?
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
