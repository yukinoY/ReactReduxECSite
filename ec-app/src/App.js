import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { signInAction } from './reducks/users/actions';

function App() {
  const dispatch = useDispatch(); // Hooks
  const selector = useSelector(state => state); // Hooks
  console.log(selector.users);
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => dispatch(signInAction({uid: '000', username: 'torahack'}))}>
          Sign In
        </button>
      </header>
    </div>
  );
}

export default App;
