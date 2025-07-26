import "dotenv/config"
import app from "./app"
import router from "./routers"

const porta = process.env.PORT || 3000

app.use(router)
app.listen(porta, () => console.log(`API rodando na porta ${porta}`))