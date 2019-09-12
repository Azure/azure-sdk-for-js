let nock = require('nock');

module.exports.testInfo = {"container":"container156776184651004963"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776184651004963')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:24:07 GMT',
  'ETag',
  '"0x8D732ABF78AE048"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73aacfc9-101e-0129-3694-6437fa000000',
  'x-ms-client-request-id',
  'c96ecdb0-f3ba-45ce-a0b0-d56f3040eac9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:24:07 GMT',
  'Connection',
  'close' ]);

