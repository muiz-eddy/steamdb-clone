/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const GamesController = () => import('#controllers/games_controller')

router.post('/games-details', [GamesController, 'saveGameDetails'])

router.get('/games', [GamesController, 'steamGameList'])

router.get('/games-details-all', [GamesController, 'saveAndUpdateAllGameDetails'])

router.get('/', async () => {
  return {
    Hello: 'world',
  }
})
