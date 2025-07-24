// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext.js";
import { Constants, isResourceValid, ResourceType } from "../../common/index.js";
import type { CosmosClient } from "../../CosmosClient.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { RequestOptions } from "../../request/index.js";
import type { OfferDefinition } from "./OfferDefinition.js";
import { OfferResponse } from "./OfferResponse.js";

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
   * @example
   * ```ts snippet:OfferRead
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { resource: offer } = await client.offer("<offer-id>").read();
   * ```
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
   * @example replace offer with a new offer definition with updated throughput
   * ```ts snippet:OfferReplace
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { resource: offer } = await client.offer("<offer-id>").read();
   * // @ts-preservewhitespace
   * offer.content.offerThroughput = 1000;
   * await client.offer("<offer-id>").replace(offer);
   * ```
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
