// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { generate_uuid } from "rhea-promise";
/**
 * Provides a uniue name by appending a string guid to the given string in the following format:
 * `{name}-{uuid}`.
 * @param name The nme of the entity
 */
export function getUniqueName(name: string): string {
  if (typeof name !== "string") {
    throw new Error("name is a required parameter of type 'string'.");
  }
  return `${name}-${generate_uuid()}`;
}
