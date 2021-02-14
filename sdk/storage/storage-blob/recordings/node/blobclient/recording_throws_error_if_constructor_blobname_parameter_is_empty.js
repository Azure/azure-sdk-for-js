let nock = require('nock');

module.exports.hash = "5d0bad7d72943fb11c2280279a48f2a1";

module.exports.testInfo = {"uniqueName":{"container":"container159210827391907624","blob":"blob159210827393406968"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827391907624')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'ETag',
  '"0x8D81019E8D2E98B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13090af-201e-003e-5902-42dadf000000',
  'x-ms-client-request-id',
  '03f3bbff-1664-4e40-a8b9-fea82e0e1472',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827391907624/blob159210827393406968', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'ETag',
  '"0x8D81019E8D59F12"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13090b7-201e-003e-6002-42dadf000000',
  'x-ms-client-request-id',
  'cce95323-86e9-42cc-8246-e213327fe05e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:53.9466002Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827391907624')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13090bc-201e-003e-6502-42dadf000000',
  'x-ms-client-request-id',
  'c42aef75-bbe9-4364-90e6-e436f58f0c67',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);
