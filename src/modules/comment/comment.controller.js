// comments controller starts here 
const { getCommentRepo, addCommentRepo, checkIdExist, updateCommentRepo, deleteCommentRepo } = require('./comment.repository')

const getComment = async (req, res) => {
    try {
        const data = await getCommentRepo()
        return res.status(201).json({
            status: "Success",
            response: data
        })
    } catch (err) {
        return res.status(500).json({
            status: "Failed",
            message: "Failed to fetch comments by controller",
            error: err
        })
    }
}

const addComment = async (req, res) => {
    try {
        const { comment } = req.body
        const id = req.params.id
        const idExist = await checkIdExist(id)
        if (!idExist) {
            return res.status(500).json({
                status: "Failed",
                message: "No post found with this id"
            })
        }
        const response = await addCommentRepo(id, comment)
        return res.status(201).json({
            status: "Success",
            message: "Comment added Successfully"
        })
    } catch (err) {
        return res.status(500).json({
            status: "Failed",
            message: "Failed to add comment to the post",
            error: err
        })
    }
}

const updateComment = async (req, res) => {
    try {
        const id = req.params.id
        const { comment } = req.body
        const idExist = await checkIdExist(id)
        if (!idExist) {
            return res.status(500).json({
                status: "Failed",
                message: "No post found with this id"
            })
        }
        const result = await updateCommentRepo(id, comment)
        return res.status(201).json({
            status: "Success",
            message: "Comment updated Successfully"
        })
    } catch (err) {
        return res.status(500).json({
            status: "Failed",
            message: "Error in updating comment",
            error: err
        })
    }
}

const deleteComment = async (req, res) => {
    try {
        const id = req.params.id
        const response = await deleteCommentRepo(id)
        return res.status(201).json({
            status: "Success",
            message: "Comment deleted Successfully"
        })
    } catch (err) {
        return res.status(500).json({
            status: "Failed",
            message: "Error in updating comment",
            error: err
        })
    }
}
module.exports = { getComment, addComment, updateComment, deleteComment }