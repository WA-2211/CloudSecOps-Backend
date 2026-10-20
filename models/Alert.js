const {Schema, model} = require("mongoose");

const alertSchema = new Schema(
  {
    title: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
      
    },
    status: {
        type: String,
        enum: ['NEW', 'ACKNOWLEDGED', 'CLOSED'],
        default: 'NEW'
    },
    eventCount: {
        type: Number,
        min: 0,
        default: 0

    },
    firstSeen: {
        type: Date,
        required: true

    },
    lastSeen: {
        type: Date,
        required: true

    },
    sourceIp: {
        type: String
    },
    mitre: {
        tactic: String,
        techniqueId: String,
        techniqueName: String 
    },
    riskScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0

    },
    riskBreakdown: {
        baseSeverity: {
            type: Number,
            default: 0
        },
        assetCriticality: {
            type: Number,
            default: 0
        },
        threatIntel: {
            type: Number,
            default: 0
        },
        frequency: {
            type: Number,
            default: 0
        }
    },
    fingerprint: {
        type: String,
        required: true
    },
    acknowledgedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    acknowledgedAt: {
        type: Date,

    },
    eventIds:[ {
        type: Schema.Types.ObjectId,
        ref: 'SecurityEvent'
    }],
    assetId: {
        type: Schema.Types.ObjectId,
        ref: 'Asset'
    },
    incidentId: {
        type: Schema.Types.ObjectId,
        ref: 'Incident'
    },
    ruleId: {
        type: Schema.Types.ObjectId,
        ref: 'DetectionRule',
        required: true
    },
    iocIds: [{
        type: Schema.Types.ObjectId,
        ref: 'IOC'
    }]
  },
    { timestamps: true },

);

alertSchema.index({fingerprint: 1}, {unique: true, partialFilterExpression: {status: {$in: ['NEW', 'ACKNOWLEDGED']}}}

)

const Alert = model("Alert", alertSchema);

module.exports = Alert;
