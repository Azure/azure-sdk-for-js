let nock = require('nock');

module.exports.hash = "7b6ac5f1db4933b1d885196e1246e4f6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '96cd0067-d01e-0052-23ba-c72915000000',
  'x-ms-client-request-id',
  '67c75c73-1d27-4d95-935e-27f8861292e1',
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
  'Tue, 01 Dec 2020 08:15:48 GMT'
]);
