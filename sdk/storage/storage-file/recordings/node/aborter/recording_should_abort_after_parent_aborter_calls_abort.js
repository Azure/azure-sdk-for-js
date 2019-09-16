let nock = require('nock');

module.exports.testInfo = {"share":"share156816827693507700"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816827693507700')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:17:57 GMT',
  'ETag',
  '"0x8D7365E42DD1E42"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf44a2a7-d01a-0056-1347-688e8c000000',
  'x-ms-client-request-id',
  'eba61ab7-59c7-4c43-8bc9-a68c5acf29de',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:56 GMT' ]);

