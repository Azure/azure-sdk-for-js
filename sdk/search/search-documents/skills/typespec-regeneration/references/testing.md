# Testing Reference

## Framework
- **Vitest** test runner
- **@azure-tools/test-recorder** for HTTP recording/playback
- **@azure-tools/test-credential** for mock/real credentials

## Test Modes

| Mode | Command | Description |
|------|---------|-------------|
| Playback | `npm run test:node` | Default — replays recorded HTTP (fast) |
| Record | `TEST_MODE=record npm run test:node` | Records live HTTP traffic |
| Live | `TEST_MODE=live npm run test:node` | Hits real Azure Search service |

## Environment Variables

| Variable | Required For | Description |
|----------|-------------|-------------|
| `ENDPOINT` | record, live | Search endpoint (e.g., `https://my-service.search.windows.net/`) |

In playback: recorder injects `https://subdomain.search.windows.net/`

## Test Structure Pattern

```typescript
import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { SearchClient, SearchIndexClient } from "../../../src/index.js";
import { createClients, createIndex, populateIndex, WAIT_TIME } from "../utils/setup.js";

describe("FeatureName", { timeout: 20_000 }, () => {
  let recorder: Recorder;
  let searchClient: SearchClient<Hotel>;
  let indexClient: SearchIndexClient;
  const indexName = createRandomIndexName();

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    ({ searchClient, indexClient } = await createClients(serviceVersion, recorder, indexName));
    await createIndex(indexClient, indexName, serviceVersion);
    await delay(WAIT_TIME);  // 4000ms live, 0ms playback
    await populateIndex(searchClient);
    await delay(WAIT_TIME);
  });

  afterEach(async () => {
    await indexClient.deleteIndex(indexName);
    await recorder?.stop();
  });

  it("should search documents", async () => {
    const results = await searchClient.search("*");
    const items = [];
    for await (const result of results.results) {
      items.push(result);
    }
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].document.hotelName).toBeDefined();
  });
});
```

## Recorder Setup (recordedClient.ts)

The recorder:
- Creates clients with recorder's HTTP policy injected via `recorder.configureClientOptions()`
- Sanitizes sensitive data (subdomains → "subdomain", deployment IDs scrubbed)
- Removes default sanitizers `AZSDK2021`, `AZSDK3493` (interfere with search headers)
- Uses `createTestCredential()` from `@azure-tools/test-credential`

## Test Data

- **Hotel interface** (`interfaces.ts`): Test document with text, complex, vector fields
- **Mock embeddings** (`mockEmbeddings.ts`): Pre-computed 1536-dim vectors (text-embedding-ada-002)
- **Setup helpers** (`setup.ts`): `createIndex()`, `populateIndex()` (10 hotel docs), `createRandomIndexName()`

## WAIT_TIME Pattern

```typescript
const WAIT_TIME = isPlaybackMode() ? 0 : 4000;
```
Live/record mode needs delays for index consistency. Playback doesn't.

## Stable vs Preview Tests

- `test/public/node/` — Stable API tests
- `test/public/node/preview/` — Preview-only features (e.g., KnowledgeRetrievalClient)

## Important

- `test/snippets.spec.ts` is NOT a real test — it contains doc snippet source code
- Set timeout to 20_000 for integration tests
- Recordings stored in external test assets repo; `assets.json` points to correct tag
- After regeneration, re-record if request format changed: `TEST_MODE=record npm run test:node`
