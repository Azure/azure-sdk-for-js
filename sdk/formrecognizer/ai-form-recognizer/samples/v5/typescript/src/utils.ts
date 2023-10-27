// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentSpan } from "@azure/ai-form-recognizer";

/**
 * Gets the text slices that a set of spans refer to from a document's content.
 *
 * @param content - the `content` field of an analyze result (reading-order concatenated text)
 * @param spans - an iterable of DocumentSpan objects that will be used to slice the content
 */
export function* getTextOfSpans(content: string, spans: Iterable<DocumentSpan>): Iterable<string> {
  for (const span of spans) {
    yield content.slice(span.offset, span.offset + span.length);
  }
}
