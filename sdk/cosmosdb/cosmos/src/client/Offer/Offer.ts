// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext";
import { Constants, isResourceValid, ResourceType } from "../../common";
import type { CosmosClient } from "../../CosmosClient";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import type { RequestOptions } from "../../request";
import type { OfferDefinition } from "./OfferDefinition";
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
  public get url(): string {
    return `/${Constants.Path.OffersPathSegment}/${this.id}`;
  }
  /**
   * @hidden
   * @param client - The parent {@link CosmosClient} for the Database Account.
   * @param id - The id of the given {@link Offer}.
   */
  constructor(
    public readonly client: CosmosClient,
    public readonly id: string,
    private readonly clientContext: ClientContext,
  ) {}

  /**
   * Read the {@link OfferDefinition} for the given {@link Offer}.
   */
  public async read(options?: RequestOptions): Promise<OfferResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const response = await this.clientContext.read<OfferDefinition>({
        path: this.url,
        resourceType: ResourceType.offer,
        resourceId: this.id,
        options,
        diagnosticNode,
      });
      return new OfferResponse(
        response.result,
        response.headers,
        response.code,
        getEmptyCosmosDiagnostics(),
        this,
      );
    }, this.clientContext);
  }

  /**
   * Replace the given {@link Offer} with the specified {@link OfferDefinition}.
   * @param body - The specified {@link OfferDefinition}
   */
  public async replace(body: OfferDefinition, options?: RequestOptions): Promise<OfferResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const err = {};
      if (!isResourceValid(body, err)) {
        throw err;
      }
      const response = await this.clientContext.replace<OfferDefinition>({
        body,
        path: this.url,
        resourceType: ResourceType.offer,
        resourceId: this.id,
        options,
        diagnosticNode,
      });
      return new OfferResponse(
        response.result,
        response.headers,
        response.code,
        getEmptyCosmosDiagnostics(),
        this,
      );
    }, this.clientContext);
  }
}
