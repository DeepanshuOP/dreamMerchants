"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export default function MovieDetails({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<any>(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${params.id}`)
        const data = await response.json()
        setMovie(data)
      } catch (error) {
        console.error("Error fetching movie details:", error)
      }
    }
    fetchMovieDetails()
  }, [params.id])

  if (!movie) {
    return <div className="text-center mt-8 text-white">Loading...</div>
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="text-blue-400 hover:underline mb-6 inline-block">
          &larr; Back to Search
        </Link>
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
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
              <h1 className="text-3xl font-bold mb-4 text-blue-400">{movie.Title}</h1>
              <p className="text-gray-300 mb-4">{movie.Plot}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-blue-400">Year:</p>
                  <p className="text-gray-300">{movie.Year}</p>
                </div>
                <div>
                  <p className="font-semibold text-blue-400">Director:</p>
                  <p className="text-gray-300">{movie.Director}</p>
                </div>
                <div>
                  <p className="font-semibold text-blue-400">Genre:</p>
                  <p className="text-gray-300">{movie.Genre}</p>
                </div>
                <div>
                  <p className="font-semibold text-blue-400">Runtime:</p>
                  <p className="text-gray-300">{movie.Runtime}</p>
                </div>
                <div>
                  <p className="font-semibold text-blue-400">IMDb Rating:</p>
                  <p className="text-gray-300">{movie.imdbRating}</p>
                </div>
                <div>
                  <p className="font-semibold text-blue-400">Actors:</p>
                  <p className="text-gray-300">{movie.Actors}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

