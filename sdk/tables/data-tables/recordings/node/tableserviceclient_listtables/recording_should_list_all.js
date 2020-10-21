let nock = require('nock');

module.exports.hash = "ee2b3279704277e7056367b78cab0329";

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
  'be3d7d0d-3002-000e-658b-9745f2000000',
  'x-ms-client-request-id',
  '5d32ff4c-0bb6-4c42-9de3-dbf3f51cc869',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 01 Oct 2020 00:38:38 GMT'
]);
