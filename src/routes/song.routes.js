import { Router } from "express";
import {
    getSongs,
    createSong,
    updateSong,
    deleteSong,
    getSong
} from '../controllers/songs.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from "../middlewares/validateData.js";
import { songSchema } from "../schemas/song.schema.js";

const router = Router();

router.get('/songs',authRequired, getSongs);
router.get('/song/:id', authRequired, getSong);
router.put('/song/:id',validateSchema(songSchema),authRequired, updateSong)
router.post('/song',validateSchema(songSchema),authRequired, createSong)
router.delete('/song/:id', authRequired, deleteSong);

export default router;

