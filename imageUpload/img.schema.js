import mongoose from "mongoose"
let Schema = mongoose.Schema;

let imageSchema = new Schema({
  image_path: {
    type: String,
    // required: true
  },
  image_content_type: {
    type: String
  }
},
  {
    timestamps: { createdAt: "image_created_date", updatedAt: "image_modifed_date" }
  }
);

export default mongoose.model("image", imageSchema);