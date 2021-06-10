# Release History

## 1.0.0-beta.1 (Unreleased)

### New features

- This release marks the initial beta availability of the `@azure/identity-vscode` package. This package extends `@azure/identity` by providing the dependencies of `VisualStudioCodeCredential` and enabling it within the `@azure/identity` package. `VisualStudioCodeCredential` uses the authenticated session from the "Azure Account" extension in Visual Studio Code. If this extension package is not loaded using `useIdentityExtension`, then `VisualStudioCodeCredential` from `@azure/identity` will throw a `CredentialUnavailableError`. By enabling `VisualStudioCodeCredential`, the `DefaultAzureCredential` class in `@azure/identity` also gains functionality allowing it to use the "Azure Account" session if it is available.
