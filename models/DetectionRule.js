const {Schema, model} = require("mongoose");

const ruleSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String

    },
    enabled: {
        type: Boolean,
        default: true

    },
    match: {
        eventType: {
            type: String,
            required: true,
            enum: ['AUTH_FAILURE', 'AUTH_SUCCESS', 'NETWORK_SCAN', 'FILE_HASH_OBSERVED', 'CLOUD_CONFIG_CHANGE', 'WEB_ATTACK', 'OTHER']

        },
        source: {
            type: String,
            enum: ['WAZUH', 'CLOUDTRAIL', 'LAB']
        },
        destinationPort: {
            type: Number,
            min: 0,
            max: 65535
        }
    },
    severity: {
        type: String,
        required: true,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
    },
    mitre: {
        tactic: String,
        techniqueId: String,
        techniqueName: String
    },
    threshold: {
        count: {
            type: Number,
            min: 1,
            default: 1
        },
        windowSeconds: {
            type: Number,
            min: 1,
            default: 300
        },
        groupBy: {
            type: String,
            enum: ['sourceIp', 'assetId', 'username', 'fileHash'],
            default: 'sourceIp'
        }
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cooldownSeconds: {
        type: Number,
        min: 0,
        default: 3600
    }
  },
    { timestamps: true },

);


const DetectionRule = model("DetectionRule", ruleSchema);

module.exports = DetectionRule;
