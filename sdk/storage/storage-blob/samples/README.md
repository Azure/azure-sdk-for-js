# Getting started with samples

## Install the library

Copy the sample file you want to a folder of your choice and run the following command in your samples folder to install the npm package for Azure Storage Blob library.

```bash
npm install @azure/storage-blob
```

Or, in case you have cloned the repo and want to utilize the published npm package instead of src code, run the following commands in the `samples` folder to initialize an npm project and to install the storage-blob package.

```bash
npm init -y
npm install @azure/storage-blob
```

### Running Samples

Also, change `"../.."` to `"@azure/storage-blob"` in the samples in order to import the published package instead of using source code.

## Get account credentials of your storage account

- In the [Azure Portal](https://portal.azure.com), go to **Dashboard > Storage > _your-storage-account_**.
- Note down the "AccountName", "AccountKey" obtained at **Access keys** and "AccountSAS" from **Shared access signature** under **Settings** tab.
  Before running any of the samples, update with the credentials you have noted down above.

### Authenticating with Azure Active Directory

If you have [registered an application](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) with an Azure Active Directory tenant, you can [assign it to an RBAC role](https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad) in your Azure Storage account. This enables you to use the Azure.Identity library to authenticate with Azure Storage as shown in the [azureAdAuth.ts sample](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/typescript/src/azureAdAuth.ts).

## Javascript sample

Copy the sample to your samples folder and use `node` to run it.

```bash
node sample.js
```

## Typescript sample

If you don't have Typescript installed, then use `npm` to install it first.

```bash
npm install -g typescript
```

One way to run Typescript samples is to use `ts-node`. To install `ts-node`, run the below in your sample folder

```bash
npm install -g ts-node
```

Copy the sample to your samples folder and use `ts-node` to run it.

```bash
ts-node sample.ts
```

## Browser sample

Running these samples in the browser requires a bundler. While we give examples using Webpack, any bundler will do!

First, install webpack and webpack-cli.

```bash
npm install --save-dev webpack webpack-cli
```

Next, run webpack on the sample code to produce an optimized browser bundle.

```bash
npx webpack sample.js
```

This will produce `dist/main.js`. Reference this file in an HTML file script tag and open the file in a browser to run the sample.

```html
<script src="./dist/main.js"></script>
```

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2Fstorage-blob%2Fsamples%2FREADME.png)
