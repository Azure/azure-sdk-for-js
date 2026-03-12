// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  rejectContinuationTokenForUnsupportedQueries,
  QueryTypes,
} from "../../../../../src/queryExecutionContext/QueryValidationHelper.js";
import { ErrorResponse } from "../../../../../src/request/ErrorResponse.js";

describe("QueryValidationHelper", () => {
  describe("rejectContinuationTokenForUnsupportedQueries", () => {
    describe("when continuation token is not provided", () => {
      it("should not throw for undefined continuation token", () => {
        assert.doesNotThrow(() => {
          rejectContinuationTokenForUnsupportedQueries(undefined, []);
        });
      });

      it("should not throw for undefined continuation token with all query types present", () => {
        assert.doesNotThrow(() => {
          rejectContinuationTokenForUnsupportedQueries(undefined, [
            QueryTypes.nonStreamingOrderBy(true),
            QueryTypes.groupBy(true),
            QueryTypes.unorderedDistinct(true),
            QueryTypes.hybridSearch(true),
          ]);
        });
      });

      it("should not throw for empty string continuation token", () => {
        assert.doesNotThrow(() => {
          rejectContinuationTokenForUnsupportedQueries("", []);
        });
      });

      it("should not throw for empty string continuation token with all query types present", () => {
        assert.doesNotThrow(() => {
          rejectContinuationTokenForUnsupportedQueries("", [
            QueryTypes.nonStreamingOrderBy(true),
            QueryTypes.groupBy(true),
            QueryTypes.unorderedDistinct(true),
            QueryTypes.hybridSearch(true),
          ]);
        });
      });
    });

    describe("when continuation token is provided", () => {
      const validToken = "valid-continuation-token";

      describe("for supported query types", () => {
        it("should not throw for regular queries", () => {
          assert.doesNotThrow(() => {
            rejectContinuationTokenForUnsupportedQueries(validToken, []);
          });
        });

        it("should not throw for streaming ORDER BY queries", () => {
          assert.doesNotThrow(() => {
            rejectContinuationTokenForUnsupportedQueries(validToken, [
              QueryTypes.nonStreamingOrderBy(false),
            ]);
          });
        });

        it("should not throw for ordered DISTINCT queries", () => {
          assert.doesNotThrow(() => {
            rejectContinuationTokenForUnsupportedQueries(validToken, [
              QueryTypes.unorderedDistinct(false),
            ]);
          });
        });
      });

      describe("for non-streaming ORDER BY queries", () => {
        it("should throw ErrorResponse for non-streaming ORDER BY", () => {
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(validToken, [
                QueryTypes.nonStreamingOrderBy(true),
              ]),
            ErrorResponse,
            "Continuation tokens are not supported for non-streaming ORDER BY queries",
          );
        });

        it("should include detailed error message for non-streaming ORDER BY", () => {
          try {
            rejectContinuationTokenForUnsupportedQueries(validToken, [
              QueryTypes.nonStreamingOrderBy(true),
            ]);
            assert.fail("Expected error to be thrown");
          } catch (error: any) {
            assert.instanceOf(error, ErrorResponse);
            assert.include(
              error.message,
              "Continuation tokens are not supported for non-streaming ORDER BY queries",
            );
            assert.include(
              error.message,
              "These queries must process all results to ensure correct ordering",
            );
            assert.include(
              error.message,
              "Consider removing the continuation token and using fetchAll()",
            );
          }
        });

        it("should prioritize non-streaming ORDER BY error over other query types", () => {
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(validToken, [
                QueryTypes.nonStreamingOrderBy(true),
                QueryTypes.groupBy(true),
                QueryTypes.unorderedDistinct(true),
                QueryTypes.hybridSearch(true),
              ]),
            ErrorResponse,
            "Continuation tokens are not supported for non-streaming ORDER BY queries",
          );
        });
      });

      describe("for GROUP BY queries", () => {
        it("should throw ErrorResponse for GROUP BY", () => {
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(validToken, [QueryTypes.groupBy(true)]),
            ErrorResponse,
            "Continuation tokens are not supported for GROUP BY queries",
          );
        });

        it("should include detailed error message for GROUP BY", () => {
          try {
            rejectContinuationTokenForUnsupportedQueries(validToken, [QueryTypes.groupBy(true)]);
            assert.fail("Expected error to be thrown");
          } catch (error: any) {
            assert.instanceOf(error, ErrorResponse);
            assert.include(
              error.message,
              "Continuation tokens are not supported for GROUP BY queries",
            );
            assert.include(
              error.message,
              "These queries must process all results to compute aggregations",
            );
            assert.include(
              error.message,
              "Consider removing the continuation token and using fetchAll()",
            );
          }
        });

        it("should prioritize GROUP BY error over unordered DISTINCT", () => {
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(validToken, [
                QueryTypes.nonStreamingOrderBy(false),
                QueryTypes.groupBy(true),
                QueryTypes.unorderedDistinct(true),
              ]),
            ErrorResponse,
            "Continuation tokens are not supported for GROUP BY queries",
          );
        });
      });

      describe("for unordered DISTINCT queries", () => {
        it("should throw ErrorResponse for unordered DISTINCT", () => {
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(validToken, [
                QueryTypes.unorderedDistinct(true),
              ]),
            ErrorResponse,
            "Continuation tokens are not supported for unordered DISTINCT queries",
          );
        });

        it("should include detailed error message for unordered DISTINCT", () => {
          try {
            rejectContinuationTokenForUnsupportedQueries(validToken, [
              QueryTypes.unorderedDistinct(true),
            ]);
            assert.fail("Expected error to be thrown");
          } catch (error: any) {
            assert.instanceOf(error, ErrorResponse);
            assert.include(
              error.message,
              "Continuation tokens are not supported for unordered DISTINCT queries",
            );
            assert.include(
              error.message,
              "These queries require tracking large amounts of duplicate data",
            );
            assert.include(
              error.message,
              "Consider removing the continuation token and using fetchAll()",
            );
            assert.include(error.message, "or use ordered DISTINCT queries which are supported");
          }
        });
      });

      describe("for hybrid search queries", () => {
        it("should throw ErrorResponse for hybrid search", () => {
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(validToken, [
                QueryTypes.hybridSearch(true),
              ]),
            ErrorResponse,
            "Continuation tokens are not supported for hybrid search queries",
          );
        });

        it("should include detailed error message for hybrid search", () => {
          try {
            rejectContinuationTokenForUnsupportedQueries(validToken, [
              QueryTypes.hybridSearch(true),
            ]);
            assert.fail("Expected error to be thrown");
          } catch (error: any) {
            assert.instanceOf(error, ErrorResponse);
            assert.include(
              error.message,
              "Continuation tokens are not supported for hybrid search queries",
            );
            assert.include(
              error.message,
              "Hybrid search queries require processing and ranking of all component query results",
            );
            assert.include(
              error.message,
              "to compute accurate Reciprocal Rank Fusion (RRF) scores",
            );
            assert.include(
              error.message,
              "Consider removing the continuation token and using fetchAll()",
            );
          }
        });
      });

      describe("error precedence", () => {
        it("should check first query type in array first", () => {
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(validToken, [
                QueryTypes.nonStreamingOrderBy(true),
                QueryTypes.groupBy(true),
                QueryTypes.unorderedDistinct(true),
                QueryTypes.hybridSearch(true),
              ]),
            ErrorResponse,
            /non-streaming ORDER BY/,
          );
        });

        it("should check GROUP BY when non-streaming ORDER BY is false", () => {
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(validToken, [
                QueryTypes.nonStreamingOrderBy(false),
                QueryTypes.groupBy(true),
                QueryTypes.unorderedDistinct(true),
                QueryTypes.hybridSearch(true),
              ]),
            ErrorResponse,
            /GROUP BY/,
          );
        });

        it("should check unordered DISTINCT when others are false", () => {
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(validToken, [
                QueryTypes.nonStreamingOrderBy(false),
                QueryTypes.groupBy(false),
                QueryTypes.unorderedDistinct(true),
                QueryTypes.hybridSearch(true),
              ]),
            ErrorResponse,
            /unordered DISTINCT/,
          );
        });

        it("should check hybrid search when others are false", () => {
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(validToken, [
                QueryTypes.nonStreamingOrderBy(false),
                QueryTypes.groupBy(false),
                QueryTypes.unorderedDistinct(false),
                QueryTypes.hybridSearch(true),
              ]),
            ErrorResponse,
            /hybrid search/,
          );
        });
      });

      describe("edge cases", () => {
        it("should handle whitespace-only continuation token as valid", () => {
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries("   ", [
                QueryTypes.nonStreamingOrderBy(true),
              ]),
            ErrorResponse,
            "Continuation tokens are not supported for non-streaming ORDER BY queries",
          );
        });

        it("should handle very long continuation token", () => {
          const longToken = "a".repeat(10000);
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(longToken, [QueryTypes.groupBy(true)]),
            ErrorResponse,
            "Continuation tokens are not supported for GROUP BY queries",
          );
        });

        it("should handle special characters in continuation token", () => {
          const specialToken = "token-with-!@#$%^&*()_+[]{}|;':\",./<>?";
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(specialToken, [
                QueryTypes.unorderedDistinct(true),
              ]),
            ErrorResponse,
            "Continuation tokens are not supported for unordered DISTINCT queries",
          );
        });

        it("should handle unicode characters in continuation token", () => {
          const unicodeToken = "token-with-🚀-unicode-中文-مرحبا";
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(unicodeToken, [
                QueryTypes.nonStreamingOrderBy(true),
              ]),
            ErrorResponse,
            "Continuation tokens are not supported for non-streaming ORDER BY queries",
          );
        });
      });

      describe("combination scenarios", () => {
        it("should validate empty array correctly", () => {
          assert.doesNotThrow(() => {
            rejectContinuationTokenForUnsupportedQueries(validToken, []);
          });
        });

        it("should validate all false query types correctly", () => {
          assert.doesNotThrow(() => {
            rejectContinuationTokenForUnsupportedQueries(validToken, [
              QueryTypes.nonStreamingOrderBy(false),
              QueryTypes.groupBy(false),
              QueryTypes.unorderedDistinct(false),
              QueryTypes.hybridSearch(false),
            ]);
          });
        });

        it("should validate mixed boolean values correctly", () => {
          // Only unordered DISTINCT is true
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(validToken, [
                QueryTypes.nonStreamingOrderBy(false),
                QueryTypes.groupBy(false),
                QueryTypes.unorderedDistinct(true),
              ]),
            ErrorResponse,
            /unordered DISTINCT/,
          );

          // Only GROUP BY is true
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(validToken, [
                QueryTypes.nonStreamingOrderBy(false),
                QueryTypes.groupBy(true),
                QueryTypes.unorderedDistinct(false),
              ]),
            ErrorResponse,
            /GROUP BY/,
          );

          // Only non-streaming ORDER BY is true
          assert.throws(
            () =>
              rejectContinuationTokenForUnsupportedQueries(validToken, [
                QueryTypes.nonStreamingOrderBy(true),
                QueryTypes.groupBy(false),
                QueryTypes.unorderedDistinct(false),
              ]),
            ErrorResponse,
            /non-streaming ORDER BY/,
          );
        });
      });
    });

    describe("error message content validation", () => {
      const token = "test-token";

      it("should provide actionable guidance in non-streaming ORDER BY error", () => {
        try {
          rejectContinuationTokenForUnsupportedQueries(token, [
            QueryTypes.nonStreamingOrderBy(true),
          ]);
          assert.fail("Expected error to be thrown");
        } catch (error: any) {
          const message = error.message;
          assert.include(message, "fetchAll()");
          assert.include(message, "complete results");
          assert.include(message, "correct ordering");
          assert.include(message, "intermediate state");
        }
      });

      it("should provide actionable guidance in GROUP BY error", () => {
        try {
          rejectContinuationTokenForUnsupportedQueries(token, [QueryTypes.groupBy(true)]);
          assert.fail("Expected error to be thrown");
        } catch (error: any) {
          const message = error.message;
          assert.include(message, "fetchAll()");
          assert.include(message, "complete results");
          assert.include(message, "compute aggregations");
          assert.include(message, "intermediate state");
        }
      });

      it("should provide actionable guidance in unordered DISTINCT error", () => {
        try {
          rejectContinuationTokenForUnsupportedQueries(token, [QueryTypes.unorderedDistinct(true)]);
          assert.fail("Expected error to be thrown");
        } catch (error: any) {
          const message = error.message;
          assert.include(message, "fetchAll()");
          assert.include(message, "ordered DISTINCT queries which are supported");
          assert.include(message, "tracking large amounts of duplicate data");
          assert.include(message, "not practical");
        }
      });

      it("should provide actionable guidance in hybrid search error", () => {
        try {
          rejectContinuationTokenForUnsupportedQueries(token, [QueryTypes.hybridSearch(true)]);
          assert.fail("Expected error to be thrown");
        } catch (error: any) {
          const message = error.message;
          assert.include(message, "fetchAll()");
          assert.include(message, "complete results");
          assert.include(message, "Reciprocal Rank Fusion (RRF) scores");
          assert.include(message, "intermediate state");
        }
      });
    });

    describe("QueryTypes factory functions", () => {
      it("should create proper query type descriptors", () => {
        const nonStreaming = QueryTypes.nonStreamingOrderBy(true);
        assert.equal(nonStreaming.name, "NonStreamingOrderBy");
        assert.equal(nonStreaming.isPresent, true);
        assert.include(nonStreaming.errorMessage, "non-streaming ORDER BY");

        const groupBy = QueryTypes.groupBy(false);
        assert.equal(groupBy.name, "GroupBy");
        assert.equal(groupBy.isPresent, false);
        assert.include(groupBy.errorMessage, "GROUP BY");

        const unorderedDistinct = QueryTypes.unorderedDistinct(true);
        assert.equal(unorderedDistinct.name, "UnorderedDistinct");
        assert.equal(unorderedDistinct.isPresent, true);
        assert.include(unorderedDistinct.errorMessage, "unordered DISTINCT");

        const hybridSearch = QueryTypes.hybridSearch(false);
        assert.equal(hybridSearch.name, "HybridSearch");
        assert.equal(hybridSearch.isPresent, false);
        assert.include(hybridSearch.errorMessage, "hybrid search");
      });
    });
  });
});
