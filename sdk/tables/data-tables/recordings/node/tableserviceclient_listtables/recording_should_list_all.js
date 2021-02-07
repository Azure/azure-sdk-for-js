let nock = require('nock');

module.exports.hash = "4b076d8f6161397134080d30a0f0d436";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestnode0"},{"TableName":"ListTableTestnode1"},{"TableName":"ListTableTestnode10"},{"TableName":"ListTableTestnode11"},{"TableName":"ListTableTestnode12"},{"TableName":"ListTableTestnode13"},{"TableName":"ListTableTestnode14"},{"TableName":"ListTableTestnode15"},{"TableName":"ListTableTestnode16"},{"TableName":"ListTableTestnode17"},{"TableName":"ListTableTestnode18"},{"TableName":"ListTableTestnode19"},{"TableName":"ListTableTestnode2"},{"TableName":"ListTableTestnode3"},{"TableName":"ListTableTestnode4"},{"TableName":"ListTableTestnode5"},{"TableName":"ListTableTestnode6"},{"TableName":"ListTableTestnode7"},{"TableName":"ListTableTestnode8"},{"TableName":"ListTableTestnode9"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa8fa-2002-00b8-40dd-f8a3cb000000',
  'x-ms-client-request-id',
  '1cda9405-353c-4075-8c58-078bfeebb2a4',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 01 Feb 2021 20:58:59 GMT'
]);
