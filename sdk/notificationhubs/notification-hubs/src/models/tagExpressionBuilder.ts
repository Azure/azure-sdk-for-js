// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Creates a tag expression from a list of tags as a || expression.
 * @param tags - The tags to create the || expression
 * @returns The tag expression made from the array of strings into an || expression.
 */
export function createTagExpression(tags: string[]): string {
  return tags.join("||");
}
