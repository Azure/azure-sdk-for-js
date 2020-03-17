# Azure Cognitive Search TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/search"
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated/service
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/search/data-plane/Azure.Search/preview/2019-05-06-preview/searchservice.json
add-credentials: true
use-extension:
  "@microsoft.azure/autorest.typescript": "5.0.1"
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Remove duplicate header parameter

```yaml
directive:
  - from: swagger-document
    where: $.paths..post
    transform: >
      const newParameters = [];
      for (let param of $.parameters) {
        if (param["$ref"] !== "#/parameters/ClientRequestIdParameter") {
          newParameters.push(param);
        }
      }
      $.parameters = newParameters;
  - from: swagger-document
    where: $.paths..get
    transform: >
      const newParameters = [];
      for (let param of $.parameters) {
        if (param["$ref"] !== "#/parameters/ClientRequestIdParameter") {
          newParameters.push(param);
        }
      }
      $.parameters = newParameters;
  - from: swagger-document
    where: $.paths..put
    transform: >
      const newParameters = [];
      for (let param of $.parameters) {
        if (param["$ref"] !== "#/parameters/ClientRequestIdParameter") {
          newParameters.push(param);
        }
      }
      $.parameters = newParameters;
  - from: swagger-document
    where: $.paths..delete
    transform: >
      const newParameters = [];
      for (let param of $.parameters) {
        if (param["$ref"] !== "#/parameters/ClientRequestIdParameter") {
          newParameters.push(param);
        }
      }
      $.parameters = newParameters;
```

### Add support for collection types

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DataType
    transform: >
      if ($.enum.length === 8) {
        const newValues = $.enum.slice(0);
        for (let value of $.enum) {
          newValues.push('Collection('+value+')');
        }
        $.enum = newValues;
      }
```

### Make AnalyzerName a string

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AnalyzeRequest.properties.analyzer
    transform: >
      const extraDocs = " KnownAnalyzerNames is an enum containing known values.";
      if ($['$ref']) {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
  - from: swagger-document
    where: $.definitions.Field.properties[*]
    transform: >
      const extraDocs = " KnownAnalyzerNames is an enum containing known values.";
      if ($['$ref'] === "#/definitions/AnalyzerName") {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
```

### Make TokenizerName a string

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AnalyzeRequest.properties.tokenizer
    transform: >
      const extraDocs = " KnownTokenizerNames is an enum containing known values.";
      if ($['$ref']) {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
  - from: swagger-document
    where: $.definitions.CustomAnalyzer.properties.tokenizer
    transform: >
      const extraDocs = " KnownTokenizerNames is an enum containing known values.";
      if ($['$ref']) {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
```

### Make TokenFilterName a string

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AnalyzeRequest.properties.tokenFilters.items
    transform: >
      const extraDocs = " KnownTokenFilterNames is an enum containing known values.";
      if ($['$ref']) {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
  - from: swagger-document
    where: $.definitions.CustomAnalyzer.properties.tokenFilters.items
    transform: >
      const extraDocs = " KnownTokenFilterNames is an enum containing known values.";
      if ($['$ref']) {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
```

### Make CharFilterName a string

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AnalyzeRequest.properties.charFilters.items
    transform: >
      const extraDocs = " KnownCharFilterNames is an enum containing known values.";
      if ($['$ref']) {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
  - from: swagger-document
    where: $.definitions.CustomAnalyzer.properties.charFilters.items
    transform: >
      const extraDocs = " KnownCharFilterNames is an enum containing known values.";
      if ($['$ref']) {
        delete $['$ref'];
        $.description = $.description + extraDocs;
        $.type = 'string'
      }
```

### Make RegexFlags a string

```yaml
directive:
  - from: swagger-document
    where: $.definitions.PatternAnalyzer.properties.flags
    transform: >
      if ($['$ref']) {
        delete $['$ref'];
        $.type = 'string'
      }
  - from: swagger-document
    where: $.definitions.PatternTokenizer.properties.flags
    transform: >
      if ($['$ref']) {
        delete $['$ref'];
        $.type = 'string'
      }
```
