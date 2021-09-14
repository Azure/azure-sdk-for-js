let nock = require('nock');

module.exports.hash = "52a8332831af807d4edad5bb4843c3eb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"CreateSimpleEntityBatchPerf"},{"TableName":"createTableNew"},{"TableName":"createTableNew2"},{"TableName":"createTableOld"},{"TableName":"ListTableTestSASConnectionStringnode0"},{"TableName":"ListTableTestSASConnectionStringnode1"},{"TableName":"ListTableTestSASConnectionStringnode10"},{"TableName":"ListTableTestSASConnectionStringnode11"},{"TableName":"ListTableTestSASConnectionStringnode12"},{"TableName":"ListTableTestSASConnectionStringnode13"},{"TableName":"ListTableTestSASConnectionStringnode14"},{"TableName":"ListTableTestSASConnectionStringnode15"},{"TableName":"ListTableTestSASConnectionStringnode16"},{"TableName":"ListTableTestSASConnectionStringnode17"},{"TableName":"ListTableTestSASConnectionStringnode18"},{"TableName":"ListTableTestSASConnectionStringnode19"},{"TableName":"ListTableTestSASConnectionStringnode2"},{"TableName":"ListTableTestSASConnectionStringnode3"},{"TableName":"ListTableTestSASConnectionStringnode4"},{"TableName":"ListTableTestSASConnectionStringnode5"},{"TableName":"ListTableTestSASConnectionStringnode6"},{"TableName":"ListTableTestSASConnectionStringnode7"},{"TableName":"ListTableTestSASConnectionStringnode8"},{"TableName":"ListTableTestSASConnectionStringnode9"},{"TableName":"TestChars"},{"TableName":"TestChars2"},{"TableName":"TestChars3"},{"TableName":"testTable"},{"TableName":"TestTestTest"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced2b8a-0002-0039-4aae-a9c11b000000',
  'x-ms-client-request-id',
  '34f0830c-cc16-4a37-b325-c8663ef5b64e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:11 GMT'
]);
