In this document, we will give a brief introduction on how to use the JavaScript SDK for new users

1. Prepare your environment.  
    NodeJS: can be installed from https://nodejs.org/en/download/  
    typescript: install it with `npm install -g typescript`.

1. Create a empty folder and cd this folder.
    ```
    mkdir jstest
    cd jstest
    ```

1. Initialize a new node project. 
    ```
    npm init
    ```
    This step will create a package.json file in current folder.

1. Install dependencies.
   ```
   // install the nodeauth packages to do the authentication work.
   npm install @azure/ms-rest-nodeauth
   // or install @azure/identity, if you would like to use @azure/identity to do the authentication work.
   npm install @azure/identity
   
   // Then install your target try out package,  you can install the latest published with
   npm install @azure/arm-XXX 
   //  or install it from your local JS SDK artifact file. 
   npm install D:\\dev\\test\\test-compute\\azure-arm-XXX-1.0.0.tgz
   
   ```
   In the case of verifying the unpublished packages, you may download the artifact from either rest api specs CI pipeline or from the release request issue that we provided.  


1. Create a ts file (free name and copy follow code into this file) eg: test_1.ts
    eg：
    ```
        const msRestNodeAuth = require("@azure/ms-rest-nodeauth");
        const { TargetManagementClient } = require("@azure/arm-target");  // must same as dependencies
        const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

        msRestNodeAuth.interactiveLogin().then((creds) => {
            const client = new TargetManagementClient(creds, subscriptionId);
            client.operations.list().then((result) => {      // you can test that you need test operation
                console.log("The result is:");
                console.log(result);
            });
        }).catch((err) => {
                console.error(err);
        });
    ```   
    A few points, you need to pay attention here:  
    In the example, we are using msRestNodeAuth.interactiveLogin, you can also try other way such as Service Principal
    ```
        const credentials = await msRestNodeAuth.loginWithServicePrincipalSecret(clientID, clientSecret, tenantID);
    ```
    In the example, we only add client.operations.list(), you may change them into other resources CURD function per your need.  
    for example：  
    ```
    const client = new ComputeManagementClient(credentials, subscriptionID);
    await client.galleries.createOrUpdate(resourceGroupName, galleryName, gallery);
    await client.galleryImages.createOrUpdate(resourceGroupName, galleryName, galleryImageName, galleryImage);
    ```
    
1. Install all the dependencies 
    ```
    npm install // need to make sure package.json exists and has contained at step 4.
    ```
1. Compile the ts file.
   ```
   tsc test_1.ts
   ```
   it will generate a test_1.js file in current folder.
1. Run the code. 
   ```
   node test_1.js
   ```
   Now you can see expected response.
