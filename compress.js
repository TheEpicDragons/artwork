import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

    console.log("[➕] Creating folder...");
    fs.mkdirSync(path.join(__dirname, 'compressed'))
    console.log("[📁] Folder created!");
    console.log("[📦] Compressing images...");

    const images = imagemin(['uploads/*.{jpg,png}'], {
        destination: 'compressed',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });

