import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'
import UserController from '#controllers/users_controller'
// Hlavní stránka
router.get('/', async ({ view }) => {
  return view.render('pages/home')
}).as('home')

// Skupina pro nepřihlášené uživatele (Hosté)
router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

// Skupina pro přihlášené uživatele (Autentizovaná sekce)
router
  .group(() => {
    router.get('/dashboard', async ({ view }) => {
      return view.render('pages/dashboard')
    }).as('dashboard')

    router.post('logout', [controllers.Session, 'destroy'])

    // Správa uživatelů (CRUD)
    router.get('/users', [UserController, 'index'])
    router.post('/users', [UserController, 'store'])
    router.delete('/users/:id', [UserController, 'destroy'])
  })
  .use(middleware.auth())
