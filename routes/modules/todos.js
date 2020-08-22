const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

//新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

//新增到資料庫
router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name
  return Todo.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//查看特定一筆資料
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({_id, userId})
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//資料修改頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({_id, userId})
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//資料修改到資料庫
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body

  return Todo.findOne({_id, userId})
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})

//資料刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({_id, userId})
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
