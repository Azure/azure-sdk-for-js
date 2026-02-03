# Testing

## Quick Start

```bash
# Run all tests (playback mode - default)
pnpm test:node

# Run specific test file
pnpm test:node -- test/public/blockblobclient.spec.ts

# Run specific test by name
pnpm test:node -- -t "download a blob version"

# Record new/updated tests against live Azure
TEST_MODE=record pnpm test:node -- test/public/mytest.spec.ts

# Push recordings after recording
pnpm dev-tool test-proxy push
```

## Test Modes

| Mode | Command | Use Case |
|------|---------|----------|
| `playback` | `pnpm test:node` | Default. Uses recorded HTTP. Fast & offline. |
| `record` | `TEST_MODE=record pnpm test:node` | Runs live, captures recordings. |
| `live` | `TEST_MODE=live pnpm test:node` | Runs live without recording. |

## Directory Structure

```
test/
├── public/           # API surface tests (Node + browser)
│   └── node/         # Node-only API tests
├── internal/         # Internal/private helper tests
│   └── node/         # Node-only internal tests
├── utils/            # Test infrastructure
│   ├── constants.ts  # EnvVarKeys enum + fake defaults
│   ├── injectables.ts # Environment value getters
│   └── setup.ts      # Env validation (globalSetup)
└── resources/        # Binary test fixtures (avro/parquet)
```

## Environment Setup

Copy `test.env` to `.env` and populate values. See [test.env](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/test.env) for required variables.

**Key patterns:** Variables follow `<PREFIX>_ACCOUNT_*` naming (e.g., `SOFT_DELETE_ACCOUNT_NAME`, `DFS_ACCOUNT_KEY`).

**Prefixes:** `default`, `DFS`, `SOFT_DELETE`, `FULL`, `GRS`, `OR_DEST`, `PREMIUM_FILE`

## Adding/Modifying Tests

1. **Location:** Public API → `test/public/`, internal logic → `test/internal/`
2. **Client creation:** Use helpers from `test/public/utils/` with auth mode (`TokenCredential`, `AccountKey`, `SAS`)
3. **Unique names:** Use `recorder.variable("name", getUniqueName("prefix"))` for deterministic playback
4. **New env vars:** Add to `EnvVarKeys` in `constants.ts` with fake defaults

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Missing env var | Check error message for exact key, add to `.env` |
| Recording mismatch | Re-record: `TEST_MODE=record pnpm test:node -- -t "test name"` |
| Stale recordings | Delete recording file, re-record, push |
| Browser build issues | Run `pnpm build` first, clear `dist-test/` if needed |

## Recording Workflow

```bash
# 1. Record the test
TEST_MODE=record pnpm test:node -- -t "my test name"

# 2. Verify playback works
pnpm test:node -- -t "my test name"

# 3. Push recordings
pnpm dev-tool test-proxy push
```
