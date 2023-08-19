import styles from './App.module.css';
import { useEffect, useState } from 'react';

function App() {
  const [task, setTask] = useState<string>('');
  const [incomplete, setIncomplete] = useState<string[]>(() => {
    const storedIncomplete = localStorage.getItem('incomplete');
    return storedIncomplete ? JSON.parse(storedIncomplete) : [];
  });
  const [complete, setComplete] = useState<string[]>(() => {
    const storedComplete = localStorage.getItem('complete');
    return storedComplete ? JSON.parse(storedComplete) : [];
  });
  const [isDraggingOverIncomplete, setIsDraggingOverIncomplete] = useState(false);
  const [isDraggingOverComplete, setIsDraggingOverComplete] = useState(false);

  useEffect(() => {
    localStorage.setItem('complete', JSON.stringify(complete));
  }, [complete]);

  useEffect(() => {
    localStorage.setItem('incomplete', JSON.stringify(incomplete));
  }, [incomplete]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIncomplete((prevInc) => [task, ...prevInc]);
    setTask('');
  };

  const onDragStart = (e: React.DragEvent<HTMLLIElement>, task: string, type: string) => {
    const payload = JSON.stringify({
      task,
      type,
    });
    e.dataTransfer.setData('payload', payload);
  };

  const onDrop = (e: React.DragEvent<HTMLUListElement>, destinationType: string) => {
    const { task, type: sourceType } = JSON.parse(e.dataTransfer.getData('payload')) as { task: string; type: string };
    if (sourceType === destinationType) return;

    if (destinationType === 'incomplete') {
      // remove from complete
      setComplete((prevCom) => {
        const newComp = prevCom.filter((com) => com !== task);
        return newComp;
      });
      // add to incomplete
      setIncomplete((prevIncomplete) => {
        const newIncomplete = prevIncomplete.filter((inc) => inc !== task);
        newIncomplete.unshift(task);
        return newIncomplete;
      });
    } else {
      setIncomplete((prevIncomplete) => {
        const newIncomplete = prevIncomplete.filter((com) => com !== task);
        return newIncomplete;
      });
      setComplete((prevComplete) => {
        const newComplete = prevComplete.filter((inc) => inc !== task);
        newComplete.unshift(task);
        return newComplete;
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Kanban</h1>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='task'
          id='task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </form>

      <div className={styles.board}>
        <ul
          className={`${styles.taskList} ${isDraggingOverIncomplete ? styles.dragOver : ''}`}
          onDrop={(e) => {
            onDrop(e, 'incomplete');
            setIsDraggingOverIncomplete(false);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingOverIncomplete(true);
          }}
          onDragLeave={() => setIsDraggingOverIncomplete(false)}>
          <p>To Do</p>
          {incomplete.map((inc) => (
            <li
              draggable
              onDragStart={(e) => onDragStart(e, inc, 'incomplete')}
              key={inc}>
              {inc}
            </li>
          ))}
        </ul>

        <ul
          className={`${styles.taskList} ${isDraggingOverComplete ? styles.dragOver : ''}`}
          onDrop={(e) => {
            onDrop(e, 'complete');
            setIsDraggingOverComplete(false);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingOverComplete(true);
          }}
          onDragLeave={() => setIsDraggingOverComplete(false)}>
          <p>Done</p>
          {complete.map((comp) => (
            <li
              draggable
              onDragStart={(e) => onDragStart(e, comp, 'complete')}
              key={comp}>
              {comp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
