// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface TestDocument {
  name: string;
  content: string;
}

export function createTestDocument(name: string, content: string): TestDocument {
  return {
    name,
    content,
  };
}
