// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface Document {
  name: string;
  content: string;
}

export function createTestDocument(name: string, content: string): Document {
  return {
    name,
    content,
  };
}

export const documents1 = [createTestDocument("Document1.txt", "First english test document")];

export const documents2 = [
  createTestDocument("Document1.txt", "First english test file"),
  createTestDocument("File2.txt", "Second english test file"),
];

export const documents3 = [createTestDocument("validGlossary.csv", "test, glossaryTest")];

export const documents4 = [
  createTestDocument("Document1.txt", "First english test file"),
  createTestDocument("File2.jpg", "jpg"),
];

export const documents5 = [createTestDocument("Document1.txt", "")];
export const documents6 = createDummyTestDocuments(5);
export const documents7 = createDummyTestDocuments(3);
export const documents8 = createDummyTestDocuments(2);
export const documents9 = createDummyTestDocuments(20);
export const documents10 = createDummyTestDocuments(1);

export function createDummyTestDocuments(count: number): Document[] {
  const result: Document[] = [];
  for (let i = 0; i < count; i++) {
    const fileName: string = `File_${i}.txt`;
    const text: string = "some random text";
    result.push(createTestDocument(fileName, text));
  }
  return result;
}
