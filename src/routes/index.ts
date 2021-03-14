import { Router } from 'express'
import productsRouter from './products.routes'
import usersRouter from './user.routes'
import skuRouter from './sku.routes'
import sessionsRouter from './sessions.routes'

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/skus', skuRouter)
routes.use('/sessions', sessionsRouter)

export default routes
