let nock = require('nock');

module.exports.testInfo = {"now":"2019-08-15T08:37:37.997Z","tmr":"2019-08-15T08:37:37.997Z"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b71734cf-401e-006f-4a44-539642000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-sku-name',
  'Standard_RAGRS',
  'x-ms-account-kind',
  'StorageV2',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-sku-name,x-ms-account-kind,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 15 Aug 2019 08:33:39 GMT',
  'Connection',
  'close'
]);

