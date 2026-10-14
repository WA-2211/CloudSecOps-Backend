const {Schema, model} = require('mongoose')

const assetSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            enum: ['EC2', 'S3', 'SECURITY_GROUP', 'IAM_USER', 'VPC','LAB_HOST', 'OTHER']
        },
        provider: {
            type: String,
            enum: ['AWS', 'LOCAL_LAB'],
            
        },
        privateIp: {
            type: String

        },
        publicIp: {
            type: String

        },
        region:{
            type: String

        },
        criticality: {
            type: Number,
            min: 1,
            max: 5

        },
        tags: [{
            key: String,
            value: String

        }],
        status: {           
            type: String,
            enum: ['ACTIVE', 'STOPPED', 'DELETED', 'QUARANTINED'],
            default: 'ACTIVE'

        },
        wazuhAgentId: {
            type: String

        },
        wazuhAgentName: {
            type: String

        },
        lastSeen: {
            type: Date
        },
        resourceId:{
            type: String,
            required: true

        }
    },
      { timestamps: true },

)

const Asset = model('Asset', assetSchema)

module.exports = Asset