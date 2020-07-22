let nock = require('nock');

module.exports.hash = "5e177bd97b8fc3df77d804be9b218010";

module.exports.testInfo = {"uniqueName":{"container":"container159210827387809654","blob":"blob159210827389201581"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827387809654')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'ETag',
  '"0x8D81019E8CC0A73"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130908d-201e-003e-3a02-42dadf000000',
  'x-ms-client-request-id',
  'cc65c7e7-6426-434d-99e0-5d4245d24f15',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827387809654/blob159210827389201581', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'ETag',
  '"0x8D81019E8CE98E9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309097-201e-003e-4302-42dadf000000',
  'x-ms-client-request-id',
  '0adb0319-45f6-4e4d-8f6b-5da437940392',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:53.9005673Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827387809654')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13090a4-201e-003e-5002-42dadf000000',
  'x-ms-client-request-id',
  '55309e3d-6328-4a5e-a4ef-9059eb7d7071',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);
