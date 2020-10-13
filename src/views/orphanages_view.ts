import Orpanage from '../models/Orphanages'
import images_view from './images_view'
export default {
  render(orpanage: Orpanage) {
    return {
      id: orpanage.id,
      name: orpanage.name,
      latitude: orpanage.latitude,
      longitude: orpanage.longitude,
      about: orpanage.about,
      instructions: orpanage.instructions,
      opening_hours: orpanage.opening_hours,
      open_on_weekends: orpanage.open_on_weekends,
      images: images_view.renderMany(orpanage.images)
    }
  },

  renderMany(orpanage: Orpanage[]) {
    return orpanage.map(orpanage => this.render(orpanage))
  }
}