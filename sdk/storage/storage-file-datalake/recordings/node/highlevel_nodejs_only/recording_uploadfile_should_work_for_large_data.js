let nock = require('nock');

module.exports.hash = "c380c07ecd0d38fc93ba4b2502ac4ffb";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240321005932","file":"file158368240323908885"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240321005932')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'ETag',
  '"0x8D7C377E684D72C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2f30-601e-0014-4b60-f586fa000000',
  'x-ms-client-request-id',
  'b029f543-25dd-4979-8609-d01ba508512c',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT'
]);
