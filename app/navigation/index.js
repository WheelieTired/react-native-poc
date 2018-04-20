import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import App from '../../../App'

const navReducer = (state, action) => {
  const newState = App.router.getStateForAction(action, state)
  return newState || state
}

export default () => {
  const rootReducer = combineReducers({
    nav: navReducer
  })

  return createStore(rootReducer)
}