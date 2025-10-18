import express from "express"
import db from './utils/db.js'
import cors from 'cors'
import router from './routes/userRoutes.js'

const app = express()
const PORT = 5000


app.use(cors({ origin: "https://url-shortener-nine-mauve.vercel.app" }))


app.use(express.json())

app.use('/', router)


async function startServer() {
  try {
    await db()
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    })
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

startServer();



