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

You will need to configure an AAD App Registration as follows:

- Create a new AAD App Registration.
- Once created, go to the AAD section of the Azure portal.
- Go to the App Registration section in the AAD page.
- Click on the app that you want to use to authenticate.
- Go to the Authentication tab of your AAD application.
- Click on `+ Add a platform`, select `Single-page application`, enter `http://localhost:8080` as the redirect URI, then make sure to include implicit grant for "Access tokens" and "ID tokens".
- Keep in mind that if you belong to an organization, other restrictions based on the organization configurations might prevent you from authenticating. If These steps don't end up being effective, try again on a personal account.

Grant access to this AAD application to your Key Vault by:

- Creating a Key Vault (if you haven't created one).
- Either in the "Access policies" section of the creation form, or by going to your Key Vault's "Access policies" page, click con `+ Add Access Policy`, select all permissions, then select your AAD application as the "principal", then click "Add", then click "Save" if applicable.

With the AAD application and the Key Vault configured, make sure `npm start` is running, then go to `http://localhost:8080`, then enter the Tenant ID, the Client ID of the AAD application and the name of the Key Vault, then click on the `Get Keys` button, and a list of the available keys will be presented after the form in the web page.

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
