import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { analyzeImageController } from '../controllers/analyze.js';
const router = Router();
// Endpoint: POST /api/analyze
// Handles multipart/form-data with "image" key containing the image file
router.post('/analyze', upload.single('image'), analyzeImageController);
export default router;
//# sourceMappingURL=analyze.js.map