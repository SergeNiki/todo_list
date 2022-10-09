const jwt = require('jsonwebtoken');

module.exports = (roles) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            console.log(req.headers.authorization);
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
              res.status(403).json({ message: 'Пользователь не авторизован' });
            }
            const {role: userRole} = jwt.verify(token, process.env.SECRET_KEY);
            let hasRole = roles.some((role) => role === userRole)
            if (!hasRole) {
                return res.status(403).json({message: 'Нет доступа'})
            }
            next();
        } catch (error) {
            console.log(error);
            res.status(403).json({ message: 'Ошибка с ролью пользователя' });
        }
    }
}