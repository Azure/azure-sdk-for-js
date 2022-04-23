---
inject: true
to: <%= fullProjectPath %>/package.json
after: \"constantPaths\"
skip_if: generatedClientContext\.ts
---
      {
        "path": "src/generated/generatedClientContext.ts",
        "prefix": "packageDetails"
      },