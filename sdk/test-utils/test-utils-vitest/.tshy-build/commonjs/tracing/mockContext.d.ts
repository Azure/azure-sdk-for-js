import { TracingContext } from "@azure/core-tracing";
/**
 * This is the implementation of the {@link TracingContext} interface
 * Represents a tracing context
 */
export declare class MockContext implements TracingContext {
    /**
     * Represents a context map for the symbols to record
     */
    private contextMap;
    /**
     * Initializes the context map
     * @param parentContext - If present the context map is initialized to the contextMap of the parentContext
     */
    constructor(parentContext?: TracingContext);
    setValue(key: symbol, value: unknown): TracingContext;
    getValue(key: symbol): unknown;
    deleteValue(key: symbol): TracingContext;
}
export declare const spanKey: unique symbol;
export declare function createMockTracingContext(parentContext?: MockContext): TracingContext;
//# sourceMappingURL=mockContext.d.ts.map