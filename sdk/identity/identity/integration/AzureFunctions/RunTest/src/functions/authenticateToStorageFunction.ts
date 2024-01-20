import { authToStorageHelper } from "../authToStorageHelper";

import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function authenticateStorage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    context.log('Http function was triggered.');
    //parse the request body
    await authToStorageHelper(context);
   
    return {
      // status: 200, /* Defaults to 200 */
      body: "Successfully authenticated with storage",
    };
  } catch (error: any) {
    return {
      status: 400,
      body: error,
    };
  }
};

app.http('authenticateStorage', {
    methods: ['GET', 'POST'],
    handler: authenticateStorage
});
