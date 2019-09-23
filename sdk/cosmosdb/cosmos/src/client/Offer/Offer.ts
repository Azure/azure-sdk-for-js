// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import { Constants, isResourceValid, ResourceType } from "../../common";
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
  constructor(
    public readonly client: CosmosClient,
    public readonly id: string,
    private readonly clientContext: ClientContext
  ) {}

  /**
   * Read the {@link OfferDefinition} for the given {@link Offer}.
   * @param options
   */
  public async read(options?: RequestOptions): Promise<OfferResponse> {
    const response = await this.clientContext.read<OfferDefinition>({
      path: this.url,
      resourceType: ResourceType.offer,
      resourceId: this.id,
      options
    });
    return new OfferResponse(response.result, response.headers, response.code, this);
  }

  /**
   * Replace the given {@link Offer} with the specified {@link OfferDefinition}.
   * @param body The specified {@link OfferDefinition}
   * @param options
   */
  public async replace(body: OfferDefinition, options?: RequestOptions): Promise<OfferResponse> {
    const err = {};
    if (!isResourceValid(body, err)) {
      throw err;
    }
    const response = await this.clientContext.replace<OfferDefinition>({
      body,
      path: this.url,
      resourceType: ResourceType.offer,
      resourceId: this.id,
      options
    });
    return new OfferResponse(response.result, response.headers, response.code, this);
  }
}
