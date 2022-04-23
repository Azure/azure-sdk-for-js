---
to: <%= fullProjectPath %>/package.json
---
<%- include(`${monorepoRoot}/common/tools/dev-tool/src/commands/scaffolding/_templates/shared/servicefolder/project/create-package.json.ejs`, {name, productName, serviceFolder, fullProjectPath, version, packageDescription, }); %>