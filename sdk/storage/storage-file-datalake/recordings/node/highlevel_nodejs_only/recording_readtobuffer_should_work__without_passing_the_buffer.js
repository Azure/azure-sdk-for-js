let nock = require('nock');

module.exports.hash = "66f185629971a9788cd592fd97c8ac1e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158350566858100736","file":"file158350566893103144"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158350566858100736')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Mar 2020 14:41:08 GMT',
  'ETag',
  '"0x8D7C1DC688E37A2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4dd186fa-001e-0026-64c5-f3de2a000000',
  'x-ms-client-request-id',
  'd7d3181f-e417-4d1a-996d-5b02359668dc',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:41:08 GMT'
]);
