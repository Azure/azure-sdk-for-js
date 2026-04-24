---
name: keyvault-keys
description: 'Azure Key Vault Keys with hand-authored CryptographyClient and KeyClient convenience layer. WHEN: regenerate keyvault-keys; modify keyvault-keys; fix keyvault-keys bug; add keyvault-keys feature; keyvault-keys tsp-client update.'
---

# keyvault-keys

## Common Pitfalls

- **Never hand-edit files in `generated/`** — overwritten on every `tsp-client update`. All modifications go through editing `src/` files directly (the 3-way merge preserves your changes). Use source-level customizations when TypeSpec cannot express the desired behavior. For TypeSpec-level customizations (preferred when possible), see [TypeSpec Client Customizations Reference](https://github.com/Azure/azure-sdk-tools/blob/main/eng/common/knowledge/customizing-client-tsp.md).
- **Check for merge conflicts in `src/` FIRST after regeneration** — `dev-tool customization apply` performs a 3-way merge that can produce conflict markers in merged files.
- **`src/index.ts` is manually maintained** — it contains the `KeyClient` class definition AND all public exports. New exports must be added by hand.
- **`CryptographyClient` is entirely hand-authored** — defined in `src/cryptographyClient.ts` with no counterpart in `generated/`. Don't look for it in generated code.
- **Model aliases in `keysModels.ts`** re-export generated types with different names (e.g., `JsonWebKeyType` → `KeyType`, `JsonWebKeyOperation` → `KeyOperation`). After regeneration, verify aliases still match generated types in `models/models.ts`.
- **`transformations.ts` bridges wire ↔ user types** — if generated models change shape, update transformations manually.

## Architecture

Three-layer architecture — see [references/architecture.md](references/architecture.md) for full details:

1. **Generated layer** (`generated/`) — TypeSpec-generated wire client and models. Never edit.
2. **Merged layer** (`src/keyVaultClient.ts`, `src/api/`, `src/models/`) — customized copies of generated files, maintained via 3-way merge.
3. **Convenience layer** (hand-authored) — `KeyClient` in `src/index.ts`, `CryptographyClient` in `src/cryptographyClient.ts`, local crypto providers in `src/cryptography/`, LRO pollers in `src/lro/`, model transformations in `src/transformations.ts`.

Key design decisions:
- Auth uses `@azure/keyvault-common` challenge-based authentication policy (replaces default bearer token policy).
- LRO for delete/recover is hand-authored using `@azure/core-lro` `Poller` primitives.
- Local AES/RSA crypto providers in `src/cryptography/` enable offline operations on local `JsonWebKey` objects.

## Regeneration

**Generation command** (from `package.json`):
```
tsp-client update -d --emitter-options="generate-metadata=false;generate-test=false" && npm run format
```

**Error categorization after regeneration:**

| Error location | What to fix |
|---|---|
| `generated/**/*.ts` | TypeSpec or emitter issue — do NOT fix locally |
| `src/` file with counterpart in `generated/` | Merge conflict or breaking change — resolve in `src/` |
| `src/transformations.ts` | Generated model shape changed — update transform functions |
| `src/keysModels.ts` | Generated type renamed/removed — update re-export aliases |
| `src/index.ts` (KeyClient methods) | Generated operation signature changed — update convenience wrapper |

## Where to Make Changes

| Goal | Where to edit |
|---|---|
| Add/modify user-facing model types | `src/keysModels.ts`, `src/cryptographyClientModels.ts` |
| Add/modify wire ↔ user type conversions | `src/transformations.ts` |
| Modify KeyClient behavior or add operations | `src/index.ts` (KeyClient class) |
| Modify CryptographyClient behavior | `src/cryptographyClient.ts` |
| Add/modify local crypto operations | `src/cryptography/` directory |
| Add/modify LRO operations | `src/lro/` directory |
| Export a new public symbol | `src/index.ts` (exports block) |
| Modify key identifier parsing | `src/identifier.ts` |

Prefer adding new hand-authored files over editing merged files in `src/` that have counterparts in `generated/`.

## Testing Notes

- Public tests in `test/public/` cover KeyClient and CryptographyClient operations (recorded via test proxy, `assets.json`).
- Internal tests in `test/internal/` cover transformations, AES crypto, LRO edge cases.
- HSM-specific tests (`*.hsm.spec.ts`) require Managed HSM resources.
- Node-specific crypto tests in `test/public/node/`.
- Browser tests are skipped.

## References

| Reference | Description |
|---|---|
| [references/architecture.md](references/architecture.md) | Detailed file map and module responsibilities |
| [references/customization.md](references/customization.md) | Convenience layer patterns and customization details |
