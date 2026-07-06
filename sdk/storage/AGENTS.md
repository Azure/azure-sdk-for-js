# Storage SDK Agent Guidance

This file provides storage-specific guidance for AI agents working under `sdk/storage/`.

## Storage SDK Overview

| Module | Azure service |
| --- | --- |
| `storage-blob` | Azure Blob Storage |
| `storage-blob-changefeed` | Azure Blob Storage Change Feed |
| `storage-blob-perf-tests` | Azure Blob Storage (performance scenarios) |
| `storage-common` | Shared Azure Storage client infrastructure (Blob, Queue, File, Data Lake) |
| `storage-file-datalake` | Azure Data Lake Storage Gen2 |
| `storage-file-datalake-perf-tests` | Azure Data Lake Storage Gen2 (performance scenarios) |
| `storage-file-share` | Azure Files |
| `storage-file-share-perf-tests` | Azure Files (performance scenarios) |
| `storage-internal-avro` | Azure Storage Avro serialization helpers |
| `storage-queue` | Azure Queue Storage |

## Rules for AI Agents

### Rule 1: Do Not Edit Generated Code

Do not manually edit generated files. Update TypeSpec/customization inputs and regenerate instead.

Generated code paths:

- `sdk/storage/storage-blob/src/generated/src/**`
- `sdk/storage/storage-file-datalake/src/generated/src/**`
- `sdk/storage/storage-file-share/src/generated/src/**`
- `sdk/storage/storage-queue/src/generated/**`

### Rule 2: Preserve API Consistency Across Blobs, Queues, Files, and Data Lake

When changing naming, options bags, paging patterns, error handling, or convenience APIs in one storage client, validate whether equivalent patterns exist in the other storage clients and keep behavior consistent unless a service-specific constraint requires divergence.

### Rule 3: Prefer Existing Patterns Over New Abstractions

Before introducing new helpers, pipelines, clients, or abstractions, reuse established patterns in `storage-blob`, `storage-file-datalake`, `storage-file-share`, `storage-queue`, and `storage-common`.

### Rule 4: No Magic Strings

Avoid inline protocol literals, header names, query parameter names, and service constants. Reuse existing constants and shared helpers from `storage-common` or local constants files.

## Storage Service Semantics

- **AppendBlob safety:** Appends must preserve order and use append position/ETag style guards when needed to prevent accidental concurrent overwrite behavior.
- **BlockBlob commit flow:** Uploads stage blocks first and become visible only after block list commit; keep this two-phase behavior explicit in high-level APIs.
- **Queue visibility timeout:** Dequeued messages become temporarily invisible and require delete/update using the latest pop receipt returned by the service; preserve timeout and retry semantics.
- **File share hierarchy:** Azure Files is directory/file hierarchical storage; directory existence, path normalization, and parent-child behavior must remain explicit and predictable.

## Build and Test

From repository root (`/home/runner/work/azure-sdk-for-js/azure-sdk-for-js`):

Use `--token 1` for single-package turbo builds in this repo per workspace guidance.

```bash
pnpm install
pnpm turbo build --filter=@azure/storage-blob... --token 1
pnpm turbo build --filter=@azure/storage-file-datalake... --token 1
pnpm turbo build --filter=@azure/storage-file-share... --token 1
pnpm turbo build --filter=@azure/storage-queue... --token 1
```

Run tests for a package from repo root:

```bash
pnpm --filter @azure/storage-blob test
pnpm --filter @azure/storage-file-datalake test
pnpm --filter @azure/storage-file-share test
pnpm --filter @azure/storage-queue test
```

Start Azurite emulator:

```bash
npx azurite --silent --location /tmp/azurite --debug /tmp/azurite/debug.log
```

Use emulator connection string for local emulator scenarios:

```bash
export STORAGE_CONNECTION_STRING="UseDevelopmentStorage=true"
# Some tooling may also use:
export AZURE_STORAGE_CONNECTION_STRING="UseDevelopmentStorage=true"
```
