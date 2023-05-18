const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router()

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-travelwit-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')

router.get('/', (req, res) => {
    res.send('Welcome to my image app')
})

router.get('/images/get', fileUpload, (req, res)=>{
    
    req.getConnection((err, conn)=>{
        if(err) return res.status(500).send('server error')


        conn.query('SELECT * FROM image', (err, rows) =>{
            if(err) return res.status(500).send('server error')

            rows.map(img =>{
                fs.writeFileSync(path.join(__dirname,'../dbimages/' + image.id + 'travelwit.png'), imag.data)
            })
            
            const imagedir = fs.readdirSync(path.join(__dirname, '../dbimages/'))
            
            res.json()
           
            console.log(rows)
        })
    })

})

module.exports = router
