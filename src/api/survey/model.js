import mongoose, { Schema } from 'mongoose'
import { schema as elementSchema } from '../question/model.js'

const surveySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  elements: [elementSchema] ,
  status: {
    type: String,
    default: 'Draft',
    enum : ['Draft','Sent','Terminate']
  }
}, {
  timestamps: true
})

surveySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      elements: this.elements,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Survey', surveySchema)

export const schema = model.schema
export default model
