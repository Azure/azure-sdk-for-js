let nock = require('nock');

module.exports.hash = "39aff7593cbc2f23323945ac6cc5bf2c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240121505998","file":"file158368240125202878"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240121505998')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'ETag',
  '"0x8D7C377E5558C8B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2a90-601e-0014-1c60-f586fa000000',
  'x-ms-client-request-id',
  'a58b5467-da3a-4463-a3cc-43957de5c607',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT'
]);
