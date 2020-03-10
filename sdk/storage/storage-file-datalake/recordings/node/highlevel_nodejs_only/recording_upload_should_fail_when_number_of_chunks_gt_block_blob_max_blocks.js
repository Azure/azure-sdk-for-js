let nock = require('nock');

module.exports.hash = "eb7536c54793ecdfc978a993963c0ba7";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158381028532405552","file":"file158381028694506967"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158381028532405552')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 10 Mar 2020 03:18:06 GMT',
  'ETag',
  '"0x8D7C4A1A6FE9667"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0b9afc95-601e-009c-068a-f63e23000000',
  'x-ms-client-request-id',
  '295f820f-0c47-49c1-a8a7-a5202fa65d0d',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Tue, 10 Mar 2020 03:18:05 GMT'
]);
