// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FullOperationResponse } from "@azure/core-client";
import {
  AtomXmlSerializer,
  deserializeAtomXmlResponse,
  serializeToAtomXmlRequest,
} from "../util/atomXmlHelper";
import { getInteger, getString, getDate } from "../util/utils";

/**
 * Represents the metadata related to a service bus namespace.
 *
 */
export interface NamespaceProperties {
  /**
   * The time at which the namespace was created.
   */
  createdAt: Date;
  /**
   * The SKU/tier of the namespace.
   * "Basic", "Standard" and "Premium"
   */
  messagingSku: "Basic" | "Premium" | "Standard";
  /**
   * The last time at which the namespace was modified.
   */
  modifiedAt: Date;
  /**
   * Name of the namespace.
   */
  name: string;
  /**
   * Number of messaging units allocated for namespace.
   * Valid only for Premium namespaces.
   * messagingUnits would be set to `undefined` for Basic and Standard namespaces.
   */
  messagingUnits: number | undefined;
}

/**
 * @internal
 * Builds the namespace object from the raw json object gotten after deserializing the
 * response from the service
 */
export function buildNamespace(rawNamespace: Record<string, any>): NamespaceProperties {
  const messagingSku = <"Basic" | "Premium" | "Standard">(
    getString(rawNamespace["MessagingSKU"], "messagingSku")
  );
  return {
    createdAt: getDate(rawNamespace["CreatedTime"], "createdAt"),
    messagingSku: messagingSku,
    modifiedAt: getDate(rawNamespace["ModifiedTime"], "modifiedAt"),
    name: getString(rawNamespace["Name"], "name"),
    messagingUnits:
      messagingSku === "Premium"
        ? getInteger(rawNamespace["MessagingUnits"], "messagingUnits")
        : undefined,
  };
}

/**
 * @internal
 * Atom XML Serializer for Namespaces.
 */
export class NamespaceResourceSerializer implements AtomXmlSerializer {
  serialize(): Record<string, unknown> {
    return serializeToAtomXmlRequest("NamespaceProperties", {});
  }

  async deserialize(response: FullOperationResponse): Promise<FullOperationResponse> {
    return deserializeAtomXmlResponse(["name"], response);
  }
}
