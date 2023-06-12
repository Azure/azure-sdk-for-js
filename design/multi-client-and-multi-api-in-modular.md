# Multi-Client and Multi-Api in Modular Design

## Introduction

This document is going to talk about what the multi-client and multi-api for our JS next generation library [Modular](https://github.com/Azure/azure-sdk-for-js/blob/main/design/modular-development.md) would look like.

As you may know our Modular is composited of classical client layer, api layer and rest layer. And one of our goal is to have Azure Portal to use our libraries with the rest layer, cases like multi-client and multi-api may be uncommon but still valid, if cases like multi-client or multi-api come to us, as long as they are valid in the perspective of TypeSpec compiler, we will need to support them.

## Design Principals

1. N Compilations N packages.  
   This means, we respect the package boundaries that are defined by the client.tsp. if there're N client.tsp files, no matter where those N client.tsp files point to, we will generate N packages.
1. For RLC, One Client One Service Version  
   This means, in terms of RLC, we only split it into multi-client where there're multi endpoints from one compilation i.e. the @service decorators. If the multiple sub clients is divided because they are going to have different version evolving strategy, RLC will only honor it when that api version parameter is in the parameterized host. Otherwise, it doesn't make any differences to RLC if it's version v1 or version v2.

## Earlier Design

## Multi-Client in Modular

### Identify Scenarios

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
   In this case, service indeed has multiple endpoints, but for some reason they have to group them into one package, which both RLC and Modular are both in the bussiness of. An example would be Purview Administration.

1. N client.tsp with N @client map to 1 @service  
   In this case, service only has one endpoint, but SDK architects want to release it as multiple single-client packages. which doesn't belong to any multi-client scenario definitions. An example would be Health Insights. In this case, RLC will respect the package boundaries defined by client.tsp.

1. ~~N client.tsp with N @client map to N @service~~  
   This one basically equals 1 client.tsp with 1 @client maps to 1 @service.

As the first case and the fourth case are not involved with multi-client in both api Layer and rest Layer, we will only consider the second and the third case where we have will use the example name them as the LoadTesting case and the Purview case.

### LoadTesting case

let's say we have the loadtesting modular client now, the code structure is like

```shell
src/index.ts # the classical client
src/api # the api layer
src/rest # the rest layer
```

The user experience are as

```
@azure/loadtesting
@azure/loadtesting/api
@azure/loadtesting/rest
```

As the [TypeSpec definition](https://github.com/Azure/azure-rest-api-specs/blob/feature/loadtesting/specification/loadtestservice/client.tsp), they have two sub client named as LoadTestAdministrationClient and LoadTestRunClient and both of them have the same endpoint AzureLoadTesting.

Our proposed code structure would be:

- Option 1:

```shell
src/index.ts # the classical client will need to export both the classical sub client for administration and run as well as the models inside both sub clients, which case like commonly used models will probably need to be considered, unless we have a default export, which can be discussed
src/api # this will need to export the api layer stuff for both administration sub client and run sub client as well as the models. also unless we have a default export, which can be discussed.
src/administration/index.ts # the sub client of administration classical client
src/administration/api # the sub client of administration api layer
src/run/index.ts # the sub client of run classical client
src/run/api # the sub client of run api layer
src/rest # the rest layer client
```

- Option 2:

```shell
src/index.ts # the classical client will need to export both the classical sub client for administration and run as well as the models inside both sub clients, which case like commonly used models will probably need to be considered
src/api/index.ts # this will need to export the api layer stuff for both administration sub client and run sub client as well as the models. also unless we have a default export, which can be discussed.
src/api/administration # the sub client of administration api layer
src/api/run # the sub client of run api layer
src/rest # the rest layer client
```

The user experience comparasion between Option 1 and Option 2 for the LoadTesting case would be

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Option 1</th>
    <th>Option 2</th>
  </tr>
  <tr>
    <td>
      <pre lang="shell">
@azure/loadtesting
@azure/loadtesting/api
@azure/loadtesting/rest
@azure/loadtesting/administration
@azure/loadtesting/administration/api
@azure/loadtesting/run
@azure/loadtesting/run/api
</pre>
</td>
<td>
<pre lang="shell">
@azure/loadtesting
@azure/loadtesting/api
@azure/loadtesting/rest
@azure/loadtesting/api/administration
@azure/loadtesting/api/run
</pre>
</td>

  </tr>
</table>
<!-- markdownlint-enable MD033 -->

Please note that in this case, the Client type name for rest level should be the title defined in the @service decorator and the client name in the api layer sub client should be what's defined in the @client decorators.

### Purview case

Let's say we have purview client now, the code structure is like

- Option 1:

```shell
src/index.ts # this will export the two sub classical clients as well as the models involved
src/api # this will export the two sub api layer operation as well as the models involved
src/account/index.ts # this will export the account sub classical client
src/account/api # this will export the account api layer
src/metadataPolicies/index.ts # this will export metadataPolicies sub classical client
src/metadataPolicies/api # this will export metadataPolicies sub api layer
src/rest/index.ts # not sure if we should have this file, this will export both of the account and metadataPolicies rest sub client to the top level, as well as the involved types, which will have the name conflict issue, as what we currently handle it is
src/rest/account # this will export the account rest sub client
src/rest/metadataPolicies # this will export the metadataPolicies rest sub client.
```

- Option 2:

```shell
src/index.ts # this will export the two sub classical clients as well as the models involved
src/api/index.ts # this will export the two sub api layer operation as well as the models involved
src/api/account # this will export the account api layer
src/api/metadataPolicies # this will export metadataPolicies sub api layer
src/rest/index.ts # not sure if we should have this file, this will export both of the account and metadataPolicies rest sub client to the top level, as well as the involved types, which will have the name conflict issue, as what we currently handle it is
src/rest/account # this will export the account rest sub client
src/rest/metadataPolicies # this will export the metadataPolicies rest sub client.
```

The user experience comparasion between Option 1 and Option 2 for the Purview case

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Option 1</th>
    <th>Option 2</th>
  </tr>
  <tr>
    <td>
      <pre lang="shell">
@azure/purview
      </pre>
      <pre lang="shell">
@azure/purview/api
@azure/purview/rest
      </pre>
      <pre lang="shell">
@azure/purview/account
@azure/purview/account/api
@azure/purview/rest/account
      </pre>
      <pre lang="shell">
@azure/purview/metadataPolicies
@azure/purview/metadataPolicies/api
@azure/purview/rest/metadataPolicies

</pre>
</td>
<td>
<pre lang="shell">
@azure/purview
</pre>
<pre lang="shell">
@azure/purview/api
@azure/purview/rest
</pre>
<pre lang="shell">
@azure/purview/api/account
@azure/purview/rest/account
</pre>
<pre lang="shell">
@azure/purview/api/metadataPolicies
@azure/purview/rest/metadataPolicies
</pre>
</td>

  </tr>
</table>
<!-- markdownlint-enable MD033 -->

### Rethinking

Let's compare the original design and the Option 2 from the user experience perspective side by side.

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Original Design</th>
    <th>Option 2</th>
  </tr>
  <tr>
    <td>
      <pre lang="shell">
Default Client (Account)
@azure/purview
@azure/purview/api
@azure/purview/rest
      </pre>
      <pre lang="shell">
Sub Client Account
@azure/purview/account
@azure/purview/account/api
@azure/purview/account/rest
      </pre>
      <pre lang="shell">
Sub Client MetadataPolicies
@azure/purview/metadataPolicies
@azure/purview/metadataPolicies/api
@azure/purview/metadataPolicies/rest
</pre>
</td>
<td>
<pre lang="shell">
Default Client (Account)
@azure/purview
@azure/purview/api
@azure/purview/rest
</pre>
<pre lang="shell">
Sub Client Account
@azure/purview/api/account
@azure/purview/rest/account
</pre>
<pre lang="shell">
Sub Client MetadataPolicies
@azure/purview/api/metadataPolicies
@azure/purview/rest/metadataPolicies

</pre>
</td>

  </tr>
</table>
<!-- markdownlint-enable MD033 -->

After rethinking the user experience, I found that physology behind the two approaches is how we classify our customers. If we go with approach on the left side, this means we think higher of the service user scenarios, If we go with the approach on the right side, this means we think higher of our JS modular libraries' own user scenarios.

Please note that in this case, the path name in the rest related expports and api related path should be same. as we respect the package boundaries defined by it.

## Multi-Api in Modular

### Single-Client Multi-Api

See the example for single client,

```shell
src/index.ts # the classical client
src/api # the api layer
src/rest # the rest layer
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

Assuming the package name is called @azure/foo, the user experience for single client when it becomes multi-api would be:

```shell
@azure/foo
@azure/foo/api
@azure/foo/rest

@azure/foo/v1
@azure/foo/v1/api
@azure/foo/v1/rest

@azure/foo/v2
@azure/foo/v2/api
@azure/foo/v2/rest
```

### Multi-Client Multi-Api

#### Multi-Api for LoadTesting case

Assuming we have the default version, and we want to add v1, v2 to make it multi-api package, the structure would like:

- Option 1:

```shell
# default version of everything
src/index.ts # the classical client will need to export both the classical sub client for administration and run as well as the models inside both sub clients, which case like commonly used models will probably need to be considered, unless we have a default export, which can be discussed
src/api # this will need to export the api layer stuff for both administration sub client and run sub client as well as the models. also unless we have a default export, which can be discussed.
src/administration/index.ts # the sub client of administration classical client
src/administration/api # the sub client of administration api layer
src/run/index.ts # the sub client of run classical client
src/run/api # the sub client of run api layer
src/rest # the rest layer client

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

- Option 2:

```shell
src/index.ts # the classical client will need to export both the classical sub client for administration and run as well as the models inside both sub clients, which case like commonly used models will probably need to be considered
src/api/index.ts # this will need to export the api layer stuff for both administration sub client and run sub client as well as the models. also unless we have a default export, which can be discussed.
src/api/administration # the sub client of administration api layer
src/api/run # the sub client of run api layer
src/rest # the rest layer client

src/v1/index.ts
src/v1/api/index.ts
src/v1/api/administration
src/v1/api/run
src/v1/rest

src/v2/index.ts
src/v2/api/index.ts
src/v2/api/administration
src/v2/api/run
src/v2/rest
```

The user experience comparasion between the Option 1 and Option 2 in the load testing case, when it becomes multi-api

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Option 1</th>
    <th>Option 2</th>
  </tr>
  <tr>
    <td>
      <pre lang="shell">
@azure/loadtesting
      </pre>
      <pre lang="shell">
@azure/loadtesting/api
@azure/loadtesting/rest
      </pre>
      <pre lang="shell">
@azure/loadtesting/administration
@azure/loadtesting/administration/api
      </pre>
      <pre lang="shell">
@azure/loadtesting/run
@azure/loadtesting/run/api
      </pre>
      <pre lang="shell">
@azure/loadtesting/v1
      </pre>
      <pre lang="shell">
@azure/loadtesting/v1/api
@azure/loadtesting/v1/rest
      </pre>
      <pre lang="shell">
@azure/loadtesting/v1/administration
@azure/loadtesting/v1/administration/api
      </pre>
      <pre lang="shell">
@azure/loadtesting/v1/run
@azure/loadtesting/v1/run/api
      </pre>
      <pre lang="shell">
@azure/loadtesting/v2
      </pre>
      <pre lang="shell">
@azure/loadtesting/v2/api
@azure/loadtesting/v2/rest
      </pre>
      <pre lang="shell">
@azure/loadtesting/v2/administration
@azure/loadtesting/v2/administration/api
      </pre>
      <pre lang="shell">
@azure/loadtesting/v2/run
@azure/loadtesting/v2/run/api

</pre>
</td>
<td>
<pre lang="shell">
@azure/loadtesting
</pre>
<pre lang="shell">
@azure/loadtesting/api
@azure/loadtesting/rest
</pre>
<pre lang="shell">
@azure/loadtesting/api/administration
@azure/loadtesting/api/run
</pre>
<pre lang="shell">
@azure/loadtesting/v1
</pre>
<pre lang="shell">
@azure/loadtesting/v1/api
@azure/loadtesting/v1/rest
</pre>
<pre lang="shell">
@azure/loadtesting/v1/api/administration
@azure/loadtesting/v1/api/run
</pre>
<pre lang="shell">
@azure/loadtesting/v2
</pre>
<pre lang="shell">
@azure/loadtesting/v2/api
@azure/loadtesting/v2/rest
</pre>
<pre lang="shell">
@azure/loadtesting/v2/api/administration
@azure/loadtesting/v2/api/run
</pre>
</td>

  </tr>
</table>
<!-- markdownlint-enable MD033 -->

**In this case, as both of the administration and run sub client are pointing to the same endpoint, the api version evolve strategy should be the same**

#### Multi-Api For Purview case

In the Purview case, as both sub clients are pointing to different endpoints, they are likely to have different version strategy evolving.

First, let's consider that both sub client will have the same version strategy

- Option 1:

```shell
# the default version of everything could be either v1 or v2
src/index.ts # this will export the two sub classical clients as well as the models involved
src/api # this will export the two sub api layer operation as well as the models involved
src/account/index.ts # this will export the account sub classical client
src/account/api # this will export the account api layer
src/metadataPolicies/index.ts # this will export metadataPolicies sub classical client
src/metadataPolicies/api # this will export metadataPolicies sub api layer
src/rest/index.ts # not sure if we should have this file, this will export both of the account and metadataPolicies rest sub client to the top level, as well as the involved types, which will have the name conflict issue, as what we currently handle it is
src/rest/account # this will export the account rest sub client
src/rest/metadataPolicies # this will export the metadataPolicies rest sub client.

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

- Option 2:

```shell
src/index.ts # this will export the two sub classical clients as well as the models involved
src/api/index.ts # this will export the two sub api layer operation as well as the models involved
src/api/account # this will export the account api layer
src/api/metadataPolicies # this will export metadataPolicies sub api layer
src/rest/index.ts # not sure if we should have this file, this will export both of the account and metadataPolicies rest sub client to the top level, as well as the involved types, which will have the name conflict issue, as what we currently handle it is
src/rest/account # this will export the account rest sub client
src/rest/metadataPolicies # this will export the metadataPolicies rest sub client.

src/v1/index.ts
src/v1/api/index.ts
src/v1/api/account
src/v1/api/metadataPolicies
src/v1/rest/index.ts
src/v1/rest/account
src/v1/rest/metadataPolicies

src/v2/index.ts
src/v2/api/index.ts
src/v2/api/account
src/v2/api/metadataPolicies
src/v2/rest/index.ts
src/v2/rest/account
src/v2/rest/metadataPolicies
```

The user experience comparasion between Option 1 and Option 2 in the case that both sub clients have the same version strategy would be:

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Option 1</th>
    <th>Option 2</th>
  </tr>
  <tr>
    <td>
      <pre lang="shell">
@azure/purview

@azure/purview/api
@azure/purview/rest

@azure/purview/account
@azure/purview/account/api
@azure/purview/account/rest

@azure/purview/metadataPolicies
@azure/purview/metadataPolicies/api
@azure/purview/metadataPolicies/rest
</pre>
<pre lang="shell">
@azure/purview/v1

@azure/purview/v1/api
@azure/purview/v1/rest

@azure/purview/v1/account
@azure/purview/v1/account/api
@azure/purview/v1/account/rest

@azure/purview/v1/metadataPolicies
@azure/purview/v1/metadataPolicies/api
@azure/purview/v1/metadataPolicies/rest
</pre>
<pre lang="shell">
@azure/purview/v2

@azure/purview/v2/api
@azure/purview/v2/rest

@azure/purview/v2/account
@azure/purview/v2/account/api
@azure/purview/v2/account/rest

@azure/purview/v2/metadataPolicies
@azure/purview/v2/metadataPolicies/api
@azure/purview/v2/metadataPolicies/rest

</pre>
</td>
<td>
<pre lang="shell">
@azure/purview

@azure/purview/api
@azure/purview/rest

@azure/purview/api/account
@azure/purview/rest/account

@azure/purview/api/metadataPolicies
@azure/purview/rest/metadataPolicies

</pre>
<pre lang="shell">
@azure/purview/v1

@azure/purview/v1/api
@azure/purview/v1/rest

@azure/purview/v1/api/account
@azure/purview/v1/rest/account

@azure/purview/v1/api/metadataPolicies
@azure/purview/v1/rest/metadataPolicies

</pre>
<pre lang="shell">
@azure/purview/v2

@azure/purview/v2/api
@azure/purview/v2/rest

@azure/purview/v2/api/account
@azure/purview/v2/rest/account

@azure/purview/v2/api/metadataPolicies
@azure/purview/v2/rest/metadataPolicies

</pre>
</td>

  </tr>
</table>
<!-- markdownlint-enable MD033 -->

Second, let's consider that account has version v1 and v3 and metadataPolicies has version v2 and v4., let's assume v1 and v2 happen the same time, v3 and v4 also happen the same time.

- Option 1:

```shell
# the default version of everything, This time we will need the customer's input on which one should be treat as default version for account and which one should be treat as default version for metadataPolices.
src/index.ts # this will export the two sub classical clients as well as the models involved
src/api # this will export the two sub api layer operation as well as the models involved
src/account/index.ts # this will export the account sub classical client
src/account/api # this will export the account api layer
src/metadataPolicies/index.ts # this will export metadataPolicies sub classical client
src/metadataPolicies/api # this will export metadataPolicies sub api layer
src/rest/index.ts # not sure if we should have this file, this will export both of the account and metadataPolicies rest sub client to the top level, as well as the involved types, which will have the name conflict issue, as what we currently handle it is
src/rest/account # this will export the account rest sub client
src/rest/metadataPolicies # this will export the metadataPolicies rest sub client.

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

- Option 2:

```shell
# the default version of everything
src/index.ts # this will export the two sub classical clients as well as the models involved
src/api/index.ts # this will export the two sub api layer operation as well as the models involved
src/api/account # this will export the account api layer
src/api/metadataPolicies # this will export metadataPolicies sub api layer
src/rest/index.ts # not sure if we should have this file, this will export both of the account and metadataPolicies rest sub client to the top level, as well as the involved types, which will have the name conflict issue, as what we currently handle it is
src/rest/account # this will export the account rest sub client
src/rest/metadataPolicies # this will export the metadataPolicies rest sub client.

# account version v1 and metadataPolicies v2,
src/v1/index.ts # export ths account sub classical client of v1
src/v2/index.ts # export the metadataPolicies sub classical client of v2
src/v1/api/index.ts # export the account sub api layer client of v1
src/v2/api/index.ts # export the metadataPolicies sub api layer client of v2
src/v1/api/account
src/v2/api/metadataPolicies
src/v1/rest/index.ts # export the account sub rest layer client of v1
src/v2/rest/index.ts # export the metadataPolicies sub rest layer client of v2
src/v1/rest/account
src/v2/rest/metadataPolicies

# account version v3 and metadataPolicies v4
src/v3/index.ts
src/v4/index.ts
src/v3/api/index.ts
src/v4/api/index.ts
src/v3/api/account
src/v4/api/metadataPolicies
src/v3/rest/index.ts
src/v4/rest/index.ts
src/v3/rest/account
src/v4/rest/metadataPolicies
```

The user experience comparasion between Option 1 and Option 2 in the case that account has version v1 and v3 and metadataPolicies has version v2 and v4., and let's assume v1 and v2 happen the same time, v3 and v4 also happen the same time.

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Option 1</th>
    <th>Option 2</th>
  </tr>
  <tr>
    <td>
      <pre lang="shell">
# the default version v0
@azure/purview

@azure/purview/api
@azure/purview/rest

@azure/purview/account
@azure/purview/account/api
@azure/purview/account/rest

@azure/purview/metadataPolicies
@azure/purview/metadataPolicies/api
@azure/purview/metadataPolicies/rest
</pre>
<pre lang="shell">

# when we add account v1 and metadataPolcies v3

@azure/purview/v1
@azure/purview/v3

@azure/purview/v1/api
@azure/purview/v1/rest
@azure/purview/v1/account
@azure/purview/v1/account/api
@azure/purview/v1/account/rest

@azure/purview/v3/api
@azure/purview/v3/rest
@azure/purview/v3/metadataPolicies
@azure/purview/v3/metadataPolicies/api
@azure/purview/v3/metadataPolicies/rest
</pre>
<pre lang="shell">

# when we add account v2 and metadataPolicies v4

@azure/purview/v2
@azure/purview/v4

@azure/purview/v2/api
@azure/purview/v2/rest
@azure/purview/v2/account
@azure/purview/v2/account/api
@azure/purview/v2/account/rest

@azure/purview/v4/api
@azure/purview/v4/rest
@azure/purview/v4/metadataPolicies
@azure/purview/v4/metadataPolicies/api
@azure/purview/v4/metadataPolicies/rest

</pre>
</td>
<td>
<pre lang="shell">

# the default v0 version

@azure/purview

@azure/purview/api
@azure/purview/rest

@azure/purview/api/account
@azure/purview/rest/account

@azure/purview/api/metadataPolicies
@azure/purview/rest/metadataPolicies

# when we add account v1 and metadataPolicies v3

@azure/purview/v1
@azure/purview/v3

@azure/purview/v1/api
@azure/purview/v1/rest

@azure/purview/v1/api/account
@azure/purview/v1/rest/account

@azure/purview/v3/api
@azure/purview/v3/rest

@azure/purview/v3/api/metadataPolicies
@azure/purview/v3/rest/metadataPolicies

</pre>
<pre lang="shell">
# when we add account v2 and metadataPolicies v4
@azure/purview/v2
@azure/purview/v4

@azure/purview/v2/api
@azure/purview/v2/rest

@azure/purview/v2/api/account
@azure/purview/v2/rest/account

@azure/purview/v4/api
@azure/purview/v4/rest

@azure/purview/v4/api/metadataPolicies
@azure/purview/v4/rest/metadataPolicies

</pre>
</td>

  </tr>
</table>
<!-- markdownlint-enable MD033 -->

Third, let's consider that account has version v1 and v3 and metadataPolicies has version v2 and v4., let's assume the timeline is v1 < v2 < v3 < v4

- Option 1:

```shell
# the default version of everything, This time we will need the customers input on which one should be treat as default version for account and which one should be treat as default version for metadataPolices.
src/index.ts # this will export the two sub classical clients as well as the models involved
src/api # this will export the two sub api layer operation as well as the models involved
src/account/index.ts # this will export the account sub classical client
src/account/api # this will export the account api layer
src/metadataPolicies/index.ts # this will export metadataPolicies sub classical client
src/metadataPolicies/api # this will export metadataPolicies sub api layer
src/rest/index.ts # not sure if we should have this file, this will export both of the account and metadataPolicies rest sub client to the top level, as well as the involved types, which will have the name conflict issue, as what we currently handle it is
src/rest/account # this will export the account rest sub client
src/rest/metadataPolicies # this will export the metadataPolicies rest sub client.

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

- Option 2:

```shell
# the default version of everything
src/index.ts # this will export the two sub classical clients as well as the models involved
src/api/index.ts # this will export the two sub api layer operation as well as the models involved
src/api/account # this will export the account api layer
src/api/metadataPolicies # this will export metadataPolicies sub api layer
src/rest/index.ts # not sure if we should have this file, this will export both of the account and metadataPolicies rest sub client to the top level, as well as the involved types, which will have the name conflict issue, as what we currently handle it is
src/rest/account # this will export the account rest sub client
src/rest/metadataPolicies # this will export the metadataPolicies rest sub client.

# we have v1 for account, we will add the following files
src/v1/index.ts
src/v1/api/index.ts
src/v1/api/account
src/v1/rest/index.ts
src/v1/rest/account # this will export the account rest sub client of v1

# now we have v2 for metadataPolicies, in this case, we will have the same structure as the previous assumption where v1 and v2 happen the same time.

# account version v1 and metadataPolicies v2, In the case, we export default client, here the "v?" should be whatever version the default client has， if the default client is account, then we already has that in the preview v1 version.
# account version v1 and metadataPolicies v2,
# src/v1/index.ts # added by previous version
src/v2/index.ts # export the metadataPolicies sub classical client of v2
# src/v1/api/index.ts # export the account sub api layer client of v1
src/v2/api/index.ts # export the metadataPolicies sub api layer client of v2
# src/v1/api/account
src/v2/api/metadataPolicies
# src/v1/rest/index.ts # export the account sub rest layer client of v1
src/v2/rest/index.ts # export the metadataPolicies sub rest layer client of v2
# src/v1/rest/account
src/v2/rest/metadataPolicies

# now we have v3 in account, the code structure will be like
# account version v1, v3 and metadataPolicies v2, In the case, we export default client, here the "v?" should be whatever version the default client has
src/v3/index.ts
src/v3/api/index.ts
src/v3/api/account
src/v3/rest/index.ts
src/v3/rest/account # this will export the account rest sub client of v1

# finally, we have v4 in metadata policy
# account version v1, v3 and metadataPolicies v2, v4,
src/v4/index.ts
src/v4/api/index.ts
src/v4/api/metadataPolicies
src/v4/rest/index.ts
src/v4/rest/metadataPolicies

```

In the option 1's case, we can also just have the structure like

```shell
src/v1
src/v2
src/v3
src/v4
```

Whenever a new version comes, we will just duplicate the code except pass a older version to the unchanged subclient.

## Questions

1. Is there a case where we should be multi-client in RLC but single-client in Modular.  
   Not sure if this is a bug [cadl playground link](https://cadlplayground.z22.web.core.windows.net/cadl-azure/?c=aW1wb3J0ICJAdHlwZXNwZWMvcmVzdCI7CskZYXp1cmUtdG9vbHMvyCUtxhVjb3Jl3ytjLWNsaWVudC1nZW5lcmF0b3LINgp1c2luZyBUeXBlU3BlYy5IdHRwO9AVUmVzdMgVQcReLkNvcmXPEsVhR8hg0URWZXJzaW9uaW5nOwoKQHNlcnZpY2UoewogIHRpdGxlOiAiTXVsdGnGRyIsCiAgdsYyOiAiMS4wLjAiLAp9KQpAdXNlRGVwZW5kZW5jeSjHfG9yZchhcy52MV8wX1ByZXZpZXdfMSkKbmFtZXNwYWNlIENhZGwuy2cgewoKLy8gb3DkALRpb24g8ADjCiAgbW9kZWwgUmVzb3VyY2Ug5ACxICBAdmlzaWJpbGl0eSgicmVhZCIpxRhpZDogc3Ry5gDlxSlrZXnGCXNlZ21lbnTEL8ZLc8c02EzkALfKTsQSZGVzY3JpcOQAqj%2FOGuQB58wSfcR%2B7gC6QXJyYXkgaXPJEVtd5QCkQPUBv%2BYBU%2BYCNeUBpegAkCJGb2%2FrAaQgIOcByjrxAV3EH33kAMtAcm91dGUoIi9jYWRsLWZvb%2BUA4UBkb2MoIsQ1IEbHE2ludGVyZuQBqUZvb09w6AFsxilyZWF0ZXMgYSBuZXcg6AFEIG9yIHVwZMYabiBleGlzdOQBwm9uZS7FUyAgY8U5T3JVxSfsAQHGU09yUmVwbGFjZTzIGD7oAbzFeUdldHMgdGhlIGRldGFpbHMgb2YgYekAgchmZ2V0zFtSZWFk11BEZWxl5gDJ0ERkxRrMR8Ys10lMaXPnAJrpAPfIUnPIU2xpc%2B0AmMQ0zE%2FkAip9%2FwOPZW50Mf8DkP8DkP8DkMtoIHvkA5BiaW5hcnn%2FA5ogIEBmcmllbmRseU5hbWUoIugA1zHlAPz%2FA7f%2FA7f%2FA7fcTP8Dt%2F8Dt%2F8Dt%2BcDty8v5AHrcG9uc2Ugd2l0aCBoZWFkZXJz%2FwPP%2FwPP%2FgPPMeoD0OUCf0JhcuYDyO0D3mLHFuoDy0JhcuoDy8gsZ2V0LeYB5ugBTmdldOgDSULFGSgpOiBPa1LoAOcmx0MgIEDmAO0oImNvbnTkBtTkAUYiKSDHD%2BQGcTogImltYWdlL3BuZyLmAWsgIEBib2R5IMQFOiBieXRlc8YZfecB82dldOUBbMR47QF9xyDqAOjlBDct5AF4LecBeOgAxXB15gDFxiNXaXRoSMYhxFXmBG9k%2FADS6QLvLWxvY8UJx1og6gMKTMca6gCmyBLxBCjnAPTHDMQLyjXuAP3pAN3mBIT1AN3GG%2BsEqu8A4E5vQ%2BYBgv8A4v8A4v8A4usEu%2BUAv%2BYEwg%3D%3D)
1. Is this a valid case where we use different @server decorator to point to the same endpoint.  
   [cadl playground link](https://cadlplayground.z22.web.core.windows.net/cadl-azure/?c=aW1wb3J0ICJAdHlwZXNwZWMvcmVzdCI7CskZYXp1cmUtdG9vbHMvyCUtxhVjb3Jl3ytjLWNsaWVudC1nZW5lcmF0b3LINgp1c2luZyBUeXBlU3BlYy5IdHRwO9AVUmVzdMgVQcReLkNvcmXPEsVhR8hg0URWZXJzaW9uaW5nOwoKQHNlcnZpY2UoewogIHRpdGxlOiAiTXVsdGnGRyIsCiAgdsYyOiAiMS4wLjAiLAp9KQpAdXNlRGVwZW5kZW5jeSjHfG9yZchhcy52MV8wX1ByZXZpZXdfMSkKQGRvYygixSogSGVhbHRoIEluc2lnaHRzIHByb3ZpZGVzIGFuIEFQSSB0aGF0IOQAnWVzIGnGJSBtb2RlbHMsIOQBSGlmaWMgZm9yyEkmIExpZmUgU2NpZW5jZXMsxkFwZXJmb3JtIGFuYWx5c2nEXmTIayBpbmZlcsUuIHRvIGJlIHVzZWQgYnkgYSBodW1hbi4iKeYBIGVyKAogICJ7ZW5kcG9pbnR9L2jFdecAmHPlASX%2FANj%2FANj%2FANj%2FANj%2FANjxANjkALDkAfEgIOYBk1N1cOQCs2VkIENvZ25pdGl2ZSBT5gIZcyDoAPZzIChwcm90b2NvbMVvaG9zdG5hbWUs5QCvZXhhbXDkAj5odHRwczovL3dlc3R1czIuYXBpLmPIVi5taWNyb3NvZnQuY29tKeQBYuQAhshjOiB1cmzkAJ19CikKxFxzcGFjZSBDYWRsLusClSB7CgovLyBvcOQC4mlvbiDwAxEKIOYBVCBSZXNvdXJjZegA7nZpc2liaWxpdHkoInJlYWTnAIBpZDogc3Ry5gMTxSlrZXnGCXNlZ21lbnTEL8ZLc8c02EzkALfKTsQSZGVzY3JpcOQAqj%2FOGuQEFcwSfcR%2B7gC6QXJyYXkgaXPJEVtd5QCkQPUD7eYDgeYEY%2BUD0%2BgAkCJGb2%2FrA9Ig5QKDaWNlOvEBXcQffeQAy0Byb3V0ZSgiL2NhZGwtZm9v5QDh5gIxxDUgRscTaW50ZXJm5AGpRm9vT3DtAlpDcmVhdOQC%2FiBuZXcg6AFEIG9yIHVwZMYabiBleGlzdOQBwm9uZegCE2PFOU9yVcUn7AEBxlNPclJlcGxhY2U8yBg%2B6AG8xXlHZXRzIHRoZSBkZXRhaWxzIG9mIGHpAIHIZmdldMxbUmVhZNdQRGVsZeYAydBEZMUazEfGLNdJTGlz5wCa6QD3yFJzyFNsaXPtAJjENMxP5AIqff8FvWVudDH%2FBb7%2FBb7%2FBb7%2FBOb%2FBOb%2FBOb%2FBOb%2FBOb%2FBb7%2FBb7%2FANj%2FANj%2FANj%2FANj%2FANj%2FBb7%2FBb7%2FBb7%2FBb7%2FBb7%2FBb7rApYge%2BQFvmJpbmFyef8FyCAgQGZyaWVuZGx5TmFtZSgi6AMFMcV8%2FwXl%2FwXl%2FwXl3Ez%2FBeX%2FBeX%2FBeXnBeUvL%2BQEGXBvbnNlIHdpdGggaGVhZGVyc%2F8F%2FfQF%2FUJhcv8F%2FegBnOoF%2FuUCW0JhcuYF9u0GDGLHFuoF%2BUJhcuoF%2BcgsZ2V0LeYB5ugBTmdldOgFd0LFGSgpOiBPa1LoAOcmx0MgIEDmAO0oImNvbnTkCzDkAUYiKSDHD%2BQKzTogImltYWdlL3BuZyLmAWsgIEBib2R5IMQFOiBieXRlc8YZfecB82dldOUBbMR47QF9xyDqAOjlBmUt5AF4LecBeOgAxXB15gDFxiNXaXRoSMYhxFXmBp1k%2FADS6QLvLWxvY8UJx1og6gMKTMca6gCmyBLxBlbnAPTHDMQLyjXuAP3pAN3mBrL1AN3GG%2BsG2O8A4E5vQ%2BYBgv8A4v8A4v8A4usG6eUAv%2BYG8A%3D%3D)
1. In the Multi-Client case, what if only one of them become a Multi-Api case.  
   Only applies to cases like purview.
1. In the Multi-Api case, what if starting from one version, it becomes a Multi-Client.
1. Use subpath exports in pure RLC generation.
   1. Multi-Client  
      @purview/administration/account  
      @purview/administration/metadataPolicies
   1. Multi-Api  
      @azure-rest/maps-search/v1  
      @azure-rest/maps-search/v2
      more details see [link](https://teams.microsoft.com/l/message/19:344f6b5b36ba414daa15473942c7477b@thread.skype/1684293866076?tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47&groupId=3e17dcb0-4257-4a30-b843-77f47f1d4121&parentMessageId=1684229932399&teamName=Azure%20SDK&channelName=Language%20%E2%80%93%20JS%E2%80%89%EF%BC%86%E2%80%89TS%20%F0%9F%A5%B7&createdTime=1684293866076)
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
1. Package size consideration.  
   For large RP like network or compute, if we keep the code like this, we will mostly have the same issue as Python used to have.
1. Documentation in Docs site.
1. How to do data analyze for different layer.
1. Sample generation.  
   Should we generate all samples for all three layers? see the rest api docs [here](https://learn.microsoft.com/en-us/rest/api/azurerekusto/clusters/create-or-update?tabs=JavaScript)
