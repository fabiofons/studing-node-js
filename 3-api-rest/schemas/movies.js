const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    required_error: 'Movie title is required',
    invalid_type_error: 'Movie title should be a string'
  }),
  year: z.number().int().min(1900).max(new Date().year + 1),
  director: z.string(),
  duration: z.number().positive(),
  rate: z.number().min(1).max(10).default(5),
  poster: z.string().url({
    message: 'Movie poster should be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Biography', 'Drama', 'Adventure', 'Fantasy', 'Romance', 'Drama', 'sci-Fi', 'Animation']),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre should be an array'
    }
  )

})

const validateMovie = (inputs) => {
  return movieSchema.safeParse(inputs)
}

function validateParcialMovie (values) {
  return movieSchema.partial().safeParse(values)
}

module.exports = {
  validateMovie,
  validateParcialMovie
}
