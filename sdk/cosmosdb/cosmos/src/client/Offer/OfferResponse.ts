// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CosmosDiagnostics } from "../../CosmosDiagnostics";
import { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import { Resource } from "../Resource";
import { Offer } from "./Offer";
import { OfferDefinition } from "./OfferDefinition";

export class OfferResponse extends ResourceResponse<OfferDefinition & Resource> {
  constructor(
    resource: OfferDefinition & Resource,
    headers: CosmosHeaders,
    statusCode: number,
    diagnostics: CosmosDiagnostics,
    offer?: Offer,
  ) {
    super(resource, headers, statusCode, diagnostics);
    this.offer = offer;
  }
  /** A reference to the {@link Offer} corresponding to the returned {@link OfferDefinition}. */
  public readonly offer: Offer;
}
