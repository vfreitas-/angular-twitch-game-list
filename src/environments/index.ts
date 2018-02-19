export default APP_ENV === 'production'
    ? require('./production').default
    : require('./local').default