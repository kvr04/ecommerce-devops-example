import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

//App config
const app = express()
const port = process.env.PORT || 4000

const startServer = async () => {
    await connectDB()
    connectCloudinary()

    // middlewares
    app.use(express.json())
    app.use(cors({
    origin: "*",
    credentials: true
        }))

    // api endpoints
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/order', orderRouter);
    app.get('/', (req, res) => {
        res.send('API working')
    })

    app.listen(port, () => console.log('Server started on port: ' + port))
}

startServer().catch(err => {
    console.error('Failed to start server:', err.message || err)
    console.error(err)
    process.exit(1)
})