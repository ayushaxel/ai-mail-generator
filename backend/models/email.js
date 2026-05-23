import mongoose from "mongoose"

const emailSchema = mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipientName: {
    type: String,
    default:"Sir/Madam"
  },
  recipientEmail:{
    type: String,
    default: ""
  },
  purpose: {
    type: String,
    required: true
  },
  keyPoints: [{
    type: String
  }],
  tone: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }

},{ timestamps: true })

const Email = mongoose.model("Email",emailSchema)
export default Email