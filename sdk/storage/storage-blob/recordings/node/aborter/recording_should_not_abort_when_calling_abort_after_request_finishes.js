let nock = require('nock');

module.exports.testInfo = {"container":"container156944560822200795"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156944560822200795')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 25 Sep 2019 21:06:48 GMT',
  'ETag',
  '"0x8D741FC4756A33A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c91db945-301e-009f-17e5-7348cc000000',
  'x-ms-client-request-id',
  'f8a38b0b-2eb1-4cf3-bd43-aba8d7fb3217',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 25 Sep 2019 21:06:47 GMT' ]);

