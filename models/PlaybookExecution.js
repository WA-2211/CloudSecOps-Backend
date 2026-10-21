const { Schema, model } = require("mongoose");

const executionSchema = new Schema(
    {
        status: {
            type: String,
            enum: ['PENDING', 'APPROVED', 'REJECTED', 'RUNNING', 'SUCCEEDED', 'FAILED'],
            default: 'PENDING'
        },
        requestedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        triggeredBy: {
            type: String,
            enum: ['USER', 'SYSTEM'],
            required: true
        },
        approvedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        approvedAt: {
            type: Date
        },
        rejectionReason: {
            type: String,
            trim: true
        },
        target: {
            assetId: {
                type: Schema.Types.ObjectId,
                ref: 'Asset'

            },
            resourceId: {
                type: String

            },
            ip: {
                type: String
            }
        },
        steps: [{
            _id: false,
            action: {
                type: String,
                enum: ['ENRICH_IOCS', 'NOTIFY_ANALYST', 'ADD_TIMELINE_NOTE', 'BLOCK_IP', 'ISOLATE_INSTANCE'],
                required: true
            },
            status: {
                type: String,
                enum: ['PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED', 'SKIPPED'],
                default: 'PENDING'
            },
            startedAt: {
                type: Date
            },
            finishedAt: {
                type: Date
            },
            error: {
                type: String
            },
            output: Schema.Types.Mixed
        }],
        playbookId: {
            type: Schema.Types.ObjectId,
            ref: 'Playbook',
            required: true
        },
        incidentId: {
            type: Schema.Types.ObjectId,
            ref: 'Incident',
            required: true
        }

    },
    { timestamps: true },

);



const PlaybookExecution = model("PlaybookExecution", executionSchema);

module.exports = PlaybookExecution;
