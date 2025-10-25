// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { validateContinuationTokenUsage } from "../../../../../src/queryExecutionContext/QueryValidationHelper.js";
import { ErrorResponse } from "../../../../../src/request/ErrorResponse.js";

describe("QueryValidationHelper", () => {
  describe("validateContinuationTokenUsage", () => {
    describe("when continuation token is not provided", () => {
      it("should not throw for undefined continuation token", () => {
        assert.doesNotThrow(() => {
          validateContinuationTokenUsage(undefined, false, false, false, false);
        });
      });

      it("should not throw for undefined continuation token with all query types true", () => {
        assert.doesNotThrow(() => {
          validateContinuationTokenUsage(undefined, true, true, true, true);
        });
      });

      it("should not throw for empty string continuation token", () => {
        assert.doesNotThrow(() => {
          validateContinuationTokenUsage("", false, false, false, false);
        });
      });

      it("should not throw for empty string continuation token with all query types true", () => {
        assert.doesNotThrow(() => {
          validateContinuationTokenUsage("", true, true, true, true);
        });
      });
    });

    describe("when continuation token is provided", () => {
      const validToken = "valid-continuation-token";

      describe("for supported query types", () => {
        it("should not throw for regular queries", () => {
          assert.doesNotThrow(() => {
            validateContinuationTokenUsage(validToken, false, false, false, false);
          });
        });

        it("should not throw for streaming ORDER BY queries", () => {
          assert.doesNotThrow(() => {
            validateContinuationTokenUsage(validToken, false, false, false, false);
          });
        });

        it("should not throw for ordered DISTINCT queries", () => {
          assert.doesNotThrow(() => {
            validateContinuationTokenUsage(validToken, false, false, false, false);
          });
        });
      });

      describe("for non-streaming ORDER BY queries", () => {
        it("should throw ErrorResponse for non-streaming ORDER BY", () => {
          assert.throws(
            () => validateContinuationTokenUsage(validToken, true, false, false, false),
            ErrorResponse,
            "Continuation tokens are not supported for non-streaming ORDER BY queries",
          );
        });

        it("should include detailed error message for non-streaming ORDER BY", () => {
          try {
            validateContinuationTokenUsage(validToken, true, false, false, false);
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
            () => validateContinuationTokenUsage(validToken, true, true, true, true),
            ErrorResponse,
            "Continuation tokens are not supported for non-streaming ORDER BY queries",
          );
        });
      });

      describe("for GROUP BY queries", () => {
        it("should throw ErrorResponse for GROUP BY", () => {
          assert.throws(
            () => validateContinuationTokenUsage(validToken, false, true, false, false),
            ErrorResponse,
            "Continuation tokens are not supported for GROUP BY queries",
          );
        });

        it("should include detailed error message for GROUP BY", () => {
          try {
            validateContinuationTokenUsage(validToken, false, true, false, false);
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
            () => validateContinuationTokenUsage(validToken, false, true, true),
            ErrorResponse,
            "Continuation tokens are not supported for GROUP BY queries",
          );
        });
      });

      describe("for unordered DISTINCT queries", () => {
        it("should throw ErrorResponse for unordered DISTINCT", () => {
          assert.throws(
            () => validateContinuationTokenUsage(validToken, false, false, true, false),
            ErrorResponse,
            "Continuation tokens are not supported for unordered DISTINCT queries",
          );
        });

        it("should include detailed error message for unordered DISTINCT", () => {
          try {
            validateContinuationTokenUsage(validToken, false, false, true, false);
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
            () => validateContinuationTokenUsage(validToken, false, false, false, true),
            ErrorResponse,
            "Continuation tokens are not supported for hybrid search queries",
          );
        });

        it("should include detailed error message for hybrid search", () => {
          try {
            validateContinuationTokenUsage(validToken, false, false, false, true);
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
        it("should check non-streaming ORDER BY first", () => {
          assert.throws(
            () => validateContinuationTokenUsage(validToken, true, true, true, true),
            ErrorResponse,
            /non-streaming ORDER BY/,
          );
        });

        it("should check GROUP BY second when non-streaming ORDER BY is false", () => {
          assert.throws(
            () => validateContinuationTokenUsage(validToken, false, true, true, true),
            ErrorResponse,
            /GROUP BY/,
          );
        });

        it("should check unordered DISTINCT third", () => {
          assert.throws(
            () => validateContinuationTokenUsage(validToken, false, false, true, true),
            ErrorResponse,
            /unordered DISTINCT/,
          );
        });

        it("should check hybrid search last", () => {
          assert.throws(
            () => validateContinuationTokenUsage(validToken, false, false, false, true),
            ErrorResponse,
            /hybrid search/,
          );
        });
      });

      describe("edge cases", () => {
        it("should handle whitespace-only continuation token as valid", () => {
          assert.throws(
            () => validateContinuationTokenUsage("   ", true, false, false),
            ErrorResponse,
            "Continuation tokens are not supported for non-streaming ORDER BY queries",
          );
        });

        it("should handle very long continuation token", () => {
          const longToken = "a".repeat(10000);
          assert.throws(
            () => validateContinuationTokenUsage(longToken, false, true, false),
            ErrorResponse,
            "Continuation tokens are not supported for GROUP BY queries",
          );
        });

        it("should handle special characters in continuation token", () => {
          const specialToken = "token-with-!@#$%^&*()_+[]{}|;':\",./<>?";
          assert.throws(
            () => validateContinuationTokenUsage(specialToken, false, false, true),
            ErrorResponse,
            "Continuation tokens are not supported for unordered DISTINCT queries",
          );
        });

        it("should handle unicode characters in continuation token", () => {
          const unicodeToken = "token-with-🚀-unicode-中文-مرحبا";
          assert.throws(
            () => validateContinuationTokenUsage(unicodeToken, true, false, false),
            ErrorResponse,
            "Continuation tokens are not supported for non-streaming ORDER BY queries",
          );
        });
      });

      describe("combination scenarios", () => {
        it("should validate multiple false flags correctly", () => {
          assert.doesNotThrow(() => {
            validateContinuationTokenUsage(validToken, false, false, false, false);
          });
        });

        it("should validate mixed boolean values correctly", () => {
          // Only unordered DISTINCT is true
          assert.throws(
            () => validateContinuationTokenUsage(validToken, false, false, true),
            ErrorResponse,
            /unordered DISTINCT/,
          );

          // Only GROUP BY is true
          assert.throws(
            () => validateContinuationTokenUsage(validToken, false, true, false),
            ErrorResponse,
            /GROUP BY/,
          );

          // Only non-streaming ORDER BY is true
          assert.throws(
            () => validateContinuationTokenUsage(validToken, true, false, false),
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
          validateContinuationTokenUsage(token, true, false, false, false);
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
          validateContinuationTokenUsage(token, false, true, false, false);
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
          validateContinuationTokenUsage(token, false, false, true, false);
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
          validateContinuationTokenUsage(token, false, false, false, true);
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
  });
});
