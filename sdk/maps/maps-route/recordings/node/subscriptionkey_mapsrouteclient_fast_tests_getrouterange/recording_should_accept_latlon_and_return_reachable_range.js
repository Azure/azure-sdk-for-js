let nock = require('nock');

module.exports.hash = "e6a5ce799eeee9ea80058fc5d653c55e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/range/json')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","reachableRange":{"center":{"latitude":50.97452,"longitude":5.86605},"boundary":[{"latitude":52.03715,"longitude":5.73477},{"latitude":52.05073,"longitude":5.67691},{"latitude":52.03153,"longitude":5.59823},{"latitude":51.94693,"longitude":5.377},{"latitude":52.11651,"longitude":5.1469},{"latitude":52.07936,"longitude":4.99724},{"latitude":52.00064,"longitude":5.01301},{"latitude":51.82168,"longitude":4.82726},{"latitude":51.7694,"longitude":4.64843},{"latitude":51.65688,"longitude":4.57573},{"latitude":51.52962,"longitude":4.44082},{"latitude":51.41012,"longitude":4.28201},{"latitude":50.92411,"longitude":4.02261},{"latitude":50.88799,"longitude":4.13681},{"latitude":50.55808,"longitude":4.1346},{"latitude":50.49163,"longitude":3.98586},{"latitude":50.33119,"longitude":4.4756},{"latitude":50.26405,"longitude":4.61686},{"latitude":50.24469,"longitude":4.89991},{"latitude":50.08232,"longitude":5.07133},{"latitude":50.00741,"longitude":5.21825},{"latitude":49.8863,"longitude":5.38002},{"latitude":49.78034,"longitude":5.53919},{"latitude":49.86207,"longitude":5.72069},{"latitude":49.83205,"longitude":5.74274},{"latitude":50.05247,"longitude":5.91182},{"latitude":50.02737,"longitude":6.0894},{"latitude":50.04983,"longitude":6.09715},{"latitude":50.08942,"longitude":6.2758},{"latitude":50.07496,"longitude":6.42298},{"latitude":50.00492,"longitude":6.6107},{"latitude":49.9908,"longitude":6.78183},{"latitude":50.31714,"longitude":6.62736},{"latitude":50.36904,"longitude":6.79277},{"latitude":50.31662,"longitude":7.31737},{"latitude":50.36466,"longitude":7.58792},{"latitude":50.52278,"longitude":7.6439},{"latitude":50.99622,"longitude":7.84859},{"latitude":51.19797,"longitude":7.41418},{"latitude":51.36876,"longitude":7.45892},{"latitude":51.42659,"longitude":7.54433},{"latitude":51.59279,"longitude":7.23798},{"latitude":51.70242,"longitude":7.14382},{"latitude":51.68029,"longitude":6.8068},{"latitude":51.79378,"longitude":6.57752},{"latitude":51.80435,"longitude":6.48029},{"latitude":51.84846,"longitude":6.24024},{"latitude":51.84243,"longitude":6.21931},{"latitude":51.97178,"longitude":5.99319},{"latitude":52.09529,"longitude":5.95075}]}}, [
  'Cache-Control',
  'no-transform, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '2195',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 7F99339176C641F88895813EC3BD4ED3 Ref B: TPE30EDGE0411 Ref C: 2022-03-15T05:37:08Z',
  'Date',
  'Tue, 15 Mar 2022 05:37:09 GMT'
]);
