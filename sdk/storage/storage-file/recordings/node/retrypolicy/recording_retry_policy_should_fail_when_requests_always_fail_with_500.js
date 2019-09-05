let nock = require('nock');

module.exports.testInfo = {"share":"share156767543864001257"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767543864001257')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:58 GMT',
  'ETag',
  '"0x8D731E2C84CFB29"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e3ef5dee-001a-0005-3ccb-632558000000',
  'x-ms-client-request-id',
  '686c4d6f-bf61-4fe4-b3e1-0e12a90c5ecd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767543864001257')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bafdaec7-701a-00a6-72cb-63409d000000',
  'x-ms-client-request-id',
  'e8b6644d-0313-4e12-833c-4b504cfaea88',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:24:03 GMT',
  'Connection',
  'close' ]);

