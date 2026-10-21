const {Schema, model} = require("mongoose");

const threatIntelSchema = new Schema(
  {
    provider: {
        type: String,
        enum: ['VIRUSTOTAL'],
        default: 'VIRUSTOTAL'

    },
    malicious: {
        type: Number,
        min: 0,
        default: 0

    },
    suspicious: {
        type: Number,
        min: 0,
        default: 0

    },
    harmless: {
        type: Number,
        min: 0,
        default: 0

    },
    undetected: {
        type: Number,
        min: 0,
        default: 0

    },
    total: {
        type: Number,
        min: 0,
        default: 0

    },
    country: {
        type: String

    },
    asOwner: {
        type: String

    },
    categories: {
        type: Schema.Types.Mixed

    },
    reputation: {
        type: Number
    },
    rawResponse: {
        type: Schema.Types.Mixed,
        select: false

    },
    checkedAt: {
        type: Date,
        default: Date.now

    },
    expiresAt: {
        type: Date,
        required: true
    },
    iocId: {
        type: Schema.Types.ObjectId,
        ref: 'IOC',
        required: true
    }
  },
    { timestamps: true },

);

const ThreatIntelResult = model("ThreatIntelResult", threatIntelSchema);

module.exports = ThreatIntelResult;
