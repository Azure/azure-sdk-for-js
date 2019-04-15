# Getting started with samples

## Install the library

Run the below in your samples folder to install the npm package for Azure Storage Queue library.

```bash
npm install @azure/storage-queue
```

## Get account credentials of your storage account

- In the [Azure Portal](https://portal.azure.com), go to **Dashboard > Storage > _your-storage-account_**.
- Note down the "AccountName", "AccountKey" obtained at **Access keys** and "AccountSAS" from **Shared access signature** under **Settings** tab.
  Before running any of the samples, update with the credentials you have noted down above.

## Running Samples

- Change `"../.."` to `"@azure/storage-queue"` in the samples in order to import the published package instead of using source code.

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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/storage/storage-queue/samples/README.png)
