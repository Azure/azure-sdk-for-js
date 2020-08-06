// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { OpinionSentiment } from "../../src/index";

export function assertOpinionsEqual(left : OpinionSentiment, right : OpinionSentiment): void {
    assert.equal(left.sentiment, right.sentiment);
    assert.equal(left.confidenceScores.positive, right.confidenceScores.positive);
    assert.equal(left.confidenceScores.neutral, right.confidenceScores.neutral);
    assert.equal(left.confidenceScores.negative, right.confidenceScores.negative);
    assert.equal(left.text, right.text);
    assert.equal(left.isNegated, right.isNegated);
}
