const { getAllPost, getPostById, createPost, updatePost, deletePost } = require('./post.repository')

// to get all the posts 
const getAllPostsCtrl = async (req, res) => {
    try {
        const data = await getAllPost()
        return res.json({
            status: "Success",
            data: data
        })
    } catch (err) {
        console.log(`error in getAllPostCtrl,${err}`)
    }
}

// to create a new post 
const createPostCtrl = async (req, res) => {
    try {
        const { imageUrl, caption } = req.body

        const newPost = {
            userId: req.user._id,
            imageUrl,
            caption
        }
        await createPost(newPost)
        res.json({
            status: "Success",
            message: "post added successfully"
        })
    } catch (err) {
        console.log(`error in createPostCtrl, ${err}`)
    }
}

// update a post 
const updatePostCtrl = async (req, res) => {
    try {
        const postId = req.params.id
        const { imageUrl, caption } = req.body
        const postIs = await getPostById(postId)
        if (!postIs) {
            return res.status(401).json({
                status: "failed",
                message: "no post found with the id"
            })
        }

        const updatedPost = { ...postIs }

        if (imageUrl) {
            updatedPost.imageUrl = imageUrl
        }
        if (caption) {
            updatedPost.caption = caption
        }

        await updatePost(postId, updatedPost)
        res.status(200).json({
            status: "Success",
            message: "post updated successfully"
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: "Something went wrong"
        })
    }
}
const deletepostCtrl = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await getPostById(postId)
        // console.log(post)
        if (!post) {
            return res.status(404).json({
                status: "Failed",
                message: "Post not found"
            })
        }
        await deletePost(postId)
        res.status(200).json({
            status: "success",
            message: "post deleted successfully"
        })
    } catch (err) {
        return res.status(404).json({
            status: "Failed",
            message: "Something went wrong"
        })
    }
}
module.exports = { getAllPostsCtrl, createPostCtrl, updatePostCtrl, deletepostCtrl }