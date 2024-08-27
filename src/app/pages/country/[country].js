import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CountryPage() {
  const router = useRouter();
  const { country } = router.query;
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    if (country) {
      const fetchCountryData = async () => {
        try {
          const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
          const data = await response.json();
          setCountryData(data[0]);
        } catch (error) {
          console.error("Failed to fetch country data", error);
        }
      };

      fetchCountryData();
    }
  }, [country]);

  if (!countryData) return <div>Loading...</div>;

  return (
    <div>
      <header className="site-header">
        <div className="container header-section">
          <a href="/" className="site-logo">Where in the world?</a>
        </div>
      </header>

      <a href="/" className="back">Back</a>
      <section className="countries container">
        <div className="container grid">
          <div className="img-section">
            <img src={countryData.flags.png} alt={`${countryData.name.common} flag`} />
          </div>
          <div className="texts">
            <h1>{countryData.name.common}</h1>
            <p><strong>Native Name:</strong> {Object.values(countryData.name.nativeName || {}).map(name => name.common).join(', ')}</p>
            <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
            <p><strong>Region:</strong> {countryData.region}</p>
            <p><strong>Subregion:</strong> {countryData.subregion}</p>
            <p><strong>Capital:</strong> {countryData.capital?.join(', ')}</p>
            <p><strong>Languages:</strong> {Object.values(countryData.languages || {}).join(', ')}</p>
            <p><strong>Currency:</strong> {Object.values(countryData.currencies || {}).map(currency => currency.name).join(', ')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
