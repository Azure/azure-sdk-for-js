# Azure Text Analytics TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
require: "https://github.com/Azure/azure-rest-api-specs/blob/f8811b7dd784712c3fb0941e04d9042f59a4d367/specification/eventgrid/data-plane/readme.md"
package-name: "@azure/eventgrid"
package-version: "4.10.0-beta.2"
title: GeneratedClient
description: EventGrid Client
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
save-inputs: true
source-code-folder-path: ./src/generated
typescript: true
hide-clients: true
use-extension:
  "@autorest/typescript": "6.0.0-beta.4"
v3: true
```

## Customizations

### Don't force a scheme

The endpoint URL will already have a scheme, don't add yet another one.

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-parameterized-host"]
    transform: >
      $.useSchemePrefix = false;
```

### Mark a discriminator property as "required"

Newer versions of AutoRest complain during validation about the discriminator property being required

```yaml
directive:
  - from: swagger-document
    where: $.definitions.MediaJobOutput
    transform: >
      $.required.push("@odata.type");
```

### Use the "EventData" suffix on the Azure Resource Manager Event types, instead of just "Data"

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      ["Write", "Delete", "Action"].forEach(action => {
        ["Success", "Failure", "Cancel"].forEach(status => {
          if ($[`Resource${action}${status}Data`]) {
            $[`Resource${action}${status}Data`]["x-ms-client-name"] = `Resource${action}${status}EventData`;
          }
        });
      });
```

### Remove the "Properties" suffix from some object types.

It's obvious they are properties and the type names read better without the suffix.

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      for (const definition in $) {
        if (definition.endsWith("Properties") && $[definition].properties !== undefined) {
          const cleanName = definition.substring(0, definition.length - "Properties".length);
          $[definition]["x-ms-client-name"] = cleanName;
        }
      }
```

### Remove type: "date-time" for properties of event data models. We want to generate interfaces that match the JSON structure (i.e. `string`s instead of `Date`s)

We want to expose the correct view over the raw JSON of the event, not some version after it's run through AutoRest mapping.

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      for (const definition in $) {
        if (definition !== "EventGridEvent" && definition !== "CloudEventEvent") {
          for (const property in $[definition].properties) {
            if ($[definition].properties[property].format === "date-time") {
              delete $[definition].properties[property].format;
            }
          }
        }
      }
```

### Mark properties of event data as "required" if they were not annotated

For schemas for events which don't define a set of required properties, assume they are all required, so we don't generate shapes where every property is optional. That does not reflect what the service is doing.

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      for (const definition in $) {
        if ($[definition].properties && $[definition].required === undefined) {
          const properties = Object.keys($[definition].properties);
          if (properties.length > 0) {
            switch (definition) {
              case "CommunicationIdentifierModel":
                $[definition].required = ["rawId"];
                break;
              default:
                $[definition].required = properties;
            }
          }
        }
      }
```

### Don't use x-ms-client-name for EventHub Event.

The wire format for the event uses camel cassing and the `x-ms-client-name` attribute was added to the API Specification (in Azure/azure-rest-api-specs#17565) to work around an issue without introducing a breaking
change. For JavaScript, we want to generate types that match the format of the wire events, so remove `x-ms-client-name`.

```yaml
directive:
  - from: swagger-document
    where: $.definitions.EventHubCaptureFileCreatedEventData
    transform: >
      delete $.properties.fileUrl["x-ms-client-name"]
```

### Don't use x-ms-client-name for Fhir Events.

For JavaScript, we want to generate types that match the format of the wire events, so remove `x-ms-client-name`.

```yaml
directive:
  - from: swagger-document
    where: $.definitions.HealthcareFhirResourceCreatedEventData
    transform: >
      delete $.properties.resourceType["x-ms-client-name"];
      delete $.properties.resourceFhirAccount["x-ms-client-name"];
      delete $.properties.resourceFhirId["x-ms-client-name"];
      delete $.properties.resourceVersionId["x-ms-client-name"];
  - from: swagger-document
    where: $.definitions.HealthcareFhirResourceUpdatedEventData
    transform: >
      delete $.properties.resourceType["x-ms-client-name"];
      delete $.properties.resourceFhirAccount["x-ms-client-name"];
      delete $.properties.resourceFhirId["x-ms-client-name"];
      delete $.properties.resourceVersionId["x-ms-client-name"];
  - from: swagger-document
    where: $.definitions.HealthcareFhirResourceDeletedEventData
    transform: >
      delete $.properties.resourceType["x-ms-client-name"];
      delete $.properties.resourceFhirAccount["x-ms-client-name"];
      delete $.properties.resourceFhirId["x-ms-client-name"];
      delete $.properties.resourceVersionId["x-ms-client-name"];
```
