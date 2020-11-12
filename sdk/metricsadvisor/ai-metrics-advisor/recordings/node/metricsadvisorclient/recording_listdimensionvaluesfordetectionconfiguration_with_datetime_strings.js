let nock = require('nock');

module.exports.hash = "7c1cd8dcc6eeb10a141d7cc1a3f267bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5c54b62e-6be7-4d64-b085-60e9bd59fa79/anomalies/dimension/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","dimensionName":"city"})
  .reply(200, {"value":["Karachi","__SUM__","Los Angeles","Delhi","Manila","Seoul","Mumbai","Beijing","New York","Miami","Mexico City","Tianjin","Philadelphia","Osaka","Moscow","Santiago","Istanbul","Taipei","Madrid","Kolkata","Rio de Janeiro","Shenzhen","Belo Horizonte","Jakarta","Lahore","Dallas","Wuhan","Cairo","Hyderabad","Lima","Dhaka","Bogota","Shanghai","Paris","Bangkok","Houston","Buenos Aires","Kinshasa","London","Chennai","Bengaluru","Lagos","Tokyo","Sao Paulo","Chicago","Hong Kong","Chongqing","Guangzhou","Tehran","Boston","Ho Chi Minh City","Khartoum","Barcelona","Washington","Pune","Shenyang","Saint Petersburg","Toronto","Guadalajara","Singapore","Dongguan","Luanda","Baghdad","Haora"],"@nextLink":null}, [
  'Content-Length',
  '710',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '53e8d5b1-d5c9-483c-801e-6c05967479e4',
  'x-envoy-upstream-service-time',
  '274',
  'apim-request-id',
  '53e8d5b1-d5c9-483c-801e-6c05967479e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:39 GMT'
]);
