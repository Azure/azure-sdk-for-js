import { CosmosResponse } from "../../request";
import { Offer } from "./Offer";
import { OfferDefinition } from "./OfferDefinition";

export interface OfferResponse extends CosmosResponse<OfferDefinition, Offer> {
  offer: Offer;
}
