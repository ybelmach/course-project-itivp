import { Router } from 'express';
import * as health from '../controllers/healthController';

export const router = Router();

router.get('/health', health.live);
router.get('/health/ready', health.ready);
