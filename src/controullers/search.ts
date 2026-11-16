import { Request, Response } from "express"


export async function searchCnpj(req: Request, res: Response) {

    let { cnpjs } = req.body

    const listCnpjs = cnpjs.split(';').map((cnpj: string) => cnpj.trim())

    for (const cnpj of listCnpjs) {
        if (cnpj.length < 2) {
            let index = listCnpjs.indexOf(cnpj)

            listCnpjs.splice(index, 1)
        }
    }

    let response = []

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    try {
        for (let i = 0; i < listCnpjs.length; i++) {
            const cnpj = listCnpjs[i];

            console.log(cnpj)

            const responseApi = await fetch(`https://kitana.opencnpj.com/cnpj/${cnpj}`)

            if (!responseApi.ok) {
                throw new Error(`Erro HTTP: ${responseApi.status}`)
            }

            const resultado = await responseApi.json()

            response.push({
                Cnpj: resultado.data.cnpj,
                SimplesNacional: resultado.data.opcaoSimples
            })

            await sleep(500)

        }

        res.json(response)

    } catch (error) {
        res.json({
            mensagem: 'Erro ao consultar os CNPJs',
            Error: console.log(error)
        })
    }


}
