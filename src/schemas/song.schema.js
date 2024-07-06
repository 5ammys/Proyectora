import {z} from 'zod'

export const songSchema=z.object({
    name:z.string({
        required_error: 'The name is required'
    }),
    lyric:z.string({
        required_error:'The lyric is required'
    })
})