# Testing Identity in Azure Arc

## Prerequisites

- A non-Azure Windows or Linux VM.
  - Must have NodeJS, NPM, and git installed.
- Administrator privileges on the VM.
- An Azure Key Vault.

### Install Azure Arc on the VM

> **Note:** You must be in your VM to install Azure Arc.

1. Create an Azure Arc server resource on the [Azure Portal](https://portal.azure.com) (at the time of writing, the
   resource is named "Azure Arc").
2. Choose to add an existing server using an interactive script.
3. When creating the resource, fill in your desired subscription, resource group, and region for the VM. Choose the
   operating system of your existing VM.
4. No other configuration is necessary. You can go to the "Download and run script" tab and download the script shown.
5. Once the script has been downloaded, run the script on your machine with administrator privileges.
6. If using a Linux VM, run the following commands (using your user name for `<user>`) to gain necessary privileges:

```
sudo usermod -a -G himds <user>
sudo setfacl -m "g:himds:r-x" /var/opt/azcmagent/tokens/
sudo setfacl -m "g::r-x" /var/opt/azcmagent/tokens/
```

7. Arc setup should now be complete. Restart your VM to finalize your environment setup.
8. After restarting, check your environment by searching for environment variables named `IDENTITY_ENDPOINT` and
   `IMDS_ENDPOINT`. If they are not present, or don't resemble `http://localhost:40342/metadata/identity/oauth2/token` and
   `http://localhost:40342` respectively, you may need to wait a short while or try restarting the VM again.

## Give the Azure Arc VM access to the key vault

For the tests to pass, the VM will need secret management permissions in your key vault.

1. Go to your key vault resource in the [Azure Portal](https://portal.azure.com).
2. Go to the vault's "Access policies" page, and click "Add Access Policy".
3. Using the secret management template, select your Arc VM resource as the principal.
4. Click "Add".
5. Don't forget to click "Save" at the top of the access policies page after the policy is added.

## Run the azure-identity Tests on the Azure Arc VM

> **Note:** The following steps are specific to JavaScript.

In a terminal window, run:

```bash
git clone https://github.com/Azure/azure-sdk-for-js --single-branch --depth 1
cd azure-sdk-for-js/sdk/identity/identity/test/manual-integration/AzureArc
```

Set the environment variable `KEYVAULT_URI` to the vault URI of your key vault.

Install dependencies:

```bash
npm install
```

Compile the test file using TypeScript:

```bash
npm run build
```

Run the test file:

```bash
node dist/index.js
```
