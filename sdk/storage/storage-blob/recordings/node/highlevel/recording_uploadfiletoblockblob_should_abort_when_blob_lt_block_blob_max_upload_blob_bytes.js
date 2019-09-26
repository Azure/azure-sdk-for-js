let nock = require('nock');

module.exports.testInfo = {"container":"container156776211515303255","blob":"blob156776211554908869"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776211515303255')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:35 GMT',
  'ETag',
  '"0x8D732AC978AE1EA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fec89a26-701e-012f-1995-640445000000',
  'x-ms-client-request-id',
  '5f5d971b-e70a-402a-aa6b-05b2c68557db',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776211515303255')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '837c31bb-701e-0052-3295-648b6b000000',
  'x-ms-client-request-id',
  'ac72a699-ed55-4d70-bb39-43d0dfa525e7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:34 GMT',
  'Connection',
  'close' ]);

