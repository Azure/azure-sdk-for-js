let nock = require('nock');

module.exports.testInfo = {}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1share-with-dash156775332696806178')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34d7650d-401a-00df-3281-64bcb9000000',
  'x-ms-client-request-id',
  'ad34eebd-bd81-4135-a90f-1cb2f7c3b32f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:02:09 GMT',
  'Connection',
  'close' ]);

