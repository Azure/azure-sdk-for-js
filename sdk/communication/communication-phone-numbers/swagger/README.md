# Azure Communication Services Phone Numbers Module

> see https://aka.ms/autorest

## Configuration

```yaml
description: Phone number configuration client
tag: package-phonenumber-2022-01-11-preview2
require: 
  - https://raw.githubusercontent.com/Azure/azure-rest-api-specs/02fce64677f78021ba70d69bb8bd0d916d653927/specification/communication/data-plane/PhoneNumbers/readme.md
  - common.md
title: Phone Numbers Client
```

## Customizations

### Disable extensible enums

```yaml
directive:
  - from: swagger-document
    where: $.definitions[*].properties[*]["x-ms-enum"]
    transform: >
      if ($.modelAsString) {
        $.modelAsString = false
      }
```
