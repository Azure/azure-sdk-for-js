let nock = require('nock');

module.exports.hash = "c29ab049f3c90f17b01e8111d565d6f6";

module.exports.testInfo = {"uniqueName":{"container":"container159210827987503646","blob":"blob159210827989101802"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827987503646')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:59 GMT',
  'ETag',
  '"0x8D81019EC6149CC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a2a-201e-003e-4202-42dadf000000',
  'x-ms-client-request-id',
  '0abc2f58-a8c6-4b7b-8b06-be5f657444d1',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827987503646/blob159210827989101802', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:59 GMT',
  'ETag',
  '"0x8D81019EC64251A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a33-201e-003e-4a02-42dadf000000',
  'x-ms-client-request-id',
  '8afa6eeb-a3d0-48b2-b68a-8016d6e7d09a',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:59.9138074Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827987503646')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a36-201e-003e-4d02-42dadf000000',
  'x-ms-client-request-id',
  'eb4f77b9-4d3d-4719-b4b1-9d662c6e6a30',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);
