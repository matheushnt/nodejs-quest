import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

/*
Formas de enviar informações para o back-end:
 - Query Parameters: parâmetros nomeados enviados na URL da requisição. Caract.: URL Stateful. Usados como filtros, paginação, ou seja, modificam a resposta. Não são obrigatórios.
   - Ex.: http://localhost:3333/users?userId=1&name=Matheus
 - Route Parameters: parâmetros não nomeados enviados também na URL da requisição. São usados para Identificação de Recursos.
   - Ex.: GET http://localhost:3333/users/1
   - Ex.: DELETE http://localhost:3333/users/1
 - Request Body: Envio de informações, geralmente de formulários. Caso seja utilizado HTTPS, as infos são mais difíceis de serem violadas.
   - Ex.: POST http://localhost:3333/users/
          -> os dados são enviados no body
*/

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    console.log(routeParams);

    return route.handler(req, res);
  }
});

server.listen(3333);
