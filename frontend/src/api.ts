import { createEffect } from 'effector'
import { validate } from 'superstruct-ts-transformer'
import { createMutationRemoteData } from './remoteData'

export type Message = {
  // type: string
  // time: number
  // isMeta: boolean
  // code: number
  // number: number
  // text: string
  // name: string
  // channel: number
  // port: number
  // tempo: number
  // numerator: number
  // denominator: number
  // clocksPerTick: number
  // // notated32: number
  // key: number
  // isMajoer: boolean
  // note: number
  // velocity: number
  // value: number
  // control: number
  // program: number
  // pitch: number
  // data: number[]
  note: number
}

export type Track = {
  name: string
  messages: Message[]
}

export type Song = {
  title: string
  artist: string
  tracks: Track[]
}

const rootApiUrl = 'http://localhost:5000'

const fail4xx = (response: Response) => {
  if (response.status >= 400 && response.status < 500) {
    throw response.json()
  }
}

const toJson = (response: Response) => response.json()

const processResponse = (response: Response) => {
  fail4xx(response)
  return toJson(response)
}

const _uploadSong = (data: FIXME): Promise<Song> =>
  fetch(`${rootApiUrl}/song/process`, { method: 'POST' })
    .then(processResponse)
    .then((json) => validate<Song>(json))

export const uploadSongEffect = createEffect('uploadSong', {
  handler: _uploadSong,
})

export const uploadSongStore = createMutationRemoteData(
  uploadSongEffect,
  'uploadSong',
)
