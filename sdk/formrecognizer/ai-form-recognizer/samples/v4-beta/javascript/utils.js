// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Gets the text slices that a set of spans refer to from a document's content.
 *
 * @param content - the `content` field of an analyze result (reading-order concatenated text)
 * @param spans - an iterable of DocumentSpan objects that will be used to slice the content
 */
function* getTextOfSpans(content, spans) {
  for (const span of spans) {
    yield content.slice(span.offset, span.offset + span.length);
  }
}

module.exports = { getTextOfSpans };
