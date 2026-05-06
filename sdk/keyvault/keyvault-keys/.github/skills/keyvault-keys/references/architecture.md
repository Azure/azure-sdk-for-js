# Architecture — @azure/keyvault-keys

## Directory Layout

```
sdk/keyvault/keyvault-keys/
├── generated/                  # Auto-generated from TypeSpec — NEVER edit
│   ├── api/                    # Wire-level operations, context, options
│   ├── models/                 # Wire models and serializers
│   ├── static-helpers/         # Paging and URL template helpers
│   ├── keyVaultClient.ts       # Generated thin client
│   ├── logger.ts
│   └── index.ts
├── src/                        # Source of truth for published code
│   ├── api/                    # Merged copies of generated/api/ (3-way merge)
│   ├── models/                 # Merged copies of generated/models/
│   ├── static-helpers/         # Merged copies of generated/static-helpers/
│   ├── cryptography/           # Hand-authored local crypto providers
│   ├── lro/                    # Hand-authored LRO pollers (delete/recover)
│   ├── index.ts                # KeyClient class + barrel export (hand-authored)
│   ├── keyVaultClient.ts       # Merged copy of generated client
│   ├── cryptographyClient.ts   # CryptographyClient (hand-authored)
│   ├── keysModels.ts           # User-facing model types (hand-authored)
│   ├── cryptographyClientModels.ts  # Crypto model types (hand-authored)
│   ├── transformations.ts      # Wire ↔ user model transforms (hand-authored)
│   ├── identifier.ts           # Key Vault key ID parser (hand-authored)
│   ├── tracing.ts              # Tracing client (hand-authored)
│   ├── constants.ts            # SDK version constant (hand-authored)
│   └── logger.ts               # Merged copy of generated logger
└── test/
    ├── public/                 # Live/recorded integration tests
    │   ├── node/               # Node-specific crypto tests
    │   ├── *.hsm.spec.ts       # Managed HSM tests
    │   └── *.spec.ts           # Standard tests
    └── internal/               # Unit tests for internal modules
```

## Client Classes

| Client | File | Purpose |
|---|---|---|
| `KeyVaultClient` | `src/keyVaultClient.ts` | Generated wire client (merged copy). Used internally. |
| `KeyClient` | `src/index.ts` | Hand-authored convenience client. Wraps `KeyVaultClient`, transforms models, adds LRO support. **Public API.** |
| `CryptographyClient` | `src/cryptographyClient.ts` | Hand-authored. Encrypt/decrypt/sign/verify/wrap/unwrap. Supports both remote (Key Vault) and local (`JsonWebKey`) modes. **Public API.** |

## Cryptography Provider Chain

`CryptographyClient` delegates to a chain of providers:
1. **`AesCryptographyProvider`** (`src/cryptography/aesCryptographyProvider.ts`) — local AES-CBC operations
2. **`RsaCryptographyProvider`** (`src/cryptography/rsaCryptographyProvider.ts`) — local RSA operations (sign, verify, encrypt, decrypt, wrap, unwrap)
3. **`RemoteCryptographyProvider`** (`src/cryptography/remoteCryptographyProvider.ts`) — delegates to Key Vault service

The client tries local providers first; falls back to remote if the local provider doesn't support the operation or key type.

## Key Dependencies

| Package | Purpose |
|---|---|
| `@azure/keyvault-common` | Shared Key Vault challenge-based auth policy |
| `@azure-rest/core-client` | REST client primitives |
| `@azure/core-lro` | `Poller` base class for delete/recover LROs |
| `@azure/core-paging` | `PagedAsyncIterableIterator` for list operations |
| `@azure/core-tracing` | Distributed tracing |
