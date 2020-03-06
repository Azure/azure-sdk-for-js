let nock = require('nock');

module.exports.hash = "cb85c1dd7d1d53affe5607507d41a125";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158350566894607152","file":"file158350566966005248"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158350566894607152')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Mar 2020 14:41:09 GMT',
  'ETag',
  '"0x8D7C1DC68C5A6ED"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd187e4-001e-0026-26c5-f3de2a000000',
  'x-ms-client-request-id',
  '08b90339-5635-47f7-ae84-86a29a2ce405',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:41:08 GMT'
]);
