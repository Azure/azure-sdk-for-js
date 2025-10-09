# TypeScript 5.0 Decorators for Azure Core Tracing

## Overview

This investigation explored using TypeScript 5.0's new decorator feature (stage 3 decorators) to simplify tracing instrumentation in Azure SDK client libraries. The implementation provides a declarative approach to adding tracing to client methods, reducing boilerplate code while maintaining full compatibility with the existing `@azure/core-tracing` infrastructure.

## Implementation

### New Files Created

1. **`src/decorators.ts`** - Core decorator implementation
   - `@traced()` - Method decorator for automatic tracing instrumentation
   - `@traceable` - Optional class decorator for documentation purposes
   - `TracedDecoratorOptions` - Configuration interface for the decorator

2. **`test/decorators.spec.ts`** - Comprehensive unit tests (47 tests, all passing)
   - Tests for basic functionality
   - Tests for custom configuration options
   - Tests for error handling
   - Tests for edge cases (empty args, custom indices, etc.)

3. **`samples-dev/decoratorTracing.ts`** - Practical examples demonstrating:
   - Basic usage with default configuration
   - Custom span names and options
   - Error handling
   - Nested operations (parent-child spans)
   - Comparison with manual `withSpan` approach

### Modified Files

- **`src/index.ts`** - Added exports for the new decorator functions

## Key Features

### 1. Automatic Span Management
The `@traced()` decorator automatically:
- Creates spans using `tracingClient.withSpan()`
- Sets the span status to `success` or `error`
- Records exceptions on the span
- Ensures spans are properly closed
- Propagates tracing context to nested calls

### 2. Flexible Configuration
```typescript
interface TracedDecoratorOptions {
  spanName?: string;        // Custom span name (default: ClassName.methodName)
  spanOptions?: TracingSpanOptions;  // Span kind, attributes, links
  optionsIndex?: number;    // Which parameter contains options (default: last)
}
```

### 3. TypeScript 5.0 Decorators
The implementation uses the new stage 3 decorator syntax:
- No need for `experimentalDecorators` compiler flag
- Better type safety
- Standards-compliant
- Works with `context` parameter for metadata

### 4. Backwards Compatible
- Does not break existing code using manual `withSpan`
- Works alongside existing tracing patterns
- No changes to `TracingClient` interface

## Usage Examples

### Basic Usage
```typescript
class MyClient {
  private tracingClient: TracingClient;

  constructor() {
    this.tracingClient = createTracingClient({
      packageName: "@azure/my-package",
      packageVersion: "1.0.0",
      namespace: "Microsoft.MyService",
    });
  }

  @traced()
  async getResource(id: string, options: OperationOptions = {}): Promise<Resource> {
    // Method implementation
    // Automatically wrapped with tracing
  }
}
```

### Custom Configuration
```typescript
@traced({
  spanName: "MyClient.customOperation",
  spanOptions: {
    spanKind: "client",
    spanAttributes: { "operation.type": "read" }
  }
})
async customOperation(options: OperationOptions = {}): Promise<void> {
  // Implementation
}
```

### Multiple Parameters
```typescript
@traced()
async updateResource(
  id: string,
  data: ResourceData,
  options: OperationOptions = {}
): Promise<Resource> {
  // The decorator automatically finds the options parameter (last one)
}
```

## Benefits

### For SDK Authors
1. **Less Boilerplate**: Reduces 5-7 lines of tracing code to a single decorator
2. **Consistent Patterns**: Ensures uniform tracing across all methods
3. **Fewer Errors**: Automatic span management prevents common mistakes
4. **Better Readability**: Method intent is clearer without tracing scaffolding

### Comparison

**Before (Manual withSpan):**
```typescript
async getUser(userId: string, options: OperationOptions = {}): Promise<User> {
  return this.tracingClient.withSpan(
    "UserClient.getUser",
    options,
    async (updatedOptions) => {
      // Actual implementation
      const response = await this.sendRequest(userId, updatedOptions);
      return response.user;
    }
  );
}
```

**After (Using @traced):**
```typescript
@traced()
async getUser(userId: string, options: OperationOptions = {}): Promise<User> {
  // Actual implementation
  const response = await this.sendRequest(userId, options);
  return response.user;
}
```

## Technical Details

### How It Works

1. The decorator wraps the original method
2. When the method is called, it:
   - Extracts the options parameter (by default, the last parameter)
   - Handles undefined options (creates empty object if needed)
   - Validates that options has the correct shape
   - Calls `tracingClient.withSpan()` with the original method as callback
   - Updates the options parameter with the new tracing context
   - Passes updated arguments to the original method

### Edge Cases Handled

- **No arguments**: Creates empty options object
- **Undefined options**: Creates empty options object
- **Non-object options**: Falls back to calling original method
- **Missing tracingClient**: Throws descriptive error
- **Custom options position**: Supports `optionsIndex` configuration
- **Synchronous methods**: Automatically promisified by `withSpan`
- **Error propagation**: Exceptions are recorded and re-thrown

## Testing

All 47 unit tests pass, covering:
- Basic functionality
- Custom span names
- Span options configuration
- Multiple parameters
- Custom options index
- Success/error status setting
- Span lifecycle (end called)
- Error handling (missing tracingClient)
- Edge cases (undefined options, non-object options)
- Synchronous methods
- Additional properties preservation
- Integration with `@traceable` class decorator

## Requirements

- TypeScript 5.0+ (for stage 3 decorators)
- `experimentalDecorators` must be `false` or omitted in tsconfig.json
- Class must have a `tracingClient` property of type `TracingClient`
- Method must have an options parameter (or use `optionsIndex` to specify)

## Future Enhancements

Potential improvements for future consideration:

1. **Auto-detection of tracingClient**: Support different property names
2. **Configuration via class decorator**: Set default options for all methods
3. **Attribute extraction**: Automatically capture method parameters as span attributes
4. **Conditional tracing**: Skip tracing based on runtime conditions
5. **Span hierarchy optimization**: Better handling of nested decorated methods

## Conclusion

The TypeScript 5.0 decorator implementation for `@azure/core-tracing` provides a clean, declarative approach to adding distributed tracing to Azure SDK methods. It reduces boilerplate, improves code readability, and maintains full compatibility with existing tracing infrastructure.

The implementation is production-ready with comprehensive tests and documentation. SDK authors can adopt it incrementally alongside existing manual `withSpan` usage.

## Files Modified/Created

- `sdk/core/core-tracing/src/decorators.ts` (new)
- `sdk/core/core-tracing/src/index.ts` (modified)
- `sdk/core/core-tracing/test/decorators.spec.ts` (new)
- `sdk/core/core-tracing/samples-dev/decoratorTracing.ts` (new)
