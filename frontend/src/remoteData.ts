import { createStore, Effect } from 'effector'

export type MutationRequest<TData, TError = Error> =
  | { state: 'pristine' }
  | { state: 'inflight' }
  | { state: 'done'; data: TData }
  | { state: 'fail'; error: TError }

export const createMutationRemoteData = <TData, TError = Error>(
  effect: Effect<unknown, TData, TError>,
  name?: string,
) =>
  createStore<MutationRequest<TData, TError>>(
    {
      state: 'pristine',
    },
    { name },
  )
    .on(effect.pending, () => ({ state: 'inflight' }))
    .on(effect.doneData, (_, data) => ({ state: 'done', data }))
    .on(effect.failData, (_, error) => ({ state: 'fail', error }))
