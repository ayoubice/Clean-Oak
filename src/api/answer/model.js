import mongoose, { Schema } from 'mongoose'
import { schema as elementSchema } from '../question/model.js'
//import { schema as memberSchema } from '../member/model.js'


const memberSchema = new Schema({
  id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String
  },
  email: {
    type: String,
    required: true,
  },
  labels: {
    type: [String]
  }
},{ _id : false })

/*const memberSchema = new Schema({
  id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
  },
  name: String,
  email: String
},{ _id : false })

const questionSchema = new Schema({
  id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
  },
  alias: {
    type: String
  },

  text: {
    type: String
  },

  type: {
    type: String
  },

  hasComment: Boolean,

  commentLabel: String,

  tags: [String],
},{ _id : false })*/

const answerSchema = new Schema({
      value: {
        type: String
      },

      comment: {
        type: String
      },

      incognito: {
        type: Boolean,
        default: true
      },

      survey: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Survey',
          required: true
      },

      evaluated: Object,

      asked: Object,

      question: Object
    }, {
  timestamps: true
})

/*answerSchema.add({
  evaluated: memberSchema 
})*/

answerSchema.pre('save', function(next) {
  if (this.incognito == true) {
    if (this.asked) {
      this.asked.name = 'unknown'
      this.asked.email = 'unknown'
    }  
  }    
  next() 
});

answerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      value: this.value,
      comment: this.comment,
      survey: this.survey,
      evaluated: this.evaluated,
      asked: this.asked,
      question: this.question,
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
