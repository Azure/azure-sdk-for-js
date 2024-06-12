// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface TestDocument {
  name: string;
  content: string;
}

export function createTestDocument(name: string, content: string): TestDocument {
  return {
    name,
    content
  };
}