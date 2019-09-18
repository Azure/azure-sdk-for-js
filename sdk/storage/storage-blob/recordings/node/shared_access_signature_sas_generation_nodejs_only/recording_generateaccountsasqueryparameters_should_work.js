let nock = require('nock');

module.exports.testInfo = {"now":"2019-09-06T09:29:05.639Z","tmr":"2019-09-06T09:29:05.639Z"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddb80cf1-b01e-0072-6595-64f0cc000000',
  'x-ms-client-request-id',
  '23cce20e-5d11-4ddb-a11a-4dce9ea4902e',
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
  'Fri, 06 Sep 2019 09:29:05 GMT',
  'Connection',
  'close' ]);

