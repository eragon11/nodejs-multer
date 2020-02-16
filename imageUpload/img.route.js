import express from 'express'
let router = express.Router();
import img_ctrl from './img.controller'

router.post('/upload',img_ctrl.upload);

export default router;