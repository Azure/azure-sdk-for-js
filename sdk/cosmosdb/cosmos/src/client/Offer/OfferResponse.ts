// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics } from "../../CosmosDiagnostics";
import type { CosmosHeaders } from "../../queryExecutionContext";
import { ResourceResponse } from "../../request";
import type { Resource } from "../Resource";
import type { Offer } from "./Offer";
import type { OfferDefinition } from "./OfferDefinition";

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
