import app from "./app.js";

const PORT = process.env.PORT_API || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
