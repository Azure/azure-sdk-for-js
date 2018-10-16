# An isomorphic javascript sdk for - LogAnalyticsClient
This project provides an isomorphic javascript package. Right now it supports:
- node.js version 6.x.x or higher
- browser javascript

## How to Install

- nodejs
```
npm install @azure/loganalytics
```
- browser
```html
<script type="text/javascript" src="@azure/loganalytics/dist/loganalytics.js"></script>
```

## How to use

### nodejs - Authentication, client creation and execute query as an example written in TypeScript.

```ts
import * as msRest from "ms-rest-js";
import { LogAnalyticsClient, LogAnalyticsModels, LogAnalyticsMappers } from "@azure/loganalytics";
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

const token = "<access_token>";
const creds = new msRest.TokenCredentials(token);
const client = new LogAnalyticsClient(creds, subscriptionId);
const workspaceId = "testworkspaceId";
const body = {
  query: "testquery",
  timespan: "testtimespan",
  workspaces: ["testworkspaces"]
};
client.query.execute(workspaceId, body).then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.error(err);
});
```

### browser - Authentication, client creation and execute query as an example written in javascript.

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/loganalytics sample</title>
    <script type="text/javascript" src="./node_modules/ms-rest-js/dist/msRest.browser.js"></script>
    <script type="text/javascript" src="./dist/loganalytics.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const token = "<access_token>";
      const creds = new msRest.TokenCredentials(token);
      const client = new Azure.Loganalytics.LogAnalyticsClient(creds, subscriptionId);
      const workspaceId = "testworkspaceId";
      const body = {
        query: "testquery",
        timespan: "testtimespan",
        workspaces: ["testworkspaces"]
      };
      client.query.execute(workspaceId, body).then((result) => {
        console.log("The result is:");
        console.log(result);
      }).catch((err) => {
        console.error(err);
      });
    </script>
  </head>
  <body>
  </body>
</html>
```

# Related projects
 - [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)
