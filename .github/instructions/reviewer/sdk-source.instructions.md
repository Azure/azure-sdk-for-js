---
applyTo: "sdk/**/src/**/*.{ts,mts,cts},sdk/**/review/*.api.md"
description: "Azure SDK source code review rules covering architecture, performance, and security for TypeScript client libraries."
---
# SDK Source Review — Architecture, Performance, Security

**Scope:** Production `src/` and `review/*.api.md`. Skip `src/generated/`, private methods, `@internal`, tests, style.

## ARCHITECTURE

### Breaking Changes
Determine GA baseline first:
```bash
git fetch --tags origin
git tag -l '@azure/<pkg>_*' | grep -v -E 'beta|alpha' | sort -V | tail -1
```
Only flag removals present in GA.
- Removed/renamed exports from `src/index.ts` | Changed signatures | Removed interface/enum members

**Versioning:**
- **Stable packages:** breaking→major, feature→minor, fix→patch
- **Beta packages:** breaking changes allowed within same major-beta cycle
- **No GA tag exists:** package is preview-only, beta breaking changes acceptable
- Beta→GA transition requires major version if breaking from last GA

### Naming
- Clients: `<Service>Client` | Options: `<Method>Options` extending `OperationOptions`
- Subclients: `get<Name>Client()` | Discriminators: `kind` not `type`
- **Banned verbs:** `make`, `fetch`, `push`, `pop`, `getAll`, `erase`, `updateOrInsert`
- **Use:** `create`, `upsert`, `get`, `list`, `update`, `delete`, `send`, `begin`

### Constructor & Factory
- Constructors: `(endpoint, credential, options?)` or `(endpoint, pipeline, options?)`
- Connection strings: static `fromConnectionString()`, not constructor

### Parameters & Options
- Optional params via options bag extending `OperationOptions`
- Prefer `undefined` over `null` | Units in names (`timeoutInMs`)

### Core Packages
Use `@azure/core-*`: `core-rest-pipeline`, `core-client`, `core-lro`, `core-auth`, `core-paging`, `core-tracing`, `core-util`, `@azure/logger`
- Logger: `createClientLogger()` in `src/log.ts`
- Tracing: wrap HTTP ops in spans via `createTracingClient`

### Exports & Types
- Named exports only from `src/index.ts` | Resolve `ae-forgotten-export` warnings
- Export `Known<Type>` unions | No `any`/`unknown` in public types | `import type` for type-only

## PERFORMANCE

### Pagination & AbortSignal
- `list*` returns `PagedAsyncIterableIterator` with `byPage()`, `maxPageSize`, `continuationToken`
- All async methods accept/forward `abortSignal` via `OperationOptions`
- Loops check `abortSignal.aborted` | LRO passes signal to poller

### Memory & Streaming
- No `Buffer.concat()` in loop, `string += chunk`, `Array.from(hugeIterable)`
- Large payloads use streams | No unbounded buffers

### Retry & Bundle
- Exponential backoff via `core-rest-pipeline` | Only retry 408/429/5xx
- New deps <50KB | No Node imports in browser without platform check
- String unions over `enum` | No `namespace`

### Async
- `return promise` not `return await` (except try/traced)
- `Promise.all` for independent ops | Limit concurrency

## SECURITY

### Credentials (Azure SDK)
- Via `@azure/core-auth` only: `TokenCredential`, `AzureKeyCredential`, `AzureSASCredential`
- No secrets in logs/errors/URLs | Guard with `toString()`/`toJSON()`
- **No `allowInsecureConnection: true` in `src/`** | No SAS tokens in logs
- Pipeline policies scrub `Authorization` | Use narrowest token scopes

### Injection
- URL: `encodeURIComponent()` | Command: `execFile` not `exec` | No template string concat
- Path: validate against `..` | Header: sanitize CRLF

### Dangerous Patterns
❌ `eval`, `new Function`, `innerHTML`, `child_process.exec`, `vm.runInNewContext`
❌ `as any` on untrusted data without validation

### Supply Chain & Crypto
- Flag deps with CVEs/install scripts | No weak crypto (MD5/SHA1/DES)
- No hardcoded keys | No `rejectUnauthorized: false`

### Other
- Prototype pollution: skip `__proto__`/`constructor` in merges
- ReDoS: no nested quantifiers on user input
- SSRF: validate URLs | TOCTOU: token refresh needs lock
