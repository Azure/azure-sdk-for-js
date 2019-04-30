import { ClientContext } from "../../ClientContext";
import { Helper, UriFactory } from "../../common";
import { RequestOptions } from "../../request";
import { Container } from "../Container";
import { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition";
import { UserDefinedFunctionResponse } from "./UserDefinedFunctionResponse";

/**
 * Used to read, replace, or delete a specified User Definied Function by id.
 *
 * @see {@link UserDefinedFunction} to create, upsert, query, read all User Defined Functions.
 */
export class UserDefinedFunction {
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url() {
    return UriFactory.createUserDefinedFunctionUri(this.container.database.id, this.container.id, this.id);
  }
  /**
   * @hidden
   * @param container The parent {@link Container}.
   * @param id The id of the given {@link UserDefinedFunction}.
   */
  constructor(
    public readonly container: Container,
    public readonly id: string,
    private readonly clientContext: ClientContext
  ) {}

  /**
   * Read the {@link UserDefinedFunctionDefinition} for the given {@link UserDefinedFunction}.
   * @param options
   */
  public async read(options?: RequestOptions): Promise<UserDefinedFunctionResponse> {
    const path = Helper.getPathFromLink(this.url);
    const id = Helper.getIdFromLink(this.url);

    const response = await this.clientContext.read<UserDefinedFunctionDefinition>(path, "udfs", id, undefined, options);
    return { body: response.result, headers: response.headers, ref: this, userDefinedFunction: this, udf: this };
  }

  /**
   * Replace the given {@link UserDefinedFunction} with the specified {@link UserDefinedFunctionDefinition}.
   * @param body The specified {@link UserDefinedFunctionDefinition}.
   * @param options
   */
  public async replace(
    body: UserDefinedFunctionDefinition,
    options?: RequestOptions
  ): Promise<UserDefinedFunctionResponse> {
    if (body.body) {
      body.body = body.body.toString();
    }

    const err = {};
    if (!Helper.isResourceValid(body, err)) {
      throw err;
    }

    const path = Helper.getPathFromLink(this.url);
    const id = Helper.getIdFromLink(this.url);

    const response = await this.clientContext.replace<UserDefinedFunctionDefinition>(
      body,
      path,
      "udfs",
      id,
      undefined,
      options
    );
    return { body: response.result, headers: response.headers, ref: this, userDefinedFunction: this, udf: this };
  }

  /**
   * Delete the given {@link UserDefined}.
   * @param options
   */
  public async delete(options?: RequestOptions): Promise<UserDefinedFunctionResponse> {
    const path = Helper.getPathFromLink(this.url);
    const id = Helper.getIdFromLink(this.url);

    const response = await this.clientContext.delete(path, "udfs", id, undefined, options);
    return { body: response.result, headers: response.headers, ref: this, userDefinedFunction: this, udf: this };
  }
}
