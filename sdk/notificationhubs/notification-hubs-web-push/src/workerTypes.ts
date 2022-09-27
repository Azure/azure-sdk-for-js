/// <reference lib="webworker" />

export interface ExtendableEvent extends Event {
  waitUntil(f: Promise<any>): void;
}

interface PushEvent extends ExtendableEvent {
  readonly data: PushMessageData | null;
}

export interface PushSubscriptionChangeEvent extends ExtendableEvent {
  readonly newSubscription: PushSubscription | null;
  readonly oldSubscription: PushSubscription | null;
}

export interface NotificationEvent extends ExtendableEvent {
  readonly action: string;
  readonly notification: Notification;
}

export interface ServiceWorkerGlobalScopeEventMap extends WorkerGlobalScopeEventMap {
  "activate": ExtendableEvent;
  "fetch": FetchEvent;
  "install": ExtendableEvent;
  "message": ExtendableMessageEvent;
  "messageerror": MessageEvent;
  "notificationclick": NotificationEvent;
  "notificationclose": NotificationEvent;
  "push": PushEvent;
  "pushsubscriptionchange": PushSubscriptionChangeEvent;
}

export interface Client {
  readonly id: string;
  readonly type: ClientTypes;
  readonly url: string;
  postMessage(message: any, transfer?: Transferable[]): void;
}

export interface ClientQueryOptions {
  includeReserved?: boolean;
  includeUncontrolled?: boolean;
  type?: ClientTypes;
}

type VisibilityState = "hidden" | "visible" | "prerender";

export interface WindowClient extends Client {
  readonly focused: boolean;
  readonly visibilityState: VisibilityState;
  focus(): Promise<WindowClient>;
  navigate(url: string): Promise<WindowClient>;
}

export interface Clients {
  claim(): Promise<void>;
  get(id: string): Promise<any>;
  matchAll(options?: ClientQueryOptions): Promise<Client[]>;
  openWindow(url: string): Promise<WindowClient | null>;
}

export interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  readonly clients: Clients;
  onactivate: ((this: ServiceWorkerGlobalScope, ev: ExtendableEvent) => any) | null;
  onfetch: ((this: ServiceWorkerGlobalScope, ev: FetchEvent) => any) | null;
  oninstall: ((this: ServiceWorkerGlobalScope, ev: ExtendableEvent) => any) | null;
  onmessage: ((this: ServiceWorkerGlobalScope, ev: ExtendableMessageEvent) => any) | null;
  onmessageerror: ((this: ServiceWorkerGlobalScope, ev: MessageEvent) => any) | null;
  onnotificationclick: ((this: ServiceWorkerGlobalScope, ev: NotificationEvent) => any) | null;
  onnotificationclose: ((this: ServiceWorkerGlobalScope, ev: NotificationEvent) => any) | null;
  onpush: ((this: ServiceWorkerGlobalScope, ev: PushEvent) => any) | null;
  readonly registration: ServiceWorkerRegistration;
  readonly serviceWorker: ServiceWorker;
  skipWaiting(): Promise<void>;
  addEventListener<K extends keyof ServiceWorkerGlobalScopeEventMap>(type: K, listener: (this: ServiceWorkerGlobalScope, ev: ServiceWorkerGlobalScopeEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof ServiceWorkerGlobalScopeEventMap>(type: K, listener: (this: ServiceWorkerGlobalScope, ev: ServiceWorkerGlobalScopeEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
