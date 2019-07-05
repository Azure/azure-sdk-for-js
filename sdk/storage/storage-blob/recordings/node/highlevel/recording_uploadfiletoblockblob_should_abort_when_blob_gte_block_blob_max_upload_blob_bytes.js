let nock = require('nock');

module.exports.testInfo = {"container":"container156231870656400830","blob":"blob156231870683302536"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231870656400830')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:47 GMT',
  'ETag',
  '"0x8D7012A3455F4AF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00e6ded2-901e-012d-2413-33fb03000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231870656400830')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8aae0382-801e-0079-1813-3357dc000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:47 GMT',
  'Connection',
  'close' ]);

