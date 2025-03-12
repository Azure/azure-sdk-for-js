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

  public addParameter(
    name: string,
    value: boolean | string | JSONArray | JSONObject | Date | null,
    path: string,
  ): void;
  public addParameter(name: string, value: number, dbType: "long" | "double", path: string): void;
  public addParameter(
    name: string,
    value: boolean | string | JSONArray | JSONObject | Date | null | number,
    kindOrPath: string,
    pathOrUndefined?: string,
  ): void {
    const path = pathOrUndefined === undefined ? kindOrPath : pathOrUndefined;
    const kind = pathOrUndefined === undefined ? undefined : kindOrPath;
    if (path === undefined) {
      throw new Error("Path is required");
    }

    switch (typeof value) {
      case "boolean":
        this.parameters?.push({ name, value, type: TypeMarker.Boolean, path });
        break;
      case "number":
        if (kind === "double") {
          this.parameters?.push({ name, value, type: TypeMarker.Double, path });
        } else {
          this.parameters?.push({ name, value, type: TypeMarker.Long, path });
        }
        break;
      case "string":
        this.parameters?.push({ name, value, type: TypeMarker.String, path });
        break;
      case "object":
        if (value instanceof Date) {
          const date = value.toISOString();
          this.parameters?.push({ name, value: date, type: TypeMarker.String, path });
        } else if (value === null) {
          this.parameters?.push({ name, value: null, path });
        }
        break;
      default:
        this.parameters?.push({ name, value, path });
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
