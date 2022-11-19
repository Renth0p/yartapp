import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async(req,res) => {
    try {
        const {postId, comment} = req.body

        if(!comment) return res.json({message: 'Комментарий не может быть пустым'})

        const newComment = new Comment({comment})
        await newComment.save()

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: {comment: newComment._id}
            })
        } catch (e) {
            res.json({message: 'Что-то пошло не так | Post'})
        }

        res.json(newComment)

    } catch (e) {
        res.json({message: 'Что-то пошло не так'})
    }
}