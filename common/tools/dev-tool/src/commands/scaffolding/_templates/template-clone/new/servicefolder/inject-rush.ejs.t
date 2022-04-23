---
inject: true
to: <%= monorepoRoot %>/rush.json
after: \/\/ \*\*\* Packages \*\*
skip_if: azure\/<%= name %>
sh: "mkdir -p <%= fullProjectPath %>"
---
<%- include(`${monorepoRoot}/common/tools/dev-tool/src/commands/scaffolding/_templates/shared/servicefolder/inject-rush.json.ejs`, {name, projectFolder}); %>
