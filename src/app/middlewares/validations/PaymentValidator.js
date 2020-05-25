import * as Yup from 'yup';

class PaymentValidator {
  async store(req, res, next) {
    const schemaParams = Yup.object().shape({
      operator: Yup.string('O campo precisa ser uma string').required(
        'Este campo é obrigatório.'
      ),
    });

    try {
      await schemaParams.validate(req.params);
    } catch (error) {
      return res.status(400).json(error.errors);
    }

    const schemaBody = Yup.object().shape({
      numero_cartao: Yup.string('Esse campo é obrigatoriamente é uma String.')
        .label('numero_cartao')
        .length(19, 'O número do cartão deve ter 19 caracteres.')
        .required('numero_cartao é um campo obrigatório.'),
      nome_cliente: Yup.string('Esse campo é obrigatoriamente é uma String.')
        .min(3, 'O nome do cliente deve ter no mínimo 3 caracteres.')
        .required('nome_cliente é um campo obrigatório.'),
      bandeira: Yup.string('Esse campo é obrigatoriamente é uma String.')
        .lowercase('O nome da bandeira deve esta em caixa baixa.')
        .required('bandeira é um campo obrigatório.'),
      cod_seguranca: Yup.number('Esse campo é obrigatoriamente é uma Number.')
        .positive('O número deve ser positivo.')
        .required('cod_seguranca é um campo obrigatório.')
        .min(100, 'O código de segurança deve ter no mínimo 3 caracteres.')
        .max(999, 'O código de segurança deve ter no máximo 3 caracteres.'),
      valor_em_centavos: Yup.number(
        'Esse campo é obrigatoriamente é uma Number.'
      )
        .positive('O número deve ser positivo.')
        .required('valor_em_centavos é um campo obrigatório.'),
      parcelas: Yup.number('Esse campo é obrigatoriamente é uma Number.')
        .positive('O número deve ser positivo.')
        .min(1)
        .required('parcelas é um campo obrigatório.'),
      cod_loja: Yup.string('Esse campo é obrigatoriamente é uma String.')
        .lowercase('O cod da loja deve esta em caixa baixa.')
        .required('cod_loja é um campo obrigatório.'),
    });

    try {
      await schemaBody.validate(req.body);
    } catch (error) {
      return res.status(400).json(error.errors);
    }

    return next();
  }
}

export default new PaymentValidator();
