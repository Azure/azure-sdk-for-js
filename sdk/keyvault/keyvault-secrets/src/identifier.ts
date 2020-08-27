// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./generated/utils";

/**
 * Represents a Key Vault Secret Id and its parsed contents.
 */
export interface ParsedSecretId {
  /**
   * The source ID that was parsed.
   */
  sourceId: string;

  /**
   * The Key Vault Secret unique Id (an URl).
   */
  vaultUrl: string;

  /**
   * The version of Key Vault Secret. Might be undefined.
   */
  version?: string;

  /**
   * The name of the Key Vault Secret.
   */
  name: string;
}

/**
 * Parses the string Id from a Key Vault Secret into the ParsedSecretId type.
 */
export function parseSecretId(id: string): ParsedSecretId {
  const urlParts = id.split("/");
  const collection = urlParts[3];

  return {
    sourceId: id,
    ...parseKeyvaultIdentifier(collection, id)
  };
}
