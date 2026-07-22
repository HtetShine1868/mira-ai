import multer from 'multer';
// Use memory storage so the files are not written to disk
const storage = multer.memoryStorage();
// Supported MIME types for images
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const fileFilter = (req, file, callback) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        callback(null, true);
    }
    else {
        callback(new Error(`Unsupported image format. Allowed formats: JPEG, PNG, WEBP, GIF. Received: ${file.mimetype}`));
    }
};
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter: fileFilter,
});
//# sourceMappingURL=upload.js.map