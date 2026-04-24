# Customization — @azure/keyvault-keys

## Customization Workflow

This package uses the **two-directory customization layout**:
- `generated/` — output of TypeSpec code generation. Never edited directly.
- `src/` — contains merged copies of generated files + hand-authored files.

After running `tsp-client update`, `dev-tool customization apply` performs a 3-way merge to update files in `src/` that have counterparts in `generated/`. Hand-authored files (no counterpart in `generated/`) are preserved untouched.

For full customization workflow details, see `documentation/modular-customization.md`.

## Hand-Authored File Inventory

| File | Purpose | Update when... |
|---|---|---|
| `src/index.ts` | `KeyClient` class + all public exports | New operations added, exports change |
| `src/cryptographyClient.ts` | `CryptographyClient` (local + remote crypto) | New crypto algorithms, API changes |
| `src/keysModels.ts` | User-facing types, type aliases from generated types | Generated type names change |
| `src/cryptographyClientModels.ts` | Crypto-specific types (encrypt/decrypt params, results) | New crypto algorithms |
| `src/transformations.ts` | Wire ↔ user-facing model converters | Generated model shapes change |
| `src/identifier.ts` | `parseKeyVaultKeyIdentifier()` | Key ID format changes (unlikely) |
| `src/lro/` | Delete/recover pollers | LRO response shapes change |
| `src/cryptography/` | Local AES/RSA providers, DER conversions | New algorithms, crypto API changes |
| `src/tracing.ts` | Tracing client setup | Namespace changes (unlikely) |
| `src/constants.ts` | `SDK_VERSION` | Updated automatically by release tooling |

## Post-Regeneration Checklist

1. Run `tsp-client update -d --emitter-options="generate-metadata=false;generate-test=false" && npm run format`
2. Check `src/` files with counterparts in `generated/` for merge conflict markers (`<<<<<<<`)
3. Verify type aliases in `keysModels.ts` still match generated types in `models/models.ts`
4. Verify `transformations.ts` functions handle any new/changed model properties
5. Verify `src/index.ts` exports cover any new public types
6. Build: `pnpm turbo build --filter=@azure/keyvault-keys... --token 1`
7. Run tests: `npm run test:node`

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Merge conflict markers in `src/` files | 3-way merge conflict after regeneration | Resolve manually: compare `generated/` version with your `src/` customizations |
| Type error in `transformations.ts` | Generated model shape changed | Update transform functions to match new wire types |
| Missing export error | New type not added to `src/index.ts` | Add export to the barrel export block |
| `keysModels.ts` type alias error | Generated type renamed or removed | Update the `import type` and re-export in `keysModels.ts` |
| Local crypto test failure | Algorithm mapping changed | Check `src/cryptography/` providers match updated `JsonWebKey` types |
