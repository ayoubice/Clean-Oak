import mongoose, { Schema } from 'mongoose'

const answerSchema = new Schema({
  value: {
    type: String
  },

  value: {
    comment: String
  },

  survey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Survey'
  },

  question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
  },

  memberEvaluated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
  },

  memberAsked: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
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
