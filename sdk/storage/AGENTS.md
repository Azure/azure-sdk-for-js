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

Follow repository-wide hard rules in `/AGENTS.md` first. This file adds
storage-specific guidance only.

### Storage-specific Rule 1: Preserve API Consistency Across Blobs, Queues, Files, and Data Lake

When changing naming, options bags, paging patterns, error handling, or convenience APIs in one storage client, validate whether equivalent patterns exist in the other storage clients and keep behavior consistent unless a service-specific constraint requires divergence.

### Storage-specific Rule 2: Prefer Existing Storage Patterns Over New Abstractions

Before introducing new helpers, pipelines, clients, or abstractions, reuse established patterns in `storage-blob`, `storage-file-datalake`, `storage-file-share`, `storage-queue`, and `storage-common`.

### Storage-specific Rule 3: No Magic Strings

Avoid inline protocol literals, header names, query parameter names, and service constants. Reuse existing constants and shared helpers from `storage-common` or local constants files.

## Storage Service Semantics

- **AppendBlob safety:** Appends must preserve order and use append position/ETag style guards when needed to prevent accidental concurrent overwrite behavior.
- **BlockBlob commit flow:** Uploads stage blocks first and become visible only after block list commit; keep this two-phase behavior explicit in high-level APIs.
- **Queue visibility timeout:** Dequeued messages become temporarily invisible and require delete/update using the latest pop receipt returned by the service; preserve timeout and retry semantics.
- **File share hierarchy:** Azure Files is directory/file hierarchical storage; directory existence, path normalization, and parent-child behavior must remain explicit and predictable.

## Build and Test

From repository root (`/home/runner/work/azure-sdk-for-js/azure-sdk-for-js`).

For required workspace build conventions (including turbo single-package usage), see `/AGENTS.md`.

Start Azurite emulator (Optional):

```bash
npx azurite --silent --location /tmp/azurite --debug /tmp/azurite/debug.log
```

Use emulator connection string for local emulator scenarios:

```bash
export STORAGE_CONNECTION_STRING="UseDevelopmentStorage=true"
# Some tooling may also use:
export AZURE_STORAGE_CONNECTION_STRING="UseDevelopmentStorage=true"
```
