import Game from '#models/game'
import axios, { AxiosInstance } from 'axios'

type SteamGame = {
  appid: number
  name: string
}

type SteamGameDetails = {
  type?: string
  name: string
  short_description: string
  price: string
  isFree: boolean
  header_image: string
  thumbnail: string
  thumbnail2: string
}

export default class SteamApiService {
  private apiClient: AxiosInstance

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://api.steampowered.com/', // base URL
    })
  }

  // Using model Game from games.ts
  async getGameList(): Promise<Game[]> {
    try {
      const response = await this.apiClient.get('/ISteamApps/GetAppList/v2/')
      const gamesList = response.data.applist.apps

      const games: Game[] = gamesList.map((gameList: SteamGame) => ({
        appid: gameList.appid,
        name: gameList.name,
      }))

      return games
    } catch (error) {
      console.error('Failed to fetch game list:', error)
      throw error
    }
  }

  // Directly using typescript interface/type system
  async getGameListWithType(): Promise<SteamGame[]> {
    try {
      const response = await this.apiClient.get('/ISteamApps/GetAppList/v2/')
      const gamesList = response.data.applist.apps

      return gamesList
    } catch (error) {
      console.error('Failed to fetch game list:', error)
      throw error
    }
  }

  async getGameListDetails(appId: number): Promise<SteamGameDetails> {
    try {
      const response = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${appId}`
      )
      return {
        type: response.data[appId]?.data?.type || 'Unknown',
        name: response.data[appId]?.data?.name || 'No Name',
        short_description: response.data[appId]?.data?.short_description || 'No Description',
        isFree: response.data[appId]?.data?.is_free || false,
        price: response.data[appId]?.data?.price_overview?.final_formatted || 'Free',
        header_image: response.data[appId]?.data?.header_image || '',
        thumbnail: response.data[appId]?.data?.capsule_image || '',
        thumbnail2: response.data[appId]?.data?.capsule_imagev5 || '',
      }
    } catch (error) {
      console.error('Failed to fetch game details:', error)
      throw error
    }
  }
}
