import { Sender } from "./sender";
import { ClientEntityContext } from "./clientEntityContext";
import { ServiceBusClientOptions, ServiceBusClient } from "./serviceBusClient";
import { TokenCredential, SendableMessageInfo } from ".";
import { isTokenCredential } from "@azure/core-amqp";
import { ClientType } from "./client";
import { generate_uuid } from "rhea-promise";

export class ServiceBusSenderClient {
  public _entityPath: string;
  private _clientEntityContext: ClientEntityContext;
  private _sbClient: ServiceBusClient;
  private _currentSender: Sender;

  /**
   * Creates a ServiceBusClient for the Service Bus Namespace represented in the given connection
   * string.
   * @param entityConnectionString - Connection string of the form
   * 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=new-queue'
   * @param options Options to control ways to interact with the
   * Service Bus Namespace.
   * @returns ServiceBusClient
   */
  constructor(entityConnectionString: string, options?: ServiceBusClientOptions);

  /**
   * Creates a ServiceBusClient for the Service Bus Namespace represented in the given connection
   * string.
   * @param serviceBusConnectionString - Connection string of the form
   * 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key'
   * @param options Options to control ways to interact with the
   * Service Bus Namespace.
   * @returns ServiceBusClient
   */
  constructor(
    serviceBusConnectionString: string,
    entityName: string,
    options?: ServiceBusClientOptions
  );

  /**
   * Instantiates a ServiceBusClient to interact with a Service Bus Namespace.
   *
   * @constructor
   * @param host - The host name for the Service Bus namespace. This is likely to be similar to
   * <yournamespace>.servicebus.windows.net
   * @param credential - credential that implements the TokenCredential interface.
   * @param options - Options to control ways to interact with the Service Bus
   * Namespace.
   */
  constructor(
    host: string,
    entityName: string,
    credential: TokenCredential,
    options?: ServiceBusClientOptions
  );

  constructor(
    hostOrConnectionString: string,
    entityNameOrOptions?: string | ServiceBusClientOptions,
    credentialOrServiceBusClientOptions?: TokenCredential | ServiceBusClientOptions,
    options?: ServiceBusClientOptions
  ) {
    if (typeof entityNameOrOptions !== "string") {
      // (entityConnectionString: string, options?: ServiceBusClientOptions)
      const entityConnectionString = hostOrConnectionString;
      const options = entityNameOrOptions;
      // get the entity name from the connection string
      const entityPathMatch = entityConnectionString.match(/^.+EntityPath=(.+?);{0,1}$/);

      if (entityPathMatch!.length !== 2) {
        throw new Error("Invalid entity connection string - no EntityPath");
      } else {
        this._entityPath = String(entityPathMatch![0]);
      }

      this._sbClient = new ServiceBusClient(entityConnectionString, options);
    } else if (!isTokenCredential(credentialOrServiceBusClientOptions)) {
      // (serviceBusConnectionString: string, entityName: string, options?: ServiceBusClientOptions)
      this._sbClient = new ServiceBusClient(hostOrConnectionString, options);
      this._entityPath = String(entityNameOrOptions);
    } else {
      // (host: string, entityName: string, credential: TokenCredential, options?: ServiceBusClientOptions)
      const entityName = entityNameOrOptions;
      this._sbClient = new ServiceBusClient(
        hostOrConnectionString,
        credentialOrServiceBusClientOptions,
        options
      );
      this._entityPath = String(entityName);
    }
    this._clientEntityContext = ClientEntityContext.create(
      this._entityPath,
      ClientType.ServiceBusSenderClient,
      this._sbClient._context,
      `${this._entityPath}/${generate_uuid()}`
    );
    this._currentSender = new Sender(this._clientEntityContext);
  }

  async send(message: SendableMessageInfo): Promise<void> {
    return this._currentSender.send(message);
  }

  async sendBatch(messages: SendableMessageInfo[]): Promise<void> {
    return this._currentSender.sendBatch(messages);
  }

  async scheduleMessage(
    scheduledEnqueueTimeUtc: Date,
    message: SendableMessageInfo
  ): Promise<Long> {
    return this._currentSender.scheduleMessage(scheduledEnqueueTimeUtc, message);
  }

  async scheduleMessages(
    scheduledEnqueueTimeUtc: Date,
    messages: SendableMessageInfo[]
  ): Promise<Long[]> {
    return this._currentSender.scheduleMessages(scheduledEnqueueTimeUtc, messages);
  }

  async cancelScheduledMessage(sequenceNumber: Long): Promise<void> {
    return this._currentSender.cancelScheduledMessage(sequenceNumber);
  }

  async cancelScheduledMessages(sequenceNumbers: Long[]): Promise<void> {
    return this._currentSender.cancelScheduledMessages(sequenceNumbers);
  }

  async close(): Promise<void> {
    await this._currentSender.close();
    await this._clientEntityContext.close();
    await this._sbClient.close();
  }
}
