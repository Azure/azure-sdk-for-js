import { Constants } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions } from "../../request";
import { OfferDefinition } from "./OfferDefinition";
import { OfferResponse } from "./OfferResponse";

export class Offer {
  public get url() {
    return `/${Constants.Path.OffersPathSegment}/${this.id}`;
  }
  constructor(public readonly client: CosmosClient, public readonly id: string) {}

  public async read(options?: RequestOptions): Promise<OfferResponse> {
    const response = await this.client.documentClient.readOffer(this.url); // TODO: options?
    return { body: response.result, headers: response.headers, ref: this, offer: this };
  }

  public async replace(body: OfferDefinition, options?: RequestOptions): Promise<OfferResponse> {
    const response = await this.client.documentClient.replaceOffer(this.url, body); // TODO: options?
    return { body: response.result, headers: response.headers, ref: this, offer: this };
  }
}
