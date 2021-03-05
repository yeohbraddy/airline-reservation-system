import React, { useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import * as dayjs from "dayjs";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";
import { rest_endpoints } from "../../config/rest_endpoints.json";
const { flight: flight_apis } = rest_endpoints;

const Button = styled.button.attrs({
  className: `ma2 relative w-100 b--gray ma0 br2 ba hover-bg-light-gray tc`,
})`
  padding: 6px 20px;
  transition: 0.15s ease-out;
  background-color: transparent;
  min-width: 100px;
  &:hover {
    border-color: #505050;
    transition: 0.15s ease-in;
  }
  ${(props) => props.disabled && `pointer-events: none;`}
`;

const SearchFlight = () => {
  /*
  1. search flights
  2. display flights */
  const [flights, setFlights] = useState([]);
  const [numberOfPassengers, setNumberOfPassengers] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const origin = e.target.formOrigin.value;
    const destination = e.target.formDestination.value;
    const departureDate = e.target.formDepartDate.value;
    const numPassengers = e.target.formNumberOfPassengers.value;

    // GET reservation by customer last name and reservation id.
    fetch(
      `${
        flight_apis.search
      }?departureAirport=${origin}&arrivalAirport=${destination}&departureDate=${departureDate}&numOfPassengers=${numPassengers}&pageNum=${0}&fromDepartureDate=${1}`
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(
          `${resp.status} Error retrieving search result for flights.`
        );
      })
      .then((res) => {
        const flights = res.flight;
        console.log(res);
        setFlights(flights);
        setNumberOfPassengers(numPassengers);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sanitiseNumbersOnlyInput = (input) => {
    // replace all whitespace and alphabets with "".
    return input.replace(/[^0-9.]/g, "");
  };

  const onChangeNumPassengers = (e) => {
    e.preventDefault();

    // sanitize user input.
    const currNumPassengers = sanitiseNumbersOnlyInput(e.target.value);
    e.target.value = currNumPassengers;
  };

  return (
    <>
      <div>Search Flights</div>
      <div className="mb4">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="formOrigin">
            <Form.Label>Origin</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type a city or airport"
              defaultValue="KUL"
              required
            />
          </Form.Group>
          <Form.Group controlId="formDestination">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type a city or airport"
              defaultValue="KCH"
              required
            />
          </Form.Group>
          <Form.Group controlId="formDepartDate">
            <Form.Label>Departure Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date"
              defaultValue="2021-04-16"
              required
            />
          </Form.Group>
          <Form.Group controlId="formNumberOfPassengers">
            <Form.Label>Number of passengers</Form.Label>
            <Form.Control
              type="text"
              placeholder="1"
              defaultValue="1"
              onChange={(evt) => onChangeNumPassengers(evt)}
              required
            />
          </Form.Group>
          <Button type="submit">Search flights</Button>
        </Form>
      </div>
      <div>
        {flights &&
          flights.map((currFlight, currIndex) => {
            const flightDuration = dayjs(currFlight.arrivalDateTime).diff(
              dayjs(currFlight.departureDateTime)
            );

            return (
              <div key={currIndex} className="mb3">
                <div>{`${dayjs(currFlight.departureDateTime).format(
                  "HH:mm"
                )} - ${dayjs(currFlight.arrivalDateTime).format(
                  "HH:mm"
                )}`}</div>

                <div>
                  {dayjs(currFlight.departureDateTime).format("ddd, MMM DD")}
                </div>

                <div>{`${currFlight.departureAirport} - ${currFlight.arrivalAirport}`}</div>

                <div>{`Duration: ${dayjs(flightDuration).format(
                  "HH:mm"
                )}`}</div>

                <Link
                  to={{
                    pathname: `/book/${currFlight.id}`,
                    state: {
                      flightId: currFlight.id,
                      numPassengers: numberOfPassengers,
                    },
                  }}
                >
                  <Button type="button">Select Flight</Button>
                </Link>

                <div>{`EUR ${
                  currFlight.flightPrice * numberOfPassengers
                } (EUR ${currFlight.flightPrice}*${numberOfPassengers})`}</div>
              </div>
            );
          })}
        {flights != null && flights.length === 0 && (
          <Card>
            <Card.Body>No flights available.</Card.Body>
          </Card>
        )}
      </div>
    </>
  );
};

export default SearchFlight;
