---
to: <%= fullProjectPath %>/tests.yml
---
<%- include(`${monorepoRoot}/common/tools/dev-tool/src/commands/scaffolding/_templates/shared/servicefolder/project/create-tests.yml.ejs`, {name, serviceFolder}); %>