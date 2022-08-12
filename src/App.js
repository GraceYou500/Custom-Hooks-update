import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const httpData = useHttp();

  const { isLoading, error, sendRequest: fetchTasks } = httpData;

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const transformTasks = taskObjet => {
      const loadedTasks = [];

      for (const taskKey in taskObjet) {
        loadedTasks.push({ id: taskKey, text: taskObjet[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: 'https://react-http-requests-24eb5-default-rtdb.firebaseio.com/tasks.json',
      },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = task => {
    setTasks(prevTasks => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
