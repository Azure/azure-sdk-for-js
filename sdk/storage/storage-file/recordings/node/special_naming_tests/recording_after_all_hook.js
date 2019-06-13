let nock = require('nock');

module.exports.testInfo = {}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1share-with-dash156044269664801914')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5742f099-d01a-00c9-71c8-21ea5b000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:18:19 GMT',
  'Connection',
  'close' ]);

