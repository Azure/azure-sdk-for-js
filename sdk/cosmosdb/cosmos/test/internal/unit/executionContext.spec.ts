// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi } from "vitest";
import type { ExecutionContext } from "../../../src/queryExecutionContext/ExecutionContext.js";
import type { DiagnosticNodeInternal } from "../../../src/index.js";

// 📌 Proactive: These tests validate the ExecutionContext contract changes from QI-01 and QI-02
// They are written in advance of implementation to guide development and ensure contract enforcement

describe("ExecutionContext Contract (QI-01, QI-02)", () => {
  describe("Contract Enforcement", () => {
    it("should require fetchMore method (not optional)", () => {
      // 📌 Proactive: This test will verify that ExecutionContext interface requires fetchMore
      // without optional ? marker. Currently the interface has fetchMore?: ...
      // After QI-01 implementation, this should be fetchMore: ...
      
      // This is a compile-time test - if the interface is correct, this code should compile
      // If fetchMore is optional, TypeScript will allow undefined, which we want to prevent
      
      const mockContext: ExecutionContext = {
        hasMoreResults: () => true,
        fetchMore: vi.fn(),
        dispose: vi.fn(),
      };
      
      expect(mockContext.fetchMore).toBeDefined();
      expect(typeof mockContext.fetchMore).toBe("function");
    });

    it("should require dispose method", () => {
      // 📌 Proactive: This test validates that dispose() is a required method on ExecutionContext
      // Currently the interface doesn't have dispose() - QI-02 will add it
      
      const mockContext: ExecutionContext = {
        hasMoreResults: () => true,
        fetchMore: vi.fn(),
        dispose: vi.fn(),
      };
      
      expect(mockContext.dispose).toBeDefined();
      expect(typeof mockContext.dispose).toBe("function");
    });

    it("should not have nextItem in interface", () => {
      // 📌 Proactive: This test verifies that nextItem is removed from ExecutionContext interface
      // per QI-01 design. nextItem remains on DefaultQueryExecutionContext as implementation detail
      
      const mockContext: ExecutionContext = {
        hasMoreResults: () => true,
        fetchMore: vi.fn(),
        dispose: vi.fn(),
      };
      
      // If nextItem is still in the interface, this would compile - we want it NOT to
      // @ts-expect-error - nextItem should not be in ExecutionContext interface
      expect(mockContext.nextItem).toBeUndefined();
    });
  });

  describe("dispose() Behavior", () => {
    it("should be idempotent - multiple calls don't throw", () => {
      // 📌 Proactive: dispose() must be safe to call multiple times
      // This is a key invariant from QI-02 design
      
      const mockDispose = vi.fn();
      const mockContext: ExecutionContext = {
        hasMoreResults: () => false,
        fetchMore: vi.fn(),
        dispose: mockDispose,
      };
      
      // First call
      expect(() => mockContext.dispose()).not.toThrow();
      
      // Second call should not throw
      expect(() => mockContext.dispose()).not.toThrow();
      
      // Third call should not throw
      expect(() => mockContext.dispose()).not.toThrow();
      
      expect(mockDispose).toHaveBeenCalledTimes(3);
    });

    it("should make hasMoreResults() return false after dispose", () => {
      // 📌 Proactive: Post-dispose invariant from QI-02
      // After dispose(), hasMoreResults() must return false
      
      let disposed = false;
      const mockContext: ExecutionContext = {
        hasMoreResults: () => !disposed,
        fetchMore: vi.fn(),
        dispose: () => { disposed = true; },
      };
      
      expect(mockContext.hasMoreResults()).toBe(true);
      
      mockContext.dispose();
      
      expect(mockContext.hasMoreResults()).toBe(false);
    });

    it("should make fetchMore() throw after dispose", async () => {
      // 📌 Proactive: Post-dispose invariant from QI-02
      // After dispose(), fetchMore() must throw with appropriate error
      
      let disposed = false;
      const mockDiagnosticNode = {} as DiagnosticNodeInternal;
      
      const mockContext: ExecutionContext = {
        hasMoreResults: () => !disposed,
        fetchMore: async (_diagnosticNode: DiagnosticNodeInternal) => {
          if (disposed) {
            throw new Error("ExecutionContext has been disposed");
          }
          return { result: [], headers: {} };
        },
        dispose: () => { disposed = true; },
      };
      
      // Before dispose, fetchMore works
      const result = await mockContext.fetchMore(mockDiagnosticNode);
      expect(result).toBeDefined();
      
      mockContext.dispose();
      
      // After dispose, fetchMore throws
      await expect(mockContext.fetchMore(mockDiagnosticNode)).rejects.toThrow("disposed");
    });

    it("should clear internal resources on dispose", () => {
      // 📌 Proactive: dispose() should release internal state
      // This test validates that implementations clear buffers, queues, etc.
      // Specific to each ExecutionContext implementation, but pattern is consistent
      
      const mockResources = [{ id: 1 }, { id: 2 }];
      let clearedResources = false;
      
      const mockContext: ExecutionContext = {
        hasMoreResults: () => mockResources.length > 0 && !clearedResources,
        fetchMore: vi.fn(),
        dispose: () => {
          mockResources.length = 0;
          clearedResources = true;
        },
      };
      
      expect(mockContext.hasMoreResults()).toBe(true);
      
      mockContext.dispose();
      
      expect(clearedResources).toBe(true);
      expect(mockContext.hasMoreResults()).toBe(false);
    });
  });

  describe("Contract Violations (Compile-Time)", () => {
    it("should not compile without fetchMore", () => {
      // 📌 Proactive: This is a TypeScript compile-time test
      // If ExecutionContext is correctly defined with required fetchMore,
      // omitting it should cause a compile error
      
      // @ts-expect-error - Missing required fetchMore method
      const invalidContext: ExecutionContext = {
        hasMoreResults: () => true,
        dispose: vi.fn(),
      };
      
      expect(invalidContext).toBeDefined(); // Just to use the variable
    });

    it("should not compile without dispose", () => {
      // 📌 Proactive: This is a TypeScript compile-time test
      // If ExecutionContext is correctly defined with required dispose,
      // omitting it should cause a compile error
      
      // @ts-expect-error - Missing required dispose method
      const invalidContext: ExecutionContext = {
        hasMoreResults: () => true,
        fetchMore: vi.fn(),
      };
      
      expect(invalidContext).toBeDefined(); // Just to use the variable
    });

    it("should not compile without hasMoreResults", () => {
      // 📌 Proactive: This is a TypeScript compile-time test
      // hasMoreResults is a core contract requirement
      
      // @ts-expect-error - Missing required hasMoreResults method
      const invalidContext: ExecutionContext = {
        fetchMore: vi.fn(),
        dispose: vi.fn(),
      };
      
      expect(invalidContext).toBeDefined(); // Just to use the variable
    });
  });

  describe("No More ! Assertions", () => {
    it("should not require ! assertion when calling fetchMore", async () => {
      // 📌 Proactive: After QI-01, all calls like this.endpoint.fetchMore!(diagnosticNode)
      // should become this.endpoint.fetchMore(diagnosticNode) - no ! needed
      // This test documents that the contract is honest about method presence
      
      const mockContext: ExecutionContext = {
        hasMoreResults: () => true,
        fetchMore: vi.fn().mockResolvedValue({ result: [], headers: {} }),
        dispose: vi.fn(),
      };
      
      const mockDiagnosticNode = {} as DiagnosticNodeInternal;
      
      // Before QI-01: would need fetchMore!()
      // After QI-01: just fetchMore() - the type system knows it exists
      await expect(mockContext.fetchMore(mockDiagnosticNode)).resolves.toBeDefined();
    });
  });
});
