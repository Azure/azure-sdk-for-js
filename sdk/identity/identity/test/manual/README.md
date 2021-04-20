# Identity Manual Browser Verification

This package contains some simple manual verification for the use of Azure
Identity with other Azure SDK libraries in the browser.  For now, it just tests
that the `InteractiveBrowserCredential` works with the `@azure/service-bus`
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
- Go to the `API permissions` tab of your AAD application. Click on `Add a permission`, then go to `APIs my organization uses` and search for `Microsoft.ServiceBus`, then add this permission.
- Keep in mind that if you belong to an organization, other restrictions based on the organization configurations might prevent you from authenticating. If these steps don't end up being effective, try again on a personal account.

Grant access to this AAD application to your Service Bus by:

- Creating a Service Bus namespace (if you haven't created one).
- Either in the "Access policies" section of the creation form, or by going to the Service Bus namespace's "Access policies" page, click con `+ Add Access Policy`, select all permissions, then select your AAD application as the "Service Bus Data Owner", then click "Add", then click "Save" if applicable.
- Then, in your Service Bus namespace, create a queue named `queue-identity-test`.

With the AAD application and the Service Bus namespace configured, make sure `npm start` is running, then go to `http://localhost:8080`, then enter the Tenant ID, the Client ID of the AAD application and the Service Bus Endpoint, then go through the available options to configure the scenario in which you want the authentication to run, then click on the `Send Message` button. Information from the message sent will appear at the bottom.

If something unexpected happens, make sure to open the console tab in the browser. The application will be logging as many things as they seemed relevant for debugging.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fidentity%2Fidentity%2Ftest%2Fmanual%2FREADME.png)
