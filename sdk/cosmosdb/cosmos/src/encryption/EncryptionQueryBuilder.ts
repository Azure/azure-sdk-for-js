// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SqlQuerySpec, SqlParameter } from "../queryExecutionContext";
import { TypeMarker } from "./enums/TypeMarker";
/**
 * A wrapper class containing the info about the client encryption key and key store provider to wrap and unwrap the key.
 */

interface EncryptionSqlParameter extends SqlParameter {
  type: TypeMarker;
  path: string;
}

export class EncryptionQueryBuilder {
  private query: string;
  private parameters?: EncryptionSqlParameter[];

  constructor(query: string) {
    this.query = query;
    this.parameters = [];
  }

  public addBooleanParameter(name: string, value: boolean, path: string) {
    this.parameters.push({ name: name, value: value, type: TypeMarker.Boolean, path: path });
  }

  public addIntegerParameter(name: string, value: number, path: string) {
    this.parameters.push({ name: name, value: value, type: TypeMarker.Double, path: path });
  }

  public addFloatParameter(name: string, value: number, path: string) {
    this.parameters.push({ name: name, value: value, type: TypeMarker.Long, path: path });
  }

  public addStringParameter(name: string, value: string, path: string) {
    this.parameters.push({ name: name, value: value, type: TypeMarker.String, path: path });
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
