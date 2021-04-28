let nock = require('nock');

module.exports.hash = "15351b68172a2a7defdf4f33342ade03";

module.exports.testInfo = {"uniqueName":{"conversionId":"conversionId161960623149001403"},"newDate":{}}

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:13 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'sMIjBEIxQkuNoL+AC6a+Ag.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .put('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960623149001403', {"settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","storageContainerReadListSas":"arr_sas_token","blobPrefix":"Input","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","storageContainerWriteSas":"arr_sas_token","blobPrefix":"Output"}}})
  .query(true)
  .reply(201, {"id":"conversionId161960623149001403","creationTime":"2021-04-28T10:37:13.7693394Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"error":null,"status":"NotStarted"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:13 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '429',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'NqExo3SFkECPxQTW5rftUQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:13 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'mBBjVxvwaEOCVKyqVQoS/g.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960623149001403')
  .query(true)
  .reply(200, {"id":"conversionId161960623149001403","creationTime":"2021-04-28T10:37:13.7693394Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"error":null,"status":"NotStarted"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:13 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '429',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'n7LmyGxolkO03JpsMgEJcw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:14 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  '9daUQGXPuU6B0FpF9o1BEw.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960623149001403')
  .query(true)
  .reply(200, {"id":"conversionId161960623149001403","creationTime":"2021-04-28T10:37:13.7693394Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:14 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '426',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '1y69Dkle6kyUOxLuoGMuiQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:14 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'cLzFbZD4d0GwaiZt51lspA.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960623149001403')
  .query(true)
  .reply(200, {"id":"conversionId161960623149001403","creationTime":"2021-04-28T10:37:13.7693394Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:15 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '426',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'oVCsYwZnLEeJm+doT9YUnw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:25 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'lvI063DC2E6O7EuwhRNCTw.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960623149001403')
  .query(true)
  .reply(200, {"id":"conversionId161960623149001403","creationTime":"2021-04-28T10:37:13.7693394Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:25 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '426',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '8l43gSrD20e1+FbWgDC7aQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:36 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'XyIhpZYH00qQpFphz+RtWQ.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960623149001403')
  .query(true)
  .reply(200, {"id":"conversionId161960623149001403","creationTime":"2021-04-28T10:37:13.7693394Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:36 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '426',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'qBoSp1klt0i9739hKDMvAA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:47 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'SjnkbnduTkeD14VKfEemWA.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960623149001403')
  .query(true)
  .reply(200, {"id":"conversionId161960623149001403","creationTime":"2021-04-28T10:37:13.7693394Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:48 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '426',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '8KmpjfQ7MUi2vx0F6ZwaRA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:58 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'dewSylb9cUerWcV9mtNNOg.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960623149001403')
  .query(true)
  .reply(200, {"id":"conversionId161960623149001403","creationTime":"2021-04-28T10:37:13.7693394Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Wed, 28 Apr 2021 10:37:59 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '426',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'vzNqfdfwpU+o6xczQ4bxyA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'slQLanQn8UeKxcLLfPLfRA.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960623149001403')
  .query(true)
  .reply(200, {"id":"conversionId161960623149001403","creationTime":"2021-04-28T10:37:13.7693394Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '525',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '7D2WxTPJ2UiZ6XXosIrAUw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:09 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'wxrETwgSpUGjPs+5Trdi8A.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions')
  .query(true)
  .reply(200, {"conversions":[{"id":"conversionId161953782173201356","creationTime":"2021-04-27T15:37:02.4170052Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"},{"id":"conversionId161953867312805204","creationTime":"2021-04-27T15:51:12.8757221Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":{"code":"ConversionProcessFailed","message":"Invalid input provided. Check logs in output container for details."},"status":"Failed"},{"id":"conversionId161959842804702186","creationTime":"2021-04-28T08:27:10.0095407Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"},{"id":"conversionId161959937948300631","creationTime":"2021-04-28T08:43:00.0756524Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":{"code":"ConversionProcessFailed","message":"Invalid input provided. Check logs in output container for details."},"status":"Failed"},{"id":"conversionId161959980529100367","creationTime":"2021-04-28T08:50:06.6275053Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"},{"id":"conversionId161959988466101111","creationTime":"2021-04-28T08:51:26.204359Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"},{"id":"conversionId161959995214407550","creationTime":"2021-04-28T08:52:32.6961017Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":{"code":"ConversionProcessFailed","message":"Invalid input provided. Check logs in output container for details."},"status":"Failed"},{"id":"conversionId161960363691906183","creationTime":"2021-04-28T09:53:59.196695Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"},{"id":"conversionId161960454825009485","creationTime":"2021-04-28T10:09:08.7915038Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":{"code":"ConversionProcessFailed","message":"Invalid input provided. Check logs in output container for details."},"status":"Failed"},{"id":"conversionId161960623149001403","creationTime":"2021-04-28T10:37:13.7693394Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"}],"@nextLink":null}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:10 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '5436',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'FMGP1RQzPUm3XLXwAnbufA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);
