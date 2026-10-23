import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  // Výpis všech uživatelů
  public async index({ response }: HttpContext) {
    const users = await User.all()
    return response.json(users)
  }

  // Vytvoření nového uživatele
  public async store({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password'])
    const user = await User.create(data)
    return response.status(201).json(user)
  }

  // Smazání uživatele podle ID
  public async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.json({ message: 'Uživatel byl úspěšně smazán' })
  }
}
