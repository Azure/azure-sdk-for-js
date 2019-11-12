let nock = require('nock');

module.exports.testInfo = {"share":"share156816844599800323"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816844599800323')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:46 GMT',
  'ETag',
  '"0x8D7365EA7A1B7AE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2515c870-701a-0036-6547-68cbae000000',
  'x-ms-client-request-id',
  'eba10dd6-dfcb-48d4-9917-ac5e2e298cd9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:45 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816844599800323')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '700efdc0-901a-001e-3a47-68bc11000000',
  'x-ms-client-request-id',
  '7be6189d-086b-4f01-bfa0-104f63d36ddc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:48 GMT' ]);

