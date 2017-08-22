import mongoose, { Schema } from 'mongoose'

const questionSchema = new Schema({
  text: {
    type: String
  },

  type: {
    type: String
  },

  required: {
    type: Boolean
  },

  items: [
    {
      id: Schema.Types.ObjectId,
      orderNo : Number,
      value: String,
    }
  ],

  hasComment: Boolean,

  commentLabel: String,

  tags: [String],
}, {
  timestamps: true
})

questionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      text: this.text,
      type: this.type,
      required: this.required,
      items: this.items,
      hasComment: this.hasComment,
      commentLabel: this.commentLabel,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Question', questionSchema)

export const schema = model.schema
export default model
