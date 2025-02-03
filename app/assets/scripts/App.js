import '../styles/styles.css'

import Joy from './modules/Joy'

new Joy();

if (module.hot) {
    module.hot.accept()
}
