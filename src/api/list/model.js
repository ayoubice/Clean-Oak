import mongoose, { Schema } from 'mongoose'

const listSchema = new Schema({
  name: {
    type: String,
    required:true
  },

  status: {
    type: String,
    enum: ['active','inactive','deleted'],
    default: 'active'
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    }]
}, {
  timestamps: true
})

listSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      status: this.status,
      members: this.members,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('List', listSchema)

export const schema = model.schema
export default model
