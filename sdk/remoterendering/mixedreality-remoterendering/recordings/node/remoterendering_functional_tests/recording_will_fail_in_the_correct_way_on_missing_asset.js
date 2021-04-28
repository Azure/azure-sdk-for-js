let nock = require('nock');

module.exports.hash = "98eb3da984f30ffa04babd4ee34a4e41";

module.exports.testInfo = {"uniqueName":{"conversionId":"conversionId161960629129403049"},"newDate":{}}

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:10 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'CUAahpgsQkW0gvYD7enulA.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .put('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960629129403049', {"settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","storageContainerReadListSas":"arr_sas_token","blobPrefix":"Input","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","storageContainerWriteSas":"arr_sas_token","blobPrefix":"Output"}}})
  .query(true)
  .reply(201, {"id":"conversionId161960629129403049","creationTime":"2021-04-28T10:38:11.8074584Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":null,"status":"NotStarted"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:11 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '455',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'Cu9b4mTzLUm/B9TqFcIV2w.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:11 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  '4YR03J+nDEur3aQOFKZT+g.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960629129403049')
  .query(true)
  .reply(200, {"id":"conversionId161960629129403049","creationTime":"2021-04-28T10:38:11.8074584Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":null,"status":"NotStarted"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:11 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '455',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  '/PriHG+FAEW1VhNesCapIg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:11 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'KHbP5XiHVk2cVKsGq5wjcQ.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960629129403049')
  .query(true)
  .reply(200, {"id":"conversionId161960629129403049","creationTime":"2021-04-28T10:38:11.8074584Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:12 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '452',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'XKIDIlGqoEuogvU+ex82ug.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:13 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'Pl7/meGxIkGZ92+Aqxw0yQ.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960629129403049')
  .query(true)
  .reply(200, {"id":"conversionId161960629129403049","creationTime":"2021-04-28T10:38:11.8074584Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:13 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '452',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'BBn01/e+y0eTVUwCVlnJOw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:13 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'viq7301h4U2f9J5BBamCyA.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960629129403049')
  .query(true)
  .reply(200, {"id":"conversionId161960629129403049","creationTime":"2021-04-28T10:38:11.8074584Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:14 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '452',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'a7RUDbOg3EyTTWqaP37vcg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:24 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'HNKDqzAtfkWvV/UCZVcR4w.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960629129403049')
  .query(true)
  .reply(200, {"id":"conversionId161960629129403049","creationTime":"2021-04-28T10:38:11.8074584Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:24 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '452',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'UgbrTwr7Ck2O30l5sj5Tpw.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:34 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  '3urenTWNWkyo6YfBU9dFjQ.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960629129403049')
  .query(true)
  .reply(200, {"id":"conversionId161960629129403049","creationTime":"2021-04-28T10:38:11.8074584Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:35 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '452',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'hKzPFvr5iEiNfecCKOIJcQ.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:45 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'r8KC+dNPzUmpJbQtEcTaXw.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960629129403049')
  .query(true)
  .reply(200, {"id":"conversionId161960629129403049","creationTime":"2021-04-28T10:38:11.8074584Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:46 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '452',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'BuMR11/QZ0qJ3noqrPRV5Q.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:56 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'mqTZa+tJTEa1/Hv9q02iHw.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960629129403049')
  .query(true)
  .reply(200, {"id":"conversionId161960629129403049","creationTime":"2021-04-28T10:38:11.8074584Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":null,"status":"Running"}, [
  'Date',
  'Wed, 28 Apr 2021 10:38:56 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '452',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'S+aGkLh+m0Gk6YUJrNh1pg.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);

nock('https://sts.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/Accounts/00000000-1111-2222-3333-444455556666/token')
  .query(true)
  .reply(200, {"AccessToken":"<access_token>"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:08 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '1219',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'MS-CV',
  'oGfPBRZ240md8qScIwTkdg.0',
  'X-Content-Type-Options',
  'nosniff'
]);

nock('https://remoterendering.eastus2.mixedreality.azure.com:443', {"encodedQueryParams":true})
  .get('/accounts/00000000-1111-2222-3333-444455556666/conversions/conversionId161960629129403049')
  .query(true)
  .reply(200, {"id":"conversionId161960629129403049","creationTime":"2021-04-28T10:38:11.8074584Z","settings":{"inputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Input/","relativeInputAssetPath":"boxWhichDoesNotExist.fbx"},"outputLocation":{"storageContainerUri":"https://sdktest.blob.core.windows.net/test","blobPrefix":"Output/","outputAssetFilename":"boxWhichDoesNotExist.arrAsset"}},"error":{"code":"ConversionProcessFailed","message":"Invalid input provided. Check logs in output container for details."},"status":"Failed"}, [
  'Date',
  'Wed, 28 Apr 2021 10:39:08 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '561',
  'Cache-Control',
  'no-store,no-cache',
  'Pragma',
  'no-cache',
  'X-Content-Type-Options',
  'nosniff',
  'MS-CV',
  'E4A/KJEO2kGwZ9bz+AcIsA.0',
  'api-supported-versions',
  '2021-01-01-preview, 2021-01-01'
]);
