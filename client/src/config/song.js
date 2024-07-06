import axios from './axios.js'

export const getSongs = () => axios.get('/songs')
export const getOnly = song => axios.get(`/song/${song.id}`)
export const updateSong = song => axios.put(`/song/${song.id}`,song)
export const saveSong = song => axios.post(`/song/`,song)
export const deleteSong = song => axios.delete(`/song/${song.id}`)
