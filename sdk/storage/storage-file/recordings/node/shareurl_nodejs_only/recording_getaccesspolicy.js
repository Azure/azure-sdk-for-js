let nock = require('nock');

module.exports.testInfo = {"share":"share156767552153502895"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767552153502895')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:25:21 GMT',
  'ETag',
  '"0x8D731E2F9B43ED0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '71d76b36-701a-006d-0bcb-6343c8000000',
  'x-ms-client-request-id',
  'da453250-c0ee-4ec0-9597-93ba7325c715',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:25:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767552153502895')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0032db90-801a-00c0-0ecb-630fbd000000',
  'x-ms-client-request-id',
  '5a4dc574-2a47-4712-85a1-5d2b7eebb8d2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:25:21 GMT',
  'Connection',
  'close' ]);

