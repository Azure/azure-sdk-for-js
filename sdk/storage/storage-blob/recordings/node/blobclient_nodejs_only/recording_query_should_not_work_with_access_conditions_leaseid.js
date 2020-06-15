let nock = require('nock');

module.exports.hash = "ff7d50dc3de36b014e9d2582c95ddf56";

module.exports.testInfo = {"uniqueName":{"container":"container159210827992203656","blob":"blob159210827995306126"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827992203656')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:59 GMT',
  'ETag',
  '"0x8D81019EC687706"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a39-201e-003e-5002-42dadf000000',
  'x-ms-client-request-id',
  'a11fac75-e9e4-4496-b867-b394d96a2080',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827992203656/blob159210827995306126', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:59 GMT',
  'ETag',
  '"0x8D81019EC6BEEAD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a42-201e-003e-5802-42dadf000000',
  'x-ms-client-request-id',
  '2bda479f-1d7c-407e-89b7-970c6118582c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:59.9648429Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827992203656')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a46-201e-003e-5c02-42dadf000000',
  'x-ms-client-request-id',
  '613d5629-51e5-432b-922e-532ca8f35398',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);
