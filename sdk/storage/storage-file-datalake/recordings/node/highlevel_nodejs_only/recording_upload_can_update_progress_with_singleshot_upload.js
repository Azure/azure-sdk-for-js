let nock = require('nock');

module.exports.hash = "6444693747ae1eebeb2fd140d7191c00";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240149101639","file":"file158368240151901707"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240149101639')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'ETag',
  '"0x8D7C377E57EA114"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2b2d-601e-0014-2a60-f586fa000000',
  'x-ms-client-request-id',
  '034ef3a1-2152-432f-8b96-d2ec07299e87',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT'
]);
