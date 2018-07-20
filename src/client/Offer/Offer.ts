import { Constants } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions } from "../../request";
import { OfferDefinition } from "./OfferDefinition";
import { OfferResponse } from "./OfferResponse";

/**
 * Use to read or replace an existing {@link Offer} by id.
 *
 * @see {@link Offers} to query or read all offers.
 */
export class Offer {
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url() {
    return `/${Constants.Path.OffersPathSegment}/${this.id}`;
  }
  /**
   * @hidden
   * @param client The parent {@link CosmosClient} for the Database Account.
   * @param id The id of the given {@link Offer}.
   */
  constructor(public readonly client: CosmosClient, public readonly id: string) {}

  /**
   * Read the {@link OfferDefinition} for the given {@link Offer}.
   * @param options
   */
  public async read(options?: RequestOptions): Promise<OfferResponse> {
    const response = await this.client.documentClient.readOffer(this.url); // TODO: options?
    return { body: response.result, headers: response.headers, ref: this, offer: this };
  }

  /**
   * Replace the given {@link Offer} with the specified {@link OfferDefinition}.
   * @param body The specified {@link OfferDefinition}
   * @param options
   */
  public async replace(body: OfferDefinition, options?: RequestOptions): Promise<OfferResponse> {
    const response = await this.client.documentClient.replaceOffer(this.url, body); // TODO: options?
    return { body: response.result, headers: response.headers, ref: this, offer: this };
  }
}
