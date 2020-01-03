let nock = require('nock');

module.exports.testInfo = {"container":"container157022490217600654"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157022490217600654')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 04 Oct 2019 21:35:02 GMT',
  'ETag',
  '"0x8D74912B7119B76"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c0a0790-101e-004b-61fb-7a5766000000',
  'x-ms-client-request-id',
  'f7d7c307-aa6e-4332-91d8-2d8196077302',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 21:35:01 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157022490217600654')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd7ac2da5-d01e-003b-41fb-7a24a2000000',
  'x-ms-client-request-id',
  'b97fef63-2d33-4e7f-b0f8-dd90f8e48262',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 21:35:02 GMT' ]);

