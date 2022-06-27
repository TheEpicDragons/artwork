import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

console.log("[✨] Images compressed!");
console.log("[🔌] Starting server...");

app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'compressed')))

app.get('/get-images', (req, res) => {
    let images = getImagesFromDir(path.join(__dirname, 'compressed'));
     res.render('index', { title: 'Artwork', images: images })
});

// dirPath: target image directory
function getImagesFromDir(dirPath) {

    //use compressor js to compress images
    // All iamges holder, defalut value is empty
    let allImages = [];

    // Iterator over the directory
    let files = fs.readdirSync(dirPath);
    let file;
    // Iterator over the files and push jpg and png images to allImages array.
    for (file of files) {
        let fileLocation = path.join(dirPath, file);

        var stat = fs.statSync(fileLocation);
        if (stat && stat.isDirectory()) {
            getImagesFromDir(fileLocation); // process sub directories
        } else if (stat && stat.isFile() && ['.jpg', '.png'].indexOf(path.extname(fileLocation)) != -1) {
            allImages.push('static/'+file); // push all .jpf and .png files to all images
        }
    }

    // return all images in array formate
    return allImages;
}



app.listen(8080, function () {
    console.log(`[🚀] Server started on port 8080`);
});