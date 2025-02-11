"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function MovieDetails({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<any>(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&i=${params.id}`)
      const data = await response.json()
      setMovie(data)
    }
    fetchMovieDetails()
  }, [params.id])

  if (!movie) {
    return <div className="text-center mt-8">Loading...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Search
      </Link>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <Image
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg"}
            alt={movie.Title}
            width={300}
            height={445}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-2/3 md:pl-6">
          <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
          <p className="text-gray-600 mb-4">{movie.Plot}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Year:</p>
              <p>{movie.Year}</p>
            </div>
            <div>
              <p className="font-semibold">Director:</p>
              <p>{movie.Director}</p>
            </div>
            <div>
              <p className="font-semibold">Genre:</p>
              <p>{movie.Genre}</p>
            </div>
            <div>
              <p className="font-semibold">Runtime:</p>
              <p>{movie.Runtime}</p>
            </div>
            <div>
              <p className="font-semibold">IMDb Rating:</p>
              <p>{movie.imdbRating}</p>
            </div>
            <div>
              <p className="font-semibold">Actors:</p>
              <p>{movie.Actors}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

