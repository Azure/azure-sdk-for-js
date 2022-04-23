---
to: <%= fullProjectPath %>/api-extractor.json
sh: "mkdir -p <%= fullProjectPath %>/review"
---
<%- include(`${monorepoRoot}/common/tools/dev-tool/src/commands/scaffolding/_templates/shared/servicefolder/project/create-apiextractor.json.ejs`, {name: name, serviceFolder: serviceFolder}); %>