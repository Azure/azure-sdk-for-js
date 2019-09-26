let nock = require('nock');

module.exports.testInfo = {"share":"share156775324424707088"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775324424707088')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:44 GMT',
  'ETag',
  '"0x8D73297F012A82F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7b888867-701a-00eb-7580-648f71000000',
  'x-ms-client-request-id',
  '2174ef84-0d63-4705-8517-6b702d012b09',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775324424707088')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd78bc135-401a-0059-4e80-647000000000',
  'x-ms-client-request-id',
  '8c29900a-1c17-479d-8e85-0cf0b5c6a0e2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:48 GMT',
  'Connection',
  'close' ]);

