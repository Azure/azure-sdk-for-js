export * from "./generated/models";
import { MediaGraphInstance, MediaGraphTopology } from "./generated/models";
import {
  MethodRequest as MethodRequestInternal,
  MediaGraphTopologySetRequest as MediaGraphTopologySetRequestInternal,
  MediaGraphTopologyGetRequest as MediaGraphTopologyGetRequestInternal,
  MediaGraphTopologyDeleteRequest as MediaGraphTopologyDeleteRequestInternal,
  MediaGraphTopologyListRequest as MediaGraphTopologyListRequestInternal,
  MediaGraphInstanceListRequest as MediaGraphInstanceListRequestInternal,
  MediaGraphInstanceSetRequest as MediaGraphInstanceSetRequestInternal,
  MediaGraphInstanceGetRequest as MediaGraphInstanceGetRequestInternal,
  MediaGraphInstanceDeleteRequest as MediaGraphInstanceDeleteRequestInternal,
  MediaGraphInstanceActivateRequest as MediaGraphInstanceActivateRequestInternal,
  MediaGraphInstanceDeActivateRequest as MediaGraphInstanceDeActivateRequestInternal
} from "./generated/models/mappers";
//export type MediaGraphTopologySetRequest = Omit<MediaGraphTopologySetRequestInternal, "methodName">

/* interface Payload { apiVersion: string; [x: string]: any }
interface MethodRequest {
  methodName: string;
  payload: Payload
} */

/* function init(that: MethodRequest, methodName: string, payload: object ) {
  that.methodName = methodName;
  that.payload = {
      ...payload,
      apiVersion: MethodRequestInternal.type.modelProperties!.apiVersion.defaultValue
    };
} */

export class MethodRequest {
  public MethodName: string;
  public Payload: { "@apiVersion": string; [x: string]: any };
  constructor(methodName: string, payload: object) {
    this.MethodName = methodName;
    this.Payload = {
      ...payload,
      "@apiVersion": MethodRequestInternal.type.modelProperties!.apiVersion.defaultValue
    };
  }
}

export class MediaGraphTopologySetRequest /*implements MethodRequest*/ extends MethodRequest {
  constructor(graph: MediaGraphTopology) {
    //init(this, MediaGraphTopologySetRequestInternal.serializedName!, graph)
    super(MediaGraphTopologySetRequestInternal.serializedName!, graph);
  }
}

export class MediaGraphTopologyGetRequest extends MethodRequest {
  constructor(name: string) {
    super(MediaGraphTopologyGetRequestInternal.serializedName!, { name });
  }
}

export class MediaGraphTopologyDeleteRequest extends MethodRequest {
  constructor(name: string) {
    super(MediaGraphTopologyDeleteRequestInternal.serializedName!, { name });
  }
}

export class MediaGraphTopologyListRequest extends MethodRequest {
  constructor() {
    super(MediaGraphTopologyListRequestInternal.serializedName!, {});
  }
}

export class MediaGraphInstanceSetRequest extends MethodRequest {
  constructor(graph: MediaGraphInstance) {
    super(MediaGraphInstanceSetRequestInternal.serializedName!, { graph });
  }
}

export class MediaGraphInstanceGetRequest extends MethodRequest {
  constructor(name: string) {
    super(MediaGraphInstanceGetRequestInternal.serializedName!, { name });
  }
}

export class MediaGraphInstanceListRequest extends MethodRequest {
  constructor() {
    super(MediaGraphInstanceListRequestInternal.serializedName!, {});
  }
}

export class MediaGraphInstanceDeleteRequest extends MethodRequest {
  constructor(name: string) {
    super(MediaGraphInstanceDeleteRequestInternal.serializedName!, { name });
  }
}

export class MediaGraphInstanceActivateRequest extends MethodRequest {
  constructor(name: string) {
    super(MediaGraphInstanceActivateRequestInternal.serializedName!, { name });
  }
}

export class MediaGraphInstanceDeActivateRequest extends MethodRequest {
  constructor(name: string) {
    super(MediaGraphInstanceDeActivateRequestInternal.serializedName!, { name });
  }
}
