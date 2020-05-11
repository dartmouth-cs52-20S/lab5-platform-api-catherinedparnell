import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post({
    title: req.body.title,
    coverUrl: req.body.coverUrl,
    content: req.body.content,
    tags: [...new Set(req.body.tags.split(' '))],
    summary: req.body.summary,
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
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ message: 'deleted post' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const updatePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $set:
       {
         title: req.body.title,
         coverUrl: req.body.coverUrl,
         content: req.body.content,
         tags: [...new Set(req.body.tags.split(' '))],
         summary: req.body.summary,
       },
    },
    { new: true },
  ).then((result) => {
    res.send(result);
  })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
