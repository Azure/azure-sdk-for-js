## index.ts

For all typescript files there should be an entrance point. That is `index.ts`. This file serves as a translation point per-se, since it should not have any 'logic' code in it. What is exported through this file defines the API of the resolver library.

Though this is in a client folder, this is not really a client. It is a helper library. Because of the idiosynicatic differences between js, python, and C# (the currently implemented model repo 'clients'), C# is more like a client in that it has instantiation and a slightly different API.

For js (aka Node), instantiation is not common unless for larger libraries, or where it makes sense to have instances. In this case, there's not strong motivation for instantiation. So the API is simple:

```js
library.resolve(...)
```

This makes the use of our js library more convenient for users.

## resolver.ts

Contains the logic for defining the api for the `resolve` method. The implementation logic is not contained in this file.

The `resolve` method takes two main arguments:

- `dtmi (type: string)` - This is a user dtmi used for the dtdl the user intends to resolve. dtmi is a standard format, and if the dtmi provided does not follow the format it will be rejected.
- `endpoint (type:string)` - Can be a URL to a server endpoint, local or remote. Alternatively can be an _absolute_ file path, if the dtdl is stored locally. In most cases you will be interacting with the device models repository, so the endpoint will be `https://devicemodels.azure.com`, however we do not set defaults so there's no question about behavior. Simple is easier to understand!

The `resolve` method has optional parameters provided as a single object. You would use it as such:

```js
resolve(myDtmi, myEndpoint, { resolveDependencies: "disabled" });
```

Currently there is only one parameter in the optional object:

- `resolveDependencies (type: string)` - This is a useful way to get dependencies in one network call, and is recommended if you want to resolve the full dependency tree of a dtdl stored in the device model repository. These are the three options:
  - `disabled`
  - `enabled`
  - `tryFroExpanded`

## dtmiConventions.ts

Contains methods for checking that the DTMI is valid, and to convert the DTMI to a string. This is currently private, however there are discussions around making these helper functions public parts of the API.

#### `isValidDtmi`

Validates if the provided dtmi matches the rules for a user dtmi.

#### `dtmiToPath`

Validates then converts the dtmi to a generic path.

#### `dtmiToQualifiedPath`

Validates the dtmi then converts the endpoint and dtmi to a fully qualified path. To get the `extended.json` version of a dtdl, there is a boolean parameter required.

## DTDL.ts

This is used to define an interface uesd in `dtmiConventions.ts`. Though it is an incomplete interface, it is just used to define the psuedo-parsing requirements.

## modelFetcherHandler.ts

This handles figuring out which fetcher to use based on the type of endpoint and the options given. It will check the endpoint to see if it is a remote URL or a local file. Then, it will pass the parameters either to the remote fetcher or the local fetcher.

## localModelFetchers.ts

This contains the local `fetcher()` method and the `recursiveFetcher()` method. The regular `fetcher()` method is called when resolverOptions are set to `disabled`, and also used as the basic unit of fetching from a directory for the `recursiveFetcher()`. The `localModelFetchers.ts` and `remoteModelFetchers.ts` are fairly similar, except for handling the formatting of the endpoint/directory, and the use of `filesystem` in the case of the `localModelFetchers`.

## remoteModelFetchers.ts

This contains the `fetcher()` method and the `recursiveFetcher()` method for fetching DTDLs from remote endpoints. It is similarly structured to `localModelFetchers.ts`. In order to perform the HTTP requests it uses the Azure `coreHttp` implementation.

## modelMetadata.ts

Performs a psuedo-parsing of a given DTDL and gives back information primarily relevant for fetching dependencies.
