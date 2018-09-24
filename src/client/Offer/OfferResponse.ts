import { CosmosResponse } from "../../request";
import { Resource } from "../Resource";
import { Offer } from "./Offer";
import { OfferDefinition } from "./OfferDefinition";

export interface OfferResponse extends CosmosResponse<OfferDefinition & Resource, Offer> {
  /** A reference to the {@link Offer} corresponding to the returned {@link OfferDefinition}. */
  offer: Offer;
}
