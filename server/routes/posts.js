import { Router} from "express";
import {checkAuth} from "../utils/checkAuth.js";
import {
    createPost,
    getAll,
    getById,
    getMyPosts,
    getPostComments,
    removePost,
    updatePost
} from "../controllers/posts.js";

const router = new Router()

// Create post
router.post('/', checkAuth, createPost)
router.get('/', getAll)
router.get('/:id', getById)
router.get('/user/me', checkAuth, getMyPosts)
router.delete('/:id', checkAuth, removePost)
router.put('/:id', checkAuth, updatePost)
router.put('/comments/:id', getPostComments)

export  default router