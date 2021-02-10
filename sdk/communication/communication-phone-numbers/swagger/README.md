# Azure Communication Services Phone Numbers Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: azure-communication-phone-numbers
description: Phone number configuration client
package-version: 1.0.0-beta.4
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/f20d92b324842b407e0dcce36ad0e67bd9bb66cf/specification/communication/data-plane/Microsoft.CommunicationServicesPhoneNumbers/stable/2021-03-07/phonenumbers.json
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210202.1"
add-credentials: false
azure-arm: false
```

### Make areaCode required in PhoneNumberSearchRequest

```yaml
directive:
  from: swagger-document
  where: $.definitions.PhoneNumberSearchRequest
  transform: >
    $.required = ["phoneNumberType", "assignmentType", "capabilities", "areaCode"]
```