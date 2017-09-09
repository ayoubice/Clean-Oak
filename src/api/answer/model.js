import mongoose, { Schema } from 'mongoose'
import { schema as elementSchema } from '../question/model.js'

const answerSchema = new Schema({
  value: {
    type: String
  },

  comment: {
    type: String
  },

  survey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Survey'
  },

  question: elementSchema,

  memberEvaluated: {
      id: mongoose.Schema.Types.ObjectId,
      name : String
  },

  memberAsked: {
      id: mongoose.Schema.Types.ObjectId,
      name : String
  },
}, {
  timestamps: true
})

answerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      value: this.value,
      comment: this.comment,
      survey: this.survey,
      question: this.Question,
      memberEvaluated: this.memberEvaluated,
      memberAsked: this.memberAsked,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Answer', answerSchema)

export const schema = model.schema
export default model
