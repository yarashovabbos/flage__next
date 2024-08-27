'use client'

import { useEffect, useState } from 'react'

export default function Home() {
	const [countries, setCountries] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedRegion, setSelectedRegion] = useState('0')
	const [darkMode, setDarkMode] = useState(false)

	useEffect(() => {
		const fetchCountries = async () => {
			const api = 'https://restcountries.com/v3.1/all'
			try {
				const response = await fetch(api)
				const data = await response.json()
				setCountries(data)
			} catch (error) {
				console.error('Server is broken', error.message)
			}
		}
		fetchCountries()
	}, [])

	const filteredCountries = countries.filter(country => {
		const countryName = country.name.common.toLowerCase()
		const countryRegion = country.region
		const matchesSearch = countryName.includes(searchTerm.toLowerCase())
		const matchesRegion =
			selectedRegion === '0' || countryRegion === selectedRegion
		return matchesSearch && matchesRegion
	})

	const toggleDarkMode = () => {
		setDarkMode(!darkMode)
	}

	return (
		<div
			className={darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}
		>
			<header className='bg-white dark:bg-gray-800 shadow-md py-4'>
				<div className='container mx-auto flex justify-between items-center'>
					<a href='#' className='text-2xl font-bold text-white'>
						Dunyo mamlakatlari
					</a>
					<button
						onClick={toggleDarkMode}
						className='flex items-center focus:outline-none'
					>
						<img src='/images/Path.svg' alt='dark mode icon' className='mr-2' />
						<h4 className='font-semibold'>
							{darkMode ? 'Light Mode' : 'Dark Mode'}
						</h4>
					</button>
				</div>
			</header>

			<section className='container mx-auto py-8 flex justify-between items-center flex-wrap'>
				<input
					type='text'
					placeholder='Qidiring ...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className={`w-full md:w-1/3 p-3 rounded-lg shadow-md focus:outline-none ${
						darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
					}`}
				/>
				<select
					value={selectedRegion}
					onChange={e => setSelectedRegion(e.target.value)}
					className={`mt-4 md:mt-0 p-3 rounded-lg shadow-md focus:outline-none bg-white ${
						darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
					}`}
				>
					<option value='0'>All</option>
					<option value='Africa'>Africa</option>
					<option value='America'>America</option>
					<option value='Asia'>Asia</option>
					<option value='Europe'>Europe</option>
					<option value='Oceania'>Oceania</option>
				</select>
			</section>

			<section className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
				{filteredCountries.length > 0 ? (
					filteredCountries.map(country => (
						<div
							key={country.name.common}
							className={`rounded-lg shadow-lg overflow-hidden ${
								darkMode ? 'bg-gray-800' : 'bg-white'
							}`}
						>
							<img
								src={country.flags.png}
								alt={`${country.name.common} flag`}
								className='w-full h-48 object-cover'
							/>
							<div className='p-6'>
								<h2 className='text-xl font-bold mb-2'>
									{country.name.common}
								</h2>
								<p className='text-sm'>
									Population: {country.population.toLocaleString()}
								</p>
								<p className='text-sm'>Region: {country.region}</p>
								<p className='text-sm'>Capital: {country.capital}</p>
								<div className="text-right mt-4">
  <a href={`/about/${country.name.common.toLowerCase()}`} className="text-blue-500 hover:underline">
    About this country
  </a>
</div>

							</div>
						</div>
					))
				) : (
					<div className='text-center text-xl'>No countries found</div>
				)}
			</section>
		</div>
	)
}
