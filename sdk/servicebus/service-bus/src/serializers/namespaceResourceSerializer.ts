// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse } from "@azure/core-http";
import {
  AtomXmlSerializer,
  deserializeAtomXmlResponse,
  serializeToAtomXmlRequest
} from "../util/atomXmlHelper";
import { getInteger, getString, getDate } from "../util/utils";

/**
 * Represents the metadata related to a service bus namespace.
 *
 * @export
 * @interface NamespaceProperties
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
  messagingSku: string;
  /**
   * The last time at which the namespace was modified.
   */
  modifiedAt: Date;
  /**
   * Name of the namespace.
   */
  name: string;
  /**
   * Type of entities present in the namespace.
   */
  namespaceType: string;
  /**
   * Number of messaging units allocated for namespace.
   * Valid only for Premium namespaces.
   * messagingUnits would be set to `undefined` for Basic and Standard namespaces.
   */
  messagingUnits: number | undefined;
}

/**
 * @internal
 * @ignore
 * Builds the namespace object from the raw json object gotten after deserializing the
 * response from the service
 * @param rawNamespace
 */
export function buildNamespace(rawNamespace: any): NamespaceProperties {
  const messagingSku = getString(rawNamespace["MessagingSKU"], "messagingSku");
  return {
    createdAt: getDate(rawNamespace["CreatedTime"], "createdAt"),
    messagingSku: messagingSku,
    modifiedAt: getDate(rawNamespace["ModifiedTime"], "modifiedAt"),
    name: getString(rawNamespace["Name"], "name"),
    namespaceType: getString(rawNamespace["NamespaceType"], "namespaceType"),
    messagingUnits:
      messagingSku === "Premium"
        ? getInteger(rawNamespace["MessagingUnits"], "messagingUnits")
        : undefined
  };
}

/**
 * @internal
 * @ignore
 * Atom XML Serializer for Namespaces.
 */
export class NamespaceResourceSerializer implements AtomXmlSerializer {
  serialize(): object {
    return serializeToAtomXmlRequest("NamespaceProperties", {});
  }

  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    return deserializeAtomXmlResponse(["name"], response);
  }
}
