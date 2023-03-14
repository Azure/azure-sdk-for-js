// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

interface WorkerLocation {
  readonly hash: string;
  readonly host: string;
  readonly hostname: string;
  readonly href: string;
  readonly origin: string;
  readonly pathname: string;
  readonly port: string;
  readonly protocol: string;
  readonly search: string;
  toString(): string;
}

export interface Client {
  readonly id: string;
  readonly type: ClientTypes;
  readonly url: string;
  postMessage(message: any, transfer?: Transferable[]): void;
}

export interface WindowClient extends Client {
  readonly focused: boolean;
  readonly visibilityState: DocumentVisibilityState;
  focus(): Promise<WindowClient>;
  navigate(url: string): Promise<WindowClient>;
}

export interface Clients {
  claim(): Promise<void>;
  get(id: string): Promise<any>;
  matchAll(options?: ClientQueryOptions): Promise<Client[]>;
  openWindow(url: string): Promise<WindowClient | null>;
}

export interface ServiceWorkerGlobalScope {
  readonly location: WorkerLocation;
  readonly clients: Clients;
  readonly registration: ServiceWorkerRegistration;
  addEventListener<K extends keyof ServiceWorkerGlobalScopeEventMap>(
    type: K,
    listener: (
      this: ServiceWorkerGlobalScope,
      ev: ServiceWorkerGlobalScopeEventMap[K]
    ) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}

export interface ServiceWorkerGlobalScopeEventMap {
  notificationclick: NotificationEvent;
  push: PushEvent;
  pushsubscriptionchange: PushSubscriptionChangeEvent;
}

export interface ExtendableEvent extends Event {
  waitUntil(f: Promise<any>): void;
}

export interface NotificationEvent extends ExtendableEvent {
  readonly action: string;
  readonly notification: Notification;
}

export interface PushSubscriptionChangeEvent extends ExtendableEvent {
  readonly newSubscription?: PushSubscription;
  readonly oldSubscription?: PushSubscription;
}

interface PushMessageData {
  arrayBuffer(): ArrayBuffer;
  blob(): Blob;
  json(): any;
  text(): string;
}

export interface PushEvent extends ExtendableEvent {
  readonly data: PushMessageData | null;
}
