const {Schema, model} = require("mongoose");

const eventSchema = new Schema(
  {
    type: {
        type: String,
        required: true,
        enum: ['AUTH_FAILURE', 'AUTH_SUCCESS', 'NETWORK_SCAN', 'FILE_HASH_OBSERVED', 'CLOUD_CONFIG_CHANGE', 'WEB_ATTACK', 'OTHER']

    },
    sourceEventId: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true,
        enum: ['WAZUH', 'CLOUDTRAIL', 'LAB']
    },
    sourceIp: {
        type: String,

    },
    sourcePort: {
        type: Number,
        min: 0,
        max: 65535
    },
    destinationIp: {
        type: String,

    },
    destinationPort: {
        type: Number,
        min: 0,
        max: 65535


    },
    protocol: {
        type: String,

    },
    username: {
        type: String,

    },
    fileHash: {
        type: String,

    },
    processed: {
        type: Boolean,
        default: false

    },
    timestamp: {
        type: Date,
        required: true

    },
    mitre: [{
        _id: false,
        tactic: String,
        techniqueId: String,
        techniqueName: String
    }],
    wazuh: {
        ruleId: String,
        level: Number,
        description: String,
        groups: [String],
        agentId: String,
        agentName: String
    },
    rawData: {
        type: Schema.Types.Mixed,
        required: true
    },
    assetId: {
        type: Schema.Types.ObjectId,
        ref: 'Asset'
    }

  },
    { timestamps: true },

);
eventSchema.index({ source: 1, sourceEventId: 1 }, { unique: true })

const SecurityEvent = model("SecurityEvent", eventSchema);

module.exports = SecurityEvent;
