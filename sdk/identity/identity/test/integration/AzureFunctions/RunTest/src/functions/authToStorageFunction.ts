import { authToStorageHelper } from "../authToStorageHelper";

import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

async function authenticateStorage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    await authToStorageHelper();
    return {
      // status: 200, /* Defaults to 200 */
      body: "Successfully authenticated with storage",
    };
  } catch (error: any) {
    return {
      status: 500,
      body: error.message,
    };
  }
};

app.http('authenticateStorage', {
    methods: ['GET', 'POST'],
    handler: authenticateStorage
});
