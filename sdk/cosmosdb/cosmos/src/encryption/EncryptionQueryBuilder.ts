// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SqlQuerySpec, SqlParameter, JSONArray, JSONObject } from "../queryExecutionContext";
import { TypeMarker } from "./enums/TypeMarker";

export interface EncryptionSqlParameter extends SqlParameter {
  type?: TypeMarker;
  path: string;
}

export class EncryptionQueryBuilder {
  private query: string;
  private parameters?: EncryptionSqlParameter[];

  constructor(query: string) {
    this.query = query;
    this.parameters = [];
  }

  public addBooleanParameter(name: string, value: boolean, path: string): void {
    this.parameters.push({ name: name, value: value, type: TypeMarker.Boolean, path: path });
  }
  public addIntegerParameter(name: string, value: number, path: string): void {
    this.parameters.push({ name: name, value: value, type: TypeMarker.Long, path: path });
  }

  public addFloatParameter(name: string, value: number, path: string): void {
    this.parameters.push({ name: name, value: value, type: TypeMarker.Double, path: path });
  }
  public addStringParameter(name: string, value: string, path: string): void {
    this.parameters.push({ name: name, value: value, type: TypeMarker.String, path: path });
  }

  public addArrayParameter(name: string, value: JSONArray, path: string): void {
    this.parameters.push({ name: name, value: value, path: path });
  }

  public addObjectParameter(name: string, value: JSONObject, path: string): void {
    this.parameters.push({ name: name, value: value, path: path });
  }

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
