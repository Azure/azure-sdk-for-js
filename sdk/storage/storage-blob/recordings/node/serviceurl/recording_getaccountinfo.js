let nock = require('nock');

module.exports.testInfo = {}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b93b320c-f01e-00ca-6d95-64ab0a000000',
  'x-ms-client-request-id',
  '54e20fbb-e13a-4879-aa11-fe8bef00ff9f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-sku-name',
  'Standard_RAGRS',
  'x-ms-account-kind',
  'StorageV2',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-sku-name,x-ms-account-kind,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:27:50 GMT',
  'Connection',
  'close' ]);

