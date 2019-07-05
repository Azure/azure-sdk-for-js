let nock = require('nock');

module.exports.testInfo = {"container":"container156231861096508914"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231861096508914')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:20:11 GMT',
  'ETag',
  '"0x8D70129FB5A5526"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3ff24ce6-f01e-00ba-6d12-33de9f000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231861096508914')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd8abc07-001e-0068-4412-3360c7000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:20:11 GMT',
  'Connection',
  'close' ]);

