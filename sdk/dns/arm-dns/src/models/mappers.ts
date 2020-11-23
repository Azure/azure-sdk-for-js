import * as coreHttp from "@azure/core-http";

export const RecordSet: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RecordSet",
    modelProperties: {
      id: {
        serializedName: "id",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      etag: {
        serializedName: "etag",
        type: {
          name: "String"
        }
      },
      metadata: {
        serializedName: "properties.metadata",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      },
      ttl: {
        serializedName: "properties.TTL",
        type: {
          name: "Number"
        }
      },
      fqdn: {
        serializedName: "properties.fqdn",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      provisioningState: {
        serializedName: "properties.provisioningState",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      targetResource: {
        serializedName: "properties.targetResource",
        type: {
          name: "Composite",
          className: "SubResource"
        }
      },
      aRecords: {
        serializedName: "properties.ARecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ARecord"
            }
          }
        }
      },
      aaaaRecords: {
        serializedName: "properties.AAAARecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "AaaaRecord"
            }
          }
        }
      },
      mxRecords: {
        serializedName: "properties.MXRecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "MxRecord"
            }
          }
        }
      },
      nsRecords: {
        serializedName: "properties.NSRecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "NsRecord"
            }
          }
        }
      },
      ptrRecords: {
        serializedName: "properties.PTRRecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "PtrRecord"
            }
          }
        }
      },
      srvRecords: {
        serializedName: "properties.SRVRecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SrvRecord"
            }
          }
        }
      },
      txtRecords: {
        serializedName: "properties.TXTRecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "TxtRecord"
            }
          }
        }
      },
      cnameRecord: {
        serializedName: "properties.CNAMERecord",
        type: {
          name: "Composite",
          className: "CnameRecord"
        }
      },
      soaRecord: {
        serializedName: "properties.SOARecord",
        type: {
          name: "Composite",
          className: "SoaRecord"
        }
      },
      caaRecords: {
        serializedName: "properties.caaRecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "CaaRecord"
            }
          }
        }
      }
    }
  }
};

export const SubResource: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SubResource",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ARecord: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ARecord",
    modelProperties: {
      ipv4Address: {
        serializedName: "ipv4Address",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const AaaaRecord: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AaaaRecord",
    modelProperties: {
      ipv6Address: {
        serializedName: "ipv6Address",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const MxRecord: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "MxRecord",
    modelProperties: {
      preference: {
        serializedName: "preference",
        type: {
          name: "Number"
        }
      },
      exchange: {
        serializedName: "exchange",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const NsRecord: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "NsRecord",
    modelProperties: {
      nsdname: {
        serializedName: "nsdname",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const PtrRecord: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PtrRecord",
    modelProperties: {
      ptrdname: {
        serializedName: "ptrdname",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SrvRecord: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SrvRecord",
    modelProperties: {
      priority: {
        serializedName: "priority",
        type: {
          name: "Number"
        }
      },
      weight: {
        serializedName: "weight",
        type: {
          name: "Number"
        }
      },
      port: {
        serializedName: "port",
        type: {
          name: "Number"
        }
      },
      target: {
        serializedName: "target",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const TxtRecord: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "TxtRecord",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const CnameRecord: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CnameRecord",
    modelProperties: {
      cname: {
        serializedName: "cname",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SoaRecord: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SoaRecord",
    modelProperties: {
      host: {
        serializedName: "host",
        type: {
          name: "String"
        }
      },
      email: {
        serializedName: "email",
        type: {
          name: "String"
        }
      },
      serialNumber: {
        serializedName: "serialNumber",
        type: {
          name: "Number"
        }
      },
      refreshTime: {
        serializedName: "refreshTime",
        type: {
          name: "Number"
        }
      },
      retryTime: {
        serializedName: "retryTime",
        type: {
          name: "Number"
        }
      },
      expireTime: {
        serializedName: "expireTime",
        type: {
          name: "Number"
        }
      },
      minimumTtl: {
        serializedName: "minimumTTL",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const CaaRecord: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CaaRecord",
    modelProperties: {
      flags: {
        serializedName: "flags",
        type: {
          name: "Number"
        }
      },
      tag: {
        serializedName: "tag",
        type: {
          name: "String"
        }
      },
      value: {
        serializedName: "value",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const CloudError: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CloudError",
    modelProperties: {
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "CloudErrorBody"
        }
      }
    }
  }
};

export const CloudErrorBody: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CloudErrorBody",
    modelProperties: {
      code: {
        serializedName: "code",
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        type: {
          name: "String"
        }
      },
      target: {
        serializedName: "target",
        type: {
          name: "String"
        }
      },
      details: {
        serializedName: "details",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "CloudErrorBody"
            }
          }
        }
      }
    }
  }
};

export const RecordSetListResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RecordSetListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "RecordSet"
            }
          }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Resource: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Resource",
    modelProperties: {
      id: {
        serializedName: "id",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      location: {
        serializedName: "location",
        required: true,
        type: {
          name: "String"
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      }
    }
  }
};

export const ZoneUpdate: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ZoneUpdate",
    modelProperties: {
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } }
        }
      }
    }
  }
};

export const ZoneListResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ZoneListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Zone"
            }
          }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DnsResourceReferenceRequest: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DnsResourceReferenceRequest",
    modelProperties: {
      targetResources: {
        serializedName: "properties.targetResources",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SubResource"
            }
          }
        }
      }
    }
  }
};

export const DnsResourceReferenceResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DnsResourceReferenceResult",
    modelProperties: {
      dnsResourceReferences: {
        serializedName: "properties.dnsResourceReferences",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "DnsResourceReference"
            }
          }
        }
      }
    }
  }
};

export const DnsResourceReference: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DnsResourceReference",
    modelProperties: {
      dnsResources: {
        serializedName: "dnsResources",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SubResource"
            }
          }
        }
      },
      targetResource: {
        serializedName: "targetResource",
        type: {
          name: "Composite",
          className: "SubResource"
        }
      }
    }
  }
};

export const RecordSetUpdateParameters: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "RecordSetUpdateParameters",
    modelProperties: {
      recordSet: {
        serializedName: "RecordSet",
        type: {
          name: "Composite",
          className: "RecordSet"
        }
      }
    }
  }
};

export const Zone: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Zone",
    modelProperties: {
      ...Resource.type.modelProperties,
      etag: {
        serializedName: "etag",
        type: {
          name: "String"
        }
      },
      maxNumberOfRecordSets: {
        serializedName: "properties.maxNumberOfRecordSets",
        readOnly: true,
        type: {
          name: "Number"
        }
      },
      maxNumberOfRecordsPerRecordSet: {
        serializedName: "properties.maxNumberOfRecordsPerRecordSet",
        readOnly: true,
        type: {
          name: "Number"
        }
      },
      numberOfRecordSets: {
        serializedName: "properties.numberOfRecordSets",
        readOnly: true,
        type: {
          name: "Number"
        }
      },
      nameServers: {
        serializedName: "properties.nameServers",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      zoneType: {
        defaultValue: "Public",
        serializedName: "properties.zoneType",
        type: {
          name: "Enum",
          allowedValues: ["Public", "Private"]
        }
      },
      registrationVirtualNetworks: {
        serializedName: "properties.registrationVirtualNetworks",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SubResource"
            }
          }
        }
      },
      resolutionVirtualNetworks: {
        serializedName: "properties.resolutionVirtualNetworks",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SubResource"
            }
          }
        }
      }
    }
  }
};
