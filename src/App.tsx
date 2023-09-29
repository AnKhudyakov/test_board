import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToDoContext } from './context';
import BoardPage from './pages/BoardPage/BoardPage';
import ToDoListPage from './pages/ToDoListPage/ToDoListPage';
import { ToDoContextType } from './types';

function App() {
  const { setToDosFromLS, incrementDevTime, search, activeToDo } =
    useContext(ToDoContext) as ToDoContextType;

  useEffect(() => {
    setToDosFromLS();
  }, [search]);

  useEffect(() => {
    if (activeToDo?.boards[1].tasks.length) incrementDevTime();
  }, [activeToDo]);

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
