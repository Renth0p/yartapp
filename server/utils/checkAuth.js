import jwt from 'jsonwebtoken'

// req - from back to front , res from front to back, next - middleware function

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id

            next()

        } catch (e) {
            return res.json({
                message: 'Нет доступа'
            })
        }
    } else {
        return res.json({
            message: 'Нет доступа'
        })
    }

}