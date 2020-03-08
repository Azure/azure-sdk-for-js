let nock = require('nock');

module.exports.hash = "73b8fbd6853cd2b01c970bf08e4aeeb7";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240334501154","file":"file158368240337206884"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240334501154')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'ETag',
  '"0x8D7C377E6997503"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2f96-601e-0014-2460-f586fa000000',
  'x-ms-client-request-id',
  '6c01929a-a957-4712-b93f-e3d9ac4f1a8d',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT'
]);
