let nock = require('nock');

module.exports.hash = "e9055ad5397c8ec5665db9c18d047954";

module.exports.testInfo = {"uniqueName":{"container":"container158459899877900136","blob":"blob158459899902709938"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459899877900136')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:18 GMT',
  'ETag',
  '"0x8D7CBCE041EB7AC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3d66-b01e-0088-48b6-fd3fcb000000',
  'x-ms-client-request-id',
  '8b492f6a-109d-48a4-be7f-de83a7176c59',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 06:23:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459899877900136/blob158459899902709938', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:19 GMT',
  'ETag',
  '"0x8D7CBCE0444186F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3dc9-b01e-0088-18b6-fd3fcb000000',
  'x-ms-client-request-id',
  'e0308c97-cc85-4d30-866d-efc534a26504',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:19.1487599Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459899877900136/blob158459899902709938')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 19 Mar 2020 06:23:19 GMT',
  'ETag',
  '"0x8D7CBCE0468BE1D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '775e3e17-b01e-0088-5eb6-fd3fcb000000',
  'x-ms-client-request-id',
  '06319605-3027-420a-b74f-51dd7426d856',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T06:23:19.3899309Z',
  'Date',
  'Thu, 19 Mar 2020 06:23:19 GMT'
]);
