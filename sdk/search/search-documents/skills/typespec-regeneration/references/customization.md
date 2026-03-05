# Customization Flow Reference

## The `dev-tool customization apply-v2` Command

This command (now an alias for `apply`) performs a 3-way git merge to combine newly generated code into `src/`:

```bash
npx dev-tool customization apply-v2 --skip index.ts
```

### Flags
- `--skip <pattern>` — Files matching this pattern preserve the old customized version (not merged). For this package: `--skip index.ts`
- `--no-cleanup` — Keep temporary workspace for debugging

### Prerequisites
- Both `generated/` and `src/` must be committed to git
- `src/` must have no uncommitted changes

## The 3-Way Merge Algorithm

Creates a temporary workspace with three snapshots:

```
temp/
├── base/      ← Previous generated code (git HEAD of generated/)
├── custom/    ← Previous customized code (git HEAD of src/)
└── result/    ← Newly regenerated code (fresh copy from generated/)
```

For each file previously in `src/`:

| Scenario | Condition | Action |
|----------|-----------|--------|
| **Skipped** | Matches `--skip` pattern | Copy old customized version as-is |
| **Pure customization** | Never existed in `generated/` | Preserve custom file |
| **Removed by generator** | Was in old `generated/` but not in new | Delete from result |
| **Changed on both sides** | Exists in base, custom, and result | 3-way merge via `git merge-file --diff3` |
| **Changed only in generated** | Custom matches base | Take new generated version |
| **Changed only in custom** | Generated unchanged | Keep customized version |

### Merge Conflicts

When both sides changed the same lines, conflict markers appear:
```typescript
<<<<<<< custom
// Hand-written code
const result = transformResult(raw);
||||||| base
// Previous generated code
const result = raw;
=======
// New generated code
const result = deserializeResult(raw);
>>>>>>> result
```

Resolve by combining intent: apply the hand-written transformation to the new generated code.

## Common Scenarios After Regeneration

### New Operation Added
- Appears in `src/<sub-client>/api/operations.ts` automatically
- **Manual work**: Add convenience wrapper method, add export to `src/index.ts`

### Model Type Changed
- Updated in `src/models/azure/search/documents/*/models.ts` automatically
- **Manual work**: Update `serviceUtils.ts` conversions, update `serviceModels.ts` types

### New Sub-Client Added
- New directory appears in `src/`
- **Manual work**: Create convenience wrapper, add exports, update `package.json` exports

### Operation Signature Changed
- May produce merge conflict
- **Manual work**: Resolve conflict, update convenience client, update conversions

## Debugging

```bash
# Re-run with --no-cleanup to inspect temp workspace
npx dev-tool customization apply --no-cleanup
```

## Important: Always Commit First

The 3-way merge requires committed state. Always:
1. Commit all changes
2. Run `npm run generate:client`
3. Review merge results
4. Commit regenerated code
