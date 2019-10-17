let nock = require('nock');

module.exports.testInfo = {"container":"container156944560781309591"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156944560781309591')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 25 Sep 2019 21:06:47 GMT',
  'ETag',
  '"0x8D741FC4712EEB5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1189b21b-701e-0039-67e5-7370d2000000',
  'x-ms-client-request-id',
  '92eeadc0-510b-453d-bc0b-eeea502ae595',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 25 Sep 2019 21:06:47 GMT' ]);

