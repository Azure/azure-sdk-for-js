// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AtomXmlSerializer,
  serializeToAtomXmlRequest,
  deserializeAtomXmlResponse
} from "../util/atomXmlHelper";
import { HttpOperationResponse } from "@azure/core-http";
import { getString } from "../util/utils";

// TODO: Add docs for the attributes and for the interface
export interface NamespaceProperties {
  createdOn: string;
  messagingSku: string;
  updatedOn: string;
  name: string;
  namespaceType: string;
}

/**
 * @internal
 * @ignore
 * Builds the namespace object from the raw json object gotten after deserializing the
 * response from the service
 * @param rawNamespace
 */
export function buildNamespace(rawNamespace: any): NamespaceProperties {
  return {
    createdOn: getString(rawNamespace["CreatedTime"], "createdOn"),
    messagingSku: getString(rawNamespace["MessagingSKU"], "messagingSku"),
    updatedOn: getString(rawNamespace["ModifiedTime"], "updatedOn"),
    name: getString(rawNamespace["Name"], "name"),
    namespaceType: getString(rawNamespace["NamespaceType"], "namespaceType")
  };
}

/**
 * @internal
 * @ignore
 * Atom XML Serializer for Queues.
 */
export class NamespaceResourceSerializer implements AtomXmlSerializer {
  serialize(): object {
    return serializeToAtomXmlRequest("NamespaceProperties", {});
  }

  async deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    return deserializeAtomXmlResponse(["Name"], response);
  }
}
