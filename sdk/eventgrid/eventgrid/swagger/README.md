# Azure Text Analytics TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
require: "https://github.com/Azure/azure-rest-api-specs/blob/cf9d9c44d990d82a763cf8c23a324de337e387a5/specification/eventgrid/data-plane/readme.md"
package-name: "@azure/eventgrid"
package-version: "4.0.1"
title: GeneratedClient
description: EventGrid Client
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
save-inputs: true
source-code-folder-path: ./src/generated
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210121.2"
hide-clients: true
```

## Customizations

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
            $[definition].required = properties;
          }
        }
      }

      // Fix up CommunicationIdentifierModel where this huristic is wrong.
      $["CommunicationIdentifierModel"].required = ["rawId"];
```
