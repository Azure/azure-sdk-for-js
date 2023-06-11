
# Multi-Client and Multi-Api in Modular Design

## Introduction

This document is going to talk about how we are going to support multi-client and multi-api for our JS next generation library [Modular](https://github.com/Azure/azure-sdk-for-js/blob/main/design/modular-development.md) in our TypeSpec Emitter for Azure Sdk for JavaScript/TypeScript.

As you may know our Modular is composite of classical client layer, api layer and rest layer, and one of our goal is to have portal team to use our libraries with the rest layer, cases like multi-client and multi-api may be uncommon but still valid, if cases like multi-client or multi-api come to us as long as they can be compiled by TypeSpec compiler, we still need to support them. Which means we will need to reach full functionality as much as possible.

## Design Principals

1. One Compilation One Package, N Compilations N packages.
1. For RLC layer in the Modular, One Client One Service Version

## Multi-Client

### TypeSpec Multi-Client Scenario Explanation

In this context, client.tsp means the entrance for TypeSpec compilation. @client means the defined sub client.

In order to reach full functionalities, we will need to identify all possible scenarios.

First, let's consider the mapping between client.tsp file to @client

1. 1 client.tsp -> 1 @client
1. 1 client.tsp -> N @client
1. N client.tsp -> N @client
1. ~~N client.tsp -> 1 @client~~
   This essentially means that we have N client.tsp that uses the same one sub client name. which can be equals to the 1 client.tsp -> 1 @client case.

Then, let's consider the mapping between @client and @service.

1. 1 @client -> 1 @service
1. ~~1 @client -> N @service~~
   This means to use one @client decorator to map to N different service endpoint, which I don't think we can do that.
1. N @client -> 1 @service
1. N @client -> N @service

So the combination from client.tsp to @client then to @service will be:

1. 1 client.tsp with 1 @client maps to 1 @service
  This is the simplest case, It doesn't belong to any multi-client scenario definition.

1. 1 client.tsp with N @client map to 1 @service
  In this case, service only has one endpoint, but SDK architects want to logically divide it into multi-client, which RLC is not in the business of, but Modular is in the bussiness of. An example would be Load Testing.

1. 1 client.tsp with N @client map to N @service
  In this case, service indeed has multiple endpoints, but for some reason they has to group them into one package, which both RLC and Modular are both in the bussiness of. An example would be Purview Administration.

1. N client.tsp with N @client map to 1 @service
  In this case, service only has one endpoint, but SDK architects want to release it as multiple single-client packages. which doesn't belong to any multi-client scenario definitions. An example would be Health Insights. In this case, RLC will respect the package boundaries defined by client.tsp.

1. ~~N client.tsp with N @client map to N @service~~
  This one basically equals 1 client.tsp with 1 @client maps to 1 @service.

As the first case and the fourth case are not involved with multi-client in both api Layer and rest Layer, we will only consider the second and the third case where we have will use the example name them as the LoadTesting case and the Purview Administration case.

### LoadTesting case

let's say we have the loadtesting modular client now, the code structure is like

```shell
src/index.ts // the classical client
src/api // the api layer
src/rest // the rest layer
```

As the [TypeSpec definition](https://github.com/Azure/azure-rest-api-specs/blob/feature/loadtesting/specification/loadtestservice/client.tsp), they have two sub client named as LoadTestAdministrationClient and LoadTestRunClient and both of them have the same endpoint AzureLoadTesting.

Our proposed code structure would be:

```shell
src/index.ts // the classical client will need to export both the classical sub client for administration and run as well as the models inside both sub clients, which case like commonly used models will probably need to be considered, unless we have a default export, which can be discussed
src/api // this will need to export the api layer stuff for both administration sub client and run sub client as well as the models. also unless we have a default export, which can be discussed.
src/administration/index.ts // the sub client of administration classical client
src/administration/api // the sub client of administration api layer
src/run/index.ts // the sub client of run classical client
src/run/api // the sub client of run api layer
src/rest // the rest layer client
```

The exports in the package.json would be

```json
 "exports": {
    ".": {
      "types": "./types/src/index.d.ts",
      "require": "./dist/index.cjs",
      "import": "./dist-esm/src/index.js"
    },
    "./api": {
      "types": "./types/src/index.d.ts",
      "require": "./dist/index.cjs",
      "import": "./dist-esm/src/index.js"
    },
    "./rest": {
      "types": "./types/src/rest/index.d.ts",
      "require": "./dist/rest/index.cjs",
      "import": "./dist-esm/src/rest/index.js"
    },
    "./administration": {
      "types": "./types/src/administration/index.d.ts",
      "import": "./dist-esm/src/administration/index.js"
    },
    "./run": {
      "types": "./types/src/run/index.d.ts",
      "import": "./dist-esm/src/run/index.js"
    },
    "./administration/api": {
      "types": "./types/src/administration/api/index.d.ts",
      "import": "./dist-esm/src/administration/api/index.js"
    },
    "./run/api": {
      "types": "./types/src/run/api/index.d.ts",
      "import": "./dist-esm/src/run/api/index.js"
    },
  },
```

Please note that in this case, the Client type name for rest level should be the title defined in the @service decorator and the Client name in the api layer sub client should be what's defined in the @client decorators.

As in this case, both @client decorators point to the same endpoint. so if this becomes a multi api. let's say we have a new version v1.

```shell
src/index.ts // the classical client will need to export both the classical sub client for administration and run as well as the models inside both sub clients, which case like commonly used models will probably need to be considered, unless we have a default export, which can be discussed
src/api // this will need to export the api layer stuff for both administration sub client and run sub client as well as the models. also unless we have a default export, which can be discussed.
src/administration/index.ts // the sub client of administration classical client
src/administration/api // the sub client of administration api layer
src/run/index.ts // the sub client of run classical client
src/run/api // the sub client of run api layer
src/rest // the rest layer client

src/v1/index.ts 
src/v1/api
src/v1/administration/index.ts 
src/v1/administration/api
src/v1/run/index.ts 
src/v1/run/api
src/v1/rest 
```

### Purview Administration case

Let's say we have purview administration client now, the code structure is like

```shell
src/index.ts // this will export the two sub classical clients as well as the models involved
src/api // this will export the two sub api layer operation as well as the models involved
src/account/index.ts // this will export the account sub classical client
src/account/api // this will export the account api layer
src/metadataPolicies/index.ts // this will export metadataPolicies sub classical client
src/metadataPolicies/api // this will export metadataPolicies sub api layer
src/rest/index.ts // not sure if we should have this file, this will export both of the account and metadataPolicies rest sub client to the top level, as well as the involved types, which will have the name conflict issue, as what we currently handle it is 
src/rest/account // this will export the account rest sub client
src/rest/metadataPolicies // this will export the metadataPolicies rest sub client.
```

and we have the exports in package.json like

```json
  "exports": {
    ".": {
      "types": "./types/src/index.d.ts",
      "require": "./dist/index.cjs",
      "import": "./dist-esm/src/index.js"
    },
    "./api": {
      "types": "./types/src/api/index.d.ts",
      "require": "./dist/api/index.cjs",
      "import": "./dist-esm/src/api/index.js"
    },
    "./rest": {
      "types": "./types/src/rest/index.d.ts",
      "require": "./dist/rest/index.cjs",
      "import": "./dist-esm/src/rest/index.js"
    },
    "./account": {
      "types": "./types/src/account/index.d.ts",
      "import": "./dist-esm/src/account/index.js"
    },
    "./metadataPolicies": {
      "types": "./types/src/metadataPolicies/index.d.ts",
      "import": "./dist-esm/src/metadataPolicies/index.js"
    },
    "./account/api": {
      "types": "./types/src/account/api/index.d.ts",
      "import": "./dist-esm/src/account/api/index.js"
    },
    "./metadataPolicies/api": {
      "types": "./types/src/metadataPolicies/api/index.d.ts",
      "import": "./dist-esm/src/metadataPolicies/api/index.js"
    },
    "./rest/account": {
      "types": "./types/src/rest/account/index.d.ts",
      "import": "./dist-esm/src/rest/account/index.js"
    },
    "./rest/metadataPolicies": {
      "types": "./types/src/rest/metadataPolicies/index.d.ts",
      "import": "./dist-esm/src/rest/metadataPolicies/index.js"
    }
  },
```

Please note that in this case, the path name in the rest related expports and api related path should be same. as we respect the package boundaries defined by it.

#### User Experience

## Multi-Api

### Single-Client Multi-Api

See the example for single client,

```shell
src/index.ts // the classical client
src/api // the api layer
src/rest // the rest layer
```

when this single client has multi-api. the code structure will be

```shell
src/index.ts
src/api
src/rest
src/v1/index.ts
src/v1/api
src/v1/rest
src/v2/index.ts
src/v2/api
src/v2/rest
```

## Multi-Api mixed with Multi-Client

### Multi-Api for LoadTesting case

This is the multi-client structure,

```shell
src/index.ts // the classical client will need to export both the classical sub client for administration and run as well as the models inside both sub clients, which case like commonly used models will probably need to be considered, unless we have a default export, which can be discussed
src/api // this will need to export the api layer stuff for both administration sub client and run sub client as well as the models. also unless we have a default export, which can be discussed.
src/administration/index.ts // the sub client of administration classical client
src/administration/api // the sub client of administration api layer
src/run/index.ts // the sub client of run classical client
src/run/api // the sub client of run api layer
src/rest // the rest layer client
```

now, plus multi-api, we have

```shell
# default version of everything
src/index.ts 
src/api
src/administration/index.ts 
src/administration/api
src/run/index.ts 
src/run/api
src/rest

# version v1
src/v1/index.ts 
src/v1/api
src/v1/administration/index.ts 
src/v1/administration/api
src/v1/run/index.ts 
src/v1/run/api
src/v1/rest

# version v2
src/v2/index.ts 
src/v2/api
src/v2/administration/index.ts 
src/v2/administration/api
src/v2/run/index.ts 
src/v2/run/api
src/v2/rest
```

In this case, as both of the administration and run sub client are pointing to the same endpoint, the api version evolve strategy should be the same

### Multi-Api For Purview Administration case

This is the multi-client structure

```shell
src/index.ts // this will export the two sub classical clients as well as the models involved
src/api // this will export the two sub api layer operation as well as the models involved
src/account/index.ts // this will export the account sub classical client
src/account/api // this will export the account api layer
src/metadataPolicies/index.ts // this will export metadataPolicies sub classical client
src/metadataPolicies/api // this will export metadataPolicies sub api layer
src/rest/index.ts // not sure if we should have this file, this will export both of the account and metadataPolicies rest sub client to the top level, as well as the involved types, which will have the name conflict issue, as what we currently handle it is 
src/rest/account // this will export the account rest sub client
src/rest/metadataPolicies // this will export the metadataPolicies rest sub client.
```

now plus multi-api,

first, let's consider that both sub client will have the same version strategy

```shell
# the default version of everything could be either v1 or v2
src/index.ts // this will export the two sub classical clients as well as the models involved
src/api // this will export the two sub api layer operation as well as the models involved
src/account/index.ts // this will export the account sub classical client
src/account/api // this will export the account api layer
src/metadataPolicies/index.ts // this will export metadataPolicies sub classical client
src/metadataPolicies/api // this will export metadataPolicies sub api layer
src/rest/index.ts // not sure if we should have this file, this will export both of the account and metadataPolicies rest sub client to the top level, as well as the involved types, which will have the name conflict issue, as what we currently handle it is 
src/rest/account // this will export the account rest sub client
src/rest/metadataPolicies // this will export the metadataPolicies rest sub client.

# version v1
src/v1/index.ts 
src/v1/api
src/v1/account/index.ts 
src/v1/account/api 
src/v1/metadataPolicies/index.ts 
src/v1/metadataPolicies/api
src/v1/rest/index.ts 
src/v1/rest/account
src/v1/rest/metadataPolicies

# version v2
src/v2/index.ts 
src/v2/api
src/v2/account/index.ts 
src/v2/account/api 
src/v2/metadataPolicies/index.ts 
src/v2/metadataPolicies/api
src/v2/rest/index.ts 
src/v2/rest/account
src/v2/rest/metadataPolicies
```

Second, let's consider that account has version v1 and v3 and metadataPolicies has version v2 and v4., let's assume v1 and v2 happen the same time, v3 and v4 also happen the same time.

```shell
# the default version of everything, This time we will need the customer's input on which one should be treat as default version for account and which one should be treat as default version for metadataPolices.
src/index.ts // this will export the two sub classical clients as well as the models involved
src/api // this will export the two sub api layer operation as well as the models involved
src/account/index.ts // this will export the account sub classical client
src/account/api // this will export the account api layer
src/metadataPolicies/index.ts // this will export metadataPolicies sub classical client
src/metadataPolicies/api // this will export metadataPolicies sub api layer
src/rest/index.ts // not sure if we should have this file, this will export both of the account and metadataPolicies rest sub client to the top level, as well as the involved types, which will have the name conflict issue, as what we currently handle it is 
src/rest/account // this will export the account rest sub client
src/rest/metadataPolicies // this will export the metadataPolicies rest sub client.

# account version v1 and metadataPolicies v2, In the case, we export default client, here the "v?" should be whatever version the default client has
src/v?/index.ts 
src/v?/api
src/v1/account/index.ts 
src/v1/account/api 
src/v2/metadataPolicies/index.ts 
src/v2/metadataPolicies/api
src/v?/rest/index.ts 
src/v1/rest/account
src/v2/rest/metadataPolicies

# account version v3 and metadataPolicies v4, In the case, we export default client, here the "v?" should be whatever the default client has
src/v?/index.ts 
src/v?/api
src/v3/account/index.ts 
src/v3/account/api 
src/v4/metadataPolicies/index.ts 
src/v4/metadataPolicies/api
src/v?/rest/index.ts 
src/v3/rest/account
src/v4/rest/metadataPolicies
```

Third, let's consider that account has version v1 and v3 and metadataPolicies has version v2 and v4., let's assume the timeline is v1 < v2 < v3 < v4

```shell
# the default version of everything, This time we will need the customers input on which one should be treat as default version for account and which one should be treat as default version for metadataPolices.
src/index.ts // this will export the two sub classical clients as well as the models involved
src/api // this will export the two sub api layer operation as well as the models involved
src/account/index.ts // this will export the account sub classical client
src/account/api // this will export the account api layer
src/metadataPolicies/index.ts // this will export metadataPolicies sub classical client
src/metadataPolicies/api // this will export metadataPolicies sub api layer
src/rest/index.ts // not sure if we should have this file, this will export both of the account and metadataPolicies rest sub client to the top level, as well as the involved types, which will have the name conflict issue, as what we currently handle it is 
src/rest/account // this will export the account rest sub client
src/rest/metadataPolicies // this will export the metadataPolicies rest sub client.

# we have v1 for account, in this case, if we have default exports, we will have to depend on if the default is account, if it is, we will have 
# src/v1/index.ts 
# src/v1/api and 
# src/v1/rest/index.ts
# if not, we will remain the same as the previous. 
# src/index.ts 
# src/api
src/v1/account/index.ts
src/v1/account/api
# because this has not been change compare last time will generate exactly the same file as before.
# src/metadataPolicies/index.ts 
# src/metadataPolicies/api
# src/rest/index.ts 
src/v1/rest/account
# src/rest/metadataPolicies 

# now we have v2 for metadataPolicies, in this case, we will have the same structure as the previous assumption where v1 and v2 happen the same time.

# account version v1 and metadataPolicies v2, In the case, we export default client, here the "v?" should be whatever version the default client has， if the default client is account, then we already has that in the preview v1 version.
src/v?/index.ts 
src/v?/api
# src/v1/account/index.ts 
# src/v1/account/api 
src/v2/metadataPolicies/index.ts 
src/v2/metadataPolicies/api
src/v?/rest/index.ts 
# src/v1/rest/account
src/v2/rest/metadataPolicies

# now we have v3 in account, the code structure will be like 
# account version v1, v3 and metadataPolicies v2, In the case, we export default client, here the "v?" should be whatever version the default client has
src/v?/index.ts 
src/v?/api
src/v3/account/index.ts 
src/v3/account/api 
# src/v2/metadataPolicies/index.ts 
# src/v2/metadataPolicies/api
src/v?/rest/index.ts 
src/v3/rest/account
# src/v2/rest/metadataPolicies

# finally, we have v4 in metadata policy 
# account version v1, v3 and metadataPolicies v2, v4, In the case, we export default client, here the "v?" should be whatever version the default client has
src/v?/index.ts 
src/v?/api
# src/v3/account/index.ts 
# src/v3/account/api 
src/v4/metadataPolicies/index.ts 
src/v4/metadataPolicies/api
src/v?/rest/index.ts 
# src/v3/rest/account
src/v4/rest/metadataPolicies

```

## Questions

1. Is there a case where we should be multi-client in RLC but single-client in Modular.  
   Not sure if this is a bug [cadl playground link](https://cadlplayground.z22.web.core.windows.net/cadl-azure/?c=aW1wb3J0ICJAdHlwZXNwZWMvcmVzdCI7CskZYXp1cmUtdG9vbHMvyCUtxhVjb3Jl3ytjLWNsaWVudC1nZW5lcmF0b3LINgp1c2luZyBUeXBlU3BlYy5IdHRwO9AVUmVzdMgVQcReLkNvcmXPEsVhR8hg0URWZXJzaW9uaW5nOwoKQHNlcnZpY2UoewogIHRpdGxlOiAiTXVsdGnGRyIsCiAgdsYyOiAiMS4wLjAiLAp9KQpAdXNlRGVwZW5kZW5jeSjHfG9yZchhcy52MV8wX1ByZXZpZXdfMSkKbmFtZXNwYWNlIENhZGwuy2cgewoKLy8gb3DkALRpb24g8ADjCiAgbW9kZWwgUmVzb3VyY2Ug5ACxICBAdmlzaWJpbGl0eSgicmVhZCIpxRhpZDogc3Ry5gDlxSlrZXnGCXNlZ21lbnTEL8ZLc8c02EzkALfKTsQSZGVzY3JpcOQAqj%2FOGuQB58wSfcR%2B7gC6QXJyYXkgaXPJEVtd5QCkQPUBv%2BYBU%2BYCNeUBpegAkCJGb2%2FrAaQgIOcByjrxAV3EH33kAMtAcm91dGUoIi9jYWRsLWZvb%2BUA4UBkb2MoIsQ1IEbHE2ludGVyZuQBqUZvb09w6AFsxilyZWF0ZXMgYSBuZXcg6AFEIG9yIHVwZMYabiBleGlzdOQBwm9uZS7FUyAgY8U5T3JVxSfsAQHGU09yUmVwbGFjZTzIGD7oAbzFeUdldHMgdGhlIGRldGFpbHMgb2YgYekAgchmZ2V0zFtSZWFk11BEZWxl5gDJ0ERkxRrMR8Ys10lMaXPnAJrpAPfIUnPIU2xpc%2B0AmMQ0zE%2FkAip9%2FwOPZW50Mf8DkP8DkP8DkMtoIHvkA5BiaW5hcnn%2FA5ogIEBmcmllbmRseU5hbWUoIugA1zHlAPz%2FA7f%2FA7f%2FA7fcTP8Dt%2F8Dt%2F8Dt%2BcDty8v5AHrcG9uc2Ugd2l0aCBoZWFkZXJz%2FwPP%2FwPP%2FgPPMeoD0OUCf0JhcuYDyO0D3mLHFuoDy0JhcuoDy8gsZ2V0LeYB5ugBTmdldOgDSULFGSgpOiBPa1LoAOcmx0MgIEDmAO0oImNvbnTkBtTkAUYiKSDHD%2BQGcTogImltYWdlL3BuZyLmAWsgIEBib2R5IMQFOiBieXRlc8YZfecB82dldOUBbMR47QF9xyDqAOjlBDct5AF4LecBeOgAxXB15gDFxiNXaXRoSMYhxFXmBG9k%2FADS6QLvLWxvY8UJx1og6gMKTMca6gCmyBLxBCjnAPTHDMQLyjXuAP3pAN3mBIT1AN3GG%2BsEqu8A4E5vQ%2BYBgv8A4v8A4v8A4usEu%2BUAv%2BYEwg%3D%3D)
1. In the Multi-Client case, what if only one of them become a Multi-Api case.
   Only applies to cases like purview administration.
1. In the Multi-Api case, what if starting from one version, it becomes a Multi-Client.
1. Use subpath exports in pure RLC generation.
   1. Multi-Client
      ./rest/account
      ./rest/metadataPolicies
   1. Multi-Api
1. Default client exports.
   Not sure if we should add default client, on one hand, it can keep the consistent code structure, and avoid some name conflicts. On the other hand, we will have a complexer of module sub path export.
1. Breaking change consideration.
   1. RLC is a breaking change, but Modular is not.
   1. RLC is not a breaking change, but Modular is.
1. Adding new client
   1. Migrate from single-client to multi-client.
   1. Adding new client to existing multi-client.
1. Adding new api version
   1. Migrate from single-api to multi-api.
   1. Adding new api version to existing multi-api.
1. Commonly used models.
1. Codegen related questions.
   1. use subpath export in our own code, [example link](https://github.com/qiaozha/azure-sdk-for-js/commit/7c32e2855988ed89309ca995de19a44d1d27511a)
1. Dev tool for customization code combination.
   Not sure if we need any change if the code structure changed.
