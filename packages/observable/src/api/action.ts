import { globalState } from '../core/globalState'
import { isPromise } from '../utils/isPromise'
import { ActionFn } from '../typings'

export async function action(fn: ActionFn) {
  globalState.actionPendingCount++
  const result = fn()
  if (isPromise(result)) await result

  globalState.actionPendingCount--
}
