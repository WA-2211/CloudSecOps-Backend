const {Schema, model} = require("mongoose");

const iocSchema = new Schema(
  {
    type: {
        type: String,
        enum: ['IPV4', 'DOMAIN', 'URL', 'SHA256', 'MD5'],
        required: true
    },
    value: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    firstSeen: {
        type: Date,
        default: Date.now
    },
    lastSeen: {
        type: Date,
        default: Date.now

    },
    enrichmentStatus: {
        type: String,
        enum: ['PENDING', 'QUEUED', 'DONE', 'FAILED', 'SKIPPED'],
        default: 'PENDING'

    },
    lastEnrichedAt: {
        type: Date
    },
    verdict: {
        type: String,
        enum: ['UNKNOWN', 'CLEAN', 'SUSPICIOUS', 'MALICIOUS'],
        default: 'UNKNOWN'
    },
    sightings: {
        type: Number,
        min: 0,
        default:1
    }
  },
    { timestamps: true },

);


const IOC = model("IOC", iocSchema);

module.exports = IOC;
