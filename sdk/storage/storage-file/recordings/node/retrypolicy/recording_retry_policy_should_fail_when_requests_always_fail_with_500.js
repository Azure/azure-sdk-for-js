let nock = require('nock');

module.exports.testInfo = {"share":"share156758481107809193"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758481107809193')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:31 GMT',
  'ETag',
  '"0x8D7310FC60E2C67"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8a86333d-601a-0133-5ef8-625625000000',
  'x-ms-client-request-id',
  'd931fb85-3615-404b-8c7c-eb455431a9f8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:30 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758481107809193')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd50369e-c01a-0158-62f8-62d1d1000000',
  'x-ms-client-request-id',
  '1b9559b3-1c65-4b8f-953a-e452d95aa067',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:35 GMT',
  'Connection',
  'close' ]);

