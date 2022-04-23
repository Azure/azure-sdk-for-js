---
to: <%= fullProjectPath %>/README.md
---
<%- include(`${monorepoRoot}/common/tools/dev-tool/src/commands/scaffolding/_templates/shared/servicefolder/project/create-readme.md.ejs`, {name, productName, serviceFolder}); %>