# 1.0.0-preview.4 (TBD)

### Breaking changes from 1.0.0-preview.3:

This release brings our interface a bit closer to what is offered in the
Azure SDKs for C# and Java for AppConfig. 

This affects the `setConfigurationSetting` and `getConfigurationSetting`
methods which no longer take a `key` parameter and instead take 
a `ConfigurationSetting`.

In previous previews:
```typescript
// 1.0.0-preview.3 and below
await client.addConfigurationSetting("MyKey", { label: "MyLabel", value: "MyValue" });
await client.setConfigurationSetting("MyKey", { value: "MyValue" });
```

Now in preview.4:
```typescript
// 1.0.0-preview.4
await client.addConfigurationSetting({ key: "MyKey", label: "MyLabel", value: "MyValue" });
await client.setConfigurationSetting({ key: "MyKey", value: "MyValue" });
```

# 1.0.0-preview.3 (2019-09-23)

- Typings file was incorrectly packaged (#5217)

# 1.0.0-preview.2 (2019-09-13)

Republishing as the readme is not properly showing up on npmjs. No other changes.

# 1.0.0-preview.1 (2019-09-12)

This is the first release of the @azure/app-configuration package.

This package contains the `AppConfigurationClient` to talk to the Azure 
App Configuration managed service, with initial support for create, read,
update, delete and search operations with configuration settings.
