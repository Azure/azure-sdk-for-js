// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlQuerySpec, SqlParameter, JSONArray, JSONObject } from "../queryExecutionContext";
import { TypeMarker } from "./enums/TypeMarker";

export interface EncryptionSqlParameter extends SqlParameter {
  type?: TypeMarker;
  path: string;
}

/**
 * Represents a builder class for building encrypted parameters in parametrized query.
 */
export class EncryptionQueryBuilder {
  private query: string;
  private parameters?: EncryptionSqlParameter[];

  constructor(query: string) {
    this.query = query;
    this.parameters = [];
  }
  /** Adds boolean parameter to the query */
  public addBooleanParameter(name: string, value: boolean, path: string): void {
    this.parameters.push({ name: name, value: value, type: TypeMarker.Boolean, path: path });
  }
  /** Adds integer parameter to query  */
  public addIntegerParameter(name: string, value: number, path: string): void {
    this.parameters.push({ name: name, value: value, type: TypeMarker.Long, path: path });
  }
  /** Adds float parameter to query */
  public addFloatParameter(name: string, value: number, path: string): void {
    this.parameters.push({ name: name, value: value, type: TypeMarker.Double, path: path });
  }
  /** Adds string parameter to query */
  public addStringParameter(name: string, value: string, path: string): void {
    this.parameters.push({ name: name, value: value, type: TypeMarker.String, path: path });
  }
  /** Adds array parameter to query */
  public addArrayParameter(name: string, value: JSONArray, path: string): void {
    this.parameters.push({ name: name, value: value, path: path });
  }
  /** Adds object parameter to query */
  public addObjectParameter(name: string, value: JSONObject, path: string): void {
    this.parameters.push({ name: name, value: value, path: path });
  }
  /** Adds date parameter to query */
  public addDateParameter(name: string, value: Date, path: string): void {
    const date = value.toISOString();
    this.parameters.push({
      name: name,
      value: date,
      type: TypeMarker.String,
      path: path,
    });
  }
  /*
   * @internal
   */
  public toEncryptionSqlQuerySpec(): SqlQuerySpec {
    return {
      query: this.query,
      parameters: this.parameters,
    };
  }
}
