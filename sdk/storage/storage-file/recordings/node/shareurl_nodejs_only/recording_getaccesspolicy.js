let nock = require('nock');

module.exports.testInfo = {"share":"share156775333127300042"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775333127300042')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:02:11 GMT',
  'ETag',
  '"0x8D7329823F07467"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2e9038b4-901a-0091-7a81-649231000000',
  'x-ms-client-request-id',
  '36f4f09f-2682-48fa-85e5-89717bac4880',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:02:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775333127300042')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '288b14ab-c01a-0105-3181-64db55000000',
  'x-ms-client-request-id',
  'b9a7c2a0-a624-4997-bfe1-f6fffe444789',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:02:11 GMT',
  'Connection',
  'close' ]);

