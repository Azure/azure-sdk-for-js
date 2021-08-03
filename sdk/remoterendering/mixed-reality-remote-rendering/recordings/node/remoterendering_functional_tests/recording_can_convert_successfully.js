let nock = require('nock');

module.exports.hash = "15351b68172a2a7defdf4f33342ade03";

module.exports.testInfo = {"uniqueName":{"conversionId":"conversionId161979083179608548"},"newDate":{}}

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Fri, 30 Apr 2021 13:53:52 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'hLKiQk2b6kizt8jQ8JvE4g.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .put('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161979083179608548', {"settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","storageContainerReadListSas":"arr_sas_token","blobPrefix":"Input","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","storageContainerWriteSas":"arr_sas_token","blobPrefix":"Output"}}})
  .query(true)
  .reply(201, {"id":"conversionId161979083179608548","creationTime":"2021-04-30T13:53:53.963195Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"error":null,"status":"NotStarted"}, [
  'Date',
  'Fri, 30 Apr 2021 13:53:53 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '428',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'DDi+ubROTEu0aE1SNhJD3A.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161979083179608548')
  .query(true)
  .reply(200, {"id":"conversionId161979083179608548","creationTime":"2021-04-30T13:53:53.963195Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"error":null,"status":"NotStarted"}, [
  'Date',
  'Fri, 30 Apr 2021 13:53:53 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '428',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'MvGf6F9Nz0m4i15pE1M+wQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161979083179608548')
  .query(true)
  .reply(200, {"id":"conversionId161979083179608548","creationTime":"2021-04-30T13:53:53.963195Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Fri, 30 Apr 2021 13:54:03 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '425',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'Gn3enW/73EyOxMcoUWPaIw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161979083179608548')
  .query(true)
  .reply(200, {"id":"conversionId161979083179608548","creationTime":"2021-04-30T13:53:53.963195Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Fri, 30 Apr 2021 13:54:24 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '425',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'EniRq3UL00WusW1BElYY4w.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161979083179608548')
  .query(true)
  .reply(200, {"id":"conversionId161979083179608548","creationTime":"2021-04-30T13:53:53.963195Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"}, [
  'Date',
  'Fri, 30 Apr 2021 13:54:55 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '524',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '/znX+vvagUqPszc5AZNohg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions')
  .query(true)
  .reply(200, {"conversions":[{"id":"9456e78f-4e86-45d5-9a3a-42f32d98ebfa","creationTime":"2021-04-30T09:42:54.4006831Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"},{"id":"4bd0faf2-7279-4351-8255-ff7b1852aa77","creationTime":"2021-04-30T11:04:28.3608266Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"},{"id":"5853b38a-a174-44e4-9018-7c324e2d2ba7","creationTime":"2021-04-30T11:17:01.4900529Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"},{"id":"9e063aff-0aeb-4ca5-8796-b708680fcf32","creationTime":"2021-04-30T11:25:43.4274107Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"},{"id":"conversionId161978216546004121","creationTime":"2021-04-30T11:29:27.2323156Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"},{"id":"conversionId161978242766201357","creationTime":"2021-04-30T11:33:47.8966192Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":{"code":"ConversionProcessFailed","message":"Invalid input provided. Check logs in output container for details."},"status":"Failed"},{"id":"conversionId161978289255208378","creationTime":"2021-04-30T11:41:35.9073281Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"},{"id":"conversionId161978296301000875","creationTime":"2021-04-30T11:42:43.2118581Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":{"code":"ConversionProcessFailed","message":"Invalid input provided. Check logs in output container for details."},"status":"Failed"},{"id":"a6faf3bc-3c10-4ce3-9548-545da9ef2423","creationTime":"2021-04-30T11:49:50.4940039Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"},{"id":"b57d6ad3-0077-478b-967a-0219a0fab5cc","creationTime":"2021-04-30T13:12:21.8193622Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"},{"id":"conversionId161979083179608548","creationTime":"2021-04-30T13:53:53.963195Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"testBox.arrAsset"}},"output":{"outputAssetUri":"https://sdktest.blob.core.windows.net/test/Output/testBox.arrAsset"},"error":null,"status":"Succeeded"}],"@nextLink":null}, [
  'Date',
  'Fri, 30 Apr 2021 13:54:55 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '5927',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '/Vs8TjEAAEagOBhmF6bWuA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);
