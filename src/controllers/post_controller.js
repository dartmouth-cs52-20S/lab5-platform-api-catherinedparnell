import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post({
    title: req.body.title,
    coverUrl: req.body.coverUrl,
    content: req.body.content,
    tags: req.body.tags,
  });
  post.save()
    .then((result) => {
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getPosts = (req, res) => {
  Post.find()
    .then((result) => {
      res.send({ response: result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((result) => {
      res.send({ response: result });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ message: 'deleted post!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const updatePost = (req, res) => {
  Post.update(
    { _id: req.params.id },
    {
      $set:
       {
         title: req.body.title,
         coverUrl: req.body.coverUrl,
         content: req.body.content,
         tags: req.body.tags,
       },
    },
  ).then((result) => {
    res.send({ message: 'updated post!', response: result });
  })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
