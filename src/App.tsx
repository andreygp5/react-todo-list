import React from 'react';
import TodoManager from './Components/TodoManager/TodoManager';

import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="App__container">
        <TodoManager />
      </div>
    </div>
  );
}

export default App;
