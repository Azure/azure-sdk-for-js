import {
  BaseRequestPolicy,
  HttpOperationResponse,
  HttpPipelineLogLevel,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource
} from "@azure/ms-rest-js";

import { IRequestLogOptions } from "../LoggingPolicyFactory";
import { HTTPURLConnection, URLConstants } from "../utils/constants";
import { getURLParameter, setURLParameter } from "../utils/utils.common";

// Default values of IRetryOptions
const DEFAULT_REQUEST_LOG_OPTIONS: IRequestLogOptions = {
  logWarningIfTryOverThreshold: 3000
};

/**
 * LoggingPolicy is a policy used to log requests.
 *
 * @class LoggingPolicy
 * @extends {BaseRequestPolicy}
 */
export class LoggingPolicy extends BaseRequestPolicy {
  private tryCount: number = 0;
  private operationStartTime: Date = new Date();
  private requestStartTime: Date = new Date();

  private readonly loggingOptions: IRequestLogOptions;

  /**
   * Creates an instance of LoggingPolicy.
   * @param {RequestPolicy} nextPolicy
   * @param {RequestPolicyOptions} options
   * @param {IRequestLogOptions} [loggingOptions=DEFAULT_REQUEST_LOG_OPTIONS]
   * @memberof LoggingPolicy
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    loggingOptions: IRequestLogOptions = DEFAULT_REQUEST_LOG_OPTIONS
  ) {
    super(nextPolicy, options);
    this.loggingOptions = loggingOptions;
  }

  /**
   * Sends out request.
   *
   * @param {WebResource} request
   * @returns {Promise<HttpOperationResponse>}
   * @memberof LoggingPolicy
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    this.tryCount++;
    this.requestStartTime = new Date();
    if (this.tryCount === 1) {
      this.operationStartTime = this.requestStartTime;
    }

    let safeURL: string = request.url;
    if (getURLParameter(safeURL, URLConstants.Parameters.SIGNATURE)) {
      safeURL = setURLParameter(safeURL, URLConstants.Parameters.SIGNATURE, "*****");
    }
    this.log(
      HttpPipelineLogLevel.INFO,
      `'${safeURL}'==> OUTGOING REQUEST (Try number=${this.tryCount}).`
    );

    try {
      const response = await this._nextPolicy.sendRequest(request);

      const requestEndTime = new Date();
      const requestCompletionTime = requestEndTime.getTime() - this.requestStartTime.getTime();
      const operationDuration = requestEndTime.getTime() - this.operationStartTime.getTime();

      let currentLevel: HttpPipelineLogLevel = HttpPipelineLogLevel.INFO;
      let logMessage: string = "";
      if (this.shouldLog(HttpPipelineLogLevel.INFO)) {
        // Assume success and default to informational logging.
        logMessage = "Successfully Received Response. ";
      }

      // If the response took too long, we'll upgrade to warning.
      if (requestCompletionTime >= this.loggingOptions.logWarningIfTryOverThreshold) {
        // Log a warning if the try duration exceeded the specified threshold.
        if (this.shouldLog(HttpPipelineLogLevel.WARNING)) {
          currentLevel = HttpPipelineLogLevel.WARNING;
          logMessage = `SLOW OPERATION. Duration > ${
            this.loggingOptions.logWarningIfTryOverThreshold
          } ms. `;
        }
      }

      if (
        (response.status >= 400 &&
          response.status <= 499 &&
          (response.status !== HTTPURLConnection.HTTP_NOT_FOUND &&
            response.status !== HTTPURLConnection.HTTP_CONFLICT &&
            response.status !== HTTPURLConnection.HTTP_PRECON_FAILED &&
            response.status !== HTTPURLConnection.HTTP_RANGE_NOT_SATISFIABLE)) ||
        (response.status >= 500 && response.status <= 509)
      ) {
        const errorString = `REQUEST ERROR: HTTP request failed with status code: ${
          response.status
        }. `;
        logMessage = errorString;

        currentLevel = HttpPipelineLogLevel.ERROR;
      }

      const messageInfo = `Request try:${this.tryCount}, status:${
        response.status
      } request duration:${requestCompletionTime} ms, operation duration:${operationDuration} ms\n`;
      this.log(currentLevel, logMessage + messageInfo);

      return response;
    } catch (err) {
      this.log(
        HttpPipelineLogLevel.ERROR,
        `Unexpected failure attempting to make request. Error message: ${err.message}`
      );
      throw err;
    }
  }
}
