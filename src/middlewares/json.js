// middlewares são funções executadas entre a requisição HTTP e a resposta final da aplicação. Funcionam como uma camada intermediária.

// Podem: processar dados da requisição, modificar e executar lógica adicional

// Características: execução sequencial, reutilizáveis, modulares, flexíveis.

/*
Exemplos comuns:
 - Autenticação: verificar se o usuário está logado
 - Parsing: converter dados
 - Validação: verificar se os dados estão corretos
 - Rate limiting: limitar o nº de requisições
*/
export async function json(req, res) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  res.setHeader('Content-Type', 'application/json');
}
