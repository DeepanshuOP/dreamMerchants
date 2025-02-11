"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useInView } from "react-intersection-observer"

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [movies, setMovies] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const { ref, inView } = useInView()

  const fetchMovies = useCallback(async (search = "", pageNum = 1) => {
    setLoading(true)
    let url: string
    if (search) {
      url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${pageNum}`
    } else {
      // Fetch random movies by using a random letter as search term
      const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
      url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${randomLetter}&page=${pageNum}`
    }

    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data.Search) {
        setMovies((prevMovies) => (pageNum === 1 ? data.Search : [...prevMovies, ...data.Search]))
        setPage(pageNum + 1)
      }
    } catch (error) {
      console.error("Error fetching movies:", error)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  useEffect(() => {
    if (inView) {
      fetchMovies(searchTerm, page)
    }
  }, [inView, fetchMovies, searchTerm, page])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setMovies([])
    setPage(1)
    fetchMovies(searchTerm, 1)
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">Movie Explorer</h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 border-2 border-blue-500 rounded-l-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Search for movies..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Search
            </button>
          </div>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <Link href={`/movie/${movie.imdbID}`} key={movie.imdbID}>
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                <Image
                  src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg"}
                  alt={movie.Title}
                  width={300}
                  height={445}
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-blue-400 truncate">{movie.Title}</h2>
                  <p className="text-sm text-gray-400">{movie.Year}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {loading && <p className="text-center mt-4">Loading more movies...</p>}
        <div ref={ref} className="h-10" />
      </div>
    </div>
  )
}

