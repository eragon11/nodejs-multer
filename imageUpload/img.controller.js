import imageSchema from './img.schema';
import upload from '../uploads';
const imgctrl = {}
var url = "http://localhost:3001/"
imgctrl.upload = async (req, res) => {

    var pathurl = url + '/uploads/';
    upload(req, res, function (err) {
        console.log(req.file);
        console.log(req.files);
        req.files.forEach(element => {
            var image_json = {}
            image_json.image_path = pathurl + element.filename;
            image_json.image_content_type = element.mimetype;
            var image = new imageSchema(image_json)
            image.save();
        });

        if (err) {
            res.send("file not uploaded successfully")
        }
    })
    res.send("file upload successfully")
}

export default imgctrl;