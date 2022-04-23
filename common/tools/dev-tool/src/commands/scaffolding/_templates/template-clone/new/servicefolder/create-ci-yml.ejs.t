---
to: <%= fullServicePath %>/ci.yml
---
<%- include(`${monorepoRoot}/common/tools/dev-tool/src/commands/scaffolding/_templates/shared/servicefolder/create-ci.yml.ejs`, {name}); %>