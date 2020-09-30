import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function BikeData() {
const [bikes, setBikes] = useState([]);

useEffect(() => {
  axios.get('https://api.citybik.es/v2/networks/citybikes-helsinki')
    .then((res) => res.data)
    .then((res) => setBikes(res.network.stations))
}, []) 

  return (
    <div>
      <Table>
        <tbody>
          <tr><th>osoite:</th><th>vapaita paikkoja:</th><th>vapaita pyöriä:</th></tr>
          {bikes.map(res =>
            (<tr key={res.id}>
              <th>{res.name}</th>
              <th>{res.empty_slots}</th>
              <th>{res.free_bikes}</th>
              </tr>))}
        </tbody>
      </Table>
    </div>
  );
}

export default BikeData;
