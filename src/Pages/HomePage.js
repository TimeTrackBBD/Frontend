import './HomePage.css';
import { useState } from 'react';

const ApiRoot = 'bob';

function HomePage() {

  const [responseField, setResponseField] = useState("click button");

  const helloWorld = async () => {
    try {
      const response = await fetch(`${ApiRoot}/api/helloworld`);
      const body = await response.json()
      if (response.ok){
        setResponseField(body);
      }
      else{
        setResponseField(`Oh no: ${response.status} ${body.message}` );
      }
    } catch {
      setResponseField("button was clicked but no response from api");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hit the following button to ping the helloworld endpoint of the server
        </p>
      </header>
      <article>
        <button onClick={helloWorld} > helloWorld</button>
        <p>{responseField}</p>
      </article>

    </div>
  );
}

export default HomePage;
