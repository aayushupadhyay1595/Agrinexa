import { Router } from 'express';
import { db } from '../db/database.js';
import { optionalAuth } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', optionalAuth, (req, res) => {
    const userId = req.user?.id || 'demo-user-agrinexa';
    const alerts = db.prepare('SELECT * FROM user_alerts WHERE user_id = ? ORDER BY created_at DESC LIMIT 10').all(userId);
    res.json({ success: true, count: alerts.length, alerts });
});
router.put('/:id/read', optionalAuth, (req, res) => {
    const { id } = req.params;
    db.prepare('UPDATE user_alerts SET is_read = 1 WHERE id = ?').run(id);
    res.json({ success: true });
});
export default router;
