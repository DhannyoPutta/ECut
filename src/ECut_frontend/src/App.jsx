import { useState } from 'react';
import { ECut_backend } from 'declarations/ECut_backend';
import NavigationBar from './component/navbar/Navbar';
import Jumbotron from './section/jumbotron/Jumbotron';
import TopBarberShop from './section/topBarbershop/TopBarberShop';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    ECut_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <main>
      <NavigationBar/>
      <Jumbotron/>
      <TopBarberShop/>
    </main>
  );
}

export default App;
