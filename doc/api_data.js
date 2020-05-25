define({ "api": [
  {
    "type": "get",
    "url": "/status",
    "title": "Status da API",
    "version": "1.0.0",
    "group": "Recursos_Abertos",
    "description": "<p>Verifica a disponibilidade da API.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Verifica a disponibilidade da API.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Resposta de Sucesso:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"Serviço disponível WS1\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app/controllers/StatusController.js",
    "groupTitle": "Recursos_Abertos",
    "name": "GetStatus"
  },
  {
    "type": "post",
    "url": "/pay/:operator",
    "title": "Executa o pagamento via cartão de crédito",
    "version": "1.0.0",
    "group": "Recursos_Autenticados",
    "description": "<p>Envia a solicitação para pagamento via cartão de crédito a operadora de cartão.</p>",
    "parameter": {
      "fields": {
        "Params": [
          {
            "group": "Params",
            "type": "String",
            "optional": false,
            "field": "operator",
            "description": "<p>Parâmetro da url que corresponde a operadora de cartão desejado.</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "numero_cartao",
            "description": "<p>Numero do cartão com 16 dígitos númericos e a cada 4 dígitos são separados por pontos.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "nome_cliente",
            "description": "<p>Nome do titular do cartão de crédito.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "bandeira",
            "description": "<p>Nome da bandeira do cartão.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "cod_seguranca",
            "description": "<p>Código de três dígitos.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "valor_em_centavos",
            "description": "<p>Valor em centavos da compra.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "parcelas",
            "description": "<p>Quantidade de parcelas para o pagamento.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "cod_loja",
            "description": "<p>Código único da loja e-commerce.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Exemplo de Requisição:",
        "content": "POST http://localhost:3333/ws-operators/v1/pay/op-01\n{\n  \"numero_cartao\": \"1111.2222.3333.4444\",\n  \"nome_cliente\": \"USUARIO DA SILVA\",\n  \"bandeira\": \"mister\",\n  \"cod_seguranca\": 111,\n  \"valor_em_centavos\": 500,\n  \"parcelas\": 12,\n  \"cod_loja\": \"loja-01\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "resposta",
            "description": "<p>Resultado da transação.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "nome_cliente",
            "description": "<p>Nome do titular do cartão de crédito.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "valor_em_centavos",
            "description": "<p>Valor em centavos da compra.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "parcelas",
            "description": "<p>Quantidade de parcelas em que o pagamento foi feito.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Resposta de Sucesso:",
          "content": "HTTP/1.1 200 OK\n{\n  \"resposta\": \"sucesso\",\n  \"nome_cliente\": \"USUARIO DA SILVA\",\n  \"valor_em_centavos\": 500,\n  \"parcelas\": 12\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Operadora Inválida - Resposta de Erro:",
          "content": "HTTP/1.1 400 Error\n{\n  \"resposta\": \"falha\",\n  \"detalhes\": \"Operadora não existe\",\n  \"operadora\": \"op-0X\"\n}",
          "type": "json"
        },
        {
          "title": "Loja inválida - Resposta de Erro:",
          "content": "HTTP/1.1 400 Error\n{\n  \"resposta\": \"falha\",\n  \"detalhes\": \"Loja não autorizada\",\n  \"operadora\": \"op-01\",\n  \"cod-loja\": \"loja-0X\"\n}",
          "type": "json"
        },
        {
          "title": "Bandeira inválida - Resposta de Erro:",
          "content": "HTTP/1.1 400 Error\n{\n  \"resposta\": \"falha\",\n  \"detalhes\": \"Bandeira não autorizada\",\n  \"operadora\": \"op-01\",\n  \"bandeira\": \"bandeira\"\n}",
          "type": "json"
        },
        {
          "title": "Números de parcelas acima do permitido - Resposta de Erro:",
          "content": "HTTP/1.1 400 Error\n{\n  \"resposta\": \"falha\",\n  \"detalhes\": \"Limite de parcelas ultrapassado\",\n  \"bandeira\": \"mister\",\n  \"parcelas_solicitadas\": 13,\n  \"limite_parcelas\": 12\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app/controllers/PaymentController.js",
    "groupTitle": "Recursos_Autenticados",
    "name": "PostPayOperator"
  }
] });
