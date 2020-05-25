import { brands, operators, stores } from '../../database';

class PaymentController {
  /**
   * @api {post} /pay/:operator Executa o pagamento via cartão de crédito
   * @apiVersion  1.0.0
   * @apiGroup Recursos Autenticados
   * @apiDescription Envia a solicitação para pagamento via cartão de crédito a operadora de cartão.
   *
   * @apiParam (Params) {String} operator Parâmetro da url que corresponde a operadora de cartão desejado.
   *
   * @apiParam (Body) {String} numero_cartao Numero do cartão com 16 dígitos númericos e a cada 4 dígitos são separados por pontos.
   * @apiParam (Body) {String} nome_cliente Nome do titular do cartão de crédito.
   * @apiParam (Body) {String} bandeira Nome da bandeira do cartão.
   * @apiParam (Body) {Number} cod_seguranca Código de três dígitos.
   * @apiParam (Body) {Number} valor_em_centavos Valor em centavos da compra.
   * @apiParam (Body) {Number} parcelas Quantidade de parcelas para o pagamento.
   * @apiParam (Body) {String} cod_loja Código único da loja e-commerce.
   *
   * @apiExample Exemplo de Requisição:
   *  POST http://localhost:3333/ws-operators/v1/pay/op-01
   *  {
   *    "numero_cartao": "1111.2222.3333.4444",
   *    "nome_cliente": "USUARIO DA SILVA",
   *    "bandeira": "mister",
   *    "cod_seguranca": 111,
   *    "valor_em_centavos": 500,
   *    "parcelas": 12,
   *    "cod_loja": "loja-01"
   *  }
   *
   * @apiSuccess (200) {String} resposta Resultado da transação.
   * @apiSuccess (200) {String} nome_cliente Nome do titular do cartão de crédito.
   * @apiSuccess (200) {Number} valor_em_centavos Valor em centavos da compra.
   * @apiSuccess (200) {Number} parcelas Quantidade de parcelas em que o pagamento foi feito.
   *
   * @apiSuccessExample Resposta de Sucesso:
   *  HTTP/1.1 200 OK
   *  {
   *    "resposta": "sucesso",
   *    "nome_cliente": "USUARIO DA SILVA",
   *    "valor_em_centavos": 500,
   *    "parcelas": 12
   *  }
   *
   * @apiErrorExample {json} Operadora Inválida - Resposta de Erro:
   *  HTTP/1.1 400 Error
   *  {
   *    "resposta": "falha",
   *    "detalhes": "Operadora não existe",
   *    "operadora": "op-0X"
   *  }
   *
   * @apiErrorExample {json} Loja inválida - Resposta de Erro:
   *  HTTP/1.1 400 Error
   *  {
   *    "resposta": "falha",
   *    "detalhes": "Loja não autorizada",
   *    "operadora": "op-01",
   *    "cod-loja": "loja-0X"
   *  }
   *
   *
   * @apiErrorExample {json} Bandeira inválida - Resposta de Erro:
   *  HTTP/1.1 400 Error
   *  {
   *    "resposta": "falha",
   *    "detalhes": "Bandeira não autorizada",
   *    "operadora": "op-01",
   *    "bandeira": "bandeira"
   *  }
   *
   * @apiErrorExample {json} Números de parcelas acima do permitido - Resposta de Erro:
   *  HTTP/1.1 400 Error
   *  {
   *    "resposta": "falha",
   *    "detalhes": "Limite de parcelas ultrapassado",
   *    "bandeira": "mister",
   *    "parcelas_solicitadas": 13,
   *    "limite_parcelas": 12
   *  }
   *
   */
  store(req, res) {
    const {
      nome_cliente,
      bandeira,
      valor_em_centavos,
      parcelas,
      cod_loja,
    } = req.body;

    const { operator } = req.params;

    const validOperator = operators.find((op) => op === operator);

    if (!validOperator) {
      return res.status(400).json({
        resposta: 'falha',
        detalhes: 'Operadora não existe',
        operadora: operator,
      });
    }

    const validStore = stores.find((store) => store === cod_loja);

    if (!validStore) {
      return res.status(400).json({
        resposta: 'falha',
        detalhes: 'Loja não autorizada',
        operadora: operator,
        'cod-loja': cod_loja,
      });
    }

    const validBrand = brands.find((brand) => brand.name === bandeira);

    if (!validBrand) {
      return res.status(400).json({
        resposta: 'falha',
        detalhes: 'Bandeira não autorizada',
        operadora: operator,
        bandeira,
      });
    }

    if (parcelas > validBrand.installments) {
      return res.status(400).json({
        resposta: 'falha',
        detalhes: 'Limite de parcelas ultrapassado',
        bandeira,
        parcelas_solicitadas: parcelas,
        limite_parcelas: validBrand.installments,
      });
    }

    return res.status(200).json({
      resposta: 'sucesso',
      nome_cliente,
      valor_em_centavos,
      parcelas,
    });
  }
}

export default new PaymentController();
