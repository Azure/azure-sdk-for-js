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
import { CosmosEncryptedNumber, CosmosEncryptedNumberType } from "./CosmosEncryptedNumber";

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
  /**
   * Adds parameter to query
   */
  public addParameter(
    name: string,
    value: boolean | string | null | JSONArray | JSONObject | Date | CosmosEncryptedNumber,
    path: string,
  ): void {
    if (value === null) {
      this.parameters.push({ name: name, value: null, path: path });
      return;
    }
    switch (true) {
      case typeof value === "boolean":
        this.parameters.push({
          name,
          value,
          type: TypeMarker.Boolean,
          path,
        });
        break;
      case typeof value === "string":
        this.parameters.push({
          name,
          value,
          type: TypeMarker.String,
          path,
        });
        break;
      case value instanceof Date: {
        const date = value.toISOString();
        this.parameters.push({
          name: name,
          value: date,
          type: TypeMarker.String,
          path: path,
        });
        break;
      }
      case isCosmosEncryptedNumber(value): {
        const num = value.value;
        if (value.numberType === CosmosEncryptedNumberType.Integer) {
          this.parameters.push({
            name,
            value: num,
            type: TypeMarker.Long,
            path,
          });
        } else if (value.numberType === CosmosEncryptedNumberType.Float) {
          this.parameters.push({
            name,
            value: num,
            type: TypeMarker.Double,
            path,
          });
        }
        break;
      }
      case Array.isArray(value):
        this.parameters.push({ name, value, path });
        break;
      case typeof value === "object":
        this.parameters.push({ name, value, path });
        break;
      default:
        throw new Error(`Unsupported parameter type for parameter "${name}": ${typeof value}`);
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

function isCosmosEncryptedNumber(val: any): val is CosmosEncryptedNumber {
  return (
    val !== null &&
    typeof val === "object" &&
    typeof val.value === "number" &&
    typeof val.numberType === "string" &&
    (val.numberType === CosmosEncryptedNumberType.Integer ||
      val.numberType === CosmosEncryptedNumberType.Float)
  );
}
