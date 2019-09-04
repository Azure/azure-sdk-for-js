let nock = require('nock');

module.exports.testInfo = {"share":"share156758470512401451"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758470512401451')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:45 GMT',
  'ETag',
  '"0x8D7310F86E6FB0B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2a88be5a-001a-0125-04f8-62a0f2000000',
  'x-ms-client-request-id',
  '4f962de2-86d7-4c82-947f-0178746a6a6f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:11:44 GMT',
  'Connection',
  'close' ]);

