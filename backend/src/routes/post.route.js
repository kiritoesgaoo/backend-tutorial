import {Router} from "express";
import { createPost, getPosts, updatePost, deletePost} from "../controllers/post.controller.js";
const router = Router();
router.route('/create').post(createPost);
router.route('/getposts').get(getPosts);
router.route('/updatepost/:id').patch(updatePost);
router.route('/deletepost/:id').delete(deletePost);
export default router;