# Azure Core HTTP Compatibility library for JavaScript

This library provides compatibility between the Core V1 ([core-http](https://www.npmjs.com/package/@azure/core-http)) and the Core V1 ([core-client](https://www.npmjs.com/package/@azure/core-client) & [core-rest-pipeline](https://www.npmjs.com/package/@azure/core-rest-pipeline)) libraries.

Recently, a new set of libraries (`core-client` & `core-rest-pipeline`) have been developed to replace the older `core-http` library. The existing libraries with `core-http` dependency will be migrated to use the new libraries. But, this migration will cause some breaking changes.

In order to avoid the breaking change to our customers, this compatibility library has been developed. This will avoid any breaking changes during the migration and provide a bridging layer between Core V1 & Core V2 libraries.

## Usage

### ExtendedServiceClientOptions

With Core V1 library, the `options` parameter to the generated client will look like:

```
export interface SearchClientOptionalParams extends coreHttp.ServiceClientOptions {
  /** Overrides client endpoint. */
  endpoint?: string;
}
```

With the Core V2 libraries, the `options` parameter to the generated client will look like:

```
export interface SearchClientOptionalParams extends coreClient.ServiceClientOptions {
  /** Overrides client endpoint. */
  endpoint?: string;
}
```

With the Core HTTP Compatibility library, the `options` parameter to the generated client will look like:

```
export interface SearchClientOptionalParams extends coreHttpCompat.ExtendedServiceClientOptions {
  /** Overrides client endpoint. */
  endpoint?: string;
}
```

### ExtendedCommonClientOptions

With Core V1 library, the `options` parameter to the custom client will look like:

```
export interface SearchClientOptions extends PipelineOptions {
  apiVersion?: string;
}
```

With Core V2 library, the `options` parameter to the custom client will look like:

```
export interface SearchClientOptions extends CommonClientOptions {
  apiVersion?: string;
}
```

With the Core HTTP Compatibility library, the `options` parameter to the custom client will look like:

```
export interface SearchClientOptions extends ExtendedCommonClientOptions {
  apiVersion?: string;
}
```
