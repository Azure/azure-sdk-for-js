// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SqlQuerySpec, SqlParameter } from "../queryExecutionContext";
import { TypeMarker } from "./enums/TypeMarker";

export interface EncryptionSqlParameter extends SqlParameter {
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
  /*
   * @internal
   */
  public toEncryptionSqlQuerySpec(): SqlQuerySpec {
    return {
      query: this.query,
      parameters: this.parameters,
    };
  }

  /**
   * @internal
   * @returns deep copy of queryBuilder object to avoid modification in queryBuilder passed by the user
   */
  public copyQueryBuilder(): EncryptionQueryBuilder {
    const copiedQueryBuilder = new EncryptionQueryBuilder(this.query);
    if (this.parameters) {
      this.parameters.forEach((param) => {
        copiedQueryBuilder.parameters.push({ ...param });
      });
    }
    return copiedQueryBuilder;
  }
}
