'use strict'

const Article = use('App/Models/Article')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with articles
 */
class ArticleController {
  /**
   * Show a list of all articles.
   * GET articles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const articles = Article.all()
    return articles
  }

  /**
   * Render a form to be used for creating a new article.
   * GET articles/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

  }

  /**
   * Create/save a new article.
   * POST articles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only([
      'title',
      'body'
    ])

    const article = await Article.create({ ...data, user_id: id })

    return article
  }

  /**
   * Display a single article.
   * GET articles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const article = await Article.findOrFail(params.id)

    return article
  }

  /**
   * Render a form to update an existing article.
   * GET articles/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {

  }

  /**
   * Update article details.
   * PUT or PATCH articles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const article = await Article.findOrFail(params.id)

    const data = request.only([
      'title',
      'body'
    ])

    article.merge(data)

    await article.save()

    return article
  }

  /**
   * Delete a article with id.
   * DELETE articles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, request, response }) {
    const article = await Article.findOrFail(params.id)

    if (article.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await article.delete()
  }
}

module.exports = ArticleController
