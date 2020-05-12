const router = require('express').Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../repo'),
    filename:  (req, file, cb) => {
        cb(null, new Date().getTime()+path.extname(file.originalname)); //file.originalname
    }
})

const fileFilter = (req, file, cb)=>{
    //if (file.mimetype.match(/(jpeg|png|gif)$/))
    if (file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/png') {
            cb(null, true);
        } else{
            cb(null, false); // false, ignore other files that aren't images   
        }
}

const uploadImage = multer({
    storage,
    limits: {fileSize: 10000000},
    fileFilter
})

router.post('/upload', uploadImage.single('image'), (req,res)=>{
    console.log(req.body);
    if(req.error){
        res.send(req.error);
    }else{
        res.send({"mensaje":"Imagen guardada"})
    }
})

router.get('/imgTest', (req,res)=>{
    res.sendFile(path.join(__dirname, '../repo/test.jpg'));
})

module.exports = router;
