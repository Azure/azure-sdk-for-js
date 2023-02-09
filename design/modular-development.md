# Modular Development with the Azure SDK

**STATUS**: In Progress

Currently, the Azure SDK for JavaScript supports a class-based approach to creating Azure service clients.  This had the advantage of being able to easily identify capabilities of that package.

Pros of this approach includes:

- Pattern follows all other languages
- Easy discovery of package capabilities through the *Client class.
- Minimal number of import statements

There are cons to this approach as we consider bringing the JavaScript clients into the browser and service workers where bundle sizes count whether our customers use us or not.  This is especially important as we look at new opportunities such as Web Push which would use a bit of the code from Notification Hubs.

- Large index files to export everything.
- Not as easily tree shakable to produce smaller bundle sizes.
- Many methods on the client will never be used, thus taking up valuable space.

## Modular Design

We can create a more ala carte experience where the customer only pulls in the methods they need.  With the Azure SDK for JavaScript, we can create a client previously using the `ServiceClient` pattern:

```typescript
import { NotificationHubsClient } from "@azure/notification-hubs";

const client = new NotificationHubsClient("<connection-string>", "<hub-name>");

const registrationId = await client.createRegistrationId();
```

For a more modular design, we have a ServiceClient exposed as an interface with the minimal amount of things to communicate with the backend, and then this is passed into each method.

```typescript
import { createClientContext, createRegistrationId } from "@azure/notification-hubs/api";

const context = createClientContext("<connection-string>", "<hub-name>");

const registrationId = await createRegistrationId(context);
```

The pros of this design are as follows:

- Fine grained exports to only give the customer what they need
- Smaller bundle sizes the customer for exports.
- Tree shaking is easier for bundlers.

The cons of the modular design is the following:

- Large index files to export everything.

## Solution

The goals of enabling both the class based `ServiceClient` and modular development are the following:

- **Do not introduce breaking changes**
- Keep the existing CommonJS compatibility.
- Do not pollute the top level index with all exports, keeping the top level index.ts as is
- Expose exports at "namespaces" or export subpaths

## Subpath Exports

To accomplish this goal, we will use [subpath exports](https://nodejs.org/api/packages.html#subpath-exports) which have been available since Node.js version 12.7.  This way, we can specify which files are exposed at which path to make a better experience for importing modules and not clutter the main `index.ts` file.

Node added the following support for subpath exports in the following versions:

- `v12.20.0` - Subpath `"exports"` patterns
- `v12.16.0` - Unflag self-referencing a package using its name
- `v12.7.0` - Introduce `"exports"` package.json field as a more powerful alternative to the classic `"main"` field
- `v12.0.0` - Add support for ES modules using `.js` file extension via `package.json` `"type"` field.

For subpaths, we can specify the path which is either a path or a wildcard path.  Inside the path, we can specify following:

- `types` - The TypeScript types for that path
- `require` - Common JS entry point
- `import` - ES Modules entry point

For example, we could have our client and associated methods exposed as `@azure/notification-hubs/api` and our models at `@azure/notification-hubs/models`.

```json
  "exports": {
    ".": {
      "types": "./types/src/index.js",
      "require": "./dist/index.js",
      "import": "./dist-esm/src/index.js"
    },
    "./api": {
      "types": "./types/src/api/index.js",
      "import": "./dist-esm/src/api/index.js"
    },
    "./models": {
      "types": "./types/src/models/index.d.ts",
      "import": "./dist-esm/src/models/index.js"
    }
  },
```

Then we could import those modules as the following:

```typescript
import { createClientContext, createOrUpdateInstallation } from "@azure/notification-hubs/api";
import { createAppleInstallation } from "@azure/notification-hubs/models";
```

Note the main exports of `.` can expose both ES-Modules and CommonJS such as the following:

```json
  "exports": {
    ".": {
      "types": "./types/src/index.js",
      "require": "./dist/index.js",
      "import": "./dist-esm/src/index.js"
    }
  },
```

This approach has a number of benefits:

- Does not pollute the top level index to export the world.
- Can support both class-based `ServiceClient` and modular development separately.
- Allows the SDK Team to ship experimental/beta features through its own subpath.

## Customer onboarding to Azure SDK with Subpath Support

First and foremost, we do not want to break the customers so they can continue to use their existing class-based `ServiceClient` approach.  To enable subpaths is an opt-in process by the customer.

- Use Node.js 12.20+
- Upgrade to TypeScript 4.7 and above
- Update the `tsconfig.json` to use `"moduleResolution"` to `"Node16"` or `"NodeNext"`

**NOTE:** If the customer wishes to use the `api` and `models` subpaths, then the customer must update the `package.json` to set the `"type"` to be `"module"` as we currently do not export CommonJS individual files outside of the main index.js.

## Azure SDK Subpath Conventions

The standard for Azure SDKs going forward is the following:

- `.` - Still expose all things at the top level exports for CommonJS and ES-Modules.
- `/api` - The client context and single method exports
- `/models` - The models and factories

For packages that may have multiple service clients, each service client will be then put in a folder to itself, such as the following if we have an `Admin` client and a `Messaging` client.

- `/admin/api` - The Admin client context and single method exports
- `/admin/models` - The Admin models and factories
- `/messaging/api` - The Messaging client context and single method exports
- `/messaging/models` - The Messaging models and factories

The standard approach should be to expose each public method on a `ServiceClient` as its own standalone function export.  The modular approach should create an interface which contains the minimal set of data to talk to the backend and expose through a factory method to create.

The `ServiceClient` should be exposed at the top level through the exports which will then take the place of our current `"main"` entry point in the `package.json` for both CommonJS and ES Modules.

```json
".": {
  "types": "./types/src/index.js",
  "require": "./dist/index.js",
  "import": "./dist-esm/src/index.js"
},
```

By default, the client communication should be exposed through the `api` subpath with the client context via `createClientContext` and all associated API methods.  All single methods should be exported on the `api/index.js` file.

```json
"./api": {
  "types": "./types/src/api/index.d.ts",
  "import": "./dist-esm/src/api/index.js"
}
```

This could then be imported such as the following:

```typescript
import { createClient, createOrUpdateInstallation } from "@azure/notification-hubs/api";
```

For models and their associated factory functions should be in a `models` subpath.  The models are then exported via the `models/index.js` file.

```json
"./models": {
  "types": "./types/src/models/index.d.ts",
  "import": "./dist-esm/src/models/index.js"
}
```

This could then be imported such as the following:

```typescript
import { Installation, createAppleInstallation } from "@azure/notification-hubs/models";
```

## Shipping Experimental Features

Another aspect of this design is to allow us to ship experimental features with modular development.  We can ship preview features in either `experimental` or `preview` subpath exports which allow us to ship features that do not collide with our top level exports nor our standard APIs.  Once these features have been approved for GA, they will be removed from the `experimental` or `preview` subpath.

## Onboarding Azure SDK Packages to Subpath Exports

The following are the steps required for supporting subpath exports in our packages.

### Changes to package.json

To support subpath exports, the `package.json` requires the following changes.

- TypeScript must be upgraded to version 4.7 or later such as `"typescript": "^4.7.2",`
- The `type` should be set to `module`.
- The `files` array must contain `types/src` to support individual file types.

    ```json
      "files": [
        "dist/",
        "dist-esm/src/",
        "types/src",
        "types/latest/",
        "types/3.1/",
        "README.md",
        "LICENSE"
      ],
    ```

- The `exports` must be specified for the top level export as well as subpaths. Wildcards or absolute paths can be specified.

    ```json
      "exports": {
        ".": {
          "types": "./types/src/index.d.ts",
          "require": "./dist/index.js",
          "import": "./dist-esm/src/index.js"
        },
        "./api": {
          "types": "./types/src/api/index.d.ts",
          "import": "./dist-esm/src/api/index.js"
        },
        "./models": {
          "types": "./types/src/models/index.d.ts",
          "import": "./dist-esm/src/models/index.js"
        }
      },
    ```

### Changes to tsconfig.json

The TypeScript configuration `tsconfig.json` must also be updated with the following changes:

- Update the `module` setting to either `NodeNext` or `Node16`.
- Update the `moduleResolution` setting to either `NodeNext` or `Node16`.
- In some cases,the compiler needed `rootDir` set, so update `rootDir` to be `"."`.

### Source Code Changes

In order to import files in the module system, we will need to update our import statements to include the `.js` extension.

Previously, we imported files such as the following:

```typescript
import { isDefined } from "./utils";
```

And now we must specify the `.js` extension.

```typescript
import { isDefined } from "./utils.js";
```

## Design Considerations

To support this in our packages, we should think about how we support a hybrid pattern between the two worlds of modular design and class-based `ServiceClient` design.

### Hybrid Design

For design considerations and code re-use, we could deploy a hybrid solution to this problem by using the single method exports and still expose the existing `ServiceClient` which simply acts as a proxy to the the underlying method.  

```typescript
import { NotificationHubsClientContext, createClientContext, createRegistrationId } from "@azure/notification-hubs/api";

export class NotificationHubsServiceClient {
  private _context: NotificationHubsClientContext;

  constructor(connectionString: string, hubName: string, options: NotificationHubClientOptions) {
    this._context = createClientContext(connectionString, hubName, options);
  }

  createRegistrationId(options: OperationOptions = {}) {
    return createRegistrationMethod(this._context, options);
  }
}
```

## Follow On Work

With this approach the following functions still work as expected:

- CI
- Linting

To support subpath exports in our own tools, we will need updates to the following:

- API-Extractor
    Allow for multiple entry points instead of a single entry point for creating an API export
- API View
    Show code in subpaths much like namespaces/packages in other languages such as C# and Java
- Code Generation
    Generate the modular design of single method exports and then create ServiceClients from the modular methods
