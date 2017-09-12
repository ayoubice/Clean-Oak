import mongoose, { Schema } from 'mongoose'
import { List } from '../list/'

const memberSchema = new Schema({
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
}, {
  timestamps: true
})

memberSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      position: this.position,
      email: this.email,
      labels: this.labels,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  },
  storePicture (body) {
    var fs = require('fs');
    fs.writeFile("../blur-admin/src/assets/pictures/"+this.id+"."+body.fileExt, body.picture, 'base64', function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
    return this;
  },
  removeMembersFromLists () {
    //var list = new List();
    //var arr = [this.id];
    var member = this;
    List.find({"members" : member.id}, function (err, data) {
        if (err)
            console.log(err);
        else {
            console.log('no err');
            if(data.length > 0 ) {
              console.log('data.length > 0');
              for (var i = 0;i<data.length;i++){
                List.update(
                  { '_id': data[i]._id },
                  { "$pull": { "members": member.id } },
                  function(err, success) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Success updating', success);
                        return member;
                    }
                  });
              }
            } else
              return member;
        
            
        }

    });
    return member;
    console.log('out');
  }

}

const model = mongoose.model('Member', memberSchema)

export const schema = model.schema
export default model
