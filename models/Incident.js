const { Schema, model } = require("mongoose");

const incidentSchema = new Schema(
    {
        title: {
            type: String,
            required: true

        },
        description: {
            type: String

        },
        severity: {
            type: String,
            enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
            default: 'LOW'
        },
        status: {
            type: String,
            enum: ['OPEN', 'INVESTIGATING', 'CONTAINED', 'RESOLVED', 'FALSE_POSITIVE'],
            default: 'OPEN'
        },
        correlationKey: {
            type: String,
            required: true
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
        timeline: [{
            timestamp: { type: Date, default: Date.now },
            type: {
                type: String,
                required: true,
                enum: [
                    'CREATED', 'ALERT_ADDED', 'ENRICHED', 'STATUS_CHANGED', 'ASSIGNED', 'NOTE',
                    'PLAYBOOK_REQUESTED', 'PLAYBOOK_APPROVED', 'PLAYBOOK_REJECTED', 'PLAYBOOK_COMPLETED', 'PLAYBOOK_FAILED',
                ],
            },
            actorType: { type: String, enum: ['USER', 'SYSTEM'], default: 'SYSTEM' },
            actorId: { type: Schema.Types.ObjectId, ref: 'User' },
            message: { type: String, required: true },
            refId: Schema.Types.ObjectId
        }],
        closedAt: {
            type: Date,

        },
        closureNote: {
            type: String
        },
        alertIds: [{
            type: Schema.Types.ObjectId,
            ref: 'Alert'

        }],
        assetIds: [{
            type: Schema.Types.ObjectId,
            ref: 'Asset'
        }],
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        iocIds: [{
            type: Schema.Types.ObjectId,
            ref: 'IOC'
        }]

    },
    {
        timestamps: true,
        virtuals: {
            incidentNumber: {
                get() {
                    return `INC-${this._id.toString().slice(-6).toUpperCase()}`
                }
            }

        },
        toJSON: { virtuals: true }
    }
);



const Incident = model("Incident", incidentSchema);

module.exports = Incident;
