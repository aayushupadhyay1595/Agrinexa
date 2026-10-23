import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ success: false, message: 'Authentication required. Please log in.' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ success: false, message: 'Session expired or invalid token. Please log in again.' });
    }
}
export function optionalAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = decoded;
        }
        catch {
            // Ignore token failure for optional endpoints
        }
    }
    next();
}
