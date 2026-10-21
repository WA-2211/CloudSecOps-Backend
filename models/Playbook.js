const {Schema, model} = require("mongoose");

const playbookSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    enabled: {
        type: Boolean,
        default: true
    },
    //when will run
    trigger: {
        ruleIds: [{
            type: Schema.Types.ObjectId,
            ref: 'DetectionRule'
        }],
        minRiskScore: {
            type: Number,
            min: 0,
            max: 100,
            default: 75
        },
        manual: {
            type: Boolean,
            default: false
        }

    },
    //what will do
    steps: [{
        _id: false,
        action: {
            type: String,
            enum: ['ENRICH_IOCS', 'NOTIFY_ANALYST', 'ADD_TIMELINE_NOTE', 'BLOCK_IP', 'ISOLATE_INSTANCE'],
            required: true
        },
        requiresApproval: {
            type: Boolean,
            default: false
        }
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  },
    { timestamps: true },

);

const Playbook = model("Playbook", playbookSchema);

module.exports = Playbook;
