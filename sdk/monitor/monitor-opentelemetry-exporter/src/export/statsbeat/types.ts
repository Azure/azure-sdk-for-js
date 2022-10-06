export class NetworkStatsbeat {
  public time: number|undefined;

  public lastTime: number;

  public endpoint: string;

  public host: string;

  public totalRequestCount: number;

  public lastRequestCount: number;

  public totalSuccesfulRequestCount: number;

  public totalFailedRequestCount: { statusCode: number, count: number }[];

  public retryCount: { statusCode: number, count: number }[];

  public exceptionCount: { exceptionType: string, count: number }[];

  public throttleCount: { statusCode: number, count: number }[];

  public intervalRequestExecutionTime: number;

  public lastIntervalRequestExecutionTime: number;

  public averageRequestExecutionTime: number;

  constructor(endpoint: string, host: string) {
      this.endpoint = endpoint;
      this.host = host;
      this.totalRequestCount = 0;
      this.totalSuccesfulRequestCount = 0;
      this.totalFailedRequestCount = [];
      this.retryCount = [];
      this.exceptionCount = [];
      this.throttleCount = [];
      this.intervalRequestExecutionTime = 0;
      this.lastIntervalRequestExecutionTime = 0;
      this.lastTime = +new Date();
      this.lastRequestCount = 0;
      this.averageRequestExecutionTime = 0;
  }
}
