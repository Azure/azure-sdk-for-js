import { ServiceClientOptions, ServiceClient, ApiKeyCredentials, signingPolicy, WebResource, getDefaultUserAgentValue } from "@azure/core-http";
import { InkPointUnit, InkStroke, ApplicationKind, ServiceVersion } from './BaseType';
import { InkRecognitionError } from './InkRecognitionError';
import { InkRecognitionResult } from './InkRecognitionResult';
import { parseInkRecognitionResult } from './InkRecognitionUnitBuilder';

const packageName = "@azure/inkrecognizer";
const packageVersion = "0.1.0";

/**
 * Default options for the request sent to the InkRecognizer service.
 * @param version - InkRecognizer Service API version to use.
 * @param applicationType - The domain of the application (Writing or Drawing. The default is "Mixed").
 * @param language - IETF BCP 47 language code (for ex. en-US, en-GB, hi-IN etc.) for the strokes.
 * @param unit - The physical unit for the points in the stroke. The default is "Millimeter".
 * @param unitMultiple - A multiplier applied to the unit value to indicate the true unit being used.
 */
export interface InkRecognizerClientOptions extends ServiceClientOptions {
  version: ServiceVersion;
  applicationType: ApplicationKind;
  language: string;
  unit: InkPointUnit;
  unitMultiple: number;
}

/**
 * Per-request options to override the default options of the RecognizeInk request.
 * @param applicationType - The domain of the application (Writing or Drawing. The default is "Mixed").
 * @param language - IETF BCP 47 language code (for ex. en-US, en-GB, hi-IN etc.) for the strokes.
 * @param unit - The physical unit for the points in the stroke. The default is "Millimeter".
 * @param unitMultiple - A multiplier applied to the unit value to indicate the true unit being used.
 */
export interface RecognizeInkOptions {
  applicationType: ApplicationKind;
  language: string;
  unit: InkPointUnit;
  unitMultiple: number;
}

/**
 * The InkRecognizerClient communicates with the service using default
 * configuration settings or settings provided by the caller.
 */
export class InkRecognizerClient extends ServiceClient {
  // private readonly baseUri: string;
  private readonly url: string;
  private readonly credentials: ApiKeyCredentials;

  private readonly applicationType: ApplicationKind;
  private readonly language: string;
  private readonly version: ServiceVersion;
  private readonly unit: InkPointUnit;
  private readonly unitMultiple: number;

  /**
  * Initializes a new instance of the InkRecognizerClient class.
  * @param baseUri - The url of the InkRecognizer Service
  * @param credentials - Subscription credentials which uniquely identify client subscription.
  * @param [options] - The parameter options
  */
  constructor(baseUri: string,
    credentials: ApiKeyCredentials,
    options?: InkRecognizerClientOptions) {

    if (baseUri == undefined) {
      throw new Error("'url' is invalid.");
    }
    if (credentials === undefined) {
      throw new Error("'credentials' can not be empty.");
    }
    if (!options) {
      options = {} as InkRecognizerClientOptions;
      options.applicationType = ApplicationKind.Mixed;
      options.language = 'en-US';
      options.version = ServiceVersion.Preview_1_0_0;
      options.unit = InkPointUnit.Millimeter;
      options.unitMultiple = 1.0;
    }

    if(!options.userAgent) {
      const defaultUserAgent = getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    super(undefined, {
      requestPolicyFactories: (currentFactories) => {
        currentFactories.push(signingPolicy(credentials));
        return currentFactories;
      }
    });

    this.baseUri = baseUri;
    this.credentials = credentials;

    this.applicationType = options.applicationType || ApplicationKind.Mixed;
    this.language = options.language || 'en-US';
    this.version = options.version || ServiceVersion.Preview_1_0_0;
    this.unit = options.unit || InkPointUnit.Millimeter;
    this.unitMultiple = options.unitMultiple || 1.0;
    if (this.version === ServiceVersion.Preview_1_0_0) {
      const endpoint: string = "/inkrecognizer/v1.0-preview/recognize";
      this.url = this.baseUri + endpoint;
    }
    else {
      throw new Error("'options.ServiceVersion'(" + options.version + ") is invalid.");
    }
  }

  /**
   * ASynchronously sends data to the InkRecognizer service and generates a tree structure containing the model results.
   * @param strokes - The list of ink strokes to recognize.
   * @param [options]- Per-request options to override default configuration.
   * @returns InkRecognitionResult - The result containing the tree hierarchy.
  */
  public async recognizeInk(strokes: InkStroke[], options?: RecognizeInkOptions): Promise<InkRecognitionResult> {
    if (strokes.length === 0) {
      throw new Error("There are no strokes for recognize.");
    }

    if (!options) {
      options = {} as RecognizeInkOptions;
    }

    const body = {
      version: this.version,
      applicationType: options.applicationType || this.applicationType,
      language: options.language || this.language,
      unit: options.unit || this.unit,
      unitMultiple: options.unitMultiple || this.unitMultiple,
      strokes: strokes.map((stroke: InkStroke) => {
        return {
          id: stroke.id,
          kind: stroke.kind,
          points: stroke.points,
          language: stroke.language
        };
      })
    };

    let httpRequest = new WebResource();
    httpRequest.url = this.url;
    httpRequest.method = 'PUT';
    httpRequest.body = JSON.stringify(body);

    const r = await this.sendRequest(httpRequest);
    if (r.status === 200) {
      let result = {} as InkRecognitionResult;
      result = parseInkRecognitionResult(r.bodyAsText || "");
      result.status = r.status;
      result.responseText = r.bodyAsText || "";
      result.headers = r.headers;
      return result;
    }
    else {
      let error: InkRecognitionError = {} as InkRecognitionError;
      error.status = r.status;
      error.message = r.status.toString() + ": Recognition Failed.";
      error.response = r;
      throw error;
    }
  }
}