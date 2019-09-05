let nock = require('nock');

module.exports.testInfo = {"share":"share156767543581405324"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767543581405324')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:56 GMT',
  'ETag',
  '"0x8D731E2C69D0419"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bfa5746-701a-00fb-14cb-634a19000000',
  'x-ms-client-request-id',
  'c7de6516-3ca7-4767-87b1-16c14780736f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:55 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767543581405324')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a0184dce-501a-0055-0ccb-63e708000000',
  'x-ms-client-request-id',
  '60151e12-f0bb-4f05-89e4-72b2b53ad6e5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:57 GMT',
  'Connection',
  'close' ]);

