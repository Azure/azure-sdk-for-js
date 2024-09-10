# Breaking Changes

## 4.5.0

As of `@azure/identity` 4.5.0, providing a user-assigned managed identity ID as a constructor argument will throw an error, indicating to the user that this is an invalid scenario. Previously, the user-provided ID would be silently ignored as CloudShell does not support this.

## 4.1.0

As of `@azure/identity` 4.1.0, the number of IMDS probing retries has been increased to 5 (from 3 initially) to match the [IMDS retry guidance](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/how-to-use-vm-token#retry-guidance) in the `DefaultAzureCredential` and `ManagedIdentityCredential`. The users should be able to override the behavior, if required, by setting the `options.retryOptions.maxRetries` in the respective credential.

## 3.0.0

As of `@azure/identity` 3.0.0, the default behavior of credentials supporting multi-tenant authentication has changed. Each of these credentials will throw an error if the requested `tenantId` doesn't match the tenant ID originally configured on the credential. Apps must now do one of the following things:

- Add all IDs, of tenants from which tokens should be acquired, to the `additionallyAllowedTenants` array in the credential options. For example:

```typescript Snippet:Identity_BreakingChanges_AddExplicitAdditionallyAllowedTenants
const credential = new DefaultAzureCredential({
  additionallyAllowedTenants: ["<tenant_id_1>", "<tenant_id_2>"],
});
```

- Add `*` to enable token acquisition from any tenant, which is the original behavior. For example:

```typescript Snippet:Identity_BreakingChanges_AddAllAdditionallyAllowedTenants
const credential = new DefaultAzureCredential({
  additionallyAllowedTenants: ["*"],
});
```

Note: Credential types which do not require a `tenantId` on construction will only throw an error when the application has provided a value for `tenantId` either in the options or via a constructor overload. If no `tenantId` is specified when constructing the credential, the credential will acquire tokens for any requested `tenantId` regardless of the value of `additionallyAllowedTenants`.
