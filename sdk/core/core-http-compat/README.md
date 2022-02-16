# Azure Core HTTP Compatibility library for JavaScript

This library provides compatibility between the Core V1 ([core-http](https://www.npmjs.com/package/@azure/core-http)) and the Core V1 ([core-client](https://www.npmjs.com/package/@azure/core-client) & [core-rest-pipeline](https://www.npmjs.com/package/@azure/core-rest-pipeline)) libraries.

Recently, a new set of libraries (`core-client` & `core-rest-pipeline`) have been developed to replace the older `core-http` library. The existing libraries with `core-http` dependency will be migrated to use the new libraries. But, this migration will cause some breaking changes.

In order to avoid the breaking change to our customers, this compatibility library has been developed. This will avoid any breaking changes during the migration and provide a bridging layer between Core V1 & Core V2 libraries.
