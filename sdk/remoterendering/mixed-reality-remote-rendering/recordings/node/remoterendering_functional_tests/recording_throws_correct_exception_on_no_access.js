let nock = require('nock');

module.exports.hash = "4482e74cdede34465d36732c60dae28f";

module.exports.testInfo = {"uniqueName":{"conversionId":"conversionId161979089668904294"},"newDate":{}}

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Fri, 30 Apr 2021 13:54:56 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  '6jeOh+NNn0e+G1+Br9J+Fw.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .put('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161979089668904294', {"settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input","relativeInputAssetPath":"testBox.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output"}}})
  .query(true)
  .reply(403, {"error":{"code":"DelegatedResourceAccessError","message":"Error accessing connected storage account due to insufficient permissions. Check if the Mixed Reality resource has correct permissions assigned. Documentation on how to link Remote Rendering Accounts to storage can be found here: https://docs.microsoft.com/azure/remote-rendering/how-tos/create-an-account#link-storage-accounts."}}, [
  'Date',
  'Fri, 30 Apr 2021 13:54:57 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '390',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'r8XnpG1A40uqRYi4xrhhZg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);
