let nock = require('nock');

module.exports.hash = "76c1583bf5b97b7bf3b2740d780c0843";

module.exports.testInfo = {"uniqueName":{"container":"container159210827998608035","blob":"blob159210828000007795"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827998608035')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:59 GMT',
  'ETag',
  '"0x8D81019EC7040A1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a4b-201e-003e-6102-42dadf000000',
  'x-ms-client-request-id',
  '98f18915-3a53-4636-b25c-b002f3579e4f',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827998608035/blob159210828000007795', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:18:00 GMT',
  'ETag',
  '"0x8D81019EC72CDBF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a53-201e-003e-6802-42dadf000000',
  'x-ms-client-request-id',
  '1cf6f07b-e4e1-4428-ae2c-837a450d3195',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:18:00.0098751Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827998608035')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309a5b-201e-003e-7002-42dadf000000',
  'x-ms-client-request-id',
  'a120cb1f-68fe-4b7a-9ed7-dd00e3d6b8cb',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:59 GMT'
]);
