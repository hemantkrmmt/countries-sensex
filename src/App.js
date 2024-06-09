import logo from './logo.svg';
import './App.css';
import { useFetch } from './components/useFetch';
import Loading from './components/Loading';
import CountriesInfo from './components/CountriesInfo';

function App() {

  const [loading, error, data] = useFetch("https://api.sampleapis.com/countries/countries");
  console.log("[loading, error, data]", [loading, error, data])
  return (
    <div className="App">
     <Loading isLoading={loading} error={error}>
        <CountriesInfo data={data}/>
     </Loading>
    </div>
  );
}

export default App;
