# Azure AppService TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-rest/arm-appservice"
title: WebSiteManagementClient
description: App Service Client
generate-metadata: true
generate-test: true
generate-sample: true
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file:
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.CertificateRegistration/stable/2021-03-01/AppServiceCertificateOrders.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.CertificateRegistration/stable/2021-03-01/CertificateOrdersDiagnostics.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.CertificateRegistration/stable/2021-03-01/CertificateRegistrationProvider.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.DomainRegistration/stable/2021-03-01/Domains.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.DomainRegistration/stable/2021-03-01/TopLevelDomains.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.DomainRegistration/stable/2021-03-01/DomainRegistrationProvider.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/AppServiceEnvironments.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/AppServicePlans.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/Certificates.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/CommonDefinitions.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/ContainerApps.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/ContainerAppsRevisions.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/DeletedWebApps.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/Diagnostics.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/Global.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/KubeEnvironments.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/Provider.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/Recommendations.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/ResourceHealthMetadata.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/ResourceProvider.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/StaticSites.json
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/078b90617e5e08137d0395963bd4119f4561a910/specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/WebApps.json
package-version: 1.0.0-beta.1
rest-level-client: true
add-credentials: true
credential-scopes: "https://management.azure.com/.default"
use-extension:
  "@autorest/typescript": "6.0.0-beta.20"
```
