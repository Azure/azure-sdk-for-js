let nock = require('nock');

module.exports.testInfo = {}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1share-with-dash156775327320403860')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7a6b9da2-c01a-008c-4b80-649f8d000000',
  'x-ms-client-request-id',
  '9b00ec35-5c1f-4dbf-993a-950599a03ad4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:37 GMT',
  'Connection',
  'close' ]);

