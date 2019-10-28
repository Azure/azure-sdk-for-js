let nock = require('nock');

module.exports.testInfo = {"share":"share156816845921900788"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816845921900788')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:59 GMT',
  'ETag',
  '"0x8D7365EAF80E231"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf4679f2-501a-0047-2847-68b997000000',
  'x-ms-client-request-id',
  '11f5fa80-1c5e-47a9-b327-7aca9a8ad17f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:59 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816845921900788')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53eb1887-501a-0021-4b47-680bcd000000',
  'x-ms-client-request-id',
  'b29ffc13-3e96-40fd-b568-7fdc8691c824',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:59 GMT' ]);

