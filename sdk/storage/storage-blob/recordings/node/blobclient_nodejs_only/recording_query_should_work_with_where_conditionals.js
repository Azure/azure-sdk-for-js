let nock = require('nock');

module.exports.hash = "c4f766d931daa5bdfbb3450e86ec701f";

module.exports.testInfo = {"uniqueName":{"container":"container159210828002206364","blob":"blob159210828003804395"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210828002206364')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:18:00 GMT',
  'ETag',
  '"0x8D81019EC77E329"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a5e-201e-003e-7302-42dadf000000',
  'x-ms-client-request-id',
  'd94e2deb-6c65-491a-870a-b86a3fbd61a0',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210828002206364/blob159210828003804395', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:18:00 GMT',
  'ETag',
  '"0x8D81019EC7A9757"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a66-201e-003e-7902-42dadf000000',
  'x-ms-client-request-id',
  '9f0fd53f-507c-472c-948a-dac81a143501',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:18:00.0619122Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210828002206364')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a74-201e-003e-0602-42dadf000000',
  'x-ms-client-request-id',
  'e6e10c07-0003-4020-b99b-f705033a5327',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);
