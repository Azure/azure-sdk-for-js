export interface OfferDefinition {
  id?: string;
  offerType?: string; // TODO: enum?
  offerVersion?: string; // TODO: enum?
  resource?: string;
  offerResourceId?: string;
  content?: {
    offerThroughput: number;
    offerIsRUPerMinuteThroughputEnabled: boolean;
  };
}
