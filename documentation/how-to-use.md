# How to Use the Azure SDK for JavaScript

In this document, we will give a brief introduction on how to use the JavaScript SDK for new users.

1. Prepare your environment.  
    Node.js 22 or newer can be installed from https://nodejs.org/en/download/.  
    TypeScript can be added to your test project with `npm install --save-dev typescript`.

1. Create a empty folder and `cd` this folder.

    ```
    mkdir jstest
    cd jstest
    ```

1. Initialize a new node project. 

    ```
    npm init -y
    ```

    This step will create a `package.json` file in current folder.

1. Install dependencies.

   ```
   // install @azure/identity, you can use @azure/identity to do the authentication work.
   npm install @azure/identity
   
   // Then install your target try out package, you can install the latest published with
   npm install @azure/arm-XXX

   // or install it from your local JS SDK artifact file. 
   npm install D:\\dev\\test\\test-compute\\azure-arm-XXX-1.0.0.tgz   
   ```

   In the case of verifying the unpublished packages, you may download the artifact from either rest api specs CI pipeline or from the release request issue that we provided.

1. Create a ts file (free name and copy follow code into this file), eg: `test_1.ts`.
   Eg:

    ```ts
        import { DefaultAzureCredential } from "@azure/identity";
        import{ TargetManagementClient } from "@azure/arm-target";

        const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID || "";
        const credentials=new DefaultAzureCredential();

        async function test() {
            const client = new TargetManagementClient(credentials, subscriptionId);
            const result = await client.operations.list();
            // you can test that you need test operation
            console.log("The result is:\n");
            console.log(result);
        }

        test();
    ```

    In the example, we only add `client.operations.list()`, you may change them into other resources CRUD function per your need.  
    Eg:

    ```ts
    const client = new ComputeManagementClient(credentials, subscriptionId);
    const result= await client.galleries.beginCreateOrUpdateAndWait(resourceGroupName, galleryName, gallery);
    const result = await client.galleryImages.beginCreateOrUpdateAndWait(resourceGroupName, galleryName, galleryImageName, galleryImage);
    ```
    
1. Install all the dependencies

   ```
   npm install
   ```

1. Compile the ts file.

   ```
   tsc test_1.ts
   ```

   it will generate a `test_1.js` file in current folder.

1. Run the code. 
   
   ```
   node test_1.js
   ```
   
   Now, you can see expected response.
