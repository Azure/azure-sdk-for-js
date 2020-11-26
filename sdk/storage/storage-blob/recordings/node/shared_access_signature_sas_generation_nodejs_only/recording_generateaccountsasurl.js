let nock = require('nock');

module.exports.hash = "724d80e3dc174b379a1824d257387cab";

module.exports.testInfo = {"uniqueName":{},"newDate":{"now":"2020-11-26T10:27:01.569Z","tmr":"2020-11-26T10:27:01.570Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cadef419-f01e-006a-1cde-c38dd5000000',
  'x-ms-client-request-id',
  '3f5b5fcd-13ab-4141-bcb7-6a5a6bde1356',
  'x-ms-version',
  '2020-02-10',
  'x-ms-sku-name',
  'Standard_RAGRS',
  'x-ms-account-kind',
  'StorageV2',
  'x-ms-is-hns-enabled',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-sku-name,x-ms-account-kind,x-ms-is-hns-enabled,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 26 Nov 2020 10:27:02 GMT'
]);
