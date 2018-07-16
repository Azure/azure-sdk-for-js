import { UriFactory } from "../../common";
import { DocumentClient } from "../../documentclient";
import { CosmosResponse, RequestOptions } from "../../request";
import { Container } from "../Container";
import { StoredProcedureDefinition } from "./StoredProcedureDefinition";
import { StoredProcedureResponse } from "./StoredProcedureResponse";

export class StoredProcedure {
  private client: DocumentClient;
  public get url() {
    return UriFactory.createStoredProcedureUri(this.container.database.id, this.container.id, this.id);
  }
  constructor(public readonly container: Container, public readonly id: string) {
    this.client = this.container.database.client.documentClient;
  }

  public async read(options?: RequestOptions): Promise<StoredProcedureResponse> {
    const response = await this.client.readStoredProcedure(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, storedProcedure: this };
  }

  public async replace(body: StoredProcedureDefinition, options?: RequestOptions): Promise<StoredProcedureResponse> {
    const response = await this.client.replaceStoredProcedure(this.url, body, options);
    return { body: response.result, headers: response.headers, ref: this, storedProcedure: this };
  }

  public async delete(options?: RequestOptions): Promise<StoredProcedureResponse> {
    const response = await this.client.deleteStoredProcedure(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, storedProcedure: this };
  }

  public async execute(params?: any[], options?: RequestOptions): Promise<CosmosResponse<any, StoredProcedure>>;
  public async execute<T>(params?: any[], options?: RequestOptions): Promise<CosmosResponse<T, StoredProcedure>> {
    const response = await this.client.executeStoredProcedure(this.url, params, options);
    return { body: response.result, headers: response.headers, ref: this };
  }
}
