import './App.scss';
import RecipeLists from './components/RecipeLists'
import { useState } from 'react';

function App() {
  const [loader,setLoader] = useState(true)
  return (
    <div className="main">
      <RecipeLists setLoader={setLoader}/>
      {loader && <div className='loader'>
        <div className='spinner'></div>
        </div>}
    </div>
  );
}

export default App;
