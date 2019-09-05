let nock = require('nock');

module.exports.testInfo = {}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1share-with-dash156767551712004416')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b950278-c01a-009c-4bcb-635ae5000000',
  'x-ms-client-request-id',
  '1a579d15-09e3-4c3b-a6b6-dd50c2b68d07',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:25:18 GMT',
  'Connection',
  'close' ]);

