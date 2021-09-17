import db from './db.js';
import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json())



app.get('/produto', async (req, resp) => {
    
    try {
        let r = await db.tb_produto.findAll({order: [['id_produto', 'desc']]});
        resp.send(r)
    } catch(e) {
        return resp.send({error: e.toString()})
    }
})


app.post('/produto', async (req, resp) => {
    try {
        
        let usuParam = req.body;

        let r = {
            nm_produto: usuParam.produto,
            ds_categoria: usuParam.categoria,
            vl_preco_de: usuParam.precode,
            vl_preco_por: usuParam.precopor,
            vl_avaliacao: usuParam.avaliacao,
            ds_produto: usuParam.descricao,
            qtd_estoque: usuParam.estoque,
            img_produto: usuParam.imagem,
            bt_ativo: usuParam.ativo,
            dt_inclusao: new Date()
        }

        let x = await db.tb_produto.create(r);

        resp.send(x)

    } catch (e) {
        return resp.send({error: e.toString()})
    }
})



app.put('/produto/:id', async (req, resp) => {
    try {
        
        let id = req.params.id;
        let usuParam = req.body;

        let r = await db.tb_produto.update(
            {
            nm_produto: usuParam.produto,
                ds_categoria: usuParam.categoria,
                vl_preco_de: usuParam.precode,
                vl_preco_por: usuParam.precopor,
                vl_avaliacao: usuParam.avaliacao,
                ds_produto: usuParam.descricao,
                qtd_estoque: usuParam.estoque,
                img_produto: usuParam.imagem,
                bt_ativo: usuParam.ativo,
                dt_inclusao: new Date()
            },
            {
                where: {id_produto: id}
            })
        
        resp.sendStatus(200);

    } catch (e) {
        return resp.send({error: e.toString()})
    }
})



app.delete('/produto/:id', async (req, resp) => {
    
    try{
        let r = await db.tb_produto.destroy({ where: { id_produto: req.params.id } })
        resp.sendStatus(200)
    } catch (e) {
        return resp.send({error: e.toString()})
    }
})



app.listen(process.env.PORT,
x => console.log(`Server up at port ${process.env.PORT}`))