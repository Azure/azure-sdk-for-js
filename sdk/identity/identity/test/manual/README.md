# Identity Manual Browser Verification

This package contains some simple manual verification for the use of Azure
Identity with other Azure SDK libraries in the browser.  For now, it just tests
that the `InteractiveBrowserCredential` works with the `@azure/keyvault-keys`
library.

## Usage

Run the following commands:

```
npm install
npm start
```

Webpack will compile the code and then host it in a local server at
`http://localhost:8080`.  See the section below about CORS before attempting to
navigate to this URL.

You will need an AAD App Registration that has its redirect uri set to
`http://localhost:8080`.  Its tenant ID and client (application) ID will need to
be entered into the UI to initiate the authentication process.

## Avoiding CORS errors

Currently the Key Vault service does not provide a way to configure CORS origins
so that requests against the service can be made from a browser (Storage and
Cosmos DB services provide this capability).  To get around this issue, you can
run Google Chrome with web security disabled:

**NOTE:** Only do this for manual verification purposes!

```
google-chrome --disable-web-security
```


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fidentity%2Fidentity%2Ftest%2Fmanual%2FREADME.png)
