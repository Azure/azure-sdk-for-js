# Post-Generation Customizations

This directory contains scripts to apply customizations to TypeSpec-generated code.

## Quick Start

After regenerating from TypeSpec, run:

```bash
pnpm run post-generation
```

## What Gets Fixed

- Renames `endpointParam` → `endpoint` in constructor (API review requirement)

## Files Modified

- `src/transcriptionClient.ts`
- `src/api/transcriptionContext.ts`

## Complete Workflow

```bash
# 1. Regenerate from TypeSpec
# 2. Apply customizations
pnpm run post-generation

# 3. Format and build
pnpm run format
pnpm turbo build -F @azure/azure-ai-speech-transcription...

# 4. Verify changes
git diff review/
```

## Why This Exists

TypeSpec generates `endpointParam` but Azure SDK guidelines require `endpoint`. This script automatically applies the fix after each regeneration.

**Long-term solution**: Fix the parameter name in the upstream TypeSpec specification

## Related Documentation

- [TypeSpec Generation Guide](../../../documentation/Generate-code-from-TypeSpec.md)
- [Azure SDK Design Guidelines](https://azure.github.io/azure-sdk/typescript_design.html)
- [Dev Tool Customizations](../../../design/dev-tool-customizations.md)
