import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    const {article} = req.body;
    if (!article) {
        return res.status(400).json({ error: "Missing article description" });
    }
    res.status(200).json({ message: "Article added to favorites!" });
});

export default router;
