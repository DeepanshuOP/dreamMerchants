"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [movies, setMovies] = useState([])

  const searchMovies = async () => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&s=${searchTerm}`)
    const data = await response.json()
    if (data.Search) {
      setMovies(data.Search)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">OMDB Movie Search</h1>
      <div className="flex mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for movies..."
        />
        <button
          onClick={searchMovies}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie: any) => (
          <Link href={`/movie/${movie.imdbID}`} key={movie.imdbID}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Image
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg"}
                alt={movie.Title}
                width={300}
                height={445}
                className="w-full h-[300px] object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 truncate">{movie.Title}</h2>
                <p className="text-sm text-gray-600">{movie.Year}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

