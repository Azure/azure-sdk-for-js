let nock = require('nock');

module.exports.testInfo = {}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1share-with-dash156044277273507696')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb84f95a-601a-001c-40c9-21a286000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:19:18 GMT',
  'Connection',
  'close' ]);

