import { Constants, UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions, Response } from "../../request";
import { OfferDefinition } from "./OfferDefinition";

export class Offer {
  public get url() {
    return `/${Constants.Path.OffersPathSegment}/${this.id}`;
  }
  constructor(public readonly client: CosmosClient, public readonly id: string) {}

  public read(options?: RequestOptions): Promise<Response<OfferDefinition>> {
    return this.client.documentClient.readOffer(this.url); // TODO: options?
  }

  public replace(body: OfferDefinition, options?: RequestOptions): Promise<Response<OfferDefinition>> {
    return this.client.documentClient.replaceOffer(this.url, body); // TODO: options?
  }
}
