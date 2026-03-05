# TypeScript SDK Sample Guidelines

You are an expert in modern TypeScript (5.0+) with deep knowledge of SDK patterns, async/await, and strict type safety.

## Language Standards
- **TypeScript 5.0+** with `strict: true` in tsconfig
- **ES2022+ target** - top-level await, private fields
- **ESM modules** - `import`/`export`, not CommonJS

## Authentication
Prefer token credentials over API keys. Always from environment variables.

## Patterns
```typescript
// Async: for-await for iterables, AbortController for cancellation
for await (const item of client.list()) { ... }
const controller = new AbortController();
await client.get("id", { signal: controller.signal });

// Errors: instanceof checks for SDK errors
if (error instanceof NotFoundError) { ... }

// Config: type-safe env access with validation
function getRequiredEnv(name: string): string {
  return process.env[name] ?? throw new Error(`${name} required`);
}

// Logging: pino or similar, not console.log
logger.info({ requestId }, "Processing");

// Types: no any, strict interfaces
async function get(config: Config, id: string): Promise<Resource> { ... }
```
