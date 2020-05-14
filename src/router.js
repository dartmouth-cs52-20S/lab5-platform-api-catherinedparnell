import { Router } from 'express';
import * as Posts from './controllers/post_controller';


const router = Router();

// your routes will go here
router.route('/posts')
  .post(Posts.createPost)
  .get(Posts.getPosts);

router.route('/posts/:id')
  .get(Posts.getPost)
  .put(Posts.updatePost)
  .delete(Posts.deletePost);

router.route('/filter')
  .get(Posts.getTags);

router.route('/filter/:tag')
  .get(Posts.getPostsByTags);

export default router;
