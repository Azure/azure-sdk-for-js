let nock = require('nock');

module.exports.hash = "1d75d1065dfc22267fb4d2efa86cf8b5";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240447309672","file":"file158368240449904299"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240447309672')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:44 GMT',
  'ETag',
  '"0x8D7C377E7451BC3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f325f-601e-0014-2a60-f586fa000000',
  'x-ms-client-request-id',
  'b6563600-d61b-4241-af38-34f94f9ea2f5',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:44 GMT'
]);
