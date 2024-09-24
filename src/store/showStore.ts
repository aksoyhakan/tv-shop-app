import { defineStore } from "pinia"
import {
	searchShows,
	getShowDetails,
	getShowEpisodes,
	TVShow,
	TVShowData,
	Episode,
} from "../services/api"

interface ShowState {
	shows: TVShowData[]
	filteredShows: TVShowData[]
	selectedShow: TVShow | null
	episodes: Episode[]
	loading: boolean
	error: string | null
}

export const useShowStore = defineStore("showStore", {
	state: (): ShowState => ({
		shows: [],
		filteredShows: [],
		selectedShow: null,
		episodes: [],
		loading: false,
		error: null,
	}),

	actions: {
		async fetchShows(query: string) {
			this.loading = true
			try {
				const results = await searchShows(query)
				this.shows = results
				this.filteredShows = results
			} catch (error) {
				this.error = "Diziler yüklenirken bir hata oluştu."
			} finally {
				this.loading = false
			}
		},

		async fetchShowDetails(id: number) {
			this.loading = true
			try {
				this.selectedShow = await getShowDetails(id)
			} catch (error) {
				this.error = "Dizi detayları yüklenirken bir hata oluştu."
			} finally {
				this.loading = false
			}
		},

		async fetchEpisodes(id: number) {
			this.loading = true
			try {
				this.episodes = await getShowEpisodes(id)
			} catch (error) {
				this.error = "Bölümler yüklenirken bir hata oluştu."
			} finally {
				this.loading = false
			}
		},
	},
})
