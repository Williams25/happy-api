import {Router} from 'express'
import OrphanagesController from './controllers/OrphanagesController'
import multer from 'multer'
import uploadConfig from './config/upload'

const upload = multer(uploadConfig)
const routes = Router()


routes.post('/orphanages',upload.array('images') ,OrphanagesController.create)
routes.get('/orphanages', OrphanagesController.getAllOrphanages)
routes.get('/orphanages/:id', OrphanagesController.getAllOrphanagesById)

export default routes

// {
// 	"name": "Lar das meninas",
// 	"latitude": -21.6041438,
// 	"longitude": -48.3673525,
// 	"about": "sobre",
// 	"instructions": "venha visitar",
// 	"opening_hours": "8h as 16h",
// 	"open_on_weekends": true
// }