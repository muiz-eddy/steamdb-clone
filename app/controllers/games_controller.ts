import type { HttpContext } from '@adonisjs/core/http'
import SteamApiService from '#services/steam_api_service'
import GameDetail from '#models/game_detail'

export default class GamesController {
  private steamApiService: SteamApiService

  constructor() {
    this.steamApiService = new SteamApiService()
  }

  async steamGameList({ response }: HttpContext) {
    try {
      const games = await this.steamApiService.getGameListWithType()
      return response.ok(games)
    } catch (error) {
      console.error('Error fetching Steam game list', error)
      return response.internalServerError({ message: 'Failed to fetch Steam games' })
    }
  }

  /*
   *  View game details individually
   */

  async steamGameListWithDetails({ response }: HttpContext) {
    try {
      const games = await this.steamApiService.getGameListWithType()
      return response.ok(games)
    } catch (error) {
      console.error('Error fetching Steam game list', error)
      return response.internalServerError({ message: 'Failed to fetch Steam games' })
    }
  }

  /*
   *  Save game details individually to database
   */

  async saveGameDetails({ request, response }: HttpContext) {
    try {
      const appId = request.input('appId')
      const gameDetails = await this.steamApiService.getGameListDetails(appId)

      const savedGame = await GameDetail.updateOrCreate({ appId }, gameDetails)
      return response.ok(savedGame)
    } catch (error) {
      console.error('Error saving game details:', error)
      return response.status(500).send({ message: 'Internal Server Error', error: error.message })
    }
  }

  /*
   *  Save all game details to database
   */

  async saveAndUpdateAllGameDetails({ response }: HttpContext) {
    try {
      const games = await this.steamApiService.getGameListWithType()
      for (const game of games) {
        const appId = game.appid
        const existingGame = await GameDetail.findBy('appId', appId)
        if (!existingGame) {
          const gameDetails = await this.steamApiService.getGameListDetails(appId)
          await GameDetail.updateOrCreate({ appId }, gameDetails)
        }
      }
      return response.ok({ message: 'All game details saved successfully' })
    } catch (error) {
      console.error('Error saving game details:', error)
      return response.status(500).send({ message: 'Internal Server Error', error: error.message })
    }
  }

  // TODO: Performance enhancement, run API in parallel
  async saveAndUpdateAllGameDetailsInParallel({ response }: HttpContext) {
    try {
      const games = await this.steamApiService.getGameListWithType()
      for (const game of games) {
        const appId = game.appid
        const existingGame = await GameDetail.findBy('appId', appId)
        if (!existingGame) {
          const gameDetails = await this.steamApiService.getGameListDetails(appId)
          await GameDetail.updateOrCreate({ appId }, gameDetails)
        }
      }
      return response.ok({ message: 'All game details saved successfully' })
    } catch (error) {
      console.error('Error saving game details:', error)
      return response.status(500).send({ message: 'Internal Server Error', error: error.message })
    }
  }
}
