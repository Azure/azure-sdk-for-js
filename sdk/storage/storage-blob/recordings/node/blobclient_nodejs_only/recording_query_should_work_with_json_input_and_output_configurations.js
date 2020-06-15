let nock = require('nock');

module.exports.hash = "202bab48bbe0ff350d44978250512663";

module.exports.testInfo = {"uniqueName":{"container":"container159210828056608669","blob":"blob159210828058208020"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210828056608669')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:18:00 GMT',
  'ETag',
  '"0x8D81019ECCAA613"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309b69-201e-003e-6602-42dadf000000',
  'x-ms-client-request-id',
  '52488d5a-e8dd-4e0d-bbec-b514d5137f87',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210828056608669/blob159210828058208020', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:18:00 GMT',
  'ETag',
  '"0x8D81019ECCD0BFA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309b71-201e-003e-6d02-42dadf000000',
  'x-ms-client-request-id',
  '31c42e94-d2d2-44f7-b822-7620a9958ded',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:18:00.6012922Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210828056608669')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309b78-201e-003e-7402-42dadf000000',
  'x-ms-client-request-id',
  '81b488d3-efa5-4058-b3b9-c644d6877baf',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);
