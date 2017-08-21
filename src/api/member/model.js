import mongoose, { Schema } from 'mongoose'

const memberSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  pic: {
    type: String
  },
  email: {
    type: String,
    required: true,
  },
  labels: {
    type: [String]
  }
}, {
  timestamps: true
})

memberSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      pic: this.pic,
      email: this.email,
      labels: this.labels,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Member', memberSchema)

export const schema = model.schema
export default model
