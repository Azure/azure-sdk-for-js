// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const instantiationParams1 = {
  rawTypeName: "Array",
  rawBaseType: "Entity",
  contexts: {
    "dtmi:dtdl:context;2": { Array: "dtmi:dtdl:class:Array;2" },
    "dtmi:dtdl:context;3": { Array: "dtmi:dtdl:class:Array;3" }
  },
  materialClassDigest: {
    dtdlVersions: [2, 3],
    abstract: false,
    overt: true,
    partition: false,
    parentClass: "ComplexSchema",
    typeOptionalVersions: [],
    idRequiredVersions: [],
    instance: {
      criteriaText:
        "is a JSON array that conforms to the specific Array element defined in the model",
      "2": {
        element: {
          jsonType: "array"
        },
        eachChild: {
          instanceProperty: ["elementSchema"]
        }
      },
      "3": {
        element: {
          jsonType: "array"
        },
        eachChild: {
          instanceProperty: ["elementSchema"]
        }
      }
    },
    typeIds: [
      "dtmi:dtdl:class:Array",
      "dtmi:dtdl:class:ComplexSchema",
      "dtmi:dtdl:class:Entity",
      "dtmi:dtdl:class:Schema"
    ],
    concreteSubclasses: {
      "2": ["Array"],
      "3": ["Array"]
    },
    elementalSubclasses: {
      "2": [],
      "3": []
    },
    elements: {
      "2": [],
      "3": []
    },
    extensibleMaterialSubclasses: {
      "2": [],
      "3": []
    },
    badTypeCauseFormat: {
      "2":
        "{primaryId:p} property '{property}' has value{secondaryId:e} that does not have @type of Array.",
      "3":
        "{primaryId:p} property '{property}' has value{secondaryId:e} that does not have @type of Array."
    },
    badTypeActionFormat: {
      "2": "Provide a value for property '{property}' with @type Array.",
      "3": "Provide a value for property '{property}' with @type Array."
    },
    properties: {
      comment: {
        _: {
          literal: true,
          abstract: false,
          datatype: "string",
          plural: false,
          optional: true,
          inherited: true,
          shadowed: false,
          isKey: false,
          isSeg: false,
          description: "A comment for model authors."
        },
        "2": {
          idRequired: false,
          allowed: true,
          maxCount: 1,
          maxLength: 512,
          typeRequired: true,
          uniqueAmong: []
        },
        "3": {
          idRequired: false,
          allowed: true,
          maxCount: 1,
          maxLength: 512,
          typeRequired: true,
          uniqueAmong: []
        }
      },
      description: {
        _: {
          literal: true,
          abstract: false,
          datatype: "langString",
          plural: true,
          optional: true,
          inherited: true,
          shadowed: false,
          isKey: false,
          isSeg: false,
          description: "A localizable description for display."
        },
        "2": {
          idRequired: false,
          defaultLanguage: "en",
          allowed: true,
          maxLength: 512,
          typeRequired: true,
          uniqueAmong: []
        },
        "3": {
          idRequired: false,
          defaultLanguage: "en",
          allowed: true,
          maxLength: 512,
          typeRequired: true,
          uniqueAmong: []
        }
      },
      displayName: {
        _: {
          literal: true,
          abstract: false,
          datatype: "langString",
          plural: true,
          optional: true,
          inherited: true,
          shadowed: false,
          isKey: false,
          isSeg: false,
          description: "A localizable name for display."
        },
        "2": {
          idRequired: false,
          defaultLanguage: "en",
          allowed: true,
          maxLength: 64,
          typeRequired: true,
          uniqueAmong: []
        },
        "3": {
          idRequired: false,
          defaultLanguage: "en",
          allowed: true,
          maxLength: 64,
          typeRequired: true,
          uniqueAmong: []
        }
      },
      elementSchema: {
        _: {
          literal: false,
          class: "Schema",
          abstract: true,
          plural: false,
          optional: false,
          inherited: false,
          shadowed: false,
          isKey: false,
          isSeg: false,
          description: "The data type of each element in the Array, which is an instance of Schema."
        },
        "2": {
          idRequired: false,
          allowed: true,
          class: "Schema",
          versions: [2],
          maxCount: 1,
          minCount: 1,
          typeRequired: true,
          uniqueAmong: []
        },
        "3": {
          idRequired: false,
          allowed: true,
          class: "Schema",
          versions: [3, 2],
          maxCount: 1,
          minCount: 1,
          typeRequired: true,
          uniqueAmong: []
        }
      },
      languageVersion: {
        _: {
          literal: true,
          abstract: false,
          datatype: "integer",
          plural: false,
          optional: false,
          inherited: true,
          shadowed: false,
          isKey: false,
          isSeg: false,
          description: "The version of DTDL used to author this element."
        },
        "2": {
          idRequired: false,
          allowed: false,
          typeRequired: true,
          value: 2,
          uniqueAmong: []
        },
        "3": {
          idRequired: false,
          allowed: false,
          typeRequired: true,
          value: 3,
          uniqueAmong: []
        }
      }
    }
  },
  identifierDefinitions: {
    "2": {
      pattern:
        "^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$",
      maxLength: 2048
    },
    "3": {
      pattern:
        "^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*(?:;[1-9][0-9]{0,8}(?:\\.[1-9][0-9]{0,5})?)?(?:#(?:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)?)?$",
      maxLength: 2048
    },
    Interface: {
      "2": {
        maxLength: 128
      },
      "3": {
        maxLength: 128
      }
    }
  },
  descendantControls: [],
  extensibleMaterialClasses: {}
};

export const instantiationParams2 = {
  rawTypeName: "Entity",
  rawBaseType: "Entity",
  contexts: {
    "dtmi:dtdl:context;2": { Array: "dtmi:dtdl:class:Array;2" },
    "dtmi:dtdl:context;3": { Array: "dtmi:dtdl:class:Array;3" }
  },
  materialClassDigest: {
    dtdlVersions: [2, 3],
    abstract: true,
    overt: false,
    partition: false,
    parentClass: null,
    typeOptionalVersions: [],
    idRequiredVersions: [],
    typeIds: ["dtmi:dtdl:class:Entity"],
    concreteSubclasses: {
      "2": ["Array", "Property", "Relationship"],
      "3": ["Array", "Property", "Relationship"]
    },
    elementalSubclasses: {
      "2": [
        "Boolean",
        "CommandType",
        "Date",
        "DateTime",
        "Double",
        "Duration",
        "Float",
        "Integer",
        "Long",
        "String",
        "Time"
      ],
      "3": [
        "Boolean",
        "CommandType",
        "Date",
        "DateTime",
        "Double",
        "Duration",
        "Float",
        "Integer",
        "Long",
        "String",
        "Time"
      ]
    },
    elements: {
      "2": [
        {
          id: "dtmi:dtdl:instance:CommandType:asynchronous;2",
          name: "asynchronous",
          description:
            "The command will complete sometime after control returns to the caller. After the command completes, the result and any outputs are available."
        },
        {
          id: "dtmi:dtdl:instance:CommandType:synchronous;2",
          name: "synchronous",
          description:
            "The command will be complete when control returns to the caller. The result and any outputs are available immediately."
        }
      ],
      "3": [
        {
          id: "dtmi:dtdl:instance:CommandType:asynchronous;3",
          name: "asynchronous",
          description:
            "The command will complete sometime after control returns to the caller. After the command completes, the result and any outputs are available."
        },
        {
          id: "dtmi:dtdl:instance:CommandType:synchronous;3",
          name: "synchronous",
          description:
            "The command will be complete when control returns to the caller. The result and any outputs are available immediately."
        }
      ]
    },
    extensibleMaterialSubclasses: {
      "2": ["Unit", "UnitAttribute"],
      "3": ["LatentType", "NamedLatentType", "Unit", "UnitAttribute"]
    },
    badTypeCauseFormat: {
      "2":
        "Top-level element{secondaryId:e} does not have @type of Array, Command, CommandPayload, Component, Enum, EnumValue, Field, Interface, Map, MapKey, MapValue, Object, Property, Relationship, or Telemetry.",
      "3":
        "Top-level element{secondaryId:e} does not have @type of Array, Command, CommandRequest, CommandResponse, Component, Enum, EnumValue, Field, Interface, Map, MapKey, MapValue, Object, Property, Relationship, or Telemetry."
    },
    badTypeActionFormat: {
      "2": "Provide a @type in the set of allowable types.",
      "3": "Provide a @type in the set of allowable types."
    },
    properties: {
      comment: {
        _: {
          literal: true,
          abstract: false,
          datatype: "string",
          plural: false,
          optional: true,
          inherited: false,
          shadowed: false,
          isKey: false,
          isSeg: false,
          description: "A comment for model authors."
        },
        "2": {
          idRequired: false,
          allowed: true,
          maxCount: 1,
          maxLength: 512,
          typeRequired: true,
          uniqueAmong: []
        },
        "3": {
          idRequired: false,
          allowed: true,
          maxCount: 1,
          maxLength: 512,
          typeRequired: true,
          uniqueAmong: []
        }
      },
      description: {
        _: {
          literal: true,
          abstract: false,
          datatype: "langString",
          plural: true,
          optional: true,
          inherited: false,
          shadowed: false,
          isKey: false,
          isSeg: false,
          description: "A localizable description for display."
        },
        "2": {
          idRequired: false,
          defaultLanguage: "en",
          allowed: true,
          maxLength: 512,
          typeRequired: true,
          uniqueAmong: []
        },
        "3": {
          idRequired: false,
          defaultLanguage: "en",
          allowed: true,
          maxLength: 512,
          typeRequired: true,
          uniqueAmong: []
        }
      },
      displayName: {
        _: {
          literal: true,
          abstract: false,
          datatype: "langString",
          plural: true,
          optional: true,
          inherited: false,
          shadowed: false,
          isKey: false,
          isSeg: false,
          description: "A localizable name for display."
        },
        "2": {
          idRequired: false,
          defaultLanguage: "en",
          allowed: true,
          maxLength: 64,
          typeRequired: true,
          uniqueAmong: []
        },
        "3": {
          idRequired: false,
          defaultLanguage: "en",
          allowed: true,
          maxLength: 64,
          typeRequired: true,
          uniqueAmong: []
        }
      },
      languageVersion: {
        _: {
          literal: true,
          abstract: false,
          datatype: "integer",
          plural: false,
          optional: false,
          inherited: false,
          shadowed: false,
          isKey: false,
          isSeg: false,
          description: "The version of DTDL used to author this element."
        },
        "2": {
          idRequired: false,
          allowed: false,
          typeRequired: true,
          value: 2,
          uniqueAmong: []
        },
        "3": {
          idRequired: false,
          allowed: false,
          typeRequired: true,
          value: 3,
          uniqueAmong: []
        }
      }
    }
  },
  identifierDefinitions: {
    "2": {
      pattern:
        "^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$",
      maxLength: 2048
    },
    "3": {
      pattern:
        "^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*(?:;[1-9][0-9]{0,8}(?:\\.[1-9][0-9]{0,5})?)?(?:#(?:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)?)?$",
      maxLength: 2048
    },
    Interface: {
      "2": {
        maxLength: 128
      },
      "3": {
        maxLength: 128
      }
    }
  },
  descendantControls: [],
  extensibleMaterialClasses: {}
};
