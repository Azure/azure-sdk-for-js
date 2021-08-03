let nock = require('nock');

module.exports.hash = "98eb3da984f30ffa04babd4ee34a4e41";

module.exports.testInfo = {"uniqueName":{"conversionId":"conversionId161979089851105096"},"newDate":{}}

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Fri, 30 Apr 2021 13:54:58 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'QYkqnFqHRECeTNx0003F0A.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .put('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161979089851105096', {"settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","storageContainerReadListSas":"arr_sas_token","blobPrefix":"Input","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","storageContainerWriteSas":"arr_sas_token","blobPrefix":"Output"}}})
  .query(true)
  .reply(201, {"id":"conversionId161979089851105096","creationTime":"2021-04-30T13:54:58.578215Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":null,"status":"NotStarted"}, [
  'Date',
  'Fri, 30 Apr 2021 13:54:57 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '454',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '/Vo8M/0qokSNbs7XzDXwvQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161979089851105096')
  .query(true)
  .reply(200, {"id":"conversionId161979089851105096","creationTime":"2021-04-30T13:54:58.578215Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":null,"status":"NotStarted"}, [
  'Date',
  'Fri, 30 Apr 2021 13:54:57 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '454',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'CsLrtMoPvEihGk7pSjwWpw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);
nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161979089851105096')
  .query(true)
  .reply(200, {"id":"conversionId161979089851105096","creationTime":"2021-04-30T13:54:58.578215Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":null,"status":"NotStarted"}, [
  'Date',
  'Fri, 30 Apr 2021 13:54:58 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '454',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'glzsHqrWY0GXQel1fPnPUQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161979089851105096')
  .query(true)
  .reply(200, {"id":"conversionId161979089851105096","creationTime":"2021-04-30T13:54:58.578215Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Fri, 30 Apr 2021 13:56:00 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '451',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'mPT+16K3g0K7DDCawJTCpA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161979089851105096')
  .query(true)
  .reply(200, {"id":"conversionId161979089851105096","creationTime":"2021-04-30T13:54:58.578215Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":{"code":"ConversionProcessFailed","message":"Invalid input provided. Check logs in output container for details."},"status":"Failed"}, [
  'Date',
  'Fri, 30 Apr 2021 13:56:10 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '560',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'xnmxgHrsRUW0RnQ2tYczRg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);
