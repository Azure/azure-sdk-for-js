let nock = require('nock');

module.exports.hash = "ed7b40e773feb30d90ea3af37e06debf";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240433101639","file":"file158368240435803642"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240433101639')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:44 GMT',
  'ETag',
  '"0x8D7C377E72F9363"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f3208-601e-0014-5c60-f586fa000000',
  'x-ms-client-request-id',
  '94016855-4679-4df1-affd-5467957cb9d7',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:44 GMT'
]);
