<!-- This page is linked to from https://aka.ms/azsdk/js/web-workers which must be updated when moving this content. -->

# Using the Azure SDK for JS in Web Workers

Using the Azure SDK in Node or a browser's main process is supported out of the box; however, when using the Azure SDK in other runtimes a polyfill may be necessary.

In this sample we demonstrate how to polyfill the necessary APIs for using our libraries in web workers.

> Web Workers are a simple means for web content to run scripts in background threads. Please see [the Web Workers MDN page][webworkers] for more information on Web Workers.

## Known required polyfills

### XML Parsing

When used in the browser, our XML parsing library relies on DOM APIs to support parsing and stringifying XML. Since the DOM APIs are generally available this reduces bundle size and minimizes our dependencies. When running from a Web Worker, however, DOM APIs are not available. This is a browser limitation and requires a polyfill before importing our client libraries in web workers.

> Note: Not all client libraries use XML. When running in a web worker, our library will emit a useful error explaining what APIs are required if they are missing so that you can add them as needed.

In these samples we use [JSDOM][jsdom] but you can use any library that provides a DOM implementation.

## Prerequisites

The samples are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the TypeScript samples, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript].

You need [an Azure subscription][freesub] and an Azure Storage Blob container to run this sample. Please refer to the [Storage Blob documentation][storageblob] for additional information on Azure Storage Blob.

To avoid complexity in this sample, we will be using a [SAS Connection String][storageblobsas] to authenticate our client. The ARM template we include will output a SAS Connection String valid for 2 hours which you can then copy and paste into the included `env` files.

To quickly create the needed resources in Azure and to receive the necessary environment variables for them, you can deploy our sample template by clicking:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmain%2Fsamples%2Fweb-workers%2Farm-template.json)

Once the deployment completes, head over to the "outputs" tab and copy the outputs to a local file - you'll need them in the next step.

## Running the sample

Once the above resources are created you'll want to ensure our application has the necessary environment variables. To do this, copy `sample.env` as `.env` and provide the necessary environment variables to configure the application. You can get the values from the output tab of the deployment.

> Remember: we are using a connection string to keep this sample simple; however, parcel will embed the connection string into your published bundle which is not suitable for production as it may leak secrets. For production client side applications, you may be interested in the [@azure/identity][identity] package which provides a set of credential implementations for both NodeJS and the browser.

Install the various packages as well as the TypeScript compiler using:

```bash
npm install
```

Run the sample app:

```bash
npm start
```

Parcel will bundle your application code and launch a server running at `http://localhost:1234`. If you navigate to that URL you'll notice that the web worker has uploaded a sample file to Azure Storage Blob and posted a message back to the main process, displayed in the development tools console tab.

[webworkers]: https://developer.mozilla.org/docs/Web/API/Web_Workers_API
[jsdom]: https://www.npmjs.com/package/jsdom
[typescript]: https://www.typescriptlang.org/docs/home.html
[freesub]: https://azure.microsoft.com/free
[storageblob]: https://docs.microsoft.com/javascript/api/@azure/storage-blob
[storageblobsas]: https://docs.microsoft.com/azure/storage/common/storage-configure-connection-string#create-a-connection-string-using-a-shared-access-signature
[identity]: https://www.npmjs.com/package/@azure/identity
