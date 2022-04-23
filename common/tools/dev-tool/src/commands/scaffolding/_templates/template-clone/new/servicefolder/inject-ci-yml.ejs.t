---
inject: true
to: <%= fullServicePath %>/ci.yml
after: Artifacts
skip_if: azure-<%= name %>
---
<%- include(`${monorepoRoot}/common/tools/dev-tool/src/commands/scaffolding/_templates/shared/servicefolder/inject-ci.yml.ejs`, {name}); %>
