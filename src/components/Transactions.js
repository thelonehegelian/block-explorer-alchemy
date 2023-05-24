import React, { useState } from 'react';
import Pagination from './Pagination';

function App() {
  const [data, setData] = useState([]);

  const RenderComponent = ({ data }) => (
    <div className="card">
      <h2>{data.name}</h2>
      <p>ID: {data.id}</p>
    </div>
  );

  return (
    <div className="App">
      <Pagination
        data={data}
        RenderComponent={RenderComponent}
        title="Pagination Example"
        pageLimit={5}
        dataLimit={2}
      />
    </div>
  );
}

export default App;
