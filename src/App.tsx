import { FormEvent, useState } from 'react';

type TTodo = {
  name: string;
  is_complete: boolean;
};

function App() {
  const [name, setName] = useState<string>('');
  const [todos, setTodos] = useState<TTodo[]>([]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          is_complete: false,
          name,
        },
      ];
    });

    setName('');
  };

  const markDone = (todo: TTodo) => {
    const todoToMark = todos.find((todoItem) => todoItem.name === todo.name);
    if (!todoToMark) return;

    const newTodos = todos.map((todoItem) => {
      if (todoItem.name === todo.name) {
        todoItem.is_complete = true;
      }
      return todoItem;
    });

    setTodos(newTodos);
  };

  const incomplete = todos
    .filter((todo) => !todo.is_complete)
    .map((item, index) => (
      <button
        key={'' + index + item.name + item.is_complete}
        onClick={() => markDone(item)}>
        {item.name}
      </button>
    ));
  const complete = todos.filter((todo) => todo.is_complete).map((item, index) => <div key={'' + index + item.name + item.is_complete}>{item.name}</div>);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Add</button>
      </form>
      {incomplete.length > 0 && (
        <div>
          <p>Incomplete</p>
          {incomplete}
        </div>
      )}
      {complete.length > 0 && (
        <div>
          <p>Complete</p>
          {complete}
        </div>
      )}
    </>
  );
}

export default App;
