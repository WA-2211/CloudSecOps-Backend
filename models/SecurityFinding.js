const {Schema, model} = require('mongoose')

const findingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String

    },
    recommendation: {
        type: String

    },
    category: {
        type: String,
        required: true,
        enum: ['NETWORK', 'IAM', 'STORAGE', 'LOGGING']

    },
    severity: {
        type: String,
        required: true,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

    },
    status: {
        type: String,
        enum: ['OPEN', 'RESOLVED', 'ACCEPTED'],
        default: 'OPEN'       

    },
    source: {
        type: String,
        enum: ['MANUAL', 'POSTURE_SCANNER'],
        default: 'POSTURE_SCANNER'
    },
    evidence: {
        type: Schema.Types.Mixed
    },
    detectedAt: {
        type: Date
    },
    lastCheckedAt: {
        type: Date

    },
    resolvedAt: {
        type: Date

    },
    resolvedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    assetId: {
        type: Schema.Types.ObjectId,
        ref: 'Asset',
        required: true
    },
    checkId: {
        type: String,
        required: true,
        enum: ['SG_SSH_OPEN_WORLD', 'S3_PUBLIC_BUCKET', 'ROOT_NO_MFA', 'CLOUDTRAIL_DISABLED']
    }
},
  { timestamps: true },

)

findingSchema.index({assetId: 1, checkId: 1}, {unique: true})
const SecurityFinding = model('SecurityFinding', findingSchema)

module.exports = SecurityFinding