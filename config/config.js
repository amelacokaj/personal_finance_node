module.exports = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'escrow',
    charset: 'utf8'
  },
  pool: {
    min: 2,
    max: 10
  }
};