import { Route, Routes } from 'react-router-dom';
// import { incrementDevtime } from './services/todoService';
import ToDoListPage from './pages/ToDoListPage/ToDoListPage';
import Layout from './components/Layout/Layout';
import BoardPage from './pages/BoardPage/BoardPage';
import { useContext, useEffect } from 'react';
import { ToDoContext } from './context';
import { ToDoContextType } from './types';

function App() {
  const { toDos, setToDosFromLS, incrementDevTime, search } = useContext(
    ToDoContext
  ) as ToDoContextType;

  useEffect(() => {
    setToDosFromLS();
  }, [search]);

  useEffect(() => {
    incrementDevTime();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ToDoListPage />} />
        <Route path="/project/:id" element={<BoardPage />} />
      </Routes>
    </div>
  );
}

export default App;
