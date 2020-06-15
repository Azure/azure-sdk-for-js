let nock = require('nock');

module.exports.hash = "088f9619785dd5dbabc153cfe3e50d2f";

module.exports.testInfo = {"uniqueName":{"container":"container159210827982901028","blob":"blob159210827984404337"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827982901028')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:59 GMT',
  'ETag',
  '"0x8D81019EC5A43A1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a0b-201e-003e-2502-42dadf000000',
  'x-ms-client-request-id',
  '018b3eb0-89d3-4330-8750-e4e98bf92abc',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827982901028/blob159210827984404337', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:59 GMT',
  'ETag',
  '"0x8D81019EC5CD0C3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a13-201e-003e-2c02-42dadf000000',
  'x-ms-client-request-id',
  '2cc70735-2541-42da-9c4c-7a01231c8471',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:59.8667742Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827982901028')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a1f-201e-003e-3702-42dadf000000',
  'x-ms-client-request-id',
  'e0f2bf8f-e57f-469e-bd79-f725d456a9fd',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:58 GMT'
]);
