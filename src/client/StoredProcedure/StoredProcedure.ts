import { UriFactory } from "../../common";
import { DocumentClient } from "../../documentclient";
import { CosmosResponse, RequestOptions } from "../../request";
import { Container } from "../Container";
import { StoredProcedureDefinition } from "./StoredProcedureDefinition";
import { StoredProcedureResponse } from "./StoredProcedureResponse";

/**
 * Operations for reading, replacing, deleting, or executing a specific, existing stored procedure by id.
 *
 * For operations to create, upsert, read all, or query Stored Procedures,
 */
export class StoredProcedure {
  private client: DocumentClient;
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url() {
    return UriFactory.createStoredProcedureUri(this.container.database.id, this.container.id, this.id);
  }
  /**
   * Creates a new isntance of {@link StoredProcedure} linked to the parent {@link Container}.
   * @param container The parent {@link Container}.
   * @param id The id of the given {@link StoredProcedure}.
   * @hidden
   */
  constructor(public readonly container: Container, public readonly id: string) {
    this.client = this.container.database.client.documentClient;
  }

  /**
   * Read the {@link StoredProcedureDefinition} for the given {@link StoredProcedure}.
   * @param options
   */
  public async read(options?: RequestOptions): Promise<StoredProcedureResponse> {
    const response = await this.client.readStoredProcedure(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, storedProcedure: this, sproc: this };
  }

  /**
   * Replace the given {@link StoredProcedure} with the specified {@link StoredProcedureDefinition}.
   * @param body The specified {@link StoredProcedureDefinition} to replace the existing definition.
   * @param options
   */
  public async replace(body: StoredProcedureDefinition, options?: RequestOptions): Promise<StoredProcedureResponse> {
    const response = await this.client.replaceStoredProcedure(this.url, body, options);
    return { body: response.result, headers: response.headers, ref: this, storedProcedure: this, sproc: this };
  }

  /**
   * Delete the given {@link StoredProcedure}.
   * @param options
   */
  public async delete(options?: RequestOptions): Promise<StoredProcedureResponse> {
    const response = await this.client.deleteStoredProcedure(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, storedProcedure: this, sproc: this };
  }

  /**
   * Execute the given {@link StoredProcedure}.
   * @param params Array of parameters to pass as arguments to the given {@link StoredProcedure}.
   * @param options Additional options, such as the partition key to invoke the {@link StoredProcedure} on.
   */
  public async execute(params?: any[], options?: RequestOptions): Promise<CosmosResponse<any, StoredProcedure>>;
  /**
   * Execute the given {@link StoredProcedure}.
   *
   * The specified type, T, is not enforced by the client.
   * Be sure to validate the response from the stored procudure matches the type, T, you provide.
   *
   * @param params Array of parameters to pass as arguments to the given {@link StoredProcedure}.
   * @param options Additional options, such as the partition key to invoke the {@link StoredProcedure} on.
   */
  public async execute<T>(params?: any[], options?: RequestOptions): Promise<CosmosResponse<T, StoredProcedure>>;
  public async execute<T>(params?: any[], options?: RequestOptions): Promise<CosmosResponse<T, StoredProcedure>> {
    const response = await this.client.executeStoredProcedure(this.url, params, options);
    return { body: response.result, headers: response.headers, ref: this };
  }
}
