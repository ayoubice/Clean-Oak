import mongoose, { Schema } from 'mongoose-fill'
import { schema as elementSchema } from '../question/model.js'
import { Answer } from '../answer/'
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

const surveySchema = new Schema({
  name: {
    type: String,
    required: true
  },

  type: {
    type: String,
    default: 's_360',
    enum : ['s_360','s_regular','s_incognito']
  },

  description: {
    type: String
  },

  subject: {
    type: String
  },

  text: {
    type: String
  },

  elements: [elementSchema] ,

  status: {
    type: String,
    default: 'Draft',
    enum : ['Draft','Sending','Sent','Done']
  },

  list : [{
      name: String,
      members : [memberSchema],
  }],

}, {
  timestamps: true
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true 
  }
});

surveySchema.fill('answers', function(callback){
    Answer
        .find({survey: this.id})
        .exec(callback)
});

surveySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      type: this.type,
      subject: this.subject,
      description: this.description,
      text: this.text,
      elements: this.elements,
      status: this.status,
      list: this.list,
      answers: this.answers ? this.answers : [],
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
