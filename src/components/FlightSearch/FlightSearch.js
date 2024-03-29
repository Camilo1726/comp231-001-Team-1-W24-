import React, { useState, useMemo } from "react";
import "./FlightSearch.css";
import flightsData from "../UserDashboard/flightsData"; //hardcoded data to develop the search functionality
import { useTable } from 'react-table'; //interactive table to display the search results / click on a row to view flight details


const FlightSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [status, setStatus] = useState('');
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false); // track if search has been performed


  const data = useMemo(() => filteredFlights, [filteredFlights]);

  const columns = useMemo(
    () => [
      {
        Header: 'Flight Number',
        accessor: 'flightNumber'
      },
      {
        Header: 'Origin',
        accessor: 'origin'
      },
      {
        Header: 'Destination',
        accessor: 'destination'
      },
      {
        Header: 'Departure Date',
        accessor: 'departureDate'
      },
      {
        Header: 'Departure Time',
        accessor: 'departureTime'
      },
      {
        Header: 'Arrival Date',
        accessor: 'arrivalDate'
      },
      {
        Header: 'Arrival Time',
        accessor: 'arrivalTime'
      },
      {
        Header: 'Status', //property was defined as state, but it should be status - refactor
        accessor: 'state'
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;


  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchPerformed(true); // Indicate that a search has been performed
    const lowerCaseQuery = searchQuery.toLowerCase();
        const results = flightsData.filter(flight => {
      return (
        flight.flightNumber.toLowerCase().includes(lowerCaseQuery) ||
        flight.origin.toLowerCase().includes(lowerCaseQuery) ||
        flight.destination.toLowerCase().includes(lowerCaseQuery)
      ) && (
        flight.departureDate.includes(departureDate) &&
        flight.departureTime.includes(departureTime) &&
        flight.arrivalDate.includes(arrivalDate) &&
        flight.arrivalTime.includes(arrivalTime) &&
        (status ? flight.state === status : true)
      );
    });
    setFilteredFlights(results);
  };


  const clearFilters = () => {
    setSearchQuery('');
    setDepartureDate('');
    setDepartureTime('');
    setArrivalDate('');
    setArrivalTime('');
    setStatus('');
  };



  return (
    <div className="flight-search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="field-container">
          <label htmlFor="searchQuery">Search</label>
          <input
            id="searchQuery"
            type="text"
            placeholder="Search by Flight Number, Origin, or Destination"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="field-container">
          <label htmlFor="departureDate">Departure Date</label>
          <input
            id="departureDate"
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        <div className="field-container">
          <label htmlFor="departureTime">Departure Time</label>
          <input
            id="departureTime"
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
        </div>

        <div className="field-container">
          <label htmlFor="arrivalDate">Arrival Date</label>
          <input
            id="arrivalDate"
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
          />
        </div>

        <div className="field-container">
          <label htmlFor="arrivalTime">Arrival Time</label>
          <input
            id="arrivalTime"
            type="time"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
          />
        </div>

        <div className="field-container">
          <label htmlFor="status">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select Status</option>
            <option value="On Time">On Time</option>
            <option value="Delayed">Delayed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="search-button-wrapper">
          <button type="submit">Search</button>
          <button type="button" onClick={clearFilters}>Clear Filters</button>

        </div>

            {/* Clear Filters button outside and after the form */}


      </form>

      {searchPerformed && (
      <div className="flights-list-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps({
                    onClick: () => console.log('Navigate to flight detail for:', row.original.id),
                    style: { cursor: 'pointer' },
                  })}
                >
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}


    </div>
  );
};

export default FlightSearch;
