---
to: <%= fullProjectPath %>/tsconfig.json
---
<%- include(`${monorepoRoot}/common/tools/dev-tool/src/commands/scaffolding/_templates/shared/servicefolder/project/create-tsconfig.json.ejs`, {name, fullProjectPath}); %>