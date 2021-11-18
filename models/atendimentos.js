const moment = require('moment')
const connection = require('../database/connection')

class Atendimento {
    add(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.client.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'client',
                valido: clienteValido,
                mensagem: "Cliente deve ter pelo menos 5 caracteres"
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            const sql = 'INSERT INTO atendimentos SET ?'
    
            connection.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimento)
                }
            })
        }
    }

    list(res) {
        const sql = 'SELECT * FROM atendimentos'

        connection.query(sql, (error, response) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(response)
            }
        })
    }

    getById(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`

        connection.query(sql, (error, response) => {
            const atendimento = response [0]
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    change(id, valors, res) {
        if(valors.data) {
            valors.data = moment(valors.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE atendimentos SET ? WHERE id=?'

        connection.query(sql, [valors, id], (error, response) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({...valors, id})
            }
        })
    }

    deleteById(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id=?'

        connection.query(sql, id, (error, response) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento