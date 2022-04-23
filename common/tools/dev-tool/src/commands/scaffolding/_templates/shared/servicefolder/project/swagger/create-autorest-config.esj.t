---
to: "<%= !isTemplateProject ? `${fullProjectPath}/swagger/README.md` : null %>"
unless_exists: true
---
# Azure Example TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/<%= name %>"
title: <%= h.inflection.classify(name) %>Client
description: GeneratedClient
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: <%= swaggerUrl %>
add-credentials: <%= addCredentials %>
package-version: <%= version %>
disable-async-iterators: <%= disablePagination %>
hide-clients: <%= hideClients %>
use-extension:
  "@autorest/typescript": "6.0.0-beta.19"
```
