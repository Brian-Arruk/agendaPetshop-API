const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos',(req, res) => {
        Atendimento.list(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.getById(id, res)

        
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.add(atendimento, res)
    })

    app.patch('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        const valors = req.body

        Atendimento.change(id, valors, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.deleteById(id, res)
    })
    
}