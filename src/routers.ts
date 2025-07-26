import { Router } from 'express'
import { searchCnpj } from './controullers/search'

const router = Router()

router.post('/search-cnpj', searchCnpj)

export default router