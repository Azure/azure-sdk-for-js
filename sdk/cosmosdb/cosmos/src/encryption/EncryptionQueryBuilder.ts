// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SqlQuerySpec,
  SqlParameter,
  JSONArray,
  JSONObject,
  JSONValue,
} from "../queryExecutionContext";
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

  public addNumericParameter(
    name: string,
    value: number,
    dbType: "float" | "double",
    path: string,
  ): void {
    this.parameters?.push({
      name,
      value,
      type: dbType === "float" ? TypeMarker.Double : TypeMarker.Long,
      path,
    });
  }

  // Alternatively you can remove all overloads (except for last one) and expose a single method
  // with a union type for the value parameter (comment out this block and see how it impacts the experience)
  public addParameter(name: string, value: boolean, path: string): void;
  public addParameter(name: string, value: string, path: string): void;
  public addParameter(name: string, value: JSONArray, path: string): void;
  public addParameter(name: string, value: JSONObject, path: string): void;
  public addParameter(name: string, value: Date, path: string): void;
  public addParameter(name: string, value: null, path: string): void;

  public addParameter(
    name: string,
    value: boolean | string | JSONArray | JSONObject | Date | null,
    path: string,
  ): void {
    switch (typeof value) {
      case "boolean":
        this.parameters?.push({ name, value, type: TypeMarker.Boolean, path });
        break;
      case "string":
        this.parameters?.push({ name, value, type: TypeMarker.String, path });
        break;
      case "object":
        if (value instanceof Date) {
          // convenience for dates
          const date = value.toISOString();
          this.parameters?.push({ name, value: date, type: TypeMarker.String, path });
        } else if (value === null) {
          // typeof null === object
          this.parameters?.push({ name, value: null, path });
        }
        break;
      default:
        this.parameters?.push({ name, value, path }); // for JSONObject, JSONArray, unencrypted etc
        break;
    }
  }

  /** Adds unencrypted parameter to query */
  public addUnencryptedParameter(name: string, value: JSONValue, path: string): void {
    this.parameters.push({ name: name, value: value, path: path });
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
