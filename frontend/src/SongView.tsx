import { useStore } from 'effector-react'
import React from 'react'
import { uploadSongStore } from './api'
import { tw, twIf } from './tw'
import { Paper } from './ui/Paper'
import { SpinnerOverlay } from './ui/SpinnerOverlay'

export const SongView: React.FC<{}> = () => {
  const state = useStore(uploadSongStore)
  const getContent = () => {
    switch (state.state) {
      case 'inflight':
        return <SpinnerOverlay size="12" />
      default:
        return 'asd'
    }
  }
  return (
    <Paper
      className={tw([
        'relative',
        ...twIf(['h-20'], state.state === 'inflight'),
      ])}
    >
      {getContent()}
    </Paper>
  )
}
