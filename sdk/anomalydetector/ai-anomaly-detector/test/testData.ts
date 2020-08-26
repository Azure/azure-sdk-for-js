import {
  TimeGranularity,
  DetectRequest,
  DetectChangePointRequest,
  DetectEntireResponse
} from "../src";

const granularity: TimeGranularity = TimeGranularity.monthly;

export const testTrendPointseries: DetectChangePointRequest = {
  series: [
    {
      value: 116168307,
      timestamp: new Date("2019-01-01T00:00:00Z")
    },
    {
      value: 116195090,
      timestamp: new Date("2019-01-02T00:00:00Z")
    },
    {
      value: 116219292,
      timestamp: new Date("2019-01-03T00:00:00Z")
    },
    {
      value: 116218498,
      timestamp: new Date("2019-01-04T00:00:00Z")
    },
    {
      value: 116217643,
      timestamp: new Date("2019-01-05T00:00:00Z")
    },
    {
      value: 116234219,
      timestamp: new Date("2019-01-06T00:00:00Z")
    },
    {
      value: 116291400,
      timestamp: new Date("2019-01-07T00:00:00Z")
    },
    {
      value: 116326509,
      timestamp: new Date("2019-01-08T00:00:00Z")
    },
    {
      value: 116323167,
      timestamp: new Date("2019-01-09T00:00:00Z")
    },
    {
      value: 116360790,
      timestamp: new Date("2019-01-10T00:00:00Z")
    },
    {
      value: 116367491,
      timestamp: new Date("2019-01-11T00:00:00Z")
    },
    {
      value: 116371082,
      timestamp: new Date("2019-01-12T00:00:00Z")
    },
    {
      value: 116380405,
      timestamp: new Date("2019-01-13T00:00:00Z")
    },
    {
      value: 116393919,
      timestamp: new Date("2019-01-14T00:00:00Z")
    },
    {
      value: 116443750,
      timestamp: new Date("2019-01-15T00:00:00Z")
    },
    {
      value: 116467267,
      timestamp: new Date("2019-01-16T00:00:00Z")
    },
    {
      value: 116497910,
      timestamp: new Date("2019-01-17T00:00:00Z")
    },
    {
      value: 116499861,
      timestamp: new Date("2019-01-18T00:00:00Z")
    },
    {
      value: 116500538,
      timestamp: new Date("2019-01-19T00:00:00Z")
    },
    {
      value: 116532052,
      timestamp: new Date("2019-01-20T00:00:00Z")
    },
    {
      value: 116559282,
      timestamp: new Date("2019-01-21T00:00:00Z")
    },
    {
      value: 116597249,
      timestamp: new Date("2019-01-22T00:00:00Z")
    },
    {
      value: 118036892,
      timestamp: new Date("2019-01-23T00:00:00Z")
    },
    {
      value: 118090207,
      timestamp: new Date("2019-01-24T00:00:00Z")
    },
    {
      value: 118105517,
      timestamp: new Date("2019-01-25T00:00:00Z")
    },
    {
      value: 118107624,
      timestamp: new Date("2019-01-26T00:00:00Z")
    },
    {
      value: 118138073,
      timestamp: new Date("2019-01-27T00:00:00Z")
    },
    {
      value: 118164752,
      timestamp: new Date("2019-01-28T00:00:00Z")
    },
    {
      value: 118150854,
      timestamp: new Date("2019-01-29T00:00:00Z")
    },
    {
      value: 118168111,
      timestamp: new Date("2019-01-30T00:00:00Z")
    },
    {
      value: 118281715,
      timestamp: new Date("2019-01-31T00:00:00Z")
    },
    {
      value: 118255480,
      timestamp: new Date("2019-02-01T00:00:00Z")
    },
    {
      value: 118256700,
      timestamp: new Date("2019-02-02T00:00:00Z")
    },
    {
      value: 118256692,
      timestamp: new Date("2019-02-03T00:00:00Z")
    },
    {
      value: 118261555,
      timestamp: new Date("2019-02-04T00:00:00Z")
    },
    {
      value: 118271556,
      timestamp: new Date("2019-02-05T00:00:00Z")
    },
    {
      value: 118304847,
      timestamp: new Date("2019-02-06T00:00:00Z")
    },
    {
      value: 119575122,
      timestamp: new Date("2019-02-07T00:00:00Z")
    },
    {
      value: 119575288,
      timestamp: new Date("2019-02-08T00:00:00Z")
    },
    {
      value: 119577225,
      timestamp: new Date("2019-02-09T00:00:00Z")
    },
    {
      value: 119687273,
      timestamp: new Date("2019-02-10T00:00:00Z")
    },
    {
      value: 119696443,
      timestamp: new Date("2019-02-11T00:00:00Z")
    },
    {
      value: 119708919,
      timestamp: new Date("2019-02-12T00:00:00Z")
    },
    {
      value: 119742399,
      timestamp: new Date("2019-02-13T00:00:00Z")
    },
    {
      value: 119783758,
      timestamp: new Date("2019-02-14T00:00:00Z")
    },
    {
      value: 119778552,
      timestamp: new Date("2019-02-15T00:00:00Z")
    },
    {
      value: 119777165,
      timestamp: new Date("2019-02-16T00:00:00Z")
    },
    {
      value: 119839611,
      timestamp: new Date("2019-02-17T00:00:00Z")
    },
    {
      value: 118478044,
      timestamp: new Date("2019-02-18T00:00:00Z")
    },
    {
      value: 118510659,
      timestamp: new Date("2019-02-19T00:00:00Z")
    },
    {
      value: 118536890,
      timestamp: new Date("2019-02-20T00:00:00Z")
    },
    {
      value: 120377808,
      timestamp: new Date("2019-02-21T00:00:00Z")
    },
    {
      value: 120379137,
      timestamp: new Date("2019-02-22T00:00:00Z")
    },
    {
      value: 120380093,
      timestamp: new Date("2019-02-23T00:00:00Z")
    },
    {
      value: 120409909,
      timestamp: new Date("2019-02-24T00:00:00Z")
    },
    {
      value: 120481097,
      timestamp: new Date("2019-02-25T00:00:00Z")
    },
    {
      value: 120525030,
      timestamp: new Date("2019-02-26T00:00:00Z")
    },
    {
      value: 120554993,
      timestamp: new Date("2019-02-27T00:00:00Z")
    },
    {
      value: 120396587,
      timestamp: new Date("2019-02-28T00:00:00Z")
    },
    {
      value: 120389070,
      timestamp: new Date("2019-03-01T00:00:00Z")
    }
  ],
  granularity: TimeGranularity.daily,
  customInterval: 1,
  stableTrendWindow: 5,
  threshold: 0.9,
  period: 0
};

export const testPointSeries1: DetectRequest = {
  series: [
    {
      timestamp: new Date("1972-01-01T00:00:00Z"),
      value: 826
    },
    {
      timestamp: new Date("1972-02-01T00:00:00Z"),
      value: 799
    },
    {
      timestamp: new Date("1972-03-01T00:00:00Z"),
      value: 890
    },
    {
      timestamp: new Date("1972-04-01T00:00:00Z"),
      value: 900
    },
    {
      timestamp: new Date("1972-05-01T00:00:00Z"),
      value: 961
    },
    {
      timestamp: new Date("1972-06-01T00:00:00Z"),
      value: 935
    },
    {
      timestamp: new Date("1972-07-01T00:00:00Z"),
      value: 894
    },
    {
      timestamp: new Date("1972-08-01T00:00:00Z"),
      value: 855
    },
    {
      timestamp: new Date("1972-09-01T00:00:00Z"),
      value: 809
    },
    {
      timestamp: new Date("1972-10-01T00:00:00Z"),
      value: 810
    },
    {
      timestamp: new Date("1972-11-01T00:00:00Z"),
      value: 766
    },
    {
      timestamp: new Date("1972-12-01T00:00:00Z"),
      value: 805
    },
    {
      timestamp: new Date("1973-01-01T00:00:00Z"),
      value: 821
    },
    {
      timestamp: new Date("1973-02-01T00:00:00Z"),
      value: 773
    },
    {
      timestamp: new Date("1973-03-01T00:00:00Z"),
      value: 883
    },
    {
      timestamp: new Date("1973-04-01T00:00:00Z"),
      value: 898
    },
    {
      timestamp: new Date("1973-05-01T00:00:00Z"),
      value: 957
    },
    {
      timestamp: new Date("1973-06-01T00:00:00Z"),
      value: 924
    },
    {
      timestamp: new Date("1973-07-01T00:00:00Z"),
      value: 881
    },
    {
      timestamp: new Date("1973-08-01T00:00:00Z"),
      value: 837
    },
    {
      timestamp: new Date("1973-09-01T00:00:00Z"),
      value: 784
    },
    {
      timestamp: new Date("1973-10-01T00:00:00Z"),
      value: 791
    },
    {
      timestamp: new Date("1973-11-01T00:00:00Z"),
      value: 760
    },
    {
      timestamp: new Date("1973-12-01T00:00:00Z"),
      value: 802
    },
    {
      timestamp: new Date("1974-01-01T00:00:00Z"),
      value: 828
    },
    {
      timestamp: new Date("1974-02-01T00:00:00Z"),
      value: 1030
    },
    {
      timestamp: new Date("1974-03-01T00:00:00Z"),
      value: 889
    },
    {
      timestamp: new Date("1974-04-01T00:00:00Z"),
      value: 902
    },
    {
      timestamp: new Date("1974-05-01T00:00:00Z"),
      value: 969
    },
    {
      timestamp: new Date("1974-06-01T00:00:00Z"),
      value: 947
    },
    {
      timestamp: new Date("1974-07-01T00:00:00Z"),
      value: 908
    },
    {
      timestamp: new Date("1974-08-01T00:00:00Z"),
      value: 867
    },
    {
      timestamp: new Date("1974-09-01T00:00:00Z"),
      value: 815
    },
    {
      timestamp: new Date("1974-10-01T00:00:00Z"),
      value: 812
    },
    {
      timestamp: new Date("1974-11-01T00:00:00Z"),
      value: 773
    },
    {
      timestamp: new Date("1974-12-01T00:00:00Z"),
      value: 813
    },
    {
      timestamp: new Date("1975-01-01T00:00:00Z"),
      value: 834
    },
    {
      timestamp: new Date("1975-02-01T00:00:00Z"),
      value: 782
    },
    {
      timestamp: new Date("1975-03-01T00:00:00Z"),
      value: 892
    },
    {
      timestamp: new Date("1975-04-01T00:00:00Z"),
      value: 903
    },
    {
      timestamp: new Date("1975-05-01T00:00:00Z"),
      value: 966
    },
    {
      timestamp: new Date("1975-06-01T00:00:00Z"),
      value: 937
    },
    {
      timestamp: new Date("1975-07-01T00:00:00Z"),
      value: 896
    },
    {
      timestamp: new Date("1975-08-01T00:00:00Z"),
      value: 858
    },
    {
      timestamp: new Date("1975-09-01T00:00:00Z"),
      value: 817
    },
    {
      timestamp: new Date("1975-10-01T00:00:00Z"),
      value: 827
    },
    {
      timestamp: new Date("1975-11-01T00:00:00Z"),
      value: 797
    },
    {
      timestamp: new Date("1975-12-01T00:00:00Z"),
      value: 843
    }
  ],
  maxAnomalyRatio: 0.25,
  sensitivity: 95,
  granularity
};

export const expectedEntireResult: DetectEntireResponse = {
  period: 12,
  expectedValues: [
    827.7940908243968,
    798.9133774671927,
    888.6058431807189,
    900.5606407986661,
    962.8389426378304,
    933.2591606306954,
    891.0784104799666,
    856.1781601363697,
    809.8987227908941,
    807.375129007505,
    764.3196682448518,
    803.933498594564,
    823.5900620883058,
    794.0905641334288,
    883.164245249282,
    894.8419000690953,
    956.8430591101258,
    927.6285055190114,
    885.812983784303,
    851.7622285698933,
    806.3322863536049,
    804.8024303608446,
    762.74070738882,
    804.0251702513732,
    825.3523662579559,
    798.0404188724976,
    889.3016505577698,
    902.4226124345937,
    965.867078532635,
    937.2113627931791,
    895.9546789101294,
    862.0087368413656,
    816.4662342097423,
    814.4297745524709,
    771.8614479159354,
    811.859271346729,
    831.8998279215521,
    802.947544797165,
    892.5684407435083,
    904.5488214533809,
    966.8527063844707,
    937.3168391003043,
    895.180003672544,
    860.3649596356635,
    814.1707285969043,
    812.0830500344802,
    769.4635044927919,
    809.7433654589817
  ],
  upperMargins: [
    41.389704541219885,
    39.94566887335964,
    44.43029215903596,
    45.02803203993335,
    48.14194713189147,
    46.6629580315348,
    44.553920523998386,
    42.808908006818456,
    40.494936139544734,
    40.36875645037526,
    38.21598341224262,
    40.19667492972815,
    41.17950310441529,
    39.7045282066714,
    44.158212262464076,
    44.74209500345478,
    47.84215295550632,
    46.38142527595062,
    44.29064918921517,
    42.5881114284947,
    40.316614317680205,
    40.2401215180422,
    38.13703536944104,
    40.20125851256864,
    41.26761831289775,
    39.90202094362485,
    44.46508252788851,
    45.12113062172966,
    48.29335392663177,
    46.860568139658994,
    44.79773394550648,
    43.100436842068234,
    40.82331171048713,
    40.72148872762352,
    38.59307239579675,
    40.59296356733648,
    41.5949913960776,
    40.1473772398582,
    44.62842203717537,
    45.22744107266908,
    48.34263531922352,
    46.865841955015185,
    44.75900018362722,
    43.018247981783134,
    40.70853642984525,
    40.604152501724,
    38.47317522463959,
    40.487168272949134
  ],
  lowerMargins: [
    41.389704541219885,
    38.91337746719273,
    44.43029215903596,
    45.02803203993335,
    48.14194713189147,
    46.6629580315348,
    44.553920523998386,
    42.808908006818456,
    40.494936139544734,
    40.36875645037526,
    4.319668244851755,
    40.19667492972815,
    41.17950310441529,
    34.09056413342876,
    44.158212262464076,
    44.74209500345478,
    47.84215295550632,
    46.38142527595062,
    44.29064918921517,
    42.5881114284947,
    40.316614317680205,
    40.2401215180422,
    2.7407073888200557,
    40.20125851256864,
    41.26761831289775,
    38.04041887249764,
    44.46508252788851,
    45.12113062172966,
    48.29335392663177,
    46.860568139658994,
    44.79773394550648,
    43.100436842068234,
    40.82331171048713,
    40.72148872762352,
    11.8614479159354,
    40.59296356733648,
    41.5949913960776,
    40.1473772398582,
    44.62842203717537,
    45.22744107266908,
    48.34263531922352,
    46.865841955015185,
    44.75900018362722,
    43.018247981783134,
    40.70853642984525,
    40.604152501724,
    9.463504492791913,
    40.487168272949134
  ],
  isAnomaly: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  isNegativeAnomaly: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  isPositiveAnomaly: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]
};

export const changeExpectedResult = {
  confidenceScores: [
    0,
    0,
    0.00009806187783712612,
    0.0018271196069196654,
    0.0024024970102579477,
    0.0006698841513963548,
    0.005241021191331318,
    0.005608371938773833,
    0.0002582967339394681,
    0.0028641957214850305,
    0.0002086271545768578,
    0.002872596645212033,
    0.0038254365621415275,
    0.0037871087975867787,
    0.002551692781278267,
    0.0027955815016857282,
    0.004242681998535293,
    0.0001668205733865953,
    0.0033500664222602655,
    0.0004736963490890601,
    0.0010909427701578363,
    0.004416975679466235,
    0.32811393206802303,
    3.3969062736306306e-15,
    0.0014439526026382404,
    0.0026356798731345843,
    0.00035229328015416554,
    0.0003425625371149456,
    0.004252803662202245,
    0.0026723666415576523,
    0.012036583222745787,
    0.0005797791524039205,
    0.002973159734214522,
    0.00563771188428345,
    0.006702942334305688,
    0.006560331486165724,
    0.0023713364333307675,
    0.28312612517142904,
    3.3969062736306306e-15,
    0.00006728693748691668,
    0.007474321161820017,
    0.0007402854911511248,
    0.0021427717111760516,
    0.0010456722259841228,
    0.0006710836684717039,
    0.004880561063393699,
    0.007855787427509102,
    0.00015617505084218866,
    0.2230962081216851,
    3.3969062736306306e-15,
    0.00024255212249743938,
    0.11668400494338521,
    6.793812547261261e-15,
    0.00001417167005500969,
    0.0019566935039425576,
    0.006387099509751275,
    0.005234041196039462,
    0.002723346117248103,
    0.02386583326609911,
    0.01847725899081154
  ],
  isChangePoint: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  period: 0
};
