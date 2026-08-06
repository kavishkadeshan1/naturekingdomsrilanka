import { Router } from 'express';
import { submitContact, getContacts } from '../controllers/contactController';

const router = Router();

// POST /api/contact
router.post('/', submitContact);

// GET /api/contact
router.get('/', getContacts);

export default router;
