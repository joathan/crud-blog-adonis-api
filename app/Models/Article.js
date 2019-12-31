'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Article extends Model {

  user () {
    return this.belongsTo('App/Models/User')
  }

  autors () {
    return this.belongsTo('App/Models/Autor')
  }
}

module.exports = Article
