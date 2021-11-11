// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CosmosHeaders } from "../../queryExecutionContext";
import { Offer } from "./Offer";
import { OfferDefinition } from "./OfferDefinition";
import { Resource } from "../Resource";
import { ResourceResponse } from "../../request";

export class OfferResponse extends ResourceResponse<OfferDefinition & Resource> {
  constructor(
    resource: OfferDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    offer?: Offer
  ) {
    super(resource, headers, statusCode);
    this.offer = offer;
  }
  /** A reference to the {@link Offer} corresponding to the returned {@link OfferDefinition}. */
  public readonly offer: Offer;
}
