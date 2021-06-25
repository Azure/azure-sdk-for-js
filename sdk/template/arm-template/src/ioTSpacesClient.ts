import * as coreAuth from "@azure/core-auth";
import { IoTSpacesImpl, OperationsImpl } from "./operations";
import { IoTSpaces, Operations } from "./operationsInterfaces";
import { IoTSpacesClientContext } from "./ioTSpacesClientContext";
import { IoTSpacesClientOptionalParams } from "./models";

export class IoTSpacesClient extends IoTSpacesClientContext {
  /**
   * Initializes a new instance of the IoTSpacesClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId The subscription identifier.
   * @param options The parameter options
   */
  constructor(
    credentials: coreAuth.TokenCredential,
    subscriptionId: string,
    options?: IoTSpacesClientOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.ioTSpaces = new IoTSpacesImpl(this);
    this.operations = new OperationsImpl(this);
  }

  ioTSpaces: IoTSpaces;
  operations: Operations;
}
