let nock = require('nock');

module.exports.hash = "11a3908521116429253a64da4d5e6b7d";

module.exports.testInfo = {"uniqueName":{"container":"container159210827735706655","blob":"blob159210827761908793"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827735706655')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'ETag',
  '"0x8D81019EADF93BB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130969c-201e-003e-6b02-42dadf000000',
  'x-ms-client-request-id',
  '7fe3d3a6-7ef2-47ca-86f7-bf12080cb228',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827735706655/blob159210827761908793', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'ETag',
  '"0x8D81019EB087507"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130970d-201e-003e-5902-42dadf000000',
  'x-ms-client-request-id',
  'dca0292a-099e-42b9-8e92-66fc1d831a05',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:57.6352007Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827735706655/blob159210827761908793')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019EB087507"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309713-201e-003e-5f02-42dadf000000',
  'x-ms-client-request-id',
  '8b956a92-aaf6-4039-b2e1-48ed178d05a2',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:57.6352007Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827735706655')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309717-201e-003e-6302-42dadf000000',
  'x-ms-client-request-id',
  '19e4dcac-79c5-4659-b6ed-7f98a505c148',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);
