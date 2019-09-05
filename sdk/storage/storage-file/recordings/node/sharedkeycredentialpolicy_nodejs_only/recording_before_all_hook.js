let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash156767551712004416"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156767551712004416')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:25:17 GMT',
  'ETag',
  '"0x8D731E2F7188843"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '413344f4-601a-00e7-3ccb-631879000000',
  'x-ms-client-request-id',
  '15f553db-42d0-418b-9734-23c1c7f6a0e1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:25:16 GMT',
  'Connection',
  'close' ]);

