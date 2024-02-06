// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Entity, StringIndexType, TextAnalysisClient } from "../../../src";
import { assert } from "chai";

/**
 * calls the recognizePiiEntities on the input document and checks wether the
 * offset and length of the first pii entity matches the expected ones.
 * @param client - a text analysis client
 * @param doc - an input document to be processed by the Cognitive Language Service
 * @param stringIndexType - the string index type used by the service to calculate
 *                          the offset and length of the entity text
 * @param offset - the expected offset of the first entity in the input document
 * @param length - the expected length of the first entity in the input document
 * @internal
 */
export async function checkOffsetAndLength(
  client: TextAnalysisClient,
  doc: string,
  stringIndexType: StringIndexType,
  offset: number,
  length: number,
  callback?: (doc: string, entity: Entity, offset: number, length: number) => unknown
): Promise<unknown> {
  const [result] = await client.analyze(
    "PiiEntityRecognition",
    [{ id: "0", text: doc, language: "en" }],
    {
      stringIndexType: stringIndexType,
    }
  );
  if (!result.error) {
    const entity = result.entities[0];
    assert.equal(entity.offset, offset);
    assert.equal(entity.length, length);
    return callback?.(doc, entity, offset, length);
  }
  return;
}

/**
 * Checks whether the offset calculated by the service matches that calculated by String.substr.
 * @param doc - an input document to be processed by the Cognitive Language Service service
 * @param entity - the first recognized pii entity in {@link doc}
 * @param offset - the expected offset of the first entity in the input document
 * @param length - the expected length of the first entity in the input document
 * @internal
 */
export function checkEntityTextOffset(
  doc: string,
  entity: Entity,
  offset: number,
  length: number
): void {
  assert.equal(doc.substr(offset, length), entity.text);
}
