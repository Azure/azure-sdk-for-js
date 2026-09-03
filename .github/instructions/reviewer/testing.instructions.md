---
applyTo: "sdk/**/test/**/*.{ts,mts,cts},sdk/**/src/**/*.{ts,mts,cts},sdk/**/review/*.api.md"
description: "Azure SDK test file review rules covering recorder setup, TEST_MODE awareness, credential handling, and test quality patterns."
---
# Test Review — Azure SDK Test Patterns

**Scope:** Test files under `test/`, plus `src/` and `review/*.api.md` for coverage analysis. **Exclude `snippets.spec.ts`** (documentation snippets) and `src/generated/` (auto-generated code).

## Test Infrastructure
- Framework: **vitest** with `@azure-tools/test-recorder` for HTTP recording/playback
- Authentication: `@azure-tools/test-credential` for test credentials
- Asset-sync: Recordings in separate assets repo via `assets.json`

## Recorder Setup (Required for HTTP tests)
```typescript
import { Recorder } from "@azure-tools/test-recorder";
let recorder: Recorder;
beforeEach(async (ctx) => {
  recorder = new Recorder(ctx);
  await recorder.start(envSetupForPlayback);
});
afterEach(async () => { await recorder.stop(); });
```
**Required checks:**
- Missing recorder → tests fail in playback mode
- Missing `stop()` → recordings not saved
- Missing `recorder.addSanitizers()` → credential leaks in recordings
- Recorder's HTTP client must be injected into service client

## TEST_MODE Awareness
Tests run in three modes: `playback` (default), `record`, `live`
- **LRO polling:** `isPlaybackMode() ? 0 : <realInterval>` — hardcoded intervals cause slow playback
- **Resource names:** Use `recorder.variable("name", generateUnique())` — handles both playback and record/live
- **Mode-dependent assertions:** Guard timestamp checks with `isLiveMode()`
- **envSetupForPlayback:** Must map every used env var to safe placeholder

## Credentials (Azure SDK specific)
- Prefer `createTestCredential()` from `@azure-tools/test-credential` for service-client tests
- Exception: direct credential construction valid in identity package tests and AAD auth samples
- Use `assertEnvironmentVariable()` for required service config
- `NoOpCredential` only for true unit tests (no HTTP calls)
- No hardcoded credentials — document required vars in `sample.env`

## Coverage Requirements
Every new public export from `src/index.ts` needs tests for:
- Happy path: valid input, successful operation
- Error path: invalid input, missing required params, service errors (4xx/5xx)
- Edge cases: empty collections, null/undefined optionals, boundary values
- Cancellation: operations with `AbortSignal` should test mid-operation abort

**Removed/reduced tests:** If tests are deleted, verify API was also removed or coverage moved elsewhere.

## Pagination Tests
For `list*` methods returning `PagedAsyncIterableIterator`:
- Item iteration: `for await (const item of client.list())`
- Page iteration: `for await (const page of client.list().byPage({ maxPageSize: 1 }))`
- Continuation: fetch page, resume with `continuationToken`
- Empty results: test with zero-result filters

## LRO Tests
For `begin*` methods:
- Poll to completion: `const result = await poller.pollUntilDone()`
- Polling interval: use `testPollerProperties` with `isPlaybackMode() ? 0 : 5000`
- Cancellation: abort poller mid-operation
- Serialize/restore: `beginOp({ resumeFrom: await poller.serialize() })`

## Error Testing
```typescript
await expect(client.op(badInput)).rejects.toThrow(/expected/);
```
- Prefer vitest's `rejects.toThrow()` over try-catch patterns
- Assert specific error type/message, not overly broad catch

## Test Isolation
- No shared mutable state | Clean up in `afterEach`/`afterAll`
- No `.only()` committed | No unexplained `.skip()`

## Browser Tests
If browser-compatible, must have `test`, `test:node`, `test:browser` scripts.
