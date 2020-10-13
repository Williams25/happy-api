import { Request, Response } from 'express'
import { getRepository } from "typeorm"
import Orphanages from "../models/Orphanages"
import OrphanageView from '../views/orphanages_view'
import * as Yup from 'yup'

export default {
  async create(req: Request, res: Response) {
    try {
      const { name, latitude, longitude, about, instructions, open_on_weekends, opening_hours } = req.body
      const reqImages = req.files as Express.Multer.File[]
      const images = reqImages.map(file => {
        return {
          path: file.filename
        }
      })

      const body = { name, latitude, longitude, about, instructions, open_on_weekends, opening_hours, images }

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        about: Yup.string().required().max(300),
        instructions: Yup.string().required(),
        open_on_weekends: Yup.boolean().required(),
        opening_hours: Yup.string().required(),
        images: Yup.array(Yup.object().shape({
          path: Yup.string().required()
        }))
      })

      await schema.validate(body, {
        abortEarly: false
      })

      const orphanagesRepository = getRepository(Orphanages)
      const orphanages = orphanagesRepository.create(body)

      await orphanagesRepository.save(orphanages)

      return res.status(201).json(orphanages)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },

  async getAllOrphanages(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanages)
    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    })
    return res.status(200).json(OrphanageView.renderMany(orphanages))
  },

  async getAllOrphanagesById(req: Request, res: Response) {
    const { id } = req.params
    try {
      const orphanagesRepository = getRepository(Orphanages)
      const orphanage = await orphanagesRepository.findOneOrFail({
        where: { id: id },
        relations: ['images']
      })
      return res.status(200).json(OrphanageView.render(orphanage))
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}