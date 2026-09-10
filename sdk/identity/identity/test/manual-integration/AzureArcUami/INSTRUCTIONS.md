# Testing user-assigned managed identity on Azure Arc

This manual integration test validates the branch-built `@azure/identity` package against a
TPM-backed Azure Arc machine. It must not run in normal CI because the required resources and
identity assignments depend on the tester's environment.

The test covers:

- `ManagedIdentityCredential` with client ID, resource ID, and object ID selectors.
- `DefaultAzureCredential` with managed identity client ID and resource ID selectors.
- JWT `oid` validation to ensure the requested user-assigned identity issued the token.
- Key Vault data-plane access using the requested identity.
- Rejection of an unattached identity with `identity_not_found`.

Access tokens and Key Vault secret values are never printed.

## Before a test session

Use Azure CLI 2.90.0 or later with `connectedmachine` extension 3.0.0 or later. Set
`subscription`, `resource_group`, `machine_name`, `vm_name`, `positive_identity_name`, and
`negative_identity_name` for your environment.

```bash
az feature show \
  --subscription "$subscription" \
  --namespace Microsoft.HybridCompute \
  --name HybridComputePreview \
  --query properties.state -o tsv

az provider show \
  --subscription "$subscription" \
  --namespace Microsoft.HybridCompute \
  --query registrationState -o tsv
```

Both commands must return `Registered`.

### Reserve and start the fixture

Check that the machine does not have an unexpired `InUseBy` reservation. Then reserve it:

```bash
arc_id=$(az connectedmachine show \
  --subscription "$subscription" \
  --resource-group "$resource_group" \
  --name "$machine_name" \
  --query id -o tsv)

az tag update \
  --resource-id "$arc_id" \
  --operation Merge \
  --tags InUseBy="<alias-or-team>" InUseUntil="<UTC-timestamp>"

az vm start \
  --subscription "$subscription" \
  --resource-group "$resource_group" \
  --name "$vm_name"
```

Continue only after the following command reports `Connected`, agent version 1.62 or later, and
`identityKeyStore` equal to `Tpm`:

```bash
az connectedmachine show \
  --subscription "$subscription" \
  --resource-group "$resource_group" \
  --name "$machine_name" \
  --query "{status:status,agentVersion:agentVersion,identityKeyStore:identityKeyStore}" \
  --output json
```

### Isolate Azure Arc from native IMDS

The backing VM's native IMDS routes must be blocked after every start. Use the
[Run Command operation](https://learn.microsoft.com/en-us/azure/azure-arc/servers/run-command?tabs=azure-powershell)
to run:

```bash
iptables -C OUTPUT -d 169.254.169.254 -j REJECT 2>/dev/null ||
  iptables -I OUTPUT 1 -d 169.254.169.254 -j REJECT
iptables -C OUTPUT -d 169.254.169.253 -j REJECT 2>/dev/null ||
  iptables -I OUTPUT 1 -d 169.254.169.253 -j REJECT

! curl --silent --max-time 3 \
  --header Metadata:true \
  "http://169.254.169.254/metadata/instance?api-version=2021-02-01"
! curl --silent --max-time 3 \
  --header Metadata:true \
  "http://169.254.169.253/metadata/instance?api-version=2021-02-01"
```

The test is invalid if either native IMDS endpoint is reachable.

### Verify identity assignments

```bash
az connectedmachine identity show \
  --subscription "$subscription" \
  --resource-group "$resource_group" \
  --machine-name "$machine_name"
```

The identity type must include `UserAssigned`, the positive identity must be present in
`userAssignedIdentities`, and the negative identity must be absent.

## Build and stage the branch package

From the repository root:

```bash
pnpm turbo build --filter=@azure/identity... --token 1
pnpm --dir sdk/identity/identity pack --pack-destination <artifact-directory>
```

Upload the package tarball to a temporary private blob and generate a short-lived read-only SAS.
Use the
[Run Command operation](https://learn.microsoft.com/en-us/azure/azure-arc/servers/run-command?tabs=azure-powershell)
to download the package and this test application into the same directory on the TPM host. Do not
test the latest published `@azure/identity` package.

## Resolve test inputs

Resolve both identities immediately before running the test:

```bash
positive=$(az identity show \
  --subscription "$subscription" \
  --resource-group "$resource_group" \
  --name "$positive_identity_name")

negative=$(az identity show \
  --subscription "$subscription" \
  --resource-group "$resource_group" \
  --name "$negative_identity_name")
```

Set these variables for the Run Command without copying their values into source:

```text
IDENTITY_ARC_UAMI_CLIENT_ID
IDENTITY_ARC_UAMI_OBJECT_ID
IDENTITY_ARC_UAMI_RESOURCE_ID
IDENTITY_ARC_NEGATIVE_UAMI_CLIENT_ID
IDENTITY_ARC_NEGATIVE_UAMI_OBJECT_ID
IDENTITY_ARC_NEGATIVE_UAMI_RESOURCE_ID
IDENTITY_ARC_KEYVAULT_URL
IDENTITY_ARC_KEYVAULT_SECRET_NAME
```

Point the local dependency at the staged branch tarball, install dependencies, build, and run:

```bash
npm pkg set 'dependencies.@azure/identity=file:./<identity-package-tarball>'
npm install
npm run build
npm test
```

## Cleanup

Always:

1. Delete temporary Run Commands, blobs, storage resources, SAS-backed artifacts, and host files.
2. Remove the `InUseBy` and `InUseUntil` reservation tags.
3. Deallocate the backing VM.

Do not delete resources that are shared or maintained outside the test session.
