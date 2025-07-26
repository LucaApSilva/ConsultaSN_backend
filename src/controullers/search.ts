import { CnpjaOpen } from "@cnpja/sdk"
import { Request, Response } from "express"


export async function searchCnpj(req: Request, res: Response) {

    let { cnpjs } = req.body

    const listCnpjs = cnpjs.split(',').map((cnpj: string) => cnpj.trim())

    let response = []

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    try {
        if (listCnpjs.length > 1) {
            for (let i = 0; i < listCnpjs.length; i++) {
                const cnpj = listCnpjs[i];

                const cnpja = new CnpjaOpen()
                const office = await cnpja.office.read({ taxId: cnpj })

                response.push({
                    Cnpj: office.taxId,
                    SimplesNacional: office.company.simples?.optant ?? false
                })

                await sleep(12000)
            }

            res.json(response)


        } else {

            await sleep(12000)

            const cnpja = new CnpjaOpen()
            const office = await cnpja.office.read({ taxId: listCnpjs[0] })

            res.json({
                cnpj: office.taxId,
                simplesNacional: office.company.simples?.optant ?? false
            })


        }
    } catch (error) {
        res.json({
            mensagem: 'Erro ao consultar os CNPJs',
            Error: console.log(error)
        })
    }


}
