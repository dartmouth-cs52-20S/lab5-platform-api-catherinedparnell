import Post from '../models/post_model';

// update controller to utilize author
// any route that is protected by requireAuth will now have a req.user object

export const createPost = (req, res) => {
  const post = new Post({
    title: req.body.title,
    coverUrl: req.body.coverUrl,
    content: req.body.content,
    tags: [...new Set(req.body.tags.split(' '))],
    summary: req.body.summary,
    author: req.user,
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
  Post.find().sort({ createdAt: -1 })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPostsByTags = (req, res) => {
  Post.find(
    { tags: { $in: [req.params.tag] } },
  ).sort({ createdAt: -1 })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getTags = (req, res) => {
  Post.find({}, { tags: 1, _id: 0 })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
    .populate('author', 'authorName username email')
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

// houston we have a problem here
export const updatePost = (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.id, author: req.user._id },
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
  ).populate('author')
    .then((result) => {
      res.send(result);
    }).catch((error) => {
      res.status(500).json({ error });
    });
};
