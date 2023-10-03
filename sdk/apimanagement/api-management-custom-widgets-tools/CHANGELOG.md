# Release History

## 1.0.0-beta.2 (2023-09-20)

### Features Added

- "parentLocation" object is being sent with "secrets" through askForSecrets function call, it contains location info of the Developer Portal window - href, origin, pathname, search...
- Node function "deploy" now accepts JSON config object with two options
  - interactiveBrowserCredentialOptions 
    - config object for InteractiveBrowserCredential function from @azure/identity package, you can find the accepted values [here](https://learn.microsoft.com/javascript/api/@azure/identity/interactivebrowsercredentialnodeoptions?view=azure-node-latest)
    - by default: { redirectUri: "http://localhost:1337" }
  - rootLocal 
    - relative path from where the script will load your local built files
    - by default: "./dist/"

### Breaking Changes

- Node function "deploy" no longer accepts a fourth optional "rootLocal" string parameter, but an optional "config" object parameter which contains multiple options to configure the function. The "rootLocal" param was moved into the object.

### Bugs Fixed

- crash of the Node "deploy" function on Mac on incorrect "redirectUri" being sent to "InteractiveBrowserCredential" class.

## 1.0.0-beta.1 (2022-08-03)

- First release of package, see README.md for details.
