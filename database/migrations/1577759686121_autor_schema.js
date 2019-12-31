'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AutorSchema extends Schema {
  up () {
    this.create('autors', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.boolean('active')
      table.timestamps()
    })
  }

  down () {
    this.drop('autors')
  }
}

module.exports = AutorSchema
