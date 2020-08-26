// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Represents a Key Vault Certificate Id and its parsed contents.
 */
export interface ParsedCertificateId {
  /**
   * The originally received Id.
   */
  sourceId: string;

  /**
   * The Key Vault Certificate unique Id (a URL).
   */
  vaultUrl: string;

  /**
   * The version of Key Vault Certificate. Might be undefined.
   */
  version?: string;

  /**
   * The name of the Key Vault Certificate.
   */
  name: string;
}

/**
 * Parses the string Id from a Key Vault Certificate into the ParsedCertificateId type.
 */
export function parseCertificateId(id: string): ParsedCertificateId {
  const urlParts = id.split("/");
  const collection = urlParts[3];

  return {
    sourceId: id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
